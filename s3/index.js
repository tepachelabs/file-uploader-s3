import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';

const client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },

});

/**
 *
 * @return Promise<*>
 */
export const uploadFileToS3 = (file) => {
  const stream = fs.createReadStream(file.filepath);

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.originalFilename,
    Body: stream,
  };

  const command = new PutObjectCommand(uploadParams);
  return client.send(command);
};
