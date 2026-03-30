import { CREATE_REVIEW } from "../graphql/mutations";
import { useMutation } from "@apollo/client";


const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const createReview = async ({ ownerName, repoName, rating, reviewText }) => {
        const { data } = await mutate({
            variables: {
                review: {
                    ownerName,
                    repositoryName: repoName,
                    rating: Number(rating),
                    text: reviewText,
                },
            },
        });

        return data.createReview;
    };

    return [createReview, result];
};

export default useCreateReview;