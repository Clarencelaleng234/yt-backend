const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const API_KEY = "YOUR_YOUTUBE_API_KEY";
const CHANNEL_HANDLE = "clarencexploits";

app.get("/api/stats", async (req, res) => {
    const channelRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics,contentDetails&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`
    );

    const channel = (await channelRes.json()).items[0];
    const uploads = channel.contentDetails.relatedPlaylists.uploads;

    const videoRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploads}&maxResults=1&key=${API_KEY}`
    );

    const video = await videoRes.json();

    res.json({
        subs: channel.statistics.subscriberCount,
        views: channel.statistics.viewCount,
        latest: video.items[0].snippet.resourceId.videoId
    });
});

app.listen(3000);
