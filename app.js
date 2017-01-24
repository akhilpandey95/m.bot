ssh /*
* felix on messenger
* Akhil Pandey
*/

const h = require('http')
const e = require('express');
const r = require('request');
const c = require('./config');
const b = require('body-parser');
const cr = require('crypto');

var felix = e();

// add the required
felix.set('port', c.felix_fb.api_port);
felix.use(b.json({verify: verifyRequestSignature}));

const SER_URL    = c.felix_fb.api_url;
const ACC_TOKEN  = c.felix_fb.api_acctkn;
const VAL_TOKEN  = c.felix_fb.api_vertkn;
const APP_SECRET = c.felix_fb.api_secret;

if(!(APP_SECRET && VAL_TOKEN && ACC_TOKEN && SER_URL)) {
    process.exit(1);
}

// define the message handlers
function sendMsg (reqId, msg) {
    var msgData = {
        recipient: {
            id: reqId
        },
        message: {
            text: msg,
            metadata: "DEV_META_DATA"
        }
    };

    callSendAPI(msgData);
}

function sendReportMessage(recipientId) {
    var msgData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: "Hello master Akhil, good to see you",
            metadata: "DEV_META_DATA"
        }
    };

    console.log(recipientId)
}


function callSendAPI(msgData) {
    r({
        uri: c.felix_fb.api_url,
        qs: {access_token: ACC_TOKEN},
        method: 'POST',
        json: msgData
    }, function (err, res, body) {
        if(!err && res.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            if(messageId) {
                console.log("Message sent to %s", recipientId)
            } else {
                console.log("Called the send Send API method for %s", recipientId)
            }
        } else {
            console.error("Failed calling the Send API", res.statusCode, res.statusMessage)
        }
    });
}

function verifyRequestSignature(req, res, buf) {
    var signature = req.headers['x-hub-signature'];

    if(!signature) {
        console.error("Couldn't validate the signature")
    } else {
        var elements = signature.split('=')
        var method = elements[0];
        var signatureHash = elements[1];
        var expectedHash = cr.createHmac('sha1', APP_SECRET).update(buf).digest('hex');

        if(signatureHash != expectedHash) {
            throw new Error("Couldn't validate the signature");
        }
    }
}

function receiveMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log(JSON.stringify(message));

    var isEcho = message.is_echo;
    var messageId = message.mid;
    var appId = message.app_id;
    var metadata = message.metadata;
    var messageText = message.text;
    var messageAttachments = message.attachments;
    var quickReply = message.quick_reply;

    if(isEcho) {
        console.log(messageId)
        sendMsg(senderID, "hello there i've heard you");
    } else if(quickReply) {
        var quickReplyPayload = quickReply.payload;
        sendMsg(senderID, "Quick thing tapped")
        return;
    }

    if(messageText) {
        switch (messageText) {
            case 'report' :
            sendReportMessage(senderID)
            break;

            default:
            sendMsg(senderID, messageText);
        }
    } else if (messageAttachments) {
        sendTextMessage(senderID, "okay");
    }
}

// define the routes now
felix.get('/', function (req, res) {
    res.send('Hello there, this is felix, Cheif Operaional Commandant to Mr Akhil Pandey');
});

//send and receive webhooks
felix.get('/facebook', function (req, res) {
    if(req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === VAL_TOKEN) {
        res.status(200).send(req.query['hub.challenge']);
    }
    else {
        console.error("Failed to validate the token")
        res.sendStatus(403);
    }
});

felix.post('/facebook', function (req, res) {
    var data = req.body;

    if(data.object == 'page') {
        data.entry.forEach(function (pageEntry) {
            var pageID = pageEntry.id;
            var timeOfEvent = pageEntry.time;

            pageEntry.messaging.forEach(function (messagingEvent) {
                if(messagingEvent.message) {
                    receiveMessage(messagingEvent)
                }
            })
        })
        res.sendStatus(200);
    }
});

felix.listen(felix.get('port'), function() {
    console.log("running node app");
});

module.exports = felix;
