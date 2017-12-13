let {expect, assert} = require('chai');

let {generate_message} = require('./message');

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
        expect(message.created_at).to.be.a('string');
    });
});
