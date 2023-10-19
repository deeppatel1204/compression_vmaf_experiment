const child_process = require('child_process');
const fs = require('fs');
const util = require('util');
const exec = util.promisify(child_process.exec);

async function calculateVMAF(postInfo) {
    inputFilePath = postInfo["convertedPath"];
    referenceFilePath = postInfo["downloadPath"];
    try {
        // FFmpeg command for VMAF
        const vmafCommand = `ffmpeg -i ${inputFilePath} -i ${referenceFilePath} -filter_complex "[0:v]scale=720:1280:flags=bicubic,fps=30,setpts=PTS-STARTPTS[main];[1:v]scale=720:1280:flags=bicubic,format=yuv420p,fps=30,setpts=PTS-STARTPTS[ref];[main][ref]libvmaf=psnr=1:phone_model=1:log_fmt=json:n_threads=4:log_path=vmaf.json" -f null -`;

        // Execute the VMAF command
        const { stdout: vmafOutput, stderr: vmafError } = await exec(vmafCommand);
        
        // Load the VMAF JSON data
        const vmafJson = JSON.parse(fs.readFileSync('vmaf.json', 'utf8'));

        if (vmafJson.frames && vmafJson.frames.length > 0) {
            const psnrScore = vmafJson.pooled_metrics.psnr_y.mean;
            const vmafScore = vmafJson.pooled_metrics.vmaf.mean;
            postInfo["psnrScore"] = psnrScore;
            postInfo["vmafScore"] = vmafScore;
            console.log(`VMAF Score: ${vmafScore}`);
        } else {
            console.log('VMAF score not found in the JSON log file.');
        }
        
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

module.exports = { calculateVMAF };
