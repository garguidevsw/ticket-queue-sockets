const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last);
    socket.emit('pending-tickets', ticketControl.tickets.length);
    socket.emit('last4-tickets', ticketControl.last4);

    socket.on('next-ticket', ( payload, callback ) => {
        
        const next = ticketControl.next();
        callback(next);

        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

    });

    socket.on('attend-ticket', ( {desk}, callback ) => {
        
        if(!desk){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.attendTicket(desk);

        socket.broadcast.emit('last4-tickets', ticketControl.last4);
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);
        socket.emit('pending-tickets', ticketControl.tickets.length);
        
        if(!ticket){
            return callback({
                ok: false,
                msg: 'No hay tickets pendientes'
            });
        }else{
            
            callback({
                ok: true,
                ticket
            });
        }

    });

}

module.exports = {
    socketController
}

