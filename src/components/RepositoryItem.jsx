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
        <View style={styles.container}>
            <Image source={{ uri: item.ownerAvatarUrl }} style={styles.avatar} />
            <Text fontWeight="bold">Full name: {item.fullName}</Text>
            <Text color="textSecondary">Description: {item.description}</Text>
            <Text style={styles.language}>Language: {item.language}</Text>
            <View style={styles.flexContainer}>
                <Text fontWeight="bold">Stars: {checkLength(item.stargazersCount)}</Text>
                <Text fontWeight="bold">Forks: {checkLength(item.forksCount)}</Text>
                <Text fontWeight="bold">Reviews: {checkLength(item.reviewCount)}</Text>
                <Text fontWeight="bold">Rating: {checkLength(item.ratingAverage)}</Text>
            </View>
        </View>
    )
}

export default RepositoryItem