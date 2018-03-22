/* This Source Code Form is subject to the terms of the MIT
* License. If a copy of the same was not distributed with this
* file, You can obtain one at
* https://github.com/akhilpandey95/m.bot/blob/master/LICENSE.
*/

const f = require('fs');
const e = require('express');
const c = require('cluster');
const bp = require('body-parser');
const cp = require('cookie-parser');
const md = require('./modules/modules')
const nc = require('os').cpus().length;
const wdc = require('watson-developer-cloud');
const tts = require('watson-developer-cloud/text-to-speech/v1');

if (c.isMaster) {
  process.stdout.write(`the master node ${process.pid} is up`);

  for (let i = 0; i < nc; i++) {
    c.fork();
  }

  c.on('exit', (worker, code, signal) => {
    process.stdout.write(`the worker node ${worker.process.pid} is no more\n`);
    c.fork();
  });
} else {
  let app = e();
  let router = e.Router();
  let port = process.env.port || 3000;

  app.use(e.static('./public'));
  app.use(bp.json());

  let conversation = new watson.ConversationV1({
    username: process.env.CONVERSATION_USERNAME,
    password: process.env.CONVERSATION_PASSWORD,
    version_date: '2018-02-16'
  });

  router.post('/api/message', (req, res) => {
    md.update_message(req.input, res);
  });

  router.post('/api/fileUpload', (req, res) => {
    console.log("TBA")
  });

  router.post('/api/tts', (req, res) => {
    md.text_to_speech(req.input);
  });

  app.use('/', router);

  h.createServer(app).listen(port, () => {
    process.stdout.write(`Felix master node is up on port 3000, pid: ${process.pid}`);
  });
}
