import { View, Image, StyleSheet, Pressable, Linking } from 'react-native';
import Text from './Text';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginBottom: 5,
    },
    language: {
        alignSelf: 'flex-start',
        backgroundColor: '#0366d6',
        color: 'white',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 3,
        overflow: 'hidden',
    },
    flexContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5
    },
    githubButton: {
        backgroundColor: '#0366d6',
        paddingVertical: 15,
        borderRadius: 6,
        width: 400,
        alignItems: 'center',
        alignSelf: 'center'
    },
})

const checkLength = (count) => {
    return count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count.toString();
}

const RepositoryItem = ({ item, singleView }) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(`/${item.id}`);
  };

  const openGithub = () => {
    Linking.openURL(`https://github.com/${item.fullName}`);
  };

  const content = (
    <View style={styles.container} testID="repositoryItem">
      <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
      <Text fontWeight="bold">Full name: {item.fullName}</Text>
      <Text color="textSecondary">Description: {item.description}</Text>
      <Text style={styles.language}>Language: {item.language}</Text>
      <View style={styles.flexContainer}>
        <Text fontWeight="bold">Forks: {checkLength(item.forksCount)}</Text>
        <Text fontWeight="bold">Stars: {checkLength(item.stargazersCount)}</Text>
        <Text fontWeight="bold">Rating: {checkLength(item.ratingAverage)}</Text>
        <Text fontWeight="bold">Reviews: {checkLength(item.reviewCount)}</Text>
      </View>
      {singleView && (
        <Pressable style={styles.githubButton} onPress={() => openGithub()}>
          <Text style={{ color: 'white' }}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );

  return singleView ? (
    content
  ) : (
    <Pressable onPress={navigateTo}>
      {content}
    </Pressable>
  );
};

export default RepositoryItem