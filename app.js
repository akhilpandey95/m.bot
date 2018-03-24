/* This Source Code Form is subject to the terms of the MIT
* License. If a copy of the same was not distributed with this
* file, You can obtain one at
* https://github.com/akhilpandey95/m.bot/blob/master/LICENSE.
*/

const f = require('fs');
const h = require('http');
const e = require('express');
const c = require('cluster');
const cf = require('./config');
const bp = require('body-parser');
const md = require('./modules/main');
const nc = require('os').cpus().length;
const cnv = require('./modules/conversation');
const wdc = require('watson-developer-cloud');
const tts = require('watson-developer-cloud/text-to-speech/v1');

// start the cluster for the application
if (c.isMaster) {
  process.stdout.write(`the master node ${process.pid} is up\n`);

  // create 'n' worker nodes
  for (let i = 0; i < nc; i++) {
    c.fork();
  }

  // create a new node on failure/exit
  c.on('exit', (worker, code, signal) => {
    process.stdout.write(`the worker node ${worker.process.pid} is no more\n`);
    c.fork();
  });
} else {
  // create an express router
  let app = e();
  let router = e.Router();
  let port = cf.main_application.app_port || 3000;

  // bind the assets
  app.use(e.static('./public'));
  app.use(bp.json());

  // write the API rules
  router.post('/api/message', (req, res) => {
    cnv.send_message_to_watson(req.body.input, req.body.input, res);
  });

  router.post('/api/fileUpload', (req, res) => {
    process.stdout.write(`TBA`);
  });

  router.post('/api/tts', (req, res) => {
    md.text_to_speech(req.body.input);
  });

  // mount the router
  app.use('/', router);

  // create and start the server
  h.createServer(app).listen(port, () => {
    process.stdout.write(`Felix master node is up on port 3000, pid: ${process.pid}\n`);
  });
}
