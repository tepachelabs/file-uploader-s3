import { Upload } from '@aws-sdk/lib-storage';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import fs from 'fs';

const client = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_PUBLIC_KEY,
    secretAccessKey: process.env.AWS_S3_SECREY_KEY
  },
});

/**
 *
 * @return Promise<*>
 */
export const uploadFileToS3 = async (fileName, file) => {
  const upload = new Upload({
    client,
    leavePartsOnError: false,
    params: {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      Body: fs.createReadStream(file.filepath),
    },
  });

  return upload.done();
};
