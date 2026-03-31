import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';
import React from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [orderPrinciple, setOrderPrinciple] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  let variables;
  if (orderPrinciple === 'highest') {
    variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC', searchKeyword: debouncedSearchQuery || '' };
  } else if (orderPrinciple === 'lowest' ) {
    variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC', searchKeyword: debouncedSearchQuery || '' }
  } else {
    variables = { orderBy: 'CREATED_AT', orderDirection: 'DESC', searchKeyword: debouncedSearchQuery || '' }
  }

  const { repositories } = useRepositories(variables);

  return <RepositoryListContainer 
    repositories={repositories}
    orderPrinciple={orderPrinciple}
    setOrderPrinciple={setOrderPrinciple}
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
  />;
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { orderPrinciple, setOrderPrinciple, searchQuery, setSearchQuery } = this.props;

    return (
      <View>
        <Searchbar
          placeholder="Search repositories"
          onChangeText={setSearchQuery}
          value={searchQuery}      
        />
        <Picker
          selectedValue={orderPrinciple}
          onValueChange={(value) => setOrderPrinciple(value)}
        >
          <Picker.Item label='Latest repositories' value="latest"/>
          <Picker.Item label='Highest rated repositories' value="highest" />
          <Picker.Item label='Lowest rated repositories' value="lowest"/>
        </Picker>
      </View>
    );
  };

  render() {
    const { repositories } = this.props;
    const repositoryNodes = repositories ? repositories.edges.map(e => e.node) : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        ListHeaderComponent={this.renderHeader}
        keyExtractor={(item) => item.id}
      />
    );
  }
}

export default RepositoryList;
