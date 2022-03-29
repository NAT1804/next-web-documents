import {
  Box,
  Button,
  Container,
  Flex,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
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
  const bgColorSpace = useColorModeValue('white.400', 'black.400');

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
    console.log(Math.round(currentScrollY / (height / 2)) + 1);
    setPageNumber(Math.round(currentScrollY / height) + 1);
  };

  return (
    <Container maxW="lg" centerContent>
      <Flex align="center" justify="space-between" gap={4}>
        <IconButton
          icon={<ChevronLeftIcon h={6} w={6} />}
          aria-label={'Trang sau'}
          m={2}
          onClick={changePageBack}
          isDisabled={pageNumber === 1}
        />
        <Box>
          {pageNumber} / {numPages}
        </Box>
        <IconButton
          icon={<ChevronRightIcon h={6} w={6} />}
          aria-label={'Trang sau'}
          m={2}
          onClick={changePageNext}
          isDisabled={pageNumber === numPages}
        />
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
            <>
              <Page
                key={index}
                inputRef={el => (pagesRef.current[index] = el)}
                pageNumber={index + 1}
                height={height}
                width={500}
              />
              <Box
                key={`k-${index}`}
                w="100%"
                h={6}
                bgColor={bgColorSpace}
                textAlign="right"
                mx={-4}
              >
                Trang {index + 1}
              </Box>
            </>
          ))}
        </Document>
      </motion.div>
    </Container>
  );
};

export default PreviewPdf;
