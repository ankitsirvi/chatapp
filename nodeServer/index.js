// node server which will handle socket io connections
const io = require('socket.io')(8000)

const user = {};

io.on('connection',socket =>{                          //io.on= used to connect the users whoever its come
    socket.on('new-user-joined', name =>{              // socket.on= means particular connection mh kya krna h jese user-joined event bhj rha h then what to do
        // console.log("New user", name)
        user[socket.id] = name;                 // means enter by the name 
       socket.broadcast.emit('user-joined', name);                          // mtlb 5 bande ko pta chalna chahei ki sixth person is joining the chat, name= means name will also send that this name person has joned
    }); 
            
    
    socket.on('send', message =>{           // means if somepne sends the message like rohan sends it then handle it
         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})    // means message will receive to other person 
    });

    socket.on('disconnect', message =>{          // means jb user disconnect ho tb pta chale sbko that user has gone
        socket.broadcast.emit('left', user[sockcet.id]);
        delete users[socket.id];
    });
})
