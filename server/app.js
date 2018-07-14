const express = require('express');
const rp = require('request-promise');
const lodash = require('lodash');
const app = express();

app.get('/', async (req, res) => {
    let memes;
    do {
        memes = await getMemes('https://www.reddit.com/r/all.json');
    } while (lodash.isEmpty(memes))
    const memeUrl = memes[lodash.random(0, memes.length - 1, false)];
    console.log(memeUrl);
    const ext = memeUrl.match(/[.]\w+/i);
    switch (ext)
    {
        case '.gif':
        case '.gifv':
            res.send(await rp.get({
                uri: memeUrl
            }));
            break;
        default:
            res.send(`<div style="background:url(${memeUrl}); width: 10000px;height: 10000px;"></div>`);
            break;
    }
    
    // const meme = await rp.get({
    //     uri: memeUrl
    // })
    // if (lodash.isBuffer)
    // {
    //     res.write(meme);
    // }
    // else
    // {
    //     res.send(meme);
    // }
})
const subRedditsList = [
    'https://www.reddit.com/r/all.json',
    'https://www.reddit.com/r/uwaterloo.json'
]
const domainsWhitelist = ['i.imgur.com', 'i.redd.it']
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