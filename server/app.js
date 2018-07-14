const express = require('express');
const rp = require('request-promise');
const lodash = require('lodash');
const app = express();

app.get('/', async (req, res) => {
    let memes;
    do {
        memes = await getMemes('https://www.reddit.com/r/all.json');
    } while (lodash.isEmpty(memes))

    res.send(memes[lodash.random(0, memes.length - 1, false)]);
})
const domainsWhitelist = ['i.imgur.com', 'imgur.com', 'v.redd.it', 'i.redd.it']
const getMemes = async function(uri) {
    const redditJSON = await rp.get({
        uri,
        json: true
    });
    return lodash.compact(lodash.map(redditJSON.data.children, (post) => {
        if (domainsWhitelist.includes(post.data.domain))
        return post.data.url;
    }));
}

app.listen(8081);