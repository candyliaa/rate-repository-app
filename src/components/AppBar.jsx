import { View, Text, StyleSheet, Pressable } from 'react-native';
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

const AppBarTab = ({ text }) => {
    return (
        <Pressable style={styles.tab}>
            <Text style={styles.tabText}>{text}</Text>
        </Pressable>
    );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
        <View style={styles.tabContainer}>
            <AppBarTab text="Repositories" />
        </View>
    </View>
  )
   
};

export default AppBar;