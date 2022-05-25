import { Heading, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

const Donate = () => {
  return (
    <>
      <Flex align={'center'} justifyContent="center" flexDir={'column'}>
        <Heading fontWeight={'bold'}>DONATE QUỸ QUA MOMO</Heading>
        <Image src="/qr-momo.jpg" alt="QR Donate" />
        <Text my={5}>Dùng MoMo scan mã QR trên để chuyển tiền miễn phí!</Text>
      </Flex>
    </>
  );
};

export default Donate;
