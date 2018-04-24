
$(function () {
    const socket = io(); // Ejecutar la función de socket io

    // Obtaining DOM elements from the interface
    const $messageForm = $('#message-form')
    const $messageBox = $('#message')
    const $chat = $('#chat')
    // Obtaining DOM elements from the nicknameForm
    const $nickForm = $('#nickForm')
    const $nickError = $('#nickError')
    const $nickname = $('#nickname')

    const $usernames = $('#usernames')
    const $usersN = $('#usersN')

    $nickForm.submit(e => {
        e.preventDefault()
        socket.emit('new user', $nickname.val(), data => {
            if (data) {
                $('#nickWrap').hide()
                $('#contentWrap').show()
            } else {
                $nickError.html(`
                    <div class="alert alert-danger">
                        That username already exits.
                    </div>
                `)
            }
            $nickname.val('')
        })
    })

    // Events
    $messageForm.submit(e => {
        e.preventDefault()
        socket.emit('send message', $messageBox.val()) // Set data of messageBox from event send message
        $messageBox.val('')
    })

    socket.on('new message', function (data) {
        $chat.append('<b>' + data.nick + '</b>: ' + data.msg + '<br/>')
    })

    socket.on('usernames', data => {
        let html = ''
        for (let i = 0; i < data.length; i++) {
            html += `<p><i class="fas fa-comment"></i> ${data[i]}</p>`
        }
        $usernames.html(html)
        $usersN.html(`<h4>Users online: ${data.length}</h4>`)
    })
})