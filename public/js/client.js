var socket = io();

socket.on('image', function(img) {
    $('.image-box').html('<img src="/images/'+img+'" />');
})
