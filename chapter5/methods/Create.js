const fs = require('fs'); 

fs.mkdir('../myDirectory', { recursive: true }, (err) => {
    if(err) throw err; 
})