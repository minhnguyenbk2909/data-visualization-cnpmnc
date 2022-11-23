module.exports = {
    lastDayofMonth: (month, year) => {
        monthInt = parseInt(month)
        if (monthInt == 2) {
            if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                return '02-29-' + year
            }
            else return '02-28-' + year
        }

        let day31 = [1, 3, 5, 7, 8, 10, 12]

        if (day31.includes(monthInt)) return (monthInt < 10 ? '0' : '') + month + '-31-' + year

        return (monthInt < 10 ? '0' : '') + month + '-30-' + year
    },

    formatDate: (day, month, year) => {
        let monthStr = ''
            , dayStr = ''
        month = parseInt(month)
        day = parseInt(day)
        if (month < 10) monthStr = `0${month}`
        if (day < 10) dayStr = `0${day}`
        return `${monthStr}-${dayStr}-${year}`
    },

    isMonth: month => {
        const arr = [...Array(12).keys()].map(x => x + 1) 
        return arr.includes(parseInt(month)) ? true : false
    },

    isYear: year => {
        let n = 0;
        year = parseInt(year)

        while (year > 0) {
            year = Math.floor(year / 10)
            n++;
        }

        return n === 4 ? true : false
    }

}