import React, { Fragment, useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  Stack,
  Text
} from '@chakra-ui/react';
import Pagination from '../../Pagination';

const OpinionList = ({ opinions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const PageSize = 2;
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return opinions.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  return (
    <Fragment>
      <Flex
        align="center"
        justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
        direction={{ base: 'reverse-row' }}
        wrap="no-wrap"
        ml="24"
      >
        <Box
          w={{ base: '80%', sm: '60%', md: '50%' }}
          mb={{ base: 12, md: 0 }}
          ml={{ base: 20, md: 0 }}
        >
          <Box borderRadius="lg" maxW="500px">
            <Stack>
              {currentTableData.map(({ date, opinion, rating, user }) => {
                return (
                  <>
                    <Box w="500px" h="200px">
                      <HStack justifyContent="space-between">
                        <HStack>
                          <Avatar name={user} />
                          <Box>
                            <Text
                              fontSize="xl"
                              fontWeight="bold"
                              color="primary.800"
                            >
                              {user}
                            </Text>
                            <Text
                              fontSize="sm"
                              fontWeight="bold"
                              color="primary"
                            >
                              Rating: {rating}
                            </Text>
                          </Box>
                        </HStack>
                        <Text fontSize="md" fontWeight="bold" color="gray.500">
                          {date}
                        </Text>
                      </HStack>
                      <Box p="4">
                        <Text>{opinion}</Text>
                      </Box>
                    </Box>
                    <Divider orientation="horizontal" />
                  </>
                );
              })}
            </Stack>
            <Container>
              <Pagination
                currentPage={currentPage}
                totalCount={opinions.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
              />
            </Container>
          </Box>
        </Box>
      </Flex>
    </Fragment>
  );
};

export default OpinionList;
