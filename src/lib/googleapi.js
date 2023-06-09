import { ENV } from '#config/env.js';
import { google } from 'googleapis';

const youtube = google.youtube({
    version: 'v3',
    auth: ENV.GOOGLE
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

export const getVideoInfo = async (videoId) => {
    const { data } = await youtube.videos.list({
        part: 'snippet,contentDetails',
        id: videoId
    });

    if (data.items[0].snippet.liveBroadcastContent !== 'none') return;

    const videoInfo = {
        videoId: data.items[0].id,
        title: data.items[0].snippet.title,
        channelId: data.items[0].snippet.channelId,
        channelTitle: data.items[0].snippet.channelTitle,
        description: data.items[0].snippet.description,
        upload: data.items[0].snippet.publishedAt,
        embed: `https://www.youtube.com/embed/${data.items[0].id}`,
        videoUrl: `https://www.youtube.com/watch?v=${data.items[0].id}`
    };

    return videoInfo;
};

export const getChannelInfo = async (channelId) => {
    const { data } = await youtube.channels.list({
        part: 'snippet,statistics',
        id: channelId
    });

    const channelInfo = {
        channelId: data.items[0].id,
        name: data.items[0].snippet.title,
        user: data.items[0].snippet.customUrl || 'undefined',
        channel_url: `https://www.youtube.com/channel/${data.items[0].id}`,
        user_url: `https://www.youtube.com/${data.items[0].snippet.customUrl}`,
        description: data.items[0].snippet.description,
        thumbnails: data.items[0].snippet.thumbnails,
        video_count: data.items[0].statistics.videoCount,
        subscriber_count: data.items[0].statistics.subscriberCount
    };

    return channelInfo;
};
