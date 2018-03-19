var fs = require('fs');
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');

function felix_invoke_tts(input) {
    // declare the parameters
    var params_tts = {
        text: input,
        voice: 'en-US_AllisonVoice',
        accept: 'audio/flac'
    };

    // create a Text to speech object
    var text_to_speech = new TextToSpeechV1 ({
        username: '28a44431-97fa-491f-b75f-267a719146dc',
        password: 'Qa0H5hasvzJM'
    });

    // Pipe the synthesized text to a file.
    text_to_speech.synthesize(params_tts).on('error', function(error) {
        console.log('Error:', error);
    }).pipe(fs.createWriteStream('felix.flac'));

}

// check for call tts function here
if (process.argv.length < 3) {
    console.error("Please pass an argument")
} else {
    var strings = [];
    for (let i = 2; i < process.argv.length; i++) {
        strings.push(String(process.argv[i]))
    }
    felix_invoke_tts(strings.join(" "));
}
