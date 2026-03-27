import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

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
})

const checkLength = (count) => {
    return count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count.toString();
}

const RepositoryItem = ({ item }) => {
    return (
        <View style={styles.container} testID="repositoryItem">
            <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
            <Text fontWeight="bold">Full name: {item.fullName}{'\n'}</Text>
            <Text color="textSecondary">Description: {item.description}{'\n'}</Text>
            <Text style={styles.language}>Language: {item.language}{'\n'}</Text>
            <View style={styles.flexContainer}>
                <Text fontWeight="bold">Forks: {checkLength(item.forksCount)}{'\n'}</Text>
                <Text fontWeight="bold">Stars: {checkLength(item.stargazersCount)}{'\n'}</Text>
                <Text fontWeight="bold">Rating: {checkLength(item.ratingAverage)}{'\n'}</Text>
                <Text fontWeight="bold">Reviews: {checkLength(item.reviewCount)}{'\n'}</Text>
            </View>
        </View>
    )
}

export default RepositoryItem