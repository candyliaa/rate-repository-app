import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [orderPrinciple, setOrderPrinciple] = useState('latest');

  let variables;
  if (orderPrinciple === 'highest') {
    variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' }
  } else if (orderPrinciple === 'lowest' ) {
    variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
  } else {
    variables = { orderBy: 'CREATED_AT', orderDirection: 'DESC' }
  }

  const { repositories } = useRepositories(variables);

  return <RepositoryListContainer 
    repositories={repositories}
    orderPrinciple={orderPrinciple}
    setOrderPrinciple={setOrderPrinciple}
  />;
};

export const RepositoryListContainer = ({ repositories, orderPrinciple, setOrderPrinciple }) => {
  console.log(repositories);

  const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

  const repoPicker = () => (
    <View>
      <Picker
        selectedValue={orderPrinciple}
        onValueChange={(value) => setOrderPrinciple(value)}
      >
        <Picker.Item label='Latest repositories' value="latest"/>
        <Picker.Item label='Highest rated repositories' value="highest" />
        <Picker.Item label='Lowest rated repositories' value="lowest"/>
      </Picker>
    </View>
  )

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={repoPicker}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;
