import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import ManagerForm from '../components/ManagerForm.jsx';
import MFoodCard from '../components/MFoodCard.jsx';
//import foodItemsData from '../Data/foodItems';
import { setUser } from '../Data/UserData';

const MDashboardScreen = () => {
  const navigation = useNavigation();
  const [foodItems, setFoodItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    console.log("✅ MDashboardScreen rendered");
    const fetchFoodItems = async () => {
    try {
      const response = await fetch('https://cafe-app-7a85a-default-rtdb.firebaseio.com/foodItems.json');
      const data = await response.json();

      const formattedItems = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      }));

      setFoodItems(formattedItems);
    } catch (error) {
      console.error('❌ Error fetching data:', error);
    }
  };

  fetchFoodItems();
  }, []);

  const handleAddEdit = (item) => {
    if (editItem) {
      setFoodItems((prev) =>
        prev.map((f) => (f.id === item.id ? item : f))
      );
    } else {
      setFoodItems((prev) => [...prev, item]);
    }
    setEditItem(null);
  };

 const handleDelete = async (id) => {
  try {
    await fetch(`https://cafe-app-7a85a-default-rtdb.firebaseio.com/foodItems/${id}.json`, {
      method: 'DELETE',
    });
    setFoodItems((prev) => prev.filter((item) => item.id !== id));
    console.log('🗑️ Item deleted from DB and UI');
  } catch (error) {
    console.error('❌ Failed to delete item:', error);
  }
};


  const openAddModal = () => {
    setEditItem(null);
    setModalVisible(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setModalVisible(true);
  };

  
  const handleLogout = async () => {
    await setUser(null); 
    navigation.replace('Login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manager Dashboard</Text>

      <Button title="Add New Food Item" onPress={openAddModal} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Logout" color="#ff4d4d" onPress={handleLogout} />

      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MFoodCard item={item} onEdit={openEditModal} onDelete={handleDelete} />
        )}
      />

      <ManagerForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddEdit}
        itemToEdit={editItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  }
});

export default MDashboardScreen;

