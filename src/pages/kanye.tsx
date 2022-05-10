import React from 'react';
import { useAppDispatch, useAppSelector } from 'app/hook';
import { getKanyeQuote, selectKanye } from '../features/kanye/kanyeSlice';
import { Box, Button, Text } from '@chakra-ui/react';

const Kanye = () => {
  const dispatch = useAppDispatch();
  const { data, pending, error } = useAppSelector(selectKanye);

  return (
    <Box>
      <Text>Generate random Kanye West quote</Text>
      {pending && <p>Loading...</p>}
      {data && <p>{data.quote}</p>}
      {error && <p>Oops, something went wrong</p>}
      <Button onClick={() => dispatch(getKanyeQuote())} disabled={pending}>
        Generate Kanye Quote
      </Button>
    </Box>
  );
};

export default Kanye;
