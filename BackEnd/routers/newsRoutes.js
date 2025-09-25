const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const Sentiment = require('sentiment');

const router = express.Router();
const sentiment = new Sentiment();

router.get('/news-sentiment', async (req, res) => {
    const url = 'https://edition.cnn.com';

    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const headlines = [];
        $('h3.cd__headline').each((i, elm) => {
            headlines.push($(elm).text());
        });

        const results = headlines.map((headline) =>({
            text: headline,
            sentimentScore: sentiment.analyze(headline).score,
        }));

        res.json(results);
    } catch(error) {
        console.error('Error fetching CNN: ', error);
        res.status(500).json({error: error.toString()});
    }
});

module.exports = router;