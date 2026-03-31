import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../graphql/queries";

const useCurrentUser = (options) => {
    const { includeReviews = false } = (options || {});
    const { data, loading, error, refetch } = useQuery(GET_CURRENT_USER, {
        variables: { includeReviews },
        fetchPolicy: 'cache-and-network',
    });

    return {
        user: data?.me,
        loading,
        error,
        refetch,
    }
};

export default useCurrentUser;