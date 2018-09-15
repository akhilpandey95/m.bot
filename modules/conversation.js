/* This Source Code Form is subject to the terms of the MIT
* License. If a copy of the same was not distributed with this
* file, You can obtain one at
* https://github.com/akhilpandey95/m.bot/blob/master/LICENSE.
*/

const f = require('fs');
const m = require('./main');
const c = require('../config');

/*
 * @param1: input [string]
 * @param2: input [string]
 *
 * returns: JSON response [? : "success" : "fail"]
 */
let send_message = (input, response) => {
    let json = require('./template.json');
    return response.json(json);
}

// export the modules
module.exports = {
    send_message: send_message
}
