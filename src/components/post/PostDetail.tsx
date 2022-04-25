import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

import PreviewPdf from '../preview-pdf/PreviewPdf';

const PostDetail = ({ id, file, detail }) => {
  const { data } = detail;

  console.log('data', data);

  return (
    <Box w="100%">
      <Heading as="h1" fontSize={'30'}>
        {data.title}
      </Heading>
      <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
      {/* {data.content} */}
      <PreviewPdf file={file} />
    </Box>
  );
};

export default PostDetail;
