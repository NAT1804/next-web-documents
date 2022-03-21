import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@chakra-ui/icons';

const Navbar = ({ path }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box zIndex="2">
      <Flex
        zIndex="2"
        minH={'60px'}
        py={{ base: 2 }}
        // px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justify={'flex-start'}
      >
        <Flex
          // ml={{ base: -2 }}
          flex={{ base: 1 }}
          display={{ base: 'flex', md: 'none' }}
          justify={{ base: 'flex-end' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex justify={{ base: 'center', md: 'start' }}>
          <Flex display={{ base: 'none', md: 'flex' }} ml={5}>
            <DesktopNav />
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

export default Navbar;

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'lg'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{
              color: useColorModeValue('primaryOrange', 'primaryGreen')
            }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon
            color={useColorModeValue('primaryOrange', 'primaryGreen')}
            w={5}
            h={5}
            as={ChevronRightIcon}
          />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none'
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map(child => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Tài liệu chung',
    children: [
      {
        label: 'Giáo trình chung',
        subLabel: 'Tổng hợp giáo trình của VNU',
        href: '#'
      },
      {
        label: 'Tiếng Anh VSTEP',
        subLabel: 'Tổng hợp đề thi VSTEP',
        href: '#'
      },
      {
        label: 'Đề cương chung',
        subLabel: 'Tổng hợp đề cương chung VNU',
        href: '#'
      }
    ]
  },
  {
    label: 'Các trường',
    children: [
      {
        label: 'Đại Học KHTN',
        subLabel: 'Tổng hợp đề thi, giáo trình KHTN',
        href: '#'
      },
      {
        label: 'Đại học KHXHNV',
        subLabel: 'Tổng hợp đề thi, giáo trình KHXHNV',
        href: '#'
      },
      {
        label: 'Đại học Ngoại Ngữ',
        subLabel: 'Tổng hợp đề thi, giáo trình NN',
        href: '#'
      },
      {
        label: 'Đại học Kinh Tế',
        subLabel: 'Tổng hợp đề thi, giáo trình KT',
        href: '#'
      },
      {
        label: 'Đại học Công Nghệ',
        subLabel: 'Tổng hợp đề thi, giáo trình CN',
        href: '#'
      },
      {
        label: 'Đại học Giáo dục',
        subLabel: 'Tổng hợp đề thi, giáo trình GD',
        href: '#'
      },
      {
        label: 'Đại học Y dược',
        subLabel: 'Tổng hợp đề thi, giáo trình YD',
        href: '#'
      },
      {
        label: 'Khoa Luật',
        subLabel: 'Tổng hợp đề thi, giáo trình KL',
        href: '#'
      },
      {
        label: 'Khoa Quốc tế',
        subLabel: 'Tổng hợp đề thi, giáo trình KQT',
        href: '#'
      },
      {
        label: 'Khoa QTKD',
        subLabel: 'Tổng hợp đề thi, giáo trình QTGD',
        href: '#'
      }
    ]
  },
  {
    label: 'Đề thi đại học',
    children: [
      {
        label: 'Đề thi đánh giá năng lực',
        href: '#'
      }
    ]
  },
  {
    label: 'Đề thi chuyên THPT',
    href: '#'
  }
];
