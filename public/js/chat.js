var socket = io();

function scroll_to_bottom() {
    // selectors
    var messages = jQuery('#messages');
    var new_message = messages.children('li:last-child');

    // heights
    var client_height = messages.prop('clientHeight');
    var scroll_top = messages.prop('scrollTop');
    var scroll_height = messages.prop('scrollHeight');
    var new_message_height = new_message.innerHeight();
    var last_message_height = new_message.prev().innerHeight();

    if (client_height + scroll_top + new_message_height + last_message_height >= scroll_height) {
        messages.scrollTop(scroll_height);
    }
}

socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = "/";
        } else {
            console.log('No error on join');
        }
    });

    // var body = {
    //     from: 'jen@example.com',
    //     text: 'I prefer burgers'
    // };
    //
    // // emitter
    // socket.emit('create_message', body);
});

socket.on('disconnect', function () {
    console.log('Disconnecting from server');
});

socket.on('update_user_list', function (users) {
    let ol = jQuery('<ol></ol>');

    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

// listener
socket.on('new_message', function (message) {
    var formatted_time = moment(message.created_at).format('h:mm a');
    var template = jQuery('#message-template').html();

    var html = Mustache.render(template, {
        from: message.from,
        created_at: formatted_time,
        text: message.text
    });

    jQuery('#messages').append(html);

    scroll_to_bottom();

    // var formatted_time = moment(message.created_at).format('h:mm a');
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formatted_time}: ${message.text}`);
    //
    // jQuery('#messages').append(li);
});

// submit send
jQuery('#message-form').on('submit', function (event) {
    event.preventDefault();  // prevent default submit event

    var message_text_box = jQuery('[name=message]');

    var message = {
        text: message_text_box.val()
    };

    socket.emit('create_message', message, function () {
        message_text_box.val('')
    });
});

// send location button
// var location_button = jQuery('#send-location');
var location_button = document.getElementById('send-location');

// click send location
function send_location() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    location_button.setAttribute('disabled', 'disabled');
    location_button.innerText = 'Sending location...';

    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);

        var location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        socket.emit('create_location_message', location);

        location_button.removeAttribute('disabled');
        location_button.innerText = 'Send location';
    }, function () {
        alert('Unable to fetch location');
        location_button.removeAttribute('disabled');
        location_button.innerText = 'Send location';
    });
}

// location_button.on('click', function() {
//     location_button.text('Waddup');
// });

socket.on('new_location_message', function (location_message) {
    var formatted_time = moment(location_message.created_at).format('h:mm a');
    var template = jQuery('#location-message-template').html();

    var html = Mustache.render(template, {
        from: location_message.from,
        created_at: formatted_time,
        url: location_message.url
    });

    jQuery('#messages').append(html);

    scroll_to_bottom();

    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    //
    // li.text(`${location_message.from} ${formatted_time}: `);
    // a.attr('href', location_message.url);
    // li.append(a);
    //
    // jQuery('#messages').append(li);
});