const express = require('express');
const ytdl = require('ytdl-core');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello Universe');
});

app.get('/download/:yturl', async (req, res) => {
    const yturl = req.params.yturl;

    try {
        const info = await ytdl.getInfo(yturl);
        const videoStream = ytdl(yturl, { quality: 'highestvideo' });

        res.header('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);
        videoStream.pipe(res);
    } catch (error) {
        res.status(500).send(`An error has occurred: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
