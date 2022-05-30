import React, { useEffect, useState } from 'react';
import { Box, Grid, GridItem, Heading, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import {
  PostDetail,
  BreadcrumbElement,
  ListVPost,
  PostContainer,
  Section,
  Pagination,
  PostItem,
  Loading
} from '../../../components';
import { usePostsByType } from 'hooks';
import { IBreadcrumb } from 'types';
import { slugToName } from 'helper';

const PostDetailPageByType = () => {
  const param = useRouter();
  const { slug } = param.query;

  const breadcrumb: IBreadcrumb[] = [];
  const [page, setPage] = useState(1);
  const { posts, isLoading, isError } = usePostsByType(slug, page);

  if (isError) return <div>Failed to load</div>;
  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );

  if (!isError && !isLoading) {
    console.log('Slug 1', slug);

    breadcrumb.push({
      name: 'Trang chủ',
      href: `/`
    });
    breadcrumb.push({
      name: slugToName(slug),
      href: `/posts/type/${slug}`
    });
    // breadcrumb.push({
    //   name: posts.data.length ? posts.data[0].post_type_id : slugToName(slug),
    //   href: `/posts/type/${slug}`
    // });
  }

  return (
    <>
      <BreadcrumbElement breadcrumb={breadcrumb} />
      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        <GridItem colSpan={{ base: 3, md: 2 }}>
          {posts.data.length ? (
            <PostContainer>
              <Section delay={0.1}>
                <Heading as="h2" fontSize={'30'} my={3}>
                  {/* Tài liệu của mục {posts.data[0].post_type_id} */}
                  Tài liệu của mục {slugToName(slug)}
                </Heading>
              </Section>
              {posts.data.map((post, i) => (
                <Section key={i} delay={(i + 1) * 0.1 + 0.1} x={(i + 1) * -100}>
                  <PostItem post={post} />
                </Section>
              ))}
              <Pagination
                links={posts.links}
                meta={posts.meta}
                setPage={setPage}
              />
            </PostContainer>
          ) : (
            <Text>Không có tài liệu nào!</Text>
          )}
        </GridItem>
        <GridItem
          display={'block'}
          colSpan={{ base: 3, md: 1 }}
          position="sticky"
          top={180}
        >
          <ListVPost title="Tài liệu liên quan" slug={slug} />
        </GridItem>
      </Grid>
    </>
  );
};

export default PostDetailPageByType;
