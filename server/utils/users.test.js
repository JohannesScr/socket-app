const {expect} = require('chai');

const {Users} = require('./users');

describe('Users', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: 1,
                name: 'Mike',
                room: 'Node Course'
            },
            {
                id: 2,
                name: 'Jenny',
                room: 'React Course'
            },
            {
                id: 3,
                name: 'Julie',
                room: 'Node Course'
            },
        ]
    });

    it('should add a new user', () => {
        let users = new Users();
        let user = {
            id: 123,
            name: 'Johannes',
            room: 'The office fans'
        };
        let res_user = users.add_user(user.id, user.name, user.room);

        expect(users.users).to.deep.equal([user]);
    });

    it('should return names for Node Course', () => {
        let user_list = users.get_user_list('Node Course');

        expect(user_list).to.deep.equal(['Mike', 'Julie']);
    });

    it('should return names for React Course', () => {
        let user_list = users.get_user_list('React Course');

        expect(user_list).to.deep.equal(['Jenny']);
    });

    it('should return the name of the user for its id', () => {
        let user = users.get_user(2);

        expect(user).to.deep.equal({
            id: 2,
            name: 'Jenny',
            room: 'React Course'
        });
    });

    it('should remove a user from the users array', () => {
        let user = users.remove_user(1);
        let user_list_node = users.get_user_list('Node Course');
        let user_list_react = users.get_user_list('React Course');

        expect(user).to.deep.equal({
            id: 1,
            name: 'Mike',
            room: 'Node Course'
        });
        expect(user_list_node).to.deep.equal(['Julie']);
        expect(user_list_react).to.deep.equal(['Jenny']);
    });

    it('should not remove a user from the users array', () => {
        let user = users.remove_user(44);
        let user_list_node = users.get_user_list('Node Course');
        let user_list_react = users.get_user_list('React Course');

        expect(user_list_node).to.deep.equal(['Mike', 'Julie']);
        expect(user_list_react).to.deep.equal(['Jenny']);
    });
});
