import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { SIGNED_IN } from '../graphql/queries';
import { useApolloClient } from '@apollo/client';
import Constants from 'expo-constants';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  tab: {
    marginRight: 10,
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

const AppBarTab = ({ text, to }) => {
    return (
        <Link to={to} component={Pressable} style={styles.tab}>
          <Text style={styles.tabText}>{text}</Text>
        </Link>
    );
};

const AppBar = () => {
  const { data } = useQuery(SIGNED_IN);
  const signed_in = data?.me;

  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabContainer}>
        <AppBarTab text="Repositories" to="/" />
        {signed_in ? (
          <>
            <Pressable onPress={onSignOut} style={styles.tab}>
            <Text style={styles.tabText}>Sign out</Text>
            </Pressable>
          <AppBarTab text="Create a review" to="/review" />
          </>
        ) : (
          <>
            <AppBarTab text="Sign in" to="/signin" />
            <AppBarTab text="Sign up" to="/signup" />
          </>
        )}
      </ScrollView>
    </View>
  )
};

export default AppBar;