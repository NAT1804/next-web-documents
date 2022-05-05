import React from 'react';
import { Box, Flex, Heading, HStack, Text } from '@chakra-ui/react';

import PreviewPdf from '../preview-pdf/PreviewPdf';
import { PostComment, PostDate } from './PostItem';
import { PlusSquareIcon } from '@chakra-ui/icons';

export const PostType = props => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <PlusSquareIcon />
      <Text>{props.type}</Text>
    </HStack>
  );
};

const PostDetail = ({ detail }) => {
  const { data } = detail;

  return (
    <Box w="100%">
      <Heading as="h1" fontSize={'30'} my={2}>
        {data.title}
      </Heading>
      <Flex w="100%" my={3}>
        <PostType type={data.post_type_id} />
        &nbsp;&nbsp;&nbsp;
        <PostDate date={new Date(data.created_at)} />
        &nbsp;&nbsp;&nbsp;
        <PostComment quantity={data.comment.length} />
      </Flex>
      {data.files.length
        ? data.files.map((file, i) => <PreviewPdf key={i} file={file.link} />)
        : undefined}
      <Box mt={4} dangerouslySetInnerHTML={{ __html: data.content }}></Box>
    </Box>
  );
};

export default PostDetail;
