
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import { getUser } from '../Data/UserData';

const categories = ['All', 'Fast Food', 'Continental', 'Chinese'];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const customerEmail = getUser() || 'guest@example.com'; // 👈 user email from login

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://cafe-app-7a85a-default-rtdb.firebaseio.com/foodItems.json'
        );
        const data = await response.json();

        const productsData = [];
        for (const key in data) {
          productsData.push({
            id: key,
            name: data[key].name,
            price: data[key].price,
            image: { uri: data[key].image },
            category: data[key].category,
            description: data[key].description,
          });
        }
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = products.filter(item => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;

    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
     <Header navigation={navigation} userId={customerEmail} />

      <View style={styles.container}>
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <Text style={styles.title}>Food Categories</Text>

        <View style={styles.buttonWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.activeCategory,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.activeCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ flex: 1 }} />
        ) : filteredItems.length === 0 ? (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No items found for your search.</Text>
          </View>
        ) : (
          <FlatList
            data={filteredItems}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <FoodCard item={item} userEmail={customerEmail} /> // 👈 pass to card
            )}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <Footer navigation={navigation} userEmail={customerEmail} /> {/* 👈 email to Footer */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  noResultsText: {
    color: '#ccc',
    fontSize: 16,
    fontStyle: 'italic',
  },
  container: {
    marginTop: 10,
    paddingHorizontal: 16,
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#f5f5dc',
    textAlign: 'left',
  },
  buttonWrapper: {
    marginBottom: 15,
  },
  categoryScroll: {
    paddingLeft: 4,
    paddingRight: 16,
  },
  categoryButton: {
    backgroundColor: 'rgb(241, 233, 197)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 10,
    elevation: 2,
  },
  activeCategory: {
    backgroundColor: '#6b4c3b',
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});

export default HomeScreen;
