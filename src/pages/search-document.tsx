import { Heading, Text, Image, Flex, Box } from '@chakra-ui/react';
import React from 'react';

const SearchDocumentPage = () => {
  return (
    <>
      <Flex flexDir="column">
        <Heading>Hướng dẫn tìm kiếm tài liệu</Heading>
        <Text my={3} fontWeight={'bold'}>
          B1: Truy cập https://next-web-documents.vercel.app/
        </Text>
        <Box border={'1px solid black'} my={2}>
          <Image src="/img1.png" alt="image1" />
        </Box>
        <Text my={3} fontWeight={'bold'}>
          B2: Gõ tên môn học ở ô Tìm kiếm, ấn kính lúp ở cuối ô để bắt đầu tìm
          kiếm
        </Text>
        <Box border={'1px solid black'} my={2}>
          <Image src="/img2.png" alt="image1" />
        </Box>
        <Text mb={3} fontWeight={'bold'}>
          B3: Xuất hiện các kết quả tìm kiếm sau đó ấn vào Tên môn học
        </Text>
      </Flex>
    </>
  );
};

export default SearchDocumentPage;
