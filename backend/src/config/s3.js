// src/config/s3.js
import AWS from "aws-sdk";

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,   
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
  region: process.env.AWS_REGION
});

export const uploadVideoToS3 = async (fileBuffer, classId, moduleId, fileName, mimeType) => {
  const bucket = process.env.AWS_BUCKET_NAME; // <-- sí, acá va el bucket

  const key = `${classId}/${moduleId}/${fileName}`;

  const params = {
    Bucket: bucket,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType
  };

  const data = await s3.upload(params).promise(); // en v2 se usa .upload().promise()

  return data.Location; // URL del archivo subido
}
export const getSignedUrl = (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Expires: 60 * 15 // 15 minutos
  };

  return s3.getSignedUrl("getObject", params);
};