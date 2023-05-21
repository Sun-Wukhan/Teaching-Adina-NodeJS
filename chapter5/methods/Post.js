const fs = require('fs');

fs.writeFile('../myDirectory/text', 'Henlo Stinky Adina', (err) => {
    if(err) {
        console.log(error)
    } else {
        console.log('File has been made!');
    }
})