// https://www.loginradius.com/blog/engineering/guest-post/http-streaming-with-nodejs-and-fetch-api
// https://dev.to/_patrickgod/fetching-millions-of-rows-with-streams-in-node-js-487e
import http from 'http';
import fs from 'fs';
import path from 'path';
import express, { Express, RequestHandler } from 'express';
import cors from 'cors';
const port = 5000;
const app = express();

const OptionsServer = (server: Express): void => {
  //const staticFileMiddleware: RequestHandler = express.static(path.join(__dirname, '../client'));
  server.use(
    cors({
      origin: '*',
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      preflightContinue: true,
      optionsSuccessStatus: 200,
    }),
  );
  server.disable('x-powered-by');
  server.enable('trust proxy');
  //server.use(express.urlencoded());
  server.use(express.json());
  //   server.use(staticFileMiddleware);
};

OptionsServer(app);

const httpServer = http.createServer(app);
let text = path.resolve(__dirname, 'test.text');

app.get('/', (req, res) => {
  //req - readadle stream
  //res - writable stream
  // const stream = fs.createReadStream(text, {
  //   encoding: 'utf-8',
  // });

  // //  is not good work
  // //   stream.on('data', chunk => res.write(chunk));
  // //   stream.on('end', () => res.end());

  // // readable
  // // writable
  // stream.pipe(res);
  res.send('<p>hello</p>');
});

app.post('/', (req, res) => {
  let text1 = path.resolve(__dirname, 'test1.text');
  //req - readadle stream
  //res - writable stream

  const stream = fs.createReadStream(text1, { encoding: 'utf8' });

  //   stream.on('data', chunk => res.write(chunk));
  //   stream.on('end', () => res.end());

  // readable
  // writable
  stream.pipe(res);
});

// https://javascript.plainenglish.io/handling-stream-data-requests-in-nodejs-91746427c103
app.get('/', (req, res) => {
   var filepathToStream=path.join(__dirname, 'leaf.png');

   var readStream = fs.createReadStream(filepathToStream);

   readStream
   .on('open', () => {
       readStream.pipe(res);
   })
   .on('error', (err_msg) => {
       console.log(err_msg);
       res.end(err_msg);
   });
});

app.get('/leaf', (req, res) => {
  var filepathToStream=path.join(__dirname, 'leaf.png');
  var readStream = fs.createReadStream(filepathToStream);
  readStream
  .on('data',(chunk) => {
    res.write(chunk);
  })
  .on('error', (err_msg) => {
    console.log(err_msg);
    res.end(err_msg);
  })
  .on('end', () => {
      res.end();
  });
});

app.get('/download_leaf', (req, res) => {
  var allChunks=[];

  var filepathToStream=path.join(__dirname, 'leaf.png');

  var readStream = fs.createReadStream(filepathToStream);

  readStream
  .on('data', (chunk) => {
    allChunks=allChunks.concat(chunk);
  })
  .on('error', (err_msg) => {
    console.log(err_msg);
    res.end(err_msg);
  })
  .on('end', () => {
      var b64URI = 'data:image/png;base64,' + Buffer.from(allChunks[0]).toString('base64');
      var downloadLink="<a href='"+b64URI+"' download='leaf.png' target='_blank'>Download leaf.png</a>";
      res.send(downloadLink);
  });
});

// ---------

const connectDb = require('./db/connection')
const employeeModel = require('./models/EmployeeModel')
const { Transform } = require('stream')

app.use(express.json())

connectDb()


app.get('/getData', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*')

    const transformData = new Transform({ objectMode: true })
    transformData.isWritten = false

    transformData._transform = function (chunk, encoding, callback) {
        if (!this.isWritten) {
            this.isWritten = true
            callback(null, '[' + JSON.stringify(chunk))
        } else {
            callback(null, ',' + JSON.stringify(chunk))
        }
    }

    transformData._flush = function (callback) {
        callback(null, ']')
    }

    const employees = employeeModel.find().cursor().pipe(transformData)
    employees.pipe(res)
})

// ---------------------

httpServer.listen(port, () => {
  console.dir(`server start http://localhost:${port} `);
});
