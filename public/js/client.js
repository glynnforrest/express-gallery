var socket = io();

socket.on('image', function(img) {
    $('.image-box').hide();
    $('.image-box').html('<img src="/images/'+img+'" />');
    $('.image-box').fadeIn();
})
