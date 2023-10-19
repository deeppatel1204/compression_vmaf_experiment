const createCsvWriter = require('csv-writer').createObjectCsvWriter;

async function writedatacsv(postInfo){
  
    const csvWriter = createCsvWriter({
      path: 'results.csv',
      header: [
        { id: 'column1', title: 'postId' },
        { id: 'column2', title:  'originalPostURL' },
        { id: 'column3', title: 'originalBitrate' },
        { id: 'column4', title:  'convertedBitrate' },
        { id: 'column5', title: 'vmafScore' },
        { id: 'column6', title:  'psnrScore' },
      ],
      append: true,
    });
    
    const records = [
       { 
            column1: postInfo.postId,
            column2: postInfo.inputURL,
            column3: postInfo.originalVideoDimention.videoBitrate,
            column4: postInfo.convertedVideoDimention.videoBitrate,
            column5: postInfo.vmafScore,
            column6: postInfo.psnrScore,
        },
    ];
    
    csvWriter.writeRecords(records) 
      .then(() => {
        console.log('Appended to CSV file successfully');
      })
      .catch((error) => {
        console.error('Error appending to CSV file:', error);
      });

}

module.exports = {writedatacsv};