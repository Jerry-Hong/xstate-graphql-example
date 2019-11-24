import { ApolloClient } from 'apollo-boost';
import { httpLink } from './links';
import { InMemoryCache } from 'apollo-cache-inmemory';

const cache = new InMemoryCache();
export const client = new ApolloClient({ cache, link: httpLink });
