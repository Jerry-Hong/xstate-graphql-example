import { createHttpLink } from "apollo-link-http";

export const httpLink = createHttpLink({
  uri: `https://api.spacex.land/graphql/`,
});