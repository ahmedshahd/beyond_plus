const fs = require('fs');
const csvParser = require('csv-parser');
const { bulkCreateSheet } = require('./bulk-create-sheet');

const processUploadedFile = async (
  filePath,
  language,
  tpaName,
  insuranceCompanyName,
) => {
  try {
    const items = await csvByStream(filePath);

    await bulkCreateSheet(items, language, insuranceCompanyName, tpaName);

    // Send success message to the parent process
    process.send('success');
  } catch (error) {
    console.error('File processing failed:', error.message);
    // Send error message to the parent process
    process.send('error');
  }
};

async function csvByStream(filePath) {
  const fileStream = fs.createReadStream(filePath);
  return await new Promise((resolve, reject) => {
    const data = [];
    fileStream
      .pipe(csvParser())
      .on('data', (row) => data.push(row))
      .on('end', () => resolve(data))
      .on('error', (error) => reject(error));
  });
}

// The arguments passed from the main application
const [, , filePath, language, tpaName, insuranceCompanyName] = process.argv;

processUploadedFile(filePath, language, tpaName, insuranceCompanyName)
  .then(() => {
    process.exit(0); // Exit with success status code
  })
  .catch((error) => {
    console.error('File processing failed:', error.message);
    process.exit(1); // Exit with error status code
  });
