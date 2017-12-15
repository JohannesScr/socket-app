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
    var formatted_time = moment(message.created_at).format('h:mm a');
    var li = jQuery('<li></li>');
    li.text(`${message.from} ${formatted_time}: ${message.text}`);

    jQuery('#messages').append(li);
});

// submit send
jQuery('#message-form').on('submit', function(event) {
    event.preventDefault();  // prevent default submit event

    var message_text_box = jQuery('[name=message]');

    var message = {
        from: 'User',
        text: message_text_box.val()
    };

    socket.emit('create_message', message, function() {
        message_text_box.val('')
    });
});

// send location button
// var location_button = jQuery('#send-location');
var location_button = document.getElementById('send-location');

// click send location
function send_location() {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    location_button.setAttribute('disabled', 'disabled');
    location_button.innerText = 'Sending location...';

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);

        var location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        socket.emit('create_location_message', location);

        location_button.removeAttribute('disabled');
        location_button.innerText = 'Send location';
    }, function() {
        alert('Unable to fetch location');
        location_button.removeAttribute('disabled');
        location_button.innerText = 'Send location';
    })
}
// location_button.on('click', function() {
//     location_button.text('Waddup');
// });

socket.on('new_location_message', function(location_message) {
    console.log('New message', location_message);
    var formatted_time = moment(location_message.created_at).format('h:mm a');
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${location_message.from} ${formatted_time}: `);
    a.attr('href', location_message.url);
    li.append(a);

    jQuery('#messages').append(li);
});