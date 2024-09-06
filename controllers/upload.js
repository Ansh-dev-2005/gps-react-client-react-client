exports.fileUpload = async (req, res) => {
    try{
      
      res.json({
        success: true,
        message: "File Uploaded!",
        fileUrl: `/uploads/${req.file.filename}`
      })
    }catch(err) {
        res.status(400).json({
            error: true,
            message: 'An Unexpected Error Occured'
        })
    }
}