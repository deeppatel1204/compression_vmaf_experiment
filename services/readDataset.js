const fs = require('fs');
const csv = require('csv-parser');

async function readDatasetFile(csvFilePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    const stream = fs.createReadStream(csvFilePath);

    stream.on('error', (error) => {
      reject(error);
    });

    stream
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        resolve(results);
      });
  });
}

module.exports = { readDatasetFile };
