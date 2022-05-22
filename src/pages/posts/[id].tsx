import React, { useEffect, useMemo, useState } from 'react';
import { Grid, GridItem, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { PostDetail, BreadcrumbElement } from '../../components';
import ListVPost from 'components/post/ListVPost';
import { IBreadcrumb } from 'types';
import api from 'api';

const PostDetailPage = () => {
  const param = useRouter();
  const { id } = param.query;
  const breadcrumb: IBreadcrumb[] = useMemo(() => [], []);

  const [detail, setDetail] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (id) {
        const response = await api.get(`api/posts/${id}`);

        if (response.data) {
          breadcrumb.push({
            name: 'Home',
            href: `/`
          });
          breadcrumb.push({
            name: response.data.data.post_type_id,
            href: `/posts/type/${response.data.data.type_slug}`
          });
          breadcrumb.push({
            name: response.data.data.title
          });
          setDetail(response.data);
          setLoading(false);
        } else {
          setError(true);
        }
      }
    };
    fetchData();
  }, [id, breadcrumb]);

  if (isLoading)
    return (
      <>
        <Spinner size={'xl'} />
      </>
    );

  if (isError) return <div>Failed to load</div>;
  if (!detail) return <p>No data</p>;

  return (
    <>
      <BreadcrumbElement breadcrumb={breadcrumb} />
      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
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
