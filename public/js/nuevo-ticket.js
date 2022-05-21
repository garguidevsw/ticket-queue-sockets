
const lblNewTicket = document.querySelector('#lblNewTicket');
const btnNewTicket = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnNewTicket.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnNewTicket.disabled = true;
});


socket.on('last-ticket', (payload) => {
    lblNewTicket.innerText = 'Ticket ' + payload;
})


btnNewTicket.addEventListener( 'click', () => {
    
    socket.emit( 'next-ticket', null, ( ticket ) => {
        console.log(ticket);
        lblNewTicket.innerText = ticket;
    });

});