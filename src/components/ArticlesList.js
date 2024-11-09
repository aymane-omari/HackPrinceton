import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

const articles = [
  { id: '1', title: 'Sustainability in Daily Life' },
  { id: '2', title: 'Reducing Carbon Footprint' },
  // Add more articles as needed
];

function ArticlesList() {
  const openArticle = (id) => {
    // Implement article opening logic
  };

  return (
    <FlatList
      data={articles}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => openArticle(item.id)}>
          <Text style={styles.articleItem}>{item.title}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ArticlesList;

const styles = StyleSheet.create({
  articleItem: {
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
