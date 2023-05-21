const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

async function read() {
    try {
        const data = await readFile('../text/file.txt', 'utf8')
        console.log(data);
    } catch (err) {
        console.log(error);
    }
}

read();