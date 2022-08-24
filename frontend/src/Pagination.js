import React from "react";
import { usePagination, DOTS } from "./hooks/usePagination";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  HStack,
  VStack,
  ListItem,
  ListIcon,
  List,
} from "@chakra-ui/react";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  debugger;
  return (
    <List>
      <HStack spacing={7}>
        {currentPage !== 1 && (
          <ListItem onClick={onPrevious}>
            <ArrowLeftIcon w={6} h={6} />
          </ListItem>
        )}
        {paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <ListItem>{`&#8230`}</ListItem>;
          }

          return (
            <ListItem onClick={() => onPageChange(pageNumber)}>
              {pageNumber}
            </ListItem>
          );
        })}
        {currentPage !== lastPage && (
          <ListItem onClick={onNext}>
            <ArrowRightIcon w={6} h={6} />
          </ListItem>
        )}
      </HStack>
    </List>
  );
};

export default Pagination;
