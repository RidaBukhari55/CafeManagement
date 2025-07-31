import { Button, Image, StyleSheet, Text, View } from 'react-native';


const MFoodCard = ({ item, onEdit, onDelete }) => {
  console.log('MFoodCard')
  return (
    <View style={styles.card}>
      
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.category}</Text>
        <Text>Rs. {item.price}</Text>
        <View style={styles.actions}>
          <Button title="Edit" onPress={() => onEdit(item)} />
          <Button title="Delete" color="red" onPress={() => onDelete(item.id)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8
  },
  info: {
    flex: 1,
    marginLeft: 10
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
    marginTop: 5
  }
});

export default MFoodCard;
