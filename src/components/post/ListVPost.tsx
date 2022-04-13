import { Heading } from '@chakra-ui/react';
import React from 'react';

import Section from 'components/section/Section';
import { VPostItem } from './PostItem';

const listVPostItem = [1, 2, 3, 4, 5];

const ListVPost = () => {
  return (
    <>
      <Section delay={0.1}>
        <Heading as="h1" fontSize={'30'}>
          Tài liệu mới nhất
        </Heading>
      </Section>
      {listVPostItem.map((vpost, i) => (
        <Section key={i} delay={0.2} x={(i + 1) * 100}>
          <VPostItem id={vpost} />
        </Section>
      ))}
    </>
  );
};

export default ListVPost;
