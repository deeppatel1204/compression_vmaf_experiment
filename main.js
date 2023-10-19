const {readDatasetFile} = require('./services/readDataset');
const {downloadVideo} = require('./services/downloaVideo');
const {getVideoDimension} = require('./services/videoDimention');
const {videoEncoding} = require('./services/videoEncoding');
const {calculateVMAF} = require('./services/vmafCalculation');
const {removeFilesFromDirectory} = require('./services/cleanDirectory');
const {writedatacsv} = require('./services/writeData');
require('dotenv').config();

async function start(){
    try{
        const csvFilePath = 'dataset.csv'; 
        const results = await readDatasetFile(csvFilePath);
        const postInfo = {
            downloadDirectory: process.env.DOWNLOAD_DIRECTORY,
            convertedDirectory: process.env.CONVERTED_DIRECTORY,
            downloadFileName: process.env.DOWNLOAD_FILE_NAME,
            convertedFileName: process.env.CONVERTED_FILE_NAME
        };

        for(data of results){
            postInfo["postId"] = data.postId;
            postInfo["inputURL"] = data.inputURL;
            postInfo["inputVideoBitrate"] = data.inputVideoBitrate;
            postInfo["codecName"] = data.codecName;

            const downloadPath = await  downloadVideo(postInfo)
            postInfo["originalVideoDimention"] = await getVideoDimension(postInfo,downloadPath);
            await videoEncoding(postInfo);
            postInfo["convertedVideoDimention"] = await getVideoDimension(postInfo,postInfo["convertedPath"]);
            await calculateVMAF(postInfo);
            await writedatacsv(postInfo);
            await removeFilesFromDirectory(postInfo.downloadDirectory);
            await removeFilesFromDirectory(postInfo.convertedDirectory);
        }
    }
    catch(err){
        console.log(err);
    }
   
}

start();