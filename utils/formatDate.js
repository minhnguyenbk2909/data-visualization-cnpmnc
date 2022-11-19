module.exports = function formatDate (day, month , year) {
    let monthStr = ''
        ,dayStr = ''
    month = parseInt(month)
    day = parseInt(day) 
    if(month < 10) monthStr = `0${month}`
    if(day < 10) dayStr = `0${day}`
    return `${monthStr}-${dayStr}-${year}`
}

