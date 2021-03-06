const {describe, it, before, after} = require('mocha');
const expect = require('expect');
const socketIOClient = require('socket.io-client');
const http = require('http');
const auth = require('../src/client/authenticate');

const AttachSockets = require('../src/api/websocket/socket');

/**
 * For working out if the socket.io connection is relaying messages properly.
 */
describe('Testing socket connection', () => {
    let server = null;
    let tokens = [];
    let host = null;
    let connections = new Map();
    let numberClients = 50;
    const eventName = 'testEvent';
    const endpoint = 'ws://localhost:8080/privateapi';


    before(() => {
        // Create socket server
        server = http.createServer();
        AttachSockets(server);
        server.listen(8080, () => {
            console.log('server init')
        });
        // Generate tokens for clients
        for (let i = 0; i < numberClients; i++) {
            tokens.push(auth.SignUser(`user${i}`, `user${i}`));
        }
        console.log(`Created ${tokens.length} Users, user[0]=${tokens[0]}`);
    });

    it(`should have generated ${numberClients} tokens`, done => {
        expect(tokens.length).toEqual(numberClients);
        done();
    });

    it(`should connect all ${numberClients} clients`, done => {
        const promises = [];
        tokens.forEach(token => {
            promises.push(new Promise((resolve) => {
                const io = socketIOClient(endpoint, {
                    path: '/socket',
                    transports: ['websocket']
                });
                io.on('connect', () => {
                    resolve({token, io})
                });
            }));
        });
        Promise.all(promises).then((results) => {
            if (results.length === tokens.length) {
                host = results[0];
                results.forEach(({token, io}) => {
                    connections.set(token, io);
                });
                done();
            }
        })
    });

    it('should join and leave public socket', done => {
        const promises = [];
        tokens.forEach((token) => {
            promises.push(new Promise((resolve) => {
                    const pubIO = socketIOClient('ws://localhost:8080/publicapi', {
                        path: '/socket',
                        transports: ['websocket']
                    });
                    pubIO.on("connect", () => {
                        resolve(pubIO)
                    })
                })
            );
        });
        Promise.all(promises).then(pubIOs => {
            pubIOs.forEach(io => io.close());
            if (pubIOs.length !== tokens.length) done('not all clients connected');
            done()
        })
    });

    it('should make a room', (done) => {
        host.io.emit('createEvent', {
                jwt: host.token,
                eventName: eventName
            },
            (res) => {
                if (res === true) {
                    done()
                } else {
                    done(res);
                }
            }
        );
    });

    it('should stop duplicate room name', done => {
        host.io.emit('createEvent', {
                jwt: host.token,
                eventName: eventName
            },
            (res) => {
                if (res === true) {
                    done('should have stopped extra room creation')
                } else {
                    done();
                }
            }
        );
    });

    it('should join event', done => {
        const promises = [];
        connections.forEach((io, token) => {
            promises.push(new Promise((resolve, reject) => {
                io.emit('joinEvent', {
                    jwt: token,
                    eventName: eventName
                }, res => {
                    if (res === true) {
                        resolve(token)
                    } else {
                        reject(token)
                    }
                })
            }))
        });
        Promise.all(promises).then(results => {
            if (results.length === numberClients) {
                done()
            }
        }).catch(() => {
            done(`Failed`);
        });
    });

    it('should stop no exist room join', done => {
        host.io.emit('joinEvent', {
                jwt: host.token,
                eventName: 'notANEvent1232100000000'
            },
            (res) => {
                if(res === true) return  done('should have stopped room join');
                done();
            })
    });

    it('should stop non exist room msg send', done => {
        host.io.emit('sendMessage', {
            jwt: host.token,
            eventName: 'notANEvent1232100000000'
        }, res => {
            if (res === true) return done('got send ok instead');
            done();
        })
    });

    it('should send one message to all clients', done => {
        const promises = [];
        connections.forEach((io, token) => {
            promises.push(new Promise((resolve) => {
                io.on('receiveMessage', ({username, message}) => {
                    console.log(`Receive message ${username} ${message}`);
                    resolve(`${username}: ${message}`)
                })
            }))
        });
        host.io.emit('sendMessage', {
            jwt: host.token,
            eventName: eventName,
            message: 'test message question adjioajdowajdoawjdakkkkkdwjaio'
        }, res => {
            if (res !== true) {
                done('send message failed')
            }
        });
        Promise.all(promises).then(results => {
            if (results.length === numberClients) {
                done()
            }
        })
    });

    after(() => {
            server.close();
            connections.forEach(io => {
                io.close();
            })
        }
    )
})
;