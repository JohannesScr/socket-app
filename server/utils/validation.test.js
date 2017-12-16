let {expect} = require('chai');

let {is_real_string} = require('./validation');

describe('Validation', () => {
    it('should reject non-string values', () => {
        let string_one = {name: 'john'};
        let string_two = true;
        let string_three = 1234;

        expect(is_real_string(string_one)).to.equal(false);
        expect(is_real_string(string_two)).to.equal(false);
        expect(is_real_string(string_three)).to.equal(false);
    });

    it('should reject strings with only spaces', () => {
        let string = '    ';

        expect(is_real_string(string)).to.equal(false);
    });

    it('should allows strings with non-spaces characters', () => {
        let string = '  Lord of the rings  ';

        expect(is_real_string(string)).to.equal(true);
    });
});