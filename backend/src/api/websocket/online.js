
function notifyOnline(socket, number) {
    console.log(`Sending ${number}`);
    socket.emit('usersOnline', number);
}

module.exports = {
    notifyOnline
};