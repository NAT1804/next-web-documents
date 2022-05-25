import { Heading, Image, Text, Flex, Box } from '@chakra-ui/react';
import React from 'react';

const SendDocumentPage = () => {
  return (
    <>
      <Flex flexDir="column">
        <Heading>Hướng dẫn gửi tài liệu</Heading>
        <Text my={3} fontWeight={'bold'}>
          B1: Truy cập https://next-web-documents.vercel.app/
        </Text>
        <Box border={'1px solid black'} my={2}>
          <Image src="/img1.png" alt="image1" />
        </Box>
        <Text my={3} fontWeight={'bold'}>
          B2: Đăng nhập và nhấn vào tên người dùng
        </Text>
        <Text my={3} fontWeight={'bold'}>
          B3: Xuất hiện menu, chọn mục Tài liệu của tôi
        </Text>
        <Box border={'1px solid black'} my={2}>
          <Image src="/img3.png" alt="image1" />
        </Box>
        <Text my={3} fontWeight={'bold'}>
          B4: Chọn nút Thêm tài liệu
        </Text>
        <Box border={'1px solid black'} my={2}>
          <Image src="/img4.png" alt="image1" />
        </Box>
        <Text my={3} fontWeight={'bold'}>
          B5: Điền thông tin tài liệu và ấn nút Thêm
        </Text>
        <Flex justify={'center'} my={2}>
          <Image border={'1px solid black'} src="/img5.png" alt="image1" />
        </Flex>
      </Flex>
    </>
  );
};

export default SendDocumentPage;
