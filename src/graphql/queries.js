import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Repositories ($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
}
`;

export const SIGNED_IN = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const SINGLE_REPO = gql`
query Repository($id: ID!) {
  repository(id: $id) {
        id
        fullName
        description
        language
        forksCount
        stargazersCount
        ratingAverage
        reviewCount
        ownerAvatarUrl
        reviews {
          edges {
            node {
              id
              text
              rating
              createdAt
              user {
                id
                username
              }
            }
          }
        }
  }
}`;