var fs = require('fs')
var Utils = {
    File: {
        save: function (fileName, content) {
            return new Promise((resolve, reject) => {
                fs.writeFile(fileName, content, function (err) {
                    if (err) reject(err)
                    var statusText = 'write file > ' + fileName + ' success'
                    log(statusText)
                    resolve(statusText)
                })
            })
        }
    }
}
module.exports = Utils