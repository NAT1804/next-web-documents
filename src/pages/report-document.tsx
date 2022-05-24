import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Text,
  Flex,
  Center,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import api from 'api';
import { Loading, ToastMessage } from 'components';
import React, { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import {
  AiFillCheckCircle,
  AiFillHeart,
  AiOutlineCheckCircle
} from 'react-icons/ai';
import { signIn, useSession } from 'next-auth/react';

const TablePost = ({ title, posts, setFunc }) => {
  const notify = useCallback((type, message) => {
    ToastMessage({ type, message });
  }, []);

  const handleLikePost = async id => {
    const response = await api.post(`api/posts/${id}/like`);

    if (response.data) {
      if (response.data.message === 'Like') {
        notify('success', 'Like post successfully!');
      } else {
        notify('success', 'Unlike post successfully!');
        const resp = await api.get('/api/users/profile/likes');
        if (resp.data) {
          setFunc(resp.data.data);
        }
      }
    } else {
      notify('error', 'Like post failed!');
    }
  };

  return (
    <Box w="100%" my={'4'}>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption placement="top">{title}</TableCaption>
          <Thead>
            <Tr>
              <Th>Mô tả báo cáo</Th>
              <Th>Ngày báo cáo</Th>
              <Th>Hành động</Th>
            </Tr>
          </Thead>
          {posts.length ? (
            posts.map((post, i) => (
              <Tbody key={i}>
                <Tr>
                  {/* <NextLink href={`/posts/${post.id}`} passHref> */}
                  <Td
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '50ch',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {post.description}
                  </Td>
                  {/* </NextLink> */}
                  <Td>
                    {new Date(post.updated_at).toLocaleDateString('vi-VN')}
                  </Td>
                  <Td isNumeric>
                    <Flex justify={'center'} align="center">
                      {post.resolve === 1 ? (
                        <AiFillCheckCircle color="green" />
                      ) : (
                        <AiOutlineCheckCircle color="yellow" />
                      )}
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            ))
          ) : (
            <Text>Không có tài liệu nào!</Text>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

const ReportDocumentPage = () => {
  const { data: session } = useSession();
  const bgColor = useColorModeValue('primaryGreen', 'primaryOrange');

  const [listPostReport, setListPostReport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const resp = await api.get('/api/users/profile/reports');
      if (resp.data) {
        setListPostReport(resp.data.data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (!session) {
    return (
      <>
        <Center>
          <Text fontWeight={'bold'} fontSize={20} my={5} mx={2}>
            Bạn chưa đăng nhập
          </Text>
          <Button
            variant={'solid'}
            bgColor={bgColor}
            mx={3}
            onClick={e => {
              e.preventDefault();
              signIn();
            }}
          >
            Đăng nhập
          </Button>
        </Center>
      </>
    );
  }

  return (
    <TablePost
      title="Danh sách tài liệu đã báo cáo"
      posts={listPostReport}
      setFunc={setListPostReport}
    />
  );
};

export default ReportDocumentPage;
