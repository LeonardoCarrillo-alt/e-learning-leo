import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

dotenv.config();

const s3 = new S3Client({ region: process.env.AWS_REGION });

export const uploadFile = async (filePath, originalName) => {
  const fileStream = fs.createReadStream(filePath);
  const key = `videos/${uuidv4()}-${originalName}`;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: fileStream,
    ContentType: "video/mp4", // ajusta según el tipo de video
  };

  await s3.send(new PutObjectCommand(params));

  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};
