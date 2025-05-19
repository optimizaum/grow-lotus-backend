// Function for deleting the uploaded file from upload folder
const deleteUploadedFile = (filename) => {
  const filePath = join(process.cwd(), 'src/upload', filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(`Failed to delete file '${filename}':`, err.message);
    } else {
      console.log(`File '${filename}' deleted from upload folder.`);
    }
  });
};

export default deleteUploadedFile;