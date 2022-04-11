import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

import PreviewPdf from '../preview-pdf/PreviewPdf';

const PostDetail = ({ id, file }) => {
  return (
    <Box w="100%">
      <Heading as="h1" fontSize={'30'}>
        Chi tiết bài đăng {id}
      </Heading>
      <PreviewPdf file={file} />
    </Box>
  );
};

export default PostDetail;
