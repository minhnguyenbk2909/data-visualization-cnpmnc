module.exports = lastDayofMonth = (month, year) => {
    if (month == 2) {
        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
            return '02-29-' + year
        }
        else return '02-28-' + year
    }

    let day31 = [1, 3, 5, 7, 8, 10, 12]

    if (day31.includes(month)) return (month < 10 ? '0' : '') + month + '-31-' + year

    return (month < 10 ? '0' : '') + month + '-30-' + year
}