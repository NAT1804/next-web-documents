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
            <BreadcrumbItem key={index} isCurrentPage>
              <BreadcrumbLink>{item.name}</BreadcrumbLink>
            </BreadcrumbItem>
          );
        }
        return (
          <BreadcrumbItem key={index}>
            {item.href ? (
              <NextLink href={item.href} passHref>
                <BreadcrumbLink fontWeight={'bold'}>{item.name}</BreadcrumbLink>
              </NextLink>
            ) : (
              <BreadcrumbLink>{item.name}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbElement;
