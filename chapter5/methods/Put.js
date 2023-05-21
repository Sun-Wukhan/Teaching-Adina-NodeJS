const fs = require('fs')

fs.writeFile('../myDirectory/text', 'Adina is not a stinky', (err) => {
    if(err) throw err; 
    console.log('File has been updated!');
})