import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator
} from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

const BreadcrumbElement = ({ breadcrumb }) => {
  return (
    <Breadcrumb
      paddingY={2}
      fontSize={{ base: '1rem', sm: '1.2rem' }}
      spacing="8px"
      separator={<ChevronRightIcon color="gray.500" />}
    >
      {breadcrumb.map((item, index) => {
        if (index === breadcrumb.length - 1) {
          return (
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{item.name}</BreadcrumbLink>
            </BreadcrumbItem>
          );
        }
        return (
          <BreadcrumbItem key={index}>
            <NextLink href={item.href} passHref>
              <BreadcrumbLink fontWeight={'bold'}>{item.name}</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        );
      })}

      {/* {post ? (
        <>
          <BreadcrumbItem>
            <NextLink href={`/posts/type/${post.data.type_slug}`} passHref>
              <BreadcrumbLink>{post.data.post_type_id}</BreadcrumbLink>
            </NextLink>
            <BreadcrumbSeparator
              color="tomato"
              fontSize="10px"
              fontWeight="bold"
            />
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>{post.data.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </>
      ) : undefined} */}
    </Breadcrumb>
  );
};

export default BreadcrumbElement;
