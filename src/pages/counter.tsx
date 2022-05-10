import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from 'app/hook';
import {
  selectCount,
  increment,
  decrement,
  incrementByAmount
} from '../features/counter';
import React, { useState } from 'react';

const Counter = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCount);
  const [incrementAmount, setIncrementAmount] = useState<number>(0);
  return (
    <>
      <Text as={'h1'}>Welcome to the greatest app in the world!</Text>
      <Text>The current number is {count}</Text>
      <Flex>
        <Input
          value={incrementAmount}
          onChange={e => setIncrementAmount(Number(e.target.value))}
          type="number"
        />
        <Button
          onClick={() => dispatch(incrementByAmount(Number(incrementAmount)))}
        >
          Increment by amount
        </Button>
      </Flex>
      <Box>
        <Button onClick={() => dispatch(decrement())}>Decrement by 1</Button>
        <Button onClick={() => dispatch(increment())}>Increment by 1</Button>
      </Box>
    </>
  );
};

export default Counter;
