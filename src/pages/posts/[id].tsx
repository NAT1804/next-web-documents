import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Heading, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { PostDetail, BreadcrumbElement } from '../../components';
import ListVPost from 'components/post/ListVPost';
import { usePostById } from 'hooks';
import { IBreadcrumb } from 'types';
import api from 'api';

const PostDetailPage = () => {
  const param = useRouter();
  const { id } = param.query;
  const breadcrumb: IBreadcrumb[] = [];

  // const { post, isLoading, isError } = usePostById(id);
  const [detail, setDetail] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await api.get(`api/posts/${id}`);

      if (response.data) {
        setLoading(false);
        setDetail(response.data);
        // breadcrumb.push({
        //   name: 'Home',
        //   href: `/`
        // });
        // breadcrumb.push({
        //   name: response.data.post_type_id,
        //   href: `/posts/type/${response.data.type_slug}`
        // });
        // breadcrumb.push({
        //   name: response.data.title
        // });
      } else {
        setError('Has error');
        console.log('Has error');
      }
    };
    fetchData();
  }, [id]);

  // if (isError) return <div>Failed to load</div>;
  if (isLoading)
    return (
      <>
        <Spinner size={'xl'} />
      </>
    );

  if (!detail) return <p>No data</p>;

  // if (!isError && !isLoading) {
  //   breadcrumb.push({
  //     name: 'Home',
  //     href: `/`
  //   });
  //   breadcrumb.push({
  //     name: post.data.post_type_id,
  //     href: `/posts/type/${post.data.type_slug}`
  //   });
  //   breadcrumb.push({
  //     name: post.data.title
  //   });
  // }

  return (
    <>
      <BreadcrumbElement breadcrumb={breadcrumb} />
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem colSpan={{ base: 3, md: 2 }}>
          <PostDetail detail={detail} setDetail={setDetail} />
        </GridItem>
        <GridItem colSpan={{ base: 3, md: 1 }}>
          <ListVPost />
        </GridItem>
      </Grid>
    </>
  );
};

export default PostDetailPage;
