
function notifyOnline(socket, number) {
    socket.emit('usersOnline', number);
}

module.exports = {
    notifyOnline
};