const axios = require('axios');
const path = require('path');
const fs = require('fs');

async function downloadVideo(postInfo) {
    try {
        const response = await axios({
            method: 'get',
            url: postInfo["inputURL"],
            responseType: 'stream',
        });

        const outputPath = path.join(postInfo["downloadDirectory"], postInfo["downloadFileName"]);

        if (!fs.existsSync(postInfo["downloadDirectory"])) {
            fs.mkdirSync(postInfo["downloadDirectory"], { recursive: true });
        }

        const writer = fs.createWriteStream(outputPath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                postInfo["downloadPath"] = outputPath; 
                resolve(outputPath);
            });
            writer.on('error', reject);
        });
    } catch (error) {
        console.error('Error downloading the video:', error.message);
    }
}

module.exports = { downloadVideo };
