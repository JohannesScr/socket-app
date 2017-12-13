var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');

    // var body = {
    //     from: 'jen@example.com',
    //     text: 'I prefer burgers'
    // };
    //
    // // emitter
    // socket.emit('create_message', body);
});

socket.on('disconnect', function() {
    console.log('Disconnecting from server');
});

// listener
socket.on('new_message', function(message) {
    console.log('New message', message);

    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

// submit send
jQuery('#message-form').on('submit', function(event) {
    event.preventDefault();  // prevent default submit event

    var message = {
        from: 'User',
        text: jQuery('[name=message]').val()
    };

    socket.emit('create_message', message, function() {

    });
});

// send location button
// var location_button = jQuery('#send-location');
var location_button = document.getElementById('send-location');

// click send location
function send_location() {
    location_button.innerText = 'Location sent';
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);

        var location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
        socket.emit('create_location_message', location)
    }, function() {
        alert('Unable to fetch location');
    })
}
// location_button.on('click', function() {
//     location_button.text('Waddup');
// });

socket.on('new_location_message', function(location_message) {
    console.log('New message', location_message);

    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${location_message.from}: `);
    a.attr('href', location_message.url);
    li.append(a);

    jQuery('#messages').append(li);
});