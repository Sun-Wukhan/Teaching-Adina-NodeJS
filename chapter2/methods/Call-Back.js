const fs = require('fs'); 


fs.readFile('../text/file.txt', 'utf8', function(err, data) {
    if(err) {
       return console.log('Oh Boy, an error has occured:', err); 
    } else {
        console.log(data);
    }
})