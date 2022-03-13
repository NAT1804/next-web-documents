import { Box, Button, Container, Flex } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

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

const PreviewPdf = ({ height, path }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const pagesRef = useRef([]);

  const controls = useAnimation();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = offset => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
    offset > 0
      ? pagesRef.current[pageNumber].scrollIntoView()
      : pagesRef.current[pageNumber - 2].scrollIntoView();
  };

  const changePageBack = () => changePage(-1);
  const changePageNext = () => changePage(1);

  const onScroll = e => {
    const currentScrollY = e.target.scrollTop;
    console.log(Math.floor(currentScrollY / (height / 2)) + 1);
    setPageNumber(Math.floor(currentScrollY / height) + 1);
  };

  return (
    <Container maxW="md" centerContent>
      <Flex align="center" justify="space-between" gap={4}>
        <Button m={2} onClick={changePageBack} isDisabled={pageNumber === 1}>
          Back
        </Button>
        <Box>
          {pageNumber} of {numPages}
        </Box>
        <Button
          m={2}
          onClick={changePageNext}
          isDisabled={pageNumber === numPages}
        >
          Next
        </Button>
      </Flex>
      <motion.div
        variants={pageVariant}
        initial="hidden"
        animate="visible"
        onScroll={onScroll}
        style={{
          height: `${height}px`,
          overflowY: 'scroll',
          overflowX: 'hidden'
        }}
        className="custom-scrollbar"
      >
        <Document file={path} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={index}
              inputRef={el => (pagesRef.current[index] = el)}
              pageNumber={index + 1}
              height={height}
            />
          ))}
        </Document>
      </motion.div>
    </Container>
  );
};

export default PreviewPdf;
