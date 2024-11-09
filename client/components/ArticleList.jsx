// components/ArticleList.jsx

import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const ArticleList = () => {
  // Hardcoded list of descriptive articles
  const articles = [
    {
      id: '1',
      title: 'Innovative Ways to Reduce Plastic Waste in Daily Life',
      description:
        'Discover practical strategies and innovative products that help minimize plastic usage in your everyday routines.',
      url: 'https://www.wwf.org.au/news/blogs/10-tips-to-reduce-plastic-waste#gs.88f8w3',
      imageUrl: 'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg',
    },
    {
      id: '2',
      title: 'The Rise of Renewable Energy: How Solar and Wind are Transforming the Grid',
      description:
        'An in-depth look at how renewable energy sources are becoming more efficient and cost-effective, reshaping our energy infrastructure.',
      url: 'https://www.energy.gov/eere/renewable-energy',
      imageUrl: 'https://images.unsplash.com/photo-1501661778992-3c5d1a6865a1',
    },
    {
      id: '3',
      title: 'Sustainable Fashion: Building a Wardrobe That’s Kind to the Earth',
      description:
        'Learn how to make eco-friendly choices in fashion, from selecting sustainable materials to supporting ethical brands.',
      url: 'https://www.sustainablefashionmatterz.com/',
      imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
    },
    {
      id: '4',
      title: 'Urban Gardening: How to Grow Your Own Food in the City',
      description:
        'A guide to starting your own urban garden, including tips on choosing plants, maximizing space, and the benefits of local food production.',
      url: 'https://www.gardeners.com/how-to/urban-gardening/9260.html',
      imageUrl: 'https://images.unsplash.com/photo-1583169673927-1a6a60c4a07c',
    },
    {
      id: '5',
      title: 'Understanding Your Carbon Footprint and How to Reduce It',
      description:
        'Explore what a carbon footprint is, how your activities contribute to it, and actionable steps to lower your environmental impact.',
      url: 'https://www.carbonfootprint.com/calculator.aspx',
      imageUrl: 'https://images.unsplash.com/photo-1548187275-c984c84f61f8',
    },
    {
      id: '6',
      title: 'The Impact of Meat Consumption on Climate Change',
      description:
        'Examine the environmental effects of meat production and discover plant-based alternatives to reduce your carbon footprint.',
      url: 'https://www.greenpeace.org/usa/10-ways-you-can-fight-climate-change/',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836',
    },
    {
      id: '7',
      title: 'Zero-Waste Living: Tips for a Sustainable Lifestyle',
      description:
        'Learn how to adopt a zero-waste lifestyle with practical tips on reducing waste, recycling, and reusing everyday items.',
      url: 'https://www.earthday.org/zero-waste-tips/',
      imageUrl: 'https://images.unsplash.com/photo-1520857000480-8b152583a3bb',
    },
    {
      id: '8',
      title: 'The Benefits of Composting and How to Get Started',
      description:
        'Discover the environmental advantages of composting and step-by-step instructions to begin composting at home.',
      url: 'https://www.gardeningknowhow.com/composting/starting/benefits-of-composting.htm',
      imageUrl: 'https://images.unsplash.com/photo-1582203428570-3204ba1dc65f',
    },
    {
      id: '9',
      title: 'Electric Vehicles: Driving Towards a Greener Future',
      description:
        'An overview of electric vehicles, their benefits, and how they contribute to reducing greenhouse gas emissions.',
      url: 'https://www.epa.gov/greenvehicles/electric-vehicle-basics',
      imageUrl: 'https://images.unsplash.com/photo-1543168256-418811576931',
    },
    {
      id: '10',
      title: 'Sustainable Travel: Eco-Friendly Tips for Your Next Trip',
      description:
        'Explore ways to make your travels more sustainable, from choosing eco-friendly accommodations to minimizing your carbon footprint.',
      url: 'https://www.sustainabletravel.org/sustainable-travel-tips/',
      imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    },
    {
      id: '11',
      title: 'Renewable Energy at Home: Solar Panels and Beyond',
      description:
        'Learn about installing renewable energy solutions at home, including solar panels and wind turbines, to reduce energy costs and environmental impact.',
      url: 'https://www.energy.gov/eere/solar/homeowners-guide-going-solar',
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a',
    },
    {
      id: '12',
      title: 'The Role of Bees in Our Ecosystem and How to Protect Them',
      description:
        'Understand the critical role bees play in pollination and biodiversity, and learn how you can help protect them.',
      url: 'https://www.earthday.org/campaign/save-bees/',
      imageUrl: 'https://images.unsplash.com/photo-1507919982585-8d8d4f7c51ba',
    },
    {
      id: '13',
      title: 'Reducing Food Waste: Simple Steps to Make a Big Difference',
      description:
        'Find out how reducing food waste at home can have a significant impact on the environment and your wallet.',
      url: 'https://www.unep.org/thinkeatsave/',
      imageUrl: 'https://images.unsplash.com/photo-1589715271593-d486f2fae8f2',
    },
    {
      id: '14',
      title: 'Eco-Friendly Home Improvements for Energy Efficiency',
      description:
        'Discover home improvement ideas that enhance energy efficiency, lower utility bills, and reduce environmental impact.',
      url: 'https://www.energystar.gov/campaign/home',
      imageUrl: 'https://images.unsplash.com/photo-1563729784474-5fa3e6409dab',
    },
    {
      id: '15',
      title: 'The Importance of Biodiversity and How to Support It',
      description:
        'Learn about the value of biodiversity in ecosystems and actions you can take to preserve it.',
      url: 'https://www.worldwildlife.org/pages/what-is-biodiversity',
      imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9',
    },
];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.articleContainer}
      onPress={() => Linking.openURL(item.url)}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.articleImage} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>Image Unavailable</Text>
        </View>
      )}
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle}>{item.title}</Text>
        {item.description && (
          <Text style={styles.articleDescription} numberOfLines={3}>
            {item.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={articles}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  articleContainer: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
  },
  articleImage: {
    width: '100%',
    height: 200,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  articleContent: {
    padding: 12,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  articleDescription: {
    fontSize: 14,
    color: '#555',
  },
});

export default ArticleList;
