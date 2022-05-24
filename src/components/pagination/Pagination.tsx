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

const Pagination = ({ links, meta, setPage }) => {
  const onChangePage = page => {
    if (page >= 1 && page <= meta.last_page) {
      setPage(page);
    }
  };

  return (
    <Flex justify="space-between" align="center" m={4}>
      <Flex>
        <Tooltip label="Trang đầu tiên">
          <IconButton
            icon={<ArrowLeftIcon h={3} w={3} />}
            aria-label={'Trang đầu tiên'}
            mx={2}
            onClick={() => onChangePage(1)}
          />
        </Tooltip>
        <Tooltip label="Trang trước">
          <IconButton
            icon={<ChevronLeftIcon h={6} w={6} />}
            aria-label={'Trang trước'}
            mx={2}
            onClick={() => onChangePage(meta.current_page - 1)}
          />
        </Tooltip>
      </Flex>
      <Flex alignItems="center">
        <Text flexShrink="0" mr={8}>
          Trang{' '}
          <Text fontWeight="bold" as="span">
            {meta.current_page}
          </Text>{' '}
          /{' '}
          <Text fontWeight="bold" as="span">
            {meta.last_page}
          </Text>
        </Text>
        <Box display={{ base: 'none', md: 'flex' }} alignItems="center">
          <Text flexShrink="0">Đi tới trang:</Text>{' '}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            value={meta.current_page}
            max={meta.last_page}
            onChange={page => onChangePage(page)}
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
            onClick={() => onChangePage(meta.current_page + 1)}
          />
        </Tooltip>
        <Tooltip label="Trang cuối cùng">
          <IconButton
            icon={<ArrowRightIcon h={3} w={3} />}
            aria-label={'Trang cuối cùng'}
            mx={2}
            onClick={() => onChangePage(meta.last_page)}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default Pagination;
