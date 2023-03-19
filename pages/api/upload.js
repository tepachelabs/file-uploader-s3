import { IncomingForm } from 'formidable';

import { uploadFileToS3 } from '@/s3';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'We only support POST method!' });
  }

  const form = new IncomingForm();

  form.parse(req, (err, fields, files) => {
    uploadFileToS3(files.file)
      .then(res => {
        return res.status(201).send({ name: 'Your file was uploaded!' });
      })
      .catch((error) => {
        return res.status(400).send({ error });
      });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
