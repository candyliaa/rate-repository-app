import { useParams } from 'react-router-native';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository.js';
import ReviewItem from './ReviewItem.jsx';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryContainer = () => {
    const { id } = useParams();
    const { repository, loading } = useRepository(id)

    if (loading) return null;
    
    const reviews = repository.reviews
        ? repository.reviews.edges.map(edge => edge.node)
        : [];

    return (
        <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => (
            <View style={{ marginBottom: 10 }}>
                <RepositoryItem item={repository} singleView />
            </View>
            )}
        />
    );
};

export default RepositoryContainer;