/* This Source Code Form is subject to the terms of the MIT
* License. If a copy of the same was not distributed with this
* file, You can obtain one at
* https://github.com/akhilpandey95/m.bot/blob/master/LICENSE.
*/

const f = require('fs');
const c = require('../config');
const tts = require('watson-developer-cloud/text-to-speech/v1');

/*
 * @param1: input [string]
 * @param2: response [JSON]
 *
 * returns: JSON object
 */
module.exports.update_message = (input, response) => {
  // create a response JSON structure
  let res_text = null;

  if (!response.output) {
    response.output = {};
  } else {
    return response;
  }

  // extract the intent and the confidence
  if (response.intents && response.intents[0]) {
    let intent = response.intents[0];

    if (intent.confidence >= 0.75) {
      res_text = 'I am sure your intent was ' + intent.intent;
    } else if (intent.confidence >= 0.5) {
      res_text = 'I guess your intent was ' + intent.intent;
    } else {
      res_text = 'I do not understand your intent';
    }
  }

  // return the response
  response.output.text = res_text;
  return response;
};

/*
 * @param1: input [string]
 *
 * returns: file stream [? : "success" : "fail"]
 */
module.exports.text_to_speech = (input) => {
  // declare the parameters
  let params_tts = {
      text: input,
      voice: c.text_to_speech.tts_voice,
      accept: 'audio/wav'
  };

  // create a Text to speech object
  let text_to_speech = new tts ({
      username: c.text_to_speech.tts_uname,
      password: c.text_to_speech.tts_pwd
  });

  // Pipe the synthesized text to a file.
  text_to_speech.synthesize(params_tts).on('error', (error) => {
      console.log('Error:', error);
      return "fail"
  }).pipe(f.createWriteStream('felix.wav'));

  return "success"fs
};
