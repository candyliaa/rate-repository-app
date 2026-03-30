import Text from "./Text";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 15
    },
    rating: {
        borderWidth: 3,
        borderColor: '#0366d6',
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginRight: 15,
        fontWeight: 'bold',
        color: '#0366d6',
    },
})

const ReviewItem = ({ review }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.rating}>{review.rating}</Text>
                <View>
                    <Text fontWeight="bold">{review.user.username}</Text>
                    <Text color="textSecondary">{new Date(review.createdAt).toLocaleDateString()}</Text>
                </View>
            </View>
            <Text>{review.text}</Text>
        </View>
    );
};

export default ReviewItem;