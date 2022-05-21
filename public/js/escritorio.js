
const lblDesk = document.querySelector('h1');
const btnAttend = document.querySelector('button');
const lblTicket = document.querySelector('small');
const lblAlert = document.querySelector('.alert');
const lblPending = document.querySelector('#lblPending');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const desk = searchParams.get('escritorio');
lblDesk.innerText = desk;

lblAlert.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnAttend.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAttend.disabled = true;
});


socket.on('pending-tickets', (payload) => {
    console.log(payload);
    if(payload === 0){
        lblPending.style.display = 'none';
        lblAlert.style.display = '';
        btnAttend.disabled = true;
    }else{
        lblPending.innerText = payload;
        lblPending.style.display = '';
        lblAlert.style.display = 'none';
        btnAttend.disabled = false;
    }
    
});


btnAttend.addEventListener( 'click', () => {
    
    socket.emit( 'attend-ticket', {desk}, ( {ok, ticket, msg} ) => {
        if(!ok){
            lblAlert.innerText = msg;
            lblAlert.style.display = '';
            lblPending.style.display = 'none';
            btnAttend.disabled = true;
            return;
        }
        lblTicket.innerText = 'Ticket ' + ticket.number;
    });

});