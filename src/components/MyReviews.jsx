import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Text from './Text'
import useCurrentUser from '../hooks/useCurrentUser';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
    const { user } = useCurrentUser({ includeReviews: true });

    const reviews = user?.reviews?.edges?.map(e => e.node) ?? [];

    return (
        <FlatList
            data={reviews}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={(item) => item.id}
        />
    );
};

export default MyReviews;