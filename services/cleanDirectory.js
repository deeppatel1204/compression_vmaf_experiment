const fs = require('fs').promises;
const path = require('path');

async function removeFilesFromDirectory(directoryPath) {
    try {

        const files = await fs.readdir(directoryPath);
        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            await fs.unlink(filePath);
        }
    } catch (error) {
        console.error('Error removing files:', error);
    }
}

module.exports = {removeFilesFromDirectory};

