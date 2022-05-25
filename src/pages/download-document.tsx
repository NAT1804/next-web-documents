import React from 'react';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';

const DownloadDocumentPage = () => {
  return (
    <>
      <Flex flexDir="column">
        <Heading>Hướng dẫn tải tài liệu</Heading>
        <Text my={3} fontWeight={'bold'}>
          B1: Truy cập https://next-web-documents.vercel.app/
        </Text>
        <Box border={'1px solid black'} my={2}>
          <Image src="/img1.png" alt="image1" />
        </Box>
        <Text my={3} fontWeight={'bold'}>
          B2: Chọn bài viết muốn tải xuống
        </Text>
        <Text my={3} fontWeight={'bold'}>
          B3: Nhấn vào biểu tượng Popout để mở file PDF ở tab khác của trình
          duyệt
        </Text>
        <Box border={'1px solid black'} my={2}>
          <Image src="/img6.png" alt="image1" />
        </Box>
        <Text my={3} fontWeight={'bold'}>
          B4: Chọn biểu tượng menu ở góc trên bên phải rồi chọn mục Download để
          tải tài liệu xuống
        </Text>
        <Box border={'1px solid black'} my={2}>
          <Image src="/img7.png" alt="image1" />
        </Box>
      </Flex>
    </>
  );
};

export default DownloadDocumentPage;
