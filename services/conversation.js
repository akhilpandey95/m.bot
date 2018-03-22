/* This Source Code Form is subject to the terms of the MIT
* License. If a copy of the same was not distributed with this
* file, You can obtain one at
* https://github.com/akhilpandey95/m.bot/blob/master/LICENSE.
*/

const fs = require('fs');
const config = require('../config');
const watson = require('watson-developer-cloud');

function felix_invoke_assistant() {
    // declare the parameters
    var params_conv = {
        workspace_id: '5ed8e5b2-c19a-4f8b-83ba-26772c2abd01',
    };

    // create a assistant object
    var assistant = new watson.AssistantV1({
        username: '30354774-4d4c-47cc-9587-ee045533d40f',
        password: 'PvrAKXNOWOA8',
        version: '2018-02-16'
    });

    // list the total dialog nodes
    assistant.listDialogNodes(params_conv, function(err, response) {
        if (err) {
            console.error(err);
        } else {
            console.log(JSON.stringify(response, null, 2));
        }
    });
}

// check for call tts function here
felix_invoke_assistant();
