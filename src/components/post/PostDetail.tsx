import React, { useState } from 'react';
import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import { PlusSquareIcon } from '@chakra-ui/icons';

import PreviewPdf from '../preview-pdf/PreviewPdf';
import { PostInteractive } from './PostItem';
import Respond from '../respond/Respond';

export const PostType = props => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <PlusSquareIcon />
      <Text>{props.type}</Text>
    </HStack>
  );
};

const PostDetail = ({ detail, setDetail }) => {
  const { data } = detail;

  return (
    <Box w="100%">
      <Heading as="h1" fontSize={'30'} my={2}>
        {data.title}
      </Heading>
      <PostInteractive
        date={new Date(data.created_at)}
        quantity={data.comment.length}
        id={data.id}
        likes={data.likes}
        reports={data.reports}
      >
        <PostType type={data.post_type_id} />
      </PostInteractive>
      {/* {data.files.length
        ? data.files.map((file, i) => <PreviewPdf key={i} file={file.link} />)
        : undefined} */}
      <PreviewPdf file={data.link_pdf} />
      <Box mt={4} dangerouslySetInnerHTML={{ __html: data.content }}></Box>
      <Respond id={data.id} comments={data.comment} setDetail={setDetail} />
    </Box>
  );
};

export default PostDetail;
