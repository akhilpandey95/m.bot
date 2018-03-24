/* This Source Code Form is subject to the terms of the MIT
* License. If a copy of the same was not distributed with this
* file, You can obtain one at
* https://github.com/akhilpandey95/m.bot/blob/master/LICENSE.
*/

const f = require('fs');
const m = require('./main');
const c = require('../config');
const w = require('watson-developer-cloud');

let list_dialog_nodes = () => {
    // declare the parameters
    let params_conv = {
        workspace_id: c.watson_assistant.watson_wid
    };

    // create a assistant object
    let assistant = new w.AssistantV1({
        username: c.watson_assistant.cnv_uname,
        password: c.watson_assistant.cnv_pwd,
        version: '2018-02-16'
    });

    // list the total dialog nodes
    assistant.listDialogNodes(params_conv, (err, response) => {
        if (err) {
            process.stdout.write(`${err}`);
        } else {
            return JSON.stringify(response, null, 2);
        }
    });
}

/*
 * @param1: input [string]
 * @param2: input [string]
 *
 * returns: JSON response [? : "success" : "fail"]
 */
let send_message_to_watson = (context, input, response) => {
  // declare the parameters
  let workspace = c.watson_assistant.watson_wid || '<workspace-id>';

  // create a assistant object
  let assistant = new w.AssistantV1({
      username: c.watson_assistant.cnv_uname,
      password: c.watson_assistant.cnv_pwd,
      version: '2018-02-16'
  });

  if (!workspace || workspace === '<workspace-id>') {
    return response.json({
      'output': {
        'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' + '<a href="https://github.com/watson-developer-cloud/assistant-simple">README</a> documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/watson-developer-cloud/assistant-simple/blob/master/training/car_workspace.json">here</a> in order to get a working application.'
      }
    });
  }

  let payload_params = {
    workspace_id: workspace,
    context: context || {},
    input: input || {}
  };

  assistant.message(payload_params, (err, data) => {
    if (err) {
      return response.status(err.code || 500).json(err);
    }
    return response.json(m.update_message(payload_params, data));
  });
}

// export the modules
module.exports = {
  list_dialog_nodes: list_dialog_nodes,
  send_message_to_watson: send_message_to_watson
}
