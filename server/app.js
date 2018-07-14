const express = require('express');
const rp = require('request-promise');
const lodash = require('lodash');
const app = express();

app.get('/', async (req, res) => {
    let memes;
    do {
        memes = await getMemes(subRedditsList[lodash.random(0, subRedditsList.length - 1, false)]);
    } while (lodash.isEmpty(memes))
    const memeUrl = memes[lodash.random(0, memes.length - 1, false)];
    console.log(memeUrl);
    
    const ext = memeUrl.split('.').pop();
    switch (ext)
    {
        case 'gifv':
            res.send(`<img src="https://www.macmillandictionary.com/external/slideshow/full/Goose_full.jpg">`);
            break;
        case 'gif':
            res.send(await rp.get({
                uri: memeUrl
            }));
            break;
        default:
            res.send(`<img src="${memeUrl}">`);
            break;
    }
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