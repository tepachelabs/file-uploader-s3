import Head from 'next/head'

import { FileUploader } from '@/components/file-uploader';
import { FilesList } from '@/components/files-list';

export default function Home() {
  return (
    <>
      <Head>
        <title>File Uploader S3</title>
      </Head>
      <main className="container">
        <h1>Upload your files</h1>
        <FileUploader />
        <FilesList />
      </main>
    </>
  )
}
