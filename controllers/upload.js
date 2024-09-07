exports.fileUpload = (req, res) => {
  console.log("File Upload Request:", req.file); // Log the file object

  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  const fileUrl = `/uploads/${req.file.filename}`; // Construct URL or path as needed

  res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    fileUrl,
  });
};
