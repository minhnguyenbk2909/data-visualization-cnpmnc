module.exports = function csvToJson(csv) {
    let lines = csv.split(/\r?\n/)
    
    let headers = lines[0].split(',')
    let arr = []
    
    for(let i = 1 ; i < lines.length; i++) {
        let obj = {}
        let current = lines[i].split(',')
        for(let j = 0; j < headers.length; j++)
            obj[headers[j]] = current[j]
        
        arr.push(obj)
    }

    return arr
}