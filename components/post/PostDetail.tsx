import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

import PreviewPdf from '../preview-pdf/PreviewPdf';

const PostDetail = ({ id }) => {
  return (
    <Box w='100%'>
      <Heading as="h1">Detail Post {id}</Heading>
      <PreviewPdf height={600} path="/pdf/Document.pdf" />
    </Box>
  );
};

export default PostDetail;
