const socket = io('http://localhost:8000');

// get DOM elementds in respective Js variables
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')    // yaniki jb mess. aange then need that message to go that container

// Audio that will play on recieving messages
var audio = new Audio('ting.mp3');

// funtion which will append event info to the containner
const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
        audio.play();
    }
}

// if the form gets submitted, send message to the server
form.addEventListener('submit', (e)=>{            // jb submit karenge mtlb message jb bhejenge 
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);     // emit kr dena h  nodejs ki hm mess. send kr rhe h
    messageInput.value = ''          // mtlb mess bhj ne ke badh text box khali ho jana chahei  
})

// ask new user for his/her name and let the server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);                           // means jabhi nam likhu socket ko emit karo event

// if a new user joins. receive his/her name from the server
socket.on('user-joned', name =>{
   append(`${name} joined the chat`, 'right')
})

// if server sends a message. receive it
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

// if a user leaves the chat append the info to the containner
socket.on('left', name =>{           // hm listen kr vah rhe h ki user left ho gya h 
    append(`${data.name} left the chat`, 'right')

})