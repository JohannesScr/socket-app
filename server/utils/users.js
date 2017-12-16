// [{
//     id: ,
//     name: ,
//     room:
// }]

// add_user (id, name, room)
// remove_user (id)
// get_user (id)
// get_user_list (room)

class Users {
    constructor() {
        this.users = [];
    }

    add_user(id, name, room) {
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    remove_user(id) {
        // return user that was removed
        let user = this.get_user(id);

        if(user) {
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }

    get_user(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    get_user_list(room) {
        // return an array of user names in that room
        let users = this.users.filter((user) => user.room === room);

        return users.map((user) => user.name);
    }
}

module.exports = {
    Users
};

// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     get_user_description () {
//         return `${this.name} is ${this.age} year(s) old.`
//     }
// }
//
// let me = new Person('Johannes', 24);
// console.log(me.name);
// console.log(me.age);
// console.log(me.get_user_description());