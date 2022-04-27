import { Container, Flex, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { Document, Page, Outline, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

import ControlPanelPdf from './ControlPanelPdf';

const pageVariant = {
  hidden: {
    opacity: 0,
    scale: 0
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1
    }
  }
};

const Pdf = ({ file }) => {
  const [scale, setScale] = useState<number>(1.0);
  const [rotate, setRotate] = useState<number>(0);
  const [numPages, setNumPages] = useState<number>(null); // tong so trang
  const [pageNumber, setPageNumber] = useState<number>(1); // so thu tu cua trang

  const outlineRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const onOutlineItemClick = ({ dest, pageIndex, pageNumber }) => {
    setPageNumber(pageNumber);
  };

  const onToggleOutLine = () => {
    console.log('toggle outline');
    outlineRef.current.classList.toggle('show');
  };

  return (
    <Flex
      w={'100%'}
      flexDir={'column'}
      alignItems={'center'}
      justify={'space-between'}
      position={'relative'}
    >
      {/* <ControlPanelPdf
        scale={scale}
        setScale={setScale}
        setRotate={setRotate}
        onToggleOutLine={onToggleOutLine}
        numPages={numPages}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        file={file}
      /> */}
      <iframe
        src={file}
        width="100%"
        height="600"
        scrolling="yes"
        frameBorder="1"
        allow="autoplay"
      ></iframe>
      {/* <Document
        className="document-pdf"
        loading="Please wait!!"
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Outline
          inputRef={outlineRef}
          className={`outline-pdf`}
          onItemClick={onOutlineItemClick}
        />
        <motion.div variants={pageVariant} initial="hidden" animate="visible">
          <Page
            className="page-pdf"
            pageNumber={pageNumber}
            scale={scale}
            renderMode="canvas"
            rotate={rotate}
          />
        </motion.div>
      </Document> */}
    </Flex>
  );
};

export default Pdf;
