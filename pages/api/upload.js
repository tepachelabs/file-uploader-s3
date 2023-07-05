import { v4 as uuidv4 } from 'uuid';
import { IncomingForm } from 'formidable';


import { uploadFileToS3 } from '@/s3';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'We only support POST method!' });
    return;
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    try {
      const { file } = files;
      const { originalFilename } = file;

      const fileExtension = originalFilename.substring(originalFilename.lastIndexOf('.'));
      const newFileName = `${uuidv4()}${fileExtension}`;

      const result = await uploadFileToS3(newFileName, file);
      res.status(200).json(result);

    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
