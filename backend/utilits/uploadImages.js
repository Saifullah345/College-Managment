import drive_handlers from "./drive_handlers";

const multer = require("multer");

module.exports = uploadImages = (fields) => {
  return (req, res, next) => {
    const upload = multer().fields(fields);

    upload(req, res, async (error) => {
      if (error) {
        return res.status(400).send({ error: error.message });
      } else {
        const missingFiles = [];

        fields.forEach((field) => {
          if (!req.files[field]) {
            missingFiles.push(field);
          }
        });

        if (missingFiles.length > 0) {
          return res.status(400).send({
            error: `Files missing for fields: ${missingFiles.join(", ")}`,
          });
        } else {
          try {
            const uploadedFiles = {};

            // Upload each file to Google Drive
            for (const field of fields) {
              const file = req.files[field][0];
              const fileId = await drive_handlers.uploadImage(file);
              uploadedFiles[field] = fileId;
            }

            req.uploadedFiles = uploadedFiles; // Attach uploaded file IDs to the request object
            next();
          } catch (err) {
            console.error(err);
            res.status(500).send("Error uploading files to Google Drive");
          }
        }
      }
    });
  };
};
