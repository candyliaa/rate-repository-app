import { useQuery } from "@apollo/client";
import { SINGLE_REPO } from "../graphql/queries";

const useRepository = (id) => {
    const { data, loading, error, refetch } = useQuery(SINGLE_REPO, {
        variables: { id },
        fetchPolicy: 'cache-and-network',
    });
    const repository = data?.repository;
    return { repository, loading, error, refetch }
}

export default useRepository