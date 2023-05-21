const fs = require('fs'); 

fs.readFile('../myDirectory/text', 'utf8', (err, data) => {
    data ? console.log(data) : console.log(err)
})