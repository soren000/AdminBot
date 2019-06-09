module.exports = (date) => {
    let finalString = ``;

    finalString += weekDayObj.short[new Date(date).getUTCDay()] + `, `; // Get the day of the week in name format
    finalString += new Date(date).getUTCDate() + ' '; // Get the day of the month in number format
    finalString += monthNameObj.short[new Date(date).getUTCMonth()] + ', '; // Get the month in name format
    finalString += new Date(date).getUTCFullYear() + ' '; // Get the year
    finalString += new Date(date).getUTCHours().toString().padStart(2, 0) + ':'; // Get the hours
    finalString += new Date(date).getUTCMinutes().toString().padStart(2, 0) + ''; // Get the minutes

    return finalString;
};

let weekDayObj = {
    long: {
        0: 'Sunday',
        1: `Monday`,
        2: `Tuesday`,
        3: `Wednesday`,
        4: `Thursday`,
        5: `Friday`,
        6: `Saturday`
    },
    short: {
        0: 'Sun',
        1: `Mon`,
        2: `Tues`,
        3: `Wed`,
        4: `Thur`,
        5: `Fri`,
        6: `Sat`
    }
}

let monthNameObj = {
    long: {
        0: "January",
        1: "February",
        2: "March",
        3: "April",
        4: "May",
        5: "June",
        6: "July",
        7: "August",
        8: "September",
        9: "October",
        10: "November",
        11: "December"
    },
    short: {
        0: "Jan",
        1: "Feb",
        2: "Mar",
        3: "Apr",
        4: "May",
        5: "June",
        6: "July",
        7: "Aug",
        8: "Sept",
        9: "Oct",
        10: "Nov",
        11: "Dec"
    }
}