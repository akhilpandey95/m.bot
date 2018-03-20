'use strict';

var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var watson = require('watson-developer-cloud');
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');

var app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

var conversation = new watson.ConversationV1({
  username: process.env.CONVERSATION_USERNAME,
  password: process.env.CONVERSATION_PASSWORD,
  version_date: '2018-02-16'
});

app.post('/api/message', function(req, res) {
  var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
  if (!workspace || workspace === '<workspace-id>') {
    return res.json({
      'output': {
        'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
      }
    });
  }
  var payload = {
    workspace_id: workspace,
    context: req.body.context || {},
    input: req.body.input || {}
  };

  conversation.message(payload, function(err, data) {
    if (err) {
      return res.status(err.code || 500).json(err);
    }
    return res.json(updateMessage(payload, data));
  });
});


function updateMessage(input, response) {
  var responseText = null;
  if (!response.output) {
    response.output = {};
  } else {
    return response;
  }
  if (response.intents && response.intents[0]) {
    var intent = response.intents[0];
    if (intent.confidence >= 0.75) {
      responseText = 'I understood your intent was ' + intent.intent;
    } else if (intent.confidence >= 0.5) {
      responseText = 'I think your intent was ' + intent.intent;
    } else {
      responseText = 'I did not understand your intent';
    }
  }
  response.output.text = responseText;
  return response;
}

function felix_invoke_tts(input) {
    // declare the parameters
    var params_tts = {
        text: input,
        voice: 'en-US_AllisonVoice',
        accept: 'audio/wav'
    };

    // create a Text to speech object
    var text_to_speech = new TextToSpeechV1 ({
        username: '28a44431-97fa-491f-b75f-267a719146dc',
        password: 'Qa0H5hasvzJM'
    });

    // Pipe the synthesized text to a file.
    text_to_speech.synthesize(params_tts).on('error', function(error) {
        console.log('Error:', error);
    }).pipe(fs.createWriteStream('felix.wav'));
}

module.exports = app;
