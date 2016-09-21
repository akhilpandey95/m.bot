/*
 * felix on messenger
 * Akhil Pandey
 */

const e = require('express');
const r = require('request');
const c = require('./config');
const b = require('body-parser');

var felix = e();

// add the required
felix.use(b.json());
felix.use(b.urlencoded({extended: false}));
felix.listen(c.felix_fb.api_port);

// define the message handlers
function sendMsg (reqId, msg) {
  r({
    url: c.felix_fb.api_url,
    qs: {access_token: c.felix_fb.api_acctkn},
    method: 'POST',
    json: {
      recipient: {id: reqId},
      message: msg,
    }
  }, function(error, response, body) {
    if (error) {
      console.log('Error sending message: ', error);
    } else if (response.body.error) {
      console.log('Error: ', response.body.error);
    }
  });
}

// define the routes now
felix.get('/', function (req, res) {
  res.send('Hello there, this is felix, Cheif Operaional Commandant to Mr Akhil Pandey');
});

//send and receive webhooks
felix.get('/facebook', function (req, res) {
  if(req.query['hub.verify_token'] === c.felix_fb.api_vertkn) {
    res.send(req.query['hub.challenge']);
  }
  else {
    res.send('Invalid token');
  }
});

felix.post('/facebook', function (req, res) {
  var events = req.body.entry[0].messaging;
  for(i = 0; i < events.length; ++i) {
    var event = events[i]
    if((event.message) && (event.message.text)) {
      sendMsg(event.sender.id, {text: "Echo: " + event.message.text});
    }
    else if(event.postback) {
      console.log(JSON.stringify(event.postback));
    }
  }
  res.sendStatus(200);
});
