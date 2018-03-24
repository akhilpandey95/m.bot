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
 *
 * returns: file stream [? : "success" : "fail"]
 */
let text_to_speech = (input) => {
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

  return "success";
};

// export the modules
module.exports = {
  text_to_speech: text_to_speech
}
