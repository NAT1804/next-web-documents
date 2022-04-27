import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

import PreviewPdf from '../preview-pdf/PreviewPdf';

const PostDetail = ({ detail }) => {
  const { data } = detail;

  return (
    <Box w="100%">
      <Heading as="h1" fontSize={'30'} my={2}>
        {data.title}
      </Heading>
      {data.files.length
        ? data.files.map((file, i) => <PreviewPdf key={i} file={file.link} />)
        : undefined}
      <Box mt={4} dangerouslySetInnerHTML={{ __html: data.content }}></Box>
    </Box>
  );
};

export default PostDetail;
