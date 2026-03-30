import { TextInput, View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import { SIGN_UP } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(5, 'Username must be at least 5 letters long')
        .max(30, 'Username must be at most 30 letters long')
        .required('Username is required'),

    password: yup
        .string()
        .min(5, 'Password must be at least 5 letters long')
        .max(50, 'Password must be at most 50 letters long')
        .required('Password is required'),

    passwordConfirmation: yup
       .string()
       .oneOf([yup.ref('password'), null])
       .required('Password confirmation is required')
});

const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
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
                    formik.touched.username && formik.errors.username && styles.invalidInput
                ]}
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
            )}
            <TextInput
                style={[styles.input,
                    formik.touched.password && formik.errors.password && styles.invalidInput
                ]}
                placeholder="Password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                secureTextEntry={true}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
            )}
            <TextInput
                style={[styles.input,
                    formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && styles.invalidInput
                ]}
                placeholder="Password Confirmation"
                value={formik.values.passwordConfirmation}
                onChangeText={formik.handleChange('passwordConfirmation')}
                secureTextEntry={true}
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                <Text style={{ color: '#d73a4a' }}>{formik.errors.passwordConfirmation}</Text>
            )}
            <Pressable onPress={formik.handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign up</Text>
            </Pressable>
        </View>
    );
};

const SignUp = () => {
  let navigate = useNavigate();
  const [signIn] = useSignIn();
  const [mutate] = useMutation(SIGN_UP);

  const onSubmit = async (values) => {
    const { username, password } = values

    try {
      const { data } = await mutate({
        variables: {
            user: {
                username,
                password
            },
        },
      });

      await signIn({ username, password })
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ReviewForm onSubmit={onSubmit} />
  )
};

export default SignUp;