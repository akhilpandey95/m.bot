/*
* news API for felix
* Akhil Pandey
*/

const https = require('https');
const config = require('../config');

module.exports.nearestSource = (foo) => {
    if (typeof foo == 'string') {
        console.log(foo)
    } else {
        return false
    }
}

module.exports.fetchArticles = () => {
    return new Promise((resolve, reject) => {
        let options = {
            host    : config.newsapi.api_url,
            path    : "/v1/articles?source=the-next-web",
            headers : {"X-Api-Key": config.newsapi.api_key}
        };

        let request = https.get(options, (res) => {
            if (res.statusCode === 200) {
                let body = '';

                res.on('data', (chunk) => {
                    body += chunk;
                });

                res.on('end', () => {
                    resolve(JSON.parse(body));
                });
            } else {
                reject(new Error(res.statusCode + ': ' + res.statusMessage));
            }
        });

        request.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports.fetchSources = () => {
    return new Promise((resolve, reject) => {
        let options = {
            host    : config.newsapi.api_url,
            path    : "/v1/sources?language=en"
        };

        let request = https.get(options, (res) => {
            if (res.statusCode === 200) {
                let body = '';

                res.on('data', (chunk) => {
                    body += chunk;
                });

                res.on('end', () => {
                    resolve(JSON.parse(body));
                });
            } else {
                reject(new Error(res.statusCode + ': ' + res.statusMessage));
            }
        });

        request.on('error', (err) => {
            reject(err);
        });
    });
}
