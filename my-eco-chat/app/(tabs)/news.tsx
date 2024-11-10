import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Sample news data
const newsArticles = [
  {
    id: '1',
    title: "Sin City could be called Solar City': How Las Vegas is going green",
    summary: "From conserving water to scaling up solar, Sin City is investing millions in sustainability measures.", 
    category: 'Technology',
    source: 'BBC',
    date: '2024-11-03',
    imageUrl: 'https://ichef.bbci.co.uk/images/ic/1376xn/p0k1ngy1.jpg.webp',
    url: 'https://www.bbc.com/future/article/20241101-how-las-vegas-is-becoming-a-sustainable-city',
    readTime: '4 min read'
  },
  {
    id: '2',
    title: 'Individual action on climate was tarred as greenwashing or virtue signalling. But it still has a place',
    summary: 'Two decades ago, the fight against climate change was often framed as a personal choice.',
    category: 'Climate Action',
    source: 'The Conversation',
    date: '2024-10-30',
    imageUrl: 'https://images.theconversation.com/files/626839/original/file-20241021-15-g7psr.jpg?ixlib=rb-4.1.0&q=30&auto=format&w=600&h=400&fit=crop&dpr=2',
    url: 'https://theconversation.com/individual-action-on-climate-was-tarred-as-greenwashing-or-virtue-signalling-but-it-still-has-a-place-239196',
    readTime: '3 min read'
  },
  {
    id: '3',
    title: 'Plastics pollution worsen the impacts of all Planetary Boundaries',
    summary: 'Ahead of the final negotiations of the international Plastics Treaty, researchers urge decision-makers to stop viewing plastics pollution as merely a waste management problem.',
    category: 'Policy',
    source: 'Science Daily',
    date: '2024-11-07',
    imageUrl: 'https://cdn.britannica.com/81/155881-050-38801D86/waste-beach-land-pollution-soil-water-health.jpg',
    url: 'https://www.sciencedaily.com/releases/2024/11/241107115050.htm',
    readTime: '5 min read'
  },
  {
    id: '4',
    title: 'Innovation And Sustainability: Allies Rather Than Rivals',
    summary: 'We set an example for a better future via education and research.', 
    category: 'Innovation',
    source: 'Forbes',
    date: '2023-10-10',
    imageUrl: 'https://imageio.forbes.com/specials-images/imageserve/65250e93ca86e36cc9df5866/Innovation-and-sustainability/0x0.jpg?format=jpg&crop=4225,2375,x0,y216,safe&width=1440',
    url: 'https://www.forbes.com/sites/esade/2023/10/10/innovation-and-sustainability-allies-rather-than-rivals/',
    readTime: '4 min read'
  }
];

const getCategoryColor = (category: string) => {
  const colors = {
    Technology: '#8B5CF6',
    'Climate Action': '#3B82F6',
    Policy: '#F59E0B',
    Innovation: '#10B981',
    default: '#6B7280'
  };
  return colors[category] || colors.default;
};

export default function News() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // In a real app, fetch new articles here
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleArticlePress = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Featured Article */}
      <TouchableOpacity
        style={styles.featuredCard}
        onPress={() => handleArticlePress(newsArticles[0].url)}
      >
        <Image
          source={{ uri: newsArticles[0].imageUrl }}
          style={styles.featuredImage}
        />
        <View style={styles.featuredContent}>
          <View style={styles.categoryPill}>
            <Text style={[
              styles.categoryText,
              { color: getCategoryColor(newsArticles[0].category) }
            ]}>
              {newsArticles[0].category}
            </Text>
          </View>
          <Text style={styles.featuredTitle}>{newsArticles[0].title}</Text>
          <Text style={styles.featuredSummary}>{newsArticles[0].summary}</Text>
          <View style={styles.articleMeta}>
            <Text style={styles.source}>{newsArticles[0].source}</Text>
            <View style={styles.readTimePill}>
              <Ionicons name="time-outline" size={12} color="#6B7280" />
              <Text style={styles.readTimeText}>{newsArticles[0].readTime}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Other Articles */}
      <View style={styles.articlesGrid}>
        {newsArticles.slice(1).map(article => (
          <TouchableOpacity
            key={article.id}
            style={styles.articleCard}
            onPress={() => handleArticlePress(article.url)}
          >
            <Image
              source={{ uri: article.imageUrl }}
              style={styles.articleImage}
            />
            <View style={styles.articleContent}>
              <View style={styles.categoryPill}>
                <Text style={[
                  styles.categoryText,
                  { color: getCategoryColor(article.category) }
                ]}>
                  {article.category}
                </Text>
              </View>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <View style={styles.articleMeta}>
                <Text style={styles.source}>{article.source}</Text>
                <View style={styles.readTimePill}>
                  <Ionicons name="time-outline" size={12} color="#6B7280" />
                  <Text style={styles.readTimeText}>{article.readTime}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  featuredCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    height: 200,
  },
  featuredContent: {
    padding: 16,
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  featuredSummary: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 12,
  },
  articlesGrid: {
    padding: 16,
    gap: 16,
  },
  articleCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  articleImage: {
    width: '100%',
    height: 150,
  },
  articleContent: {
    padding: 16,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  categoryPill: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 12,
    color: '#6B7280',
  },
  readTimePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  readTimeText: {
    fontSize: 12,
    color: '#6B7280',
  },
});