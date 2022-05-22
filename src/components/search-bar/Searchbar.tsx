import {
  Box,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
  const router = useRouter();
  const [searchKey, setSearchKey] = useState('');

  const handleInputChange = e => setSearchKey(e.target.value);

  const handleSearchPost = e => {
    e.preventDefault();
    router.push(`/posts/search?key=${searchKey}`);
  };

  return (
    <Grid templateColumns={'repeat(3, 1fr)'} gap={10} mt={5} mb={2}>
      <GridItem
        colSpan={{ base: 3, md: 1 }}
        gridColumnStart={{ base: 1, sm: 2, md: 3 }}
      >
        <form onSubmit={handleSearchPost}>
          <InputGroup>
            <InputLeftElement pointerEvents={'none'}>
              <FaSearch />
            </InputLeftElement>
            <Input
              variant={'filled'}
              type={'text'}
              placeholder="Tìm kiếm"
              size={'md'}
              value={searchKey}
              onChange={handleInputChange}
            />
          </InputGroup>
        </form>
      </GridItem>
    </Grid>
  );
};

export default Searchbar;
