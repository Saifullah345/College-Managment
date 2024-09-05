const { google } = require("googleapis");
const keys = require("../drive_file.js");
const stream = require("stream");

async function getDrive() {
  try {
    const scopes = ["https://www.googleapis.com/auth/drive"];
    const client = new google.auth.JWT(
      keys.client_email,
      null,
      keys.private_key,
      scopes
    );
    await client.authorize();
    return google.drive({ version: "v3", auth: client });
  } catch (error) {
    console.error("Error getting Drive client:", error);
    return null;
  }
}

async function uploadFileToDrive(file, fileId = null) {
  const drive = await getDrive();
  if (!drive) {
    return { uploaded: false, url: undefined, fileId: undefined };
  }

  const bufferStream = new stream.PassThrough();
  bufferStream.end(file.buffer);

  const requestBody = {
    name: file.originalname,
    mimeType: file.mimetype,
  };

  const media = {
    mimeType: file.mimetype,
    body: bufferStream,
  };

  try {
    const response = fileId
      ? await drive.files.update({
          fileId,
          requestBody,
          media,
        })
      : await drive.files.create({
          requestBody,
          media,
        });

    const newFileId = response.data.id;
    if (!newFileId) {
      return { uploaded: false, url: undefined, fileId: undefined };
    }

    await drive.permissions.create({
      fileId: newFileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const url = `https://drive.google.com/uc?export=view&id=${newFileId}`;
    return { uploaded: true, url, fileId: newFileId };
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);
    return { uploaded: false, url: undefined, fileId: undefined };
  }
}

async function deleteFileFromDrive(fileId) {
  const drive = await getDrive();
  if (!drive) {
    return false;
  }

  try {
    const response = await drive.files.delete({ fileId });
    return response.status === 204;
  } catch (error) {
    console.error("Error deleting file from Google Drive:", error);
    return false;
  }
}

module.exports = {
  uploadImage: (file) => uploadFileToDrive(file),
  updateProfileImage: (file, fileId) => uploadFileToDrive(file, fileId),
  deleteCarImage: (imageId) => deleteFileFromDrive(imageId),
};
