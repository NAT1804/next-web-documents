import { Box } from '@chakra-ui/react';
import Head from 'next/head';
import Image from 'next/image';
import PreviewPdf from '../components/preview-pdf/preview-pdf';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <PreviewPdf height={600} path="/pdf/Document.pdf" />
      <Box h="100vh"></Box>
    </>
  );
}
