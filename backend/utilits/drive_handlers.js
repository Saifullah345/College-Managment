const { google } = require("googleapis");
const keys = require("../drive_file.js");
const stream = require("stream");

async function getDrive() {
  try {
    const scopes = ["https://www.googleapis.com/auth/drive"];
    const client = new google.auth.JWT(
      keys.client_email,
      undefined,
      keys.private_key,
      scopes
    );
    await client.authorize();
    return google.drive({ version: "v3", auth: client });
  } catch (error) {
    console.error("Error getting Drive client:", error);
    return undefined;
  }
}
async function uploadFileToDrive(file, fileId = null) {
  const drive = await getDrive();
  if (!drive) {
    console.log("Unable to get drive");
    return {
      uploaded: false,
      url: undefined,
      fileId: undefined,
    };
  }

  let bufferStream = new stream.PassThrough();
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
    const fileData = fileId
      ? await drive.files.update({
          fileId: fileId,
          requestBody: requestBody,
          media: media,
        })
      : await drive.files.create({
          requestBody: requestBody,
          media: media,
        });

    if (!fileData.data.id) {
      return {
        uploaded: false,
        url: undefined,
        fileId: undefined,
      };
    }

    await drive.permissions.create({
      fileId: fileData.data.id,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    const url = `https://drive.google.com/uc?export=view&id=${fileData.data.id}`;

    return {
      uploaded: true,
      url: url,
      fileId: fileData.data.id,
    };
  } catch (error) {
    console.log("Drive catch:", error);
    return {
      uploaded: false,
      url: undefined,
      fileId: undefined,
    };
  }
}

module.exports = {
  async uploadImage(file) {
    return await uploadFileToDrive(file);
  },

  async updateProfileImage(file, fileId) {
    return await uploadFileToDrive(file, fileId);
  },

  async deleteCarImage(image_id) {
    const drive = await getDrive();
    if (!drive) {
      console.log("Unable to get drive");
      return false;
    }

    try {
      const deleteResponse = await drive.files.delete({ fileId: image_id });
      return deleteResponse.status === 204;
    } catch (error) {
      console.log("Error deleting file:", error);
      return false;
    }
  },
};
