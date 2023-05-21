const express = require('express'); 
const fs = require('fs');
const morgan = require('morgan')
const filesRouter = require('./test-requests/files');
const logger = require('./middlewares/logger');
const requestTime = require('./middlewares/requestTime')
const app = express(); 
const port = 3000; 

app.use(morgan('combined'));
app.use(express.json());
app.use('/files', filesRouter);
app.use(requestTime);

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
  });

app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (apiKey === '12345') {
        next();
    } else {
        res.status(403).send('Forbidden')
    }
})

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  

app.get('/error', (req, res, next) => {
    next(new Error('Something broke!'));
  });

  app.get('/', (req, res, next) => {
    fs.readFile('/does-not-exist', (err, data) => {
      if (err) {
        logger.error(err.stack)
        next(err);  // Pass errors to Express.
      } else {
        res.send(data);
      }
    });
  });

// List all files
app.get('/files/', (req, res) => {
    fs.readdir('./data', (err, files) => {
      if(err){
          logger.error(err.stack)
          console.log(err);
          res.status(500).send('An Error has occured while reading your directory')
      } else {
          res.json(files);
      }
    })
  });
// Get a specific file
app.get('/files/:filename', (req, res) => {
    fs.readFile(`./data/${req.params.filename}`, 'utf8', (err, data) => {
        if(err) {
            logger.error(err.stack)
            console.log(err); 
            res.status(500).send('An Error has occured while trying to get the filename');
        } else {
            res.send(data);
        }
    })
});

// Add a new file
app.post('/files', (req, res) => {
  const {filename, content} = req.body;

  fs.writeFile(`./data/${filename}`, content, 'utf8', (err) => {
    if(err) {
        logger.error(err.stack)
        console.log(err); 
        res.status(500).send('An Error has occured creating your file');
    } else {
        res.send(`Your file, ${filename} has been created`)
    }
  })
});

// Update a specific file
app.put('/files/:filename', (req, res) => {
  const { content } = req.body; 
  const filename = req.params.filename;

  fs.access(`./data/${filename}`, fs.constants.F_OK, (err) => {
    if (err) {
        logger.error(err.stack)
        console.log(err);
        res.status(404).send("Cannot findfile");
    } else {
        fs.writeFile(`./data/${filename}`, content, 'utf8', (err) => {
            if(err) {
                logger.error(err.stack)
                console.log(err)
                res.status(500).send('An error occurred while writing to the file.');
            } else {
                res.send(`File ${filename} has been updated.`);
            }
        })
    }
  })
});

// Delete a specific file
app.delete('/files/:filename', (req, res) => {
  const filename = req.params.filename; 

  fs.access(`./data/${filename}`, fs.constants.F_OK, (err) => {
    if(err) {
        logger.error(err.stack)
        console.log(err);
        res.status(404).send("Cannot Find File to delete")
    } else {
        fs.unlink(`./data/${filename}`, (err) => {
            if(err) {
                logger.error(err.stack)
                console.log(err)
                res.status(500).send("An Error occured while deleting file")
            } else {
                res.send(`File ${filename} has been deleted.`)
            }
        })
    }
  })


});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});