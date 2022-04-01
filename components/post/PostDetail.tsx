import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

import PreviewPdf from '../preview-pdf/PreviewPdf';

const PostDetail = ({ id, file }) => {
  return (
    <Box w="100%">
      <Heading as="h1">Detail Post {id}</Heading>
      <PreviewPdf file={file} />
    </Box>
  );
};

export default PostDetail;
