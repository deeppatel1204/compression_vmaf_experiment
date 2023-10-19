const ffmpeg = require('fluent-ffmpeg');
const util = require('util');
const ffprobe = util.promisify(ffmpeg.ffprobe);
const fs = require('fs');

async function getVideoDimension(postInfo,filePath) {
    return new Promise(async (resolve, reject) => {
        videoDimantions = {};
        try {
            const videoPath = filePath;
            const metadata = await ffprobe(videoPath);
            const streams = metadata.streams;
            const videoStream = streams.find((stream) => stream.codec_type === 'video');

            if (videoStream) {
                videoDimantions["width"] = videoStream.width;
                videoDimantions["height"] = videoStream.height;
                videoDimantions["rotation"] = videoStream.rotation;
                videoDimantions["nbFrames"] = videoStream.nb_frames;
                videoDimantions["videoDuration"] = videoStream.duration;
                videoDimantions["frameRate"] = videoStream.r_frame_rate;
                videoDimantions["videoBitrate"] = videoStream.bit_rate;
                videoDimantions["codecName"] = videoStream.codec_name;

                resolve(videoDimantions);
            } else {
                console.log('No video stream found in the video.');
                reject('No video stream found in the video');
            }
        } catch (err) {
            console.error('Error reading video metadata:', err);
            reject(err);
        }
        return videoDimantions;
    });
}

module.exports = {getVideoDimension}