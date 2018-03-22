/* This Source Code Form is subject to the terms of the MIT
* License. If a copy of the same was not distributed with this
* file, You can obtain one at
* https://github.com/akhilpandey95/m.bot/blob/master/LICENSE.
*/

const f = require('fs');
const tts = require('watson-developer-cloud/text-to-speech/v1');

module.exports.update_message = () => {
  process.stdout.write(`update the message`);
};

module.exports.text_to_speech = () => {
  process.stdout.write('text to speech');
};
