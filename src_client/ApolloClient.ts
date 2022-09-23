import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const hostName =
  document !== null && document !== undefined
    ? document.location.host
    : "localhost:3434";
const cache = new InMemoryCache();
const link = new HttpLink({
  uri: `http://${hostName}/graphql`,
});

const client = new ApolloClient({
  cache,
  link,
});

export default client;
