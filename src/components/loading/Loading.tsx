import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';

const Loading = () => {
  return (
    <Center my={5}>
      <Spinner size={'xl'} />
    </Center>
  );
};

export default Loading;
