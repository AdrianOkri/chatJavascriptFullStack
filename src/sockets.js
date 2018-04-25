
module.exports = function(io) {
    let users = {}
    // Una vez que io logre detectar una conexión
    io.on('connection', socket => {
        console.log('new user connected');
        socket.on('new user', (data, cb) => {
            if(data in users) {
                cb(false)
            } else {
                cb(true)
                socket.nickname = data
                users[socket.nickname] = socket

                updateNicknames()
            }
        })

        socket.on('send message', (data, cb) => {

            var msg = data.trim() // Remove text spaces

            if (msg.substr(0,1) === '@') {
                msg = msg.substr(1)
                const index = msg.indexOf(' ')

                if (index !== -1) {
                    var name = msg.substr(0, index)
                    var msg = msg.substr(index + 1)

                    if (name in users) {
                        users[name].emit('whisper', {
                            msg,
                            nick: socket.nickname
                        })
                    } else {
                        cb('Error! Please enter a valid User')
                    }
                } else {
                    cb('Error! Please enter your message')
                }
            }else {
                io.sockets.emit('new message', {
                    msg: data,
                    nick: socket.nickname
                })
            }  
        })

        socket.on('disconnect', data => {
            if(!socket.nickname) return
            delete users[socket.nickname]
            updateNicknames()
        })

        function updateNicknames() {
            io.sockets.emit('usernames', Object.keys(users))
        }
    })
}
