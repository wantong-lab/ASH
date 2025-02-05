import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Container,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  useToast,
  List,
  ListItem,
  Heading,
  Divider,
  Link,
  Spinner,
} from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { logger } from './utils/logger';

const API_BASE_URL = 'http://localhost:3000/api';

interface Feed {
  id: number;
  url: string;
  title: string;
  description: string;
}

interface Article {
  id: number;
  title: string;
  link: string;
  content: string;
  pub_date: string;
}

function App() {
  useEffect(() => {
    logger.info('ASH application started');
  }, []);

  const [newFeedUrl, setNewFeedUrl] = useState('');
  const [selectedFeed, setSelectedFeed] = useState<number | null>(null);
  const toast = useToast();
  const queryClient = useQueryClient();

  // 获取所有RSS订阅源
  const { data: feeds, isLoading: feedsLoading } = useQuery<Feed[]>('feeds', async () => {
    logger.info('Fetching feeds');
    try {
      const response = await axios.get(`${API_BASE_URL}/feeds`);
      logger.info(`Successfully fetched ${response.data.length} feeds`);
      return response.data;
    } catch (error) {
      logger.error('Error fetching feeds:', error);
      throw error;
    }
  });

  // 获取选中订阅源的文章
  const { data: articles, isLoading: articlesLoading } = useQuery<Article[]>(
    ['articles', selectedFeed],
    async () => {
      if (!selectedFeed) return [];
      logger.info(`Fetching articles for feed ID: ${selectedFeed}`);
      try {
        const response = await axios.get(`${API_BASE_URL}/feeds/${selectedFeed}/articles`);
        logger.info(`Successfully fetched ${response.data.length} articles for feed ID: ${selectedFeed}`);
        return response.data;
      } catch (error) {
        logger.error(`Error fetching articles for feed ID: ${selectedFeed}:`, error);
        throw error;
      }
    },
    { enabled: !!selectedFeed }
  );

  // 添加新的RSS订阅源
  const addFeedMutation = useMutation(
    async (url: string) => {
      logger.info(`Adding new feed: ${url}`);
      const response = await axios.post(`${API_BASE_URL}/feeds`, { url });
      return response.data;
    },
    {
      onSuccess: (data) => {
        logger.info('Successfully added new feed:', data);
        queryClient.invalidateQueries('feeds');
        toast({
          title: '订阅成功',
          status: 'success',
          duration: 3000,
        });
        setNewFeedUrl('');
      },
      onError: (error: any) => {
        logger.error('Error adding feed:', error);
        toast({
          title: '订阅失败',
          description: error.response?.data?.error || '请检查RSS地址是否正确',
          status: 'error',
          duration: 3000,
        });
      },
    }
  );

  const handleAddFeed = () => {
    if (!newFeedUrl.trim()) {
      logger.warn('Attempted to add feed with empty URL');
      toast({
        title: '请输入RSS地址',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    addFeedMutation.mutate(newFeedUrl);
  };

  return (
    <ChakraProvider>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="lg" mb={4}>ASH - Advanced Smart Hub</Heading>
            <Text fontSize="md" color="gray.600" mb={4}>
              Your Personal RSS Reading Experience
            </Text>
          </Box>

          <Box>
            <HStack>
              <Input
                placeholder="输入RSS订阅地址"
                value={newFeedUrl}
                onChange={(e) => setNewFeedUrl(e.target.value)}
              />
              <Button
                colorScheme="blue"
                onClick={handleAddFeed}
                isLoading={addFeedMutation.isLoading}
              >
                添加订阅
              </Button>
            </HStack>
          </Box>

          <HStack align="start" spacing={8}>
            <Box w="300px">
              <Heading size="md" mb={4}>订阅列表</Heading>
              {feedsLoading ? (
                <Spinner />
              ) : (
                <List spacing={2}>
                  {feeds?.map((feed) => (
                    <ListItem
                      key={feed.id}
                      p={2}
                      bg={selectedFeed === feed.id ? 'blue.50' : 'transparent'}
                      cursor="pointer"
                      onClick={() => {
                        logger.info(`Selected feed: ${feed.title} (ID: ${feed.id})`);
                        setSelectedFeed(feed.id);
                      }}
                      _hover={{ bg: 'gray.50' }}
                      borderRadius="md"
                    >
                      <Text fontWeight="medium">{feed.title}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {feed.description}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>

            <Box flex={1}>
              <Heading size="md" mb={4}>文章列表</Heading>
              {articlesLoading ? (
                <Spinner />
              ) : (
                <List spacing={4}>
                  {articles?.map((article) => (
                    <ListItem key={article.id}>
                      <VStack align="start" p={4} bg="gray.50" borderRadius="md">
                        <Link 
                          href={article.link} 
                          isExternal
                          onClick={() => {
                            logger.info(`Clicked article: ${article.title} (ID: ${article.id})`);
                          }}
                        >
                          <Text fontSize="lg" fontWeight="bold">
                            {article.title}
                          </Text>
                        </Link>
                        <Text color="gray.600">
                          {new Date(article.pub_date).toLocaleString()}
                        </Text>
                        <Divider />
                        <Box
                          dangerouslySetInnerHTML={{ __html: article.content }}
                          sx={{
                            'img': {
                              maxWidth: '100%',
                              height: 'auto',
                            }
                          }}
                        />
                      </VStack>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </HStack>
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App; 