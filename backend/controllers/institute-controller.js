const Institute = require("../models/instituteSchema");
const driveHandlers = require("../utilits/drive_handlers.js");
const multer = require("multer");

const AddInstitute = async (req, res) => {
  multer().single("file")(req, res, async (error) => {
    if (error) {
      return res.status(400).send({ error: error.message });
    } else if (!req.file) {
      return res.status(400).send({ error: "file missing" });
    }
    const instituteProfile = req.file;

    try {
      const fileUploadResult = await driveHandlers.uploadImage(
        instituteProfile
      );
      if (!fileUploadResult.uploaded) {
        return res.status(400).send({
          message: "unable to save profile image . Please try again",
        });
      }
      const instituteData = {
        ...req.body,
        instituteProfile: fileUploadResult.url,
      };
      const newInstitute = new Institute(instituteData);
      const savedInstitute = await newInstitute.save();
      return res.send(savedInstitute);
    } catch (error) {
      console.error("Error adding fee:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};
const getAllInstitute = async (req, res) => {
  try {
    const institute = await Institute.findOne();
    if (institute) {
      return res.send(institute);
    } else {
      return res.send({ message: "No Institute found" });
    }
  } catch (error) {
    console.error("Error retrieving Institute:", error);
    return res.send(error);
  }
};
const updateInstitute = async (req, res) => {
  const { id } = req.params;
  multer().single("file")(req, res, async (error) => {
    if (error) {
      return res.status(400).send({ error: error.message });
    } else if (!req.file) {
      return res.status(400).send({ error: "file missing" });
    }
    try {
      let updateData = { ...req.body };
      console.log(updateData);

      if (req.file) {
        const fileUploadResult = await driveHandlers.uploadImage(req.file);
        if (!fileUploadResult.uploaded) {
          return res.status(400).send({
            message: "Unable to save profile image. Please try again.",
          });
        }
        updateData.instituteProfile = fileUploadResult.url;
      }

      // Update the institute data in the database
      const updatedInstitute = await Institute.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
        }
      );

      if (!updatedInstitute) {
        return res.status(404).send({ message: "Institute not found" });
      }

      return res.send(updatedInstitute);
    } catch (error) {
      console.error("Error updating institute:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};

module.exports = { AddInstitute, getAllInstitute, updateInstitute };
