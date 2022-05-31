import { Input, InputGroup, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Searchbar = () => {
  const router = useRouter();
  const [searchKey, setSearchKey] = useState('');

  const handleInputChange = e => setSearchKey(e.target.value);

  const handleSearchPost = e => {
    e.preventDefault();
    router.push(`/posts/search?key=${searchKey}`);
  };

  return (
    <form onSubmit={handleSearchPost}>
      <InputGroup>
        <Input
          variant={'outline'}
          type={'text'}
          placeholder="Tìm kiếm"
          size={'md'}
          value={searchKey}
          // bg={useColorModeValue('#ccc', '#fefefe')}
          // color={useColorModeValue('white', 'black')}
          borderColor={useColorModeValue('#ccc', 'whiteAlpha.700')}
          onChange={handleInputChange}
        />
      </InputGroup>
    </form>
  );
};

export default Searchbar;
