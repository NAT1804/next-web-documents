import {
  Box,
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Tooltip
} from '@chakra-ui/react';
import React from 'react';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@chakra-ui/icons';

const Pagination = ({ links, meta }) => {
  return (
    <Flex justify="space-between" align="center" m={4}>
      <Flex>
        <Tooltip label="Trang đầu tiên">
          <IconButton
            icon={<ArrowLeftIcon h={3} w={3} />}
            aria-label={'Trang đầu tiên'}
            mx={2}
          />
        </Tooltip>
        <Tooltip label="Trang trước">
          <IconButton
            icon={<ChevronLeftIcon h={6} w={6} />}
            aria-label={'Trang trước'}
            mx={2}
          />
        </Tooltip>
      </Flex>
      <Flex alignItems="center">
        <Text flexShrink="0" mr={8}>
          Page{' '}
          <Text fontWeight="bold" as="span">
            {/* {pageIndex + 1} */}
            {1}
          </Text>{' '}
          of{' '}
          <Text fontWeight="bold" as="span">
            {/* {pageOptions.length} */}
            {5}
          </Text>
        </Text>
        <Box display={{ base: 'none', md: 'flex' }} alignItems="center">
          <Text flexShrink="0">Go to page:</Text>{' '}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            value={1}
            // max={pageOptions.length}
            // onChange={(value) => {
            //   const page = value ? value - 1 : 0;
            //   gotoPage(page);
            // }}
            // defaultValue={pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </Flex>
      <Flex>
        <Tooltip label="Trang sau">
          <IconButton
            icon={<ChevronRightIcon h={6} w={6} />}
            aria-label={'Trang sau'}
            mx={2}
          />
        </Tooltip>
        <Tooltip label="Trang cuối cùng">
          <IconButton
            icon={<ArrowRightIcon h={3} w={3} />}
            aria-label={'Trang cuối cùng'}
            mx={2}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Pagination;
