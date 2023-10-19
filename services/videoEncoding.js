const child_process = require('child_process');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(child_process.exec);
const path = require('path');

async function videoEncoding(postInfo){
    const outputPath = path.join(postInfo["convertedDirectory"], postInfo["convertedFileName"]);
    postInfo["convertedPath"] = outputPath;
    const command = `ffmpeg -i ${postInfo.downloadPath} ${outputPath}`;
    const { stdout, stderr } = await exec(command); 
}

module.exports = {videoEncoding};