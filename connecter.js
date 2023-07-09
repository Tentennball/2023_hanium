const clnt = {};
const Socket = (io) => {
    io.on('connection', socket => {
        console.log('chat connected!');
        socket.on('request-chat', data => {
            console.log(data);
            io.emit('response-chat', JSON.stringify({ name: data.name, msg: data.msg, createdAt: data.createdAt }));
        });
        socket.on('joinRoom', room => {
            socket.join(room);
            console.log(`Socket ${socket.id} joined room ${room}`);
            const roomSockets = io.sockets.adapter.rooms.get(room);
            console.log(`Sockets in room ${room}:`, io.sockets.adapter.rooms);

        });
        socket.on('gps', data => {
            let id = socket.id;
            clnt[id] = data;
            console.log(clnt);
        });
        socket.on('warn', () => {
            io.to('masterChat').emit('warning', socket.id);
        });
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
            const rooms = Object.keys(socket.rooms);
            rooms.forEach(room => {
                if (room !== socket.id) {
                    socket.leave(room);
                    console.log(`Socket ${socket.id} left room ${room}`);
                }
            });
        });
    });

};
module.exports = { Socket };