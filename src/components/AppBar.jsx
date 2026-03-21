import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

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
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabContainer}>
        <AppBarTab text="Repositories" to="/" />
        <AppBarTab text="Sign in" to="/signin" />
      </ScrollView>
    </View>
  )
};

export default AppBar;