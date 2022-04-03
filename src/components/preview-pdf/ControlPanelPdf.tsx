import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@chakra-ui/icons';
import {
  Box,
  chakra,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { BiSidebar } from 'react-icons/bi';
import { FiZoomIn, FiZoomOut } from 'react-icons/fi';
import { GrRotateLeft, GrRotateRight } from 'react-icons/gr';
import { HamburgerIcon } from '@chakra-ui/icons';

import PrinterPdf from './PrinterPdf';

const ZoomInIcon = chakra(FiZoomIn);
const ZoomOutIcon = chakra(FiZoomOut);
const RotateLeftIcon = chakra(GrRotateLeft);
const RotateRightIcon = chakra(GrRotateRight);
const SideBarIcon = chakra(BiSidebar);

const ControlPanelPdf = props => {
  const {
    file,
    pageNumber,
    numPages,
    setPageNumber,
    scale,
    setScale,
    setRotate,
    onToggleOutLine
  } = props;

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;

  const firstPageClass = isFirstPage ? 'not-allowed' : 'pointer';
  const lastPageClass = isLastPage ? 'not-allowed' : 'pointer';

  const goToFirstPage = () => {
    if (!isFirstPage) setPageNumber(1);
  };
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber + 1);
  };
  const goToLastPage = () => {
    if (!isLastPage) setPageNumber(numPages);
  };

  const onPageChange = e => {
    if (e >= 1 && e <= numPages) {
      setPageNumber(Number(e));
    }
  };

  const isMinZoom = scale < 0.6;
  const isMaxZoom = scale >= 2.0;

  const zoomOutClass = isMinZoom ? 'not-allowed' : 'pointer';
  const zoomInClass = isMaxZoom ? 'not-allowed' : 'pointer';

  const zoomOut = () => {
    if (!isMinZoom) setScale(scale - 0.1);
  };

  const zoomIn = () => {
    if (!isMaxZoom) setScale(scale + 0.1);
  };

  const rotateLeft = () => {
    setRotate(prev => (prev + 270) % 360);
  };

  const rotateRight = () => {
    setRotate(prev => (prev + 90) % 360);
  };

  return (
    <Flex
      bgColor={useColorModeValue('primaryOrange', 'primaryGreen')}
      w={'100%'}
      align={'center'}
      justify={'space-around'}
      py={1}
      position={'relative'}
    >
      <Box mx={3}>
        <SideBarIcon
          cursor={'pointer'}
          width={5}
          height={5}
          onClick={onToggleOutLine}
        />
      </Box>
      <Flex justify={'space-between'} align={'center'}>
        <ArrowLeftIcon cursor={firstPageClass} onClick={goToFirstPage} />
        <ChevronLeftIcon
          w={8}
          h={8}
          cursor={firstPageClass}
          onClick={goToPreviousPage}
        />
        <Box display={{ base: 'none', md: 'flex' }} alignItems="center">
          <Text userSelect={'none'} flexShrink="0">
            Trang:&nbsp;
          </Text>
          <NumberInput
            w={20}
            min={1}
            value={pageNumber}
            max={numPages}
            onChange={onPageChange}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text userSelect={'none'} flexShrink="0">
            &nbsp;&nbsp;&nbsp;/ {numPages}
          </Text>
        </Box>
        <ChevronRightIcon
          w={8}
          h={8}
          cursor={lastPageClass}
          onClick={goToNextPage}
        />
        <ArrowRightIcon cursor={lastPageClass} onClick={goToLastPage} />
      </Flex>
      <Flex justify={'space-between'} align={'center'}>
        <ZoomOutIcon w={6} h={6} cursor={zoomOutClass} onClick={zoomOut} />
        <Text
          userSelect={'none'}
          display={{ base: 'none', md: 'block' }}
          fontSize={16}
        >
          {(scale * 100).toFixed()}%
        </Text>
        <ZoomInIcon w={6} h={6} cursor={zoomInClass} onClick={zoomIn} />
      </Flex>
      <Flex>
        <RotateLeftIcon w={6} h={6} cursor={'pointer'} onClick={rotateLeft} />
        <RotateRightIcon w={6} h={6} cursor={'pointer'} onClick={rotateRight} />
      </Flex>
      <Box mx={3}>
        <PrinterPdf file={file} />
      </Box>
    </Flex>
  );
};

export default ControlPanelPdf;
