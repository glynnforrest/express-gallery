$(function () {
    var socket = io();

    $('a.next').click(function() {
        socket.emit('next-image');
    })
    $('a.previous').click(function() {
        socket.emit('previous-image');
    })
});
