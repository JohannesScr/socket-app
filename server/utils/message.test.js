let {expect, assert} = require('chai');

let {generate_message, generate_location_message} = require('./message');

describe('generate_message', () => {
    it('should generate a message body', () => {
        let from = 'jenny';
        let text = 'Hi, there';

        let message = generate_message(from, text);

        expect(message).to.be.a('object');
        expect(message).to.deep.include({
            from,
            text
        });
        expect(message.created_at).to.be.a('number');
    });
});

describe('generate_location_message', () => {
    it('should generate correct location object', () => {
        let latitude = -33;
        let longitude = 19;
        let from = 'location';

        let location = generate_location_message(from, latitude, longitude);

        expect(location).to.be.a('object');
        expect(location).to.deep.include({
            from,
            url: `https://www.google.com/maps?q=${latitude},${longitude}`
        });
        expect(location.created_at).to.be.a('number');
    });
});