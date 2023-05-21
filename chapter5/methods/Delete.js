const fs = require('fs'); 

fs.unlink('../myDirectory/text', (err) => {
    if(err) throw err;
    console.log('I have deleted the file');
})