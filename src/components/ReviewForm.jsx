import { TextInput, View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../hooks/useCreateReview';

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repository owner name is required'),

    repoName: yup
        .string()
        .required('Repository name is required'),

    rating: yup
        .number()
        .min(0, 'Rating must be at least 0')
        .max(100, 'Rating must be at most 100')
        .required('Rating is required'),

    reviewText: yup
        .string()
        .optional(),
});

const initialValues = {
    ownerName: '',
    repoName: '',
    rating: '',
    reviewText: ''
};

const styles = StyleSheet.create({
    flexContainer: {
        flexDirection: 'column',
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: 50,
        width: 300,
        alignItems: 'center',
        marginBottom: 10
    },
    button: {
        backgroundColor: '#0366d6',
        paddingVertical: 15,
        borderRadius: 6,
        width: 300,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    invalidInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#d73a4a',
        paddingHorizontal: 15,
        paddingVertical: 10,
        height: 50,
        width: 300,
        alignItems: 'center',
        marginBottom: 10
    }
})

export const ReviewForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <View style={styles.flexContainer}>
            <TextInput
                style={[styles.input,
                    formik.touched.ownerName && formik.errors.ownerName && styles.invalidInput
                ]}
                placeholder="Repository owner name"
                value={formik.values.ownerName}
                onChangeText={formik.handleChange('ownerName')}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={{ color: '#d73a4a' }}>{formik.errors.ownerName}</Text>
            )}
            <TextInput
                style={[styles.input,
                    formik.touched.repoName && formik.errors.repoName && styles.invalidInput
                ]}
                placeholder="Repository name"
                value={formik.values.repoName}
                onChangeText={formik.handleChange('repoName')}
            />
            {formik.touched.repoName && formik.errors.repoName && (
                <Text style={{ color: '#d73a4a' }}>{formik.errors.repoName}</Text>
            )}
            <TextInput
                style={[styles.input,
                    formik.touched.rating && formik.errors.rating && styles.invalidInput
                ]}
                placeholder="Rating"
                value={formik.values.rating}
                onChangeText={formik.handleChange('rating')}
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={{ color: '#d73a4a' }}>{formik.errors.rating}</Text>
            )}
            <TextInput
                style={[styles.input,
                    formik.touched.reviewText && formik.errors.reviewText && styles.invalidInput
                ]}
                placeholder="Review"
                value={formik.values.reviewText}
                onChangeText={formik.handleChange('reviewText')}
                multiline={true}
            />
            {formik.touched.reviewText && formik.errors.reviewText && (
                <Text style={{ color: '#d73a4a' }}>{formik.errors.reviewText}</Text>
            )}
            <Pressable onPress={formik.handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Create a review</Text>
            </Pressable>
        </View>
    );
};

const SubmitReview = () => {
  let navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { repoName, ownerName, rating, reviewText } = values;

    try {
      const review = await createReview({ repoName, ownerName, rating: Number(rating), reviewText });
      console.log(review);
      navigate(`/${review.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ReviewForm onSubmit={onSubmit} />
  )
};

export default SubmitReview