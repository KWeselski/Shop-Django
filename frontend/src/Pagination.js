import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { Button, Container, HStack, List, ListItem } from '@chakra-ui/react';
import { DOTS, usePagination } from './hooks/usePagination';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  let lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <List>
      <Container>
        <HStack spacing={7} justifyContent="center">
          <ListItem onClick={currentPage === 1 ? undefined : onPrevious}>
            <ArrowLeftIcon w={6} h={6} />
          </ListItem>
          {paginationRange.map(pageNumber => {
            if (pageNumber === DOTS) {
              return <ListItem>{`&#8230`}</ListItem>;
            }

            return (
              <ListItem>
                <Button
                  bg={currentPage === pageNumber ? 'black' : 'white'}
                  color={currentPage === pageNumber ? 'white' : 'black'}
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </Button>
              </ListItem>
            );
          })}
          <ListItem onClick={currentPage === lastPage ? undefined : onNext}>
            <ArrowRightIcon w={6} h={6} />
          </ListItem>
        </HStack>
      </Container>
    </List>
  );
};

export default Pagination;
