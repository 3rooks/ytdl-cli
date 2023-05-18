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
            for (const item of response.data.items) {
                const video = item.snippet;
                const videoResponse = await youtube.videos.list({
                    id: video.resourceId.videoId,
                    part: ['snippet']
                });

                if (
                    videoResponse &&
                    videoResponse.data &&
                    videoResponse.data.items
                ) {
                    const videoItem = videoResponse.data.items[0];
                    if (videoItem.snippet.liveBroadcastContent === 'none') {
                        videos.push(video.resourceId.videoId);
                    } else continue;
                }
            }
            nextPageToken = response.data.nextPageToken;
        } else {
            nextPageToken = undefined;
        }
    } while (nextPageToken);

    return videos;
};
