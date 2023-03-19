import { useState } from 'react';

export const FileUploader = () => {
  const [file, setFile] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      return;
    }

    const body = new FormData();
    body.append('file', file);

    fetch('/api/upload', {
      method: 'POST',
      body,
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onFileChange = (e) => {
    if (e.target.files.length === 0) {
      return;
    }

    setFile(e.target.files[0]);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="file" onChange={onFileChange} />
      <button type="submit">Submit File</button>
    </form>
  );
};
