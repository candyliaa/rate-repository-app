import { TextInput, View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
});

const initialValues = {
    username: '',
    password: '',
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

export const SignInForm = ({ onSubmit }) => {
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
            <Pressable onPress={formik.handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
        </View>
    );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignInForm onSubmit={onSubmit} />
  )
};

export default SignIn;
