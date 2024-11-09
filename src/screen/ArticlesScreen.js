import React from 'react';
import { View, StyleSheet } from 'react-native';
import ArticlesList from '../components/ArticlesList';

function ArticlesScreen() {
  return (
    <View style={styles.container}>
      <ArticlesList />
    </View>
  );
}

export default ArticlesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
