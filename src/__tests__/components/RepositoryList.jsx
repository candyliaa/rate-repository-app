import { screen, render } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../components/RepositoryList";

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      render(<RepositoryListContainer repositories={repositories} />)

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepoItem, secondRepoItem] = repositoryItems;
      
      expect(firstRepoItem).toHaveTextContent(/Full name: jaredpalmer\/formik/);
      expect(firstRepoItem).toHaveTextContent(/Description: Build forms in React, without the tears/);
      expect(firstRepoItem).toHaveTextContent(/Language: TypeScript/);
      expect(firstRepoItem).toHaveTextContent(/Forks: 1\.6k/);
      expect(firstRepoItem).toHaveTextContent(/Stars: 21\.9k/);
      expect(firstRepoItem).toHaveTextContent(/Rating: 88/);
      expect(firstRepoItem).toHaveTextContent(/Reviews: 3/);

      expect(secondRepoItem).toHaveTextContent(/Full name: async-library\/react-async/);
      expect(secondRepoItem).toHaveTextContent(/Flexible promise-based React data loader/);
      expect(secondRepoItem).toHaveTextContent(/Language: JavaScript/);
      expect(secondRepoItem).toHaveTextContent(/Forks: 69/);
      expect(secondRepoItem).toHaveTextContent(/Stars: 1\.8k/);
      expect(secondRepoItem).toHaveTextContent(/Rating: 72/);
      expect(secondRepoItem).toHaveTextContent(/Reviews: 3/);
    });
  });
});