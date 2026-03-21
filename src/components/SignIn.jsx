import { TextInput, View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';

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
})

const SignInForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    return (
        <View style={styles.flexContainer}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                secureTextEntry={true}
            />
            <Pressable onPress={formik.handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
        </View>
    );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;