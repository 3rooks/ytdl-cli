import { google } from 'googleapis';

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.GOOGLE_KEY
});

export const getAllVideosFromChannel = async (channelId) => {
    const videos = [];
    let nextPageToken;

    do {
        const response = await youtube.playlistItems.list({
            playlistId: 'UU' + channelId.substring(2),
            maxResults: 50,
            part: ['snippet'],
            pageToken: nextPageToken
        });

        if (response && response.data && response.data.items) {
            videos.push(...response.data.items);
            nextPageToken = response.data.nextPageToken;
        } else {
            nextPageToken = undefined;
        }
    } while (nextPageToken);

    return videos.map((video) => video.snippet.resourceId.videoId);
};
