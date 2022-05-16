import { Heading, Spinner, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import Section from 'components/section/Section';
import { VPostItem } from './PostItem';
import { usePosts } from 'hooks';

const ListVPost = () => {
  const { posts, isLoading, isError } = usePosts(1);

  const reverseArr = input => {
    let ret = new Array();
    for (let i = input.length - 1; i >= 0; --i) {
      ret.push(input[i]);
    }
    return ret;
  };

  if (isLoading)
    return (
      <>
        <Spinner size="xl" />
      </>
    );

  if (isError) {
    return (
      <>
        <div>Has Error</div>
      </>
    );
  }

  return (
    <>
      <Section delay={0.1}>
        <Heading as="h1" fontSize={'30'}>
          Tài liệu liên quan
        </Heading>
      </Section>
      {reverseArr(posts.data).map((vpost, i) => (
        <Section key={i} delay={0.2} x={(i + 1) * 100}>
          <VPostItem post={vpost} />
        </Section>
      ))}
    </>
  );
};

export default ListVPost;
