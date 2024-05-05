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
    return undefined;
  }
}
module.exports = {
  async uploadImage(file) {
    try {
      let drive = await getDrive();
      if (drive) {
        let bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        // creating file request body
        let requestBody = {
          name: file.originalname,
          mimeType: file.mimetype,
        };
        // creating file media to upload
        let media = {
          mimeType: file.mimetype,
          body: bufferStream,
        };
        // creating dile in drive / uploading file
        let fileData = await drive.files.create({
          requestBody: requestBody,
          media: media,
        });
        // checking dose file uploaded
        if (fileData.data.id) {
          // file uploaded now setting file permissions to public
          await drive.permissions.create({
            fileId: fileData.data.id,
            requestBody: {
              role: "reader",
              type: "anyone",
            },
          });
          //obtain the webview and webcontent links
          let urlData = await drive.files.get({
            fileId: fileData.data.id,
            fields: "webContentLink",
          });
          if (urlData.data) {
            return {
              uploaded: true,
              url: urlData.data.webContentLink ?? undefined,
              fileId: fileData.data.id,
            };
          } else {
            return {
              uploaded: false,
              url: undefined,
              fileId: undefined,
            };
          }
        } else {
          return {
            uploaded: false,
            url: undefined,
            fileId: undefined,
          };
        }
      } else {
        console.log("unable to get drive");
        return {
          uploaded: false,
          url: undefined,
          fileId: undefined,
        };
      }
    } catch (error) {
      console.log("drive catch", error);
      return {
        uploaded: false,
        url: undefined,
        fileId: undefined,
      };
    }
  },
  async updateProfileImage(file, fileId) {
    try {
      let drive = await getDrive();
      if (drive) {
        let bufferStream = new stream.PassThrough();
        bufferStream.end(file.buffer);
        // creating file request body
        let requestBody = {
          name: file.originalname,
          mimeType: file.mimetype,
        };
        // creating file media to upload
        let media = {
          mimeType: file.mimetype,
          body: bufferStream,
        };
        // creating dile in drive / uploading file
        let fileData = await drive.files.update({
          fileId: fileId,
          requestBody: requestBody,
          media: media,
        });
        // checking dose file uploaded
        if (fileData.data.id) {
          // file uploaded now setting file permissions to public
          await drive.permissions.create({
            fileId: fileData.data.id,
            requestBody: {
              role: "reader",
              type: "anyone",
            },
          });
          //obtain the webview and webcontent links
          let urlData = await drive.files.get({
            fileId: fileData.data.id,
            fields: "webContentLink",
          });
          if (urlData.data) {
            return {
              uploaded: true,
              url: urlData.data.webContentLink ?? undefined,
              fileId: fileData.data.id,
            };
          } else {
            return {
              uploaded: false,
              url: undefined,
              fileId: undefined,
            };
          }
        } else {
          return {
            uploaded: false,
            url: undefined,
            fileId: undefined,
          };
        }
      } else {
        console.log("unable to get drive");
        return {
          uploaded: false,
          url: undefined,
          fileId: undefined,
        };
      }
    } catch (error) {
      console.log("drive catch", error);
      return {
        uploaded: false,
        url: undefined,
        fileId: undefined,
      };
    }
  },
  async deleteCarImage(image_id) {
    try {
      let drive = await getDrive();
      if (drive) {
        try {
          let deleteResponse = await drive.files.delete({
            fileId: image_id,
          });
          return deleteResponse.status == 204;
        } catch (error) {
          console.log(error);
          return false;
        }
      } else {
        console.log("unable to get drive");
        return false;
      }
    } catch (error) {
      console.log("drive catch", error);
      return false;
    }
  },
};
