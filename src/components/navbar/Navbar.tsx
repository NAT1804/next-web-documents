import NextLink from 'next/link';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Spinner
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from '@chakra-ui/icons';

import Section from 'components/section/Section';
import { usePostType } from '../../hooks';
import Loading from 'components/loading/Loading';

interface NavItem {
  id?: number;
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

// const navItems: Array<NavItem> = [
//   {
//     label: 'Tài liệu chung',
//     children: [
//       {
//         label: 'Giáo trình chung',
//         subLabel: 'Tổng hợp giáo trình của VNU',
//         href: '#'
//       },
//       {
//         label: 'Tiếng Anh VSTEP',
//         subLabel: 'Tổng hợp đề thi VSTEP',
//         href: '#'
//       },
//       {
//         label: 'Đề cương chung',
//         subLabel: 'Tổng hợp đề cương chung VNU',
//         href: '#'
//       }
//     ]
//   },
//   {
//     label: 'Các trường',
//     children: [
//       {
//         label: 'Đại Học KHTN',
//         subLabel: 'Tổng hợp đề thi, giáo trình KHTN',
//         href: '#'
//       },
//       {
//         label: 'Đại học KHXHNV',
//         subLabel: 'Tổng hợp đề thi, giáo trình KHXHNV',
//         href: '#'
//       },
//       {
//         label: 'Đại học Ngoại Ngữ',
//         subLabel: 'Tổng hợp đề thi, giáo trình NN',
//         href: '#'
//       },
//       {
//         label: 'Đại học Kinh Tế',
//         subLabel: 'Tổng hợp đề thi, giáo trình KT',
//         href: '#'
//       },
//       {
//         label: 'Đại học Công Nghệ',
//         subLabel: 'Tổng hợp đề thi, giáo trình CN',
//         href: '#'
//       },
//       {
//         label: 'Đại học Giáo dục',
//         subLabel: 'Tổng hợp đề thi, giáo trình GD',
//         href: '#'
//       },
//       {
//         label: 'Đại học Y dược',
//         subLabel: 'Tổng hợp đề thi, giáo trình YD',
//         href: '#'
//       },
//       {
//         label: 'Khoa Luật',
//         subLabel: 'Tổng hợp đề thi, giáo trình KL',
//         href: '#'
//       },
//       {
//         label: 'Khoa Quốc tế',
//         subLabel: 'Tổng hợp đề thi, giáo trình KQT',
//         href: '#'
//       },
//       {
//         label: 'Khoa QTKD',
//         subLabel: 'Tổng hợp đề thi, giáo trình QTGD',
//         href: '#'
//       }
//     ]
//   },
//   {
//     label: 'Đề thi đại học',
//     children: [
//       {
//         label: 'Đề thi đánh giá năng lực',
//         href: '#'
//       }
//     ]
//   },
//   {
//     label: 'Đề thi chuyên THPT',
//     href: '#'
//   }
// ];

const Navbar = ({ path }) => {
  const { isOpen, onToggle } = useDisclosure();

  const { postType, isLoading, isError } = usePostType();
  const borderColor = useColorModeValue('gray.200', 'gray.900');

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (isError) {
    return <>Has Error</>;
  }

  const navItems: Array<NavItem> = postType.data.map(type => ({
    id: type.id,
    label: type.name,
    href: `/posts/type/${type.slug}`,
    children: type.children.map(child => ({
      id: child.id,
      label: child.name,
      href: `/posts/type/${child.slug}`
    }))
  }));

  return (
    <Box zIndex="2">
      <Flex
        zIndex="2"
        minH={'60px'}
        py={{ base: 2 }}
        // px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={borderColor}
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
          <Flex display={{ base: 'none', md: 'flex' }}>
            <DesktopNav navItems={navItems} />
          </Flex>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navItems={navItems} />
      </Collapse>
    </Box>
  );
};

export default Navbar;

const DesktopNav = ({ navItems }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {navItems.map((navItem, i) => {
        return (
          <Section key={navItem.label} delay={(i + 1) * 0.2}>
            <Popover trigger="hover" placement={'bottom'}>
              <NextLink href={navItem.href ?? '#'} passHref>
                <Link
                  p={2}
                  fontSize={'lg'}
                  fontWeight={500}
                  color={linkColor}
                  href={navItem.href ?? '#'}
                  _hover={{
                    textDecoration: 'none',
                    color: linkHoverColor
                  }}
                >
                  {navItem.label}
                </Link>
              </NextLink>

              {navItem.children.length > 0 ? (
                <>
                  <PopoverTrigger>
                    <Icon
                      as={ChevronDownIcon}
                      _hover={{
                        transition: 'all .25s ease-in-out',
                        transform: 'rotate(180deg)'
                      }}
                      w={6}
                      h={6}
                    />
                  </PopoverTrigger>
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
                </>
              ) : undefined}
            </Popover>
          </Section>
        );
      })}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <NextLink href={href} passHref>
      <Link
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
    </NextLink>
  );
};

const MobileNav = ({ navItems }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {navItems.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        as={Link}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none'
        }}
      >
        <NextLink href={href ?? '#'} passHref>
          <Text
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}
          >
            {label}
          </Text>
        </NextLink>
        {children.length ? (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
            onClick={children && onToggle}
          />
        ) : undefined}
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
              <NextLink key={child.label} href={child.href} passHref>
                <Link py={2} href={child.href}>
                  {child.label}
                </Link>
              </NextLink>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
