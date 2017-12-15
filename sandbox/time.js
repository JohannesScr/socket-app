const moment = require('moment');

// Unix epic
// Jan 1st 1970 00:00:00 am
// Stored in milliseconds
// 1000 = 1 sec

// JavaScript
let timestamp = new Date();
console.log(timestamp.toDateString() + ' ' + timestamp.toTimeString());

// Moment
let date = moment();
console.log(date.format('DD MMM YYYY'));

function format_date(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

console.log(format_date(timestamp));