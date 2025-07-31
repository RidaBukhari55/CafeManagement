// import { useNavigation } from '@react-navigation/native';
// import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

// const FoodCard = ({ item }) => {
//   const navigation = useNavigation();

//   return (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => navigation.navigate('MenuItem', { item })}
//     >
//       <Image source={item.image} style={styles.image} />
//       <Text style={styles.title}>{item.name}</Text>
//       <Text style={styles.price}>Rs {item.price}</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: 'rgba(85, 77, 77, 0.81)',
//     borderRadius: 16,
//     padding: 12,
//     alignItems: 'center',
//     width: '48%',
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 5,
//   },
//   image: {
//     width: 110,
//     height: 110,
//     borderRadius: 16,
//     marginBottom: 10,
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color:'rgb(255, 255, 255)',
//     marginBottom: 4,
//     textAlign: 'center',
//   },
//   price: {
//     color:'rgb(255, 255, 255)',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });


// export default FoodCard;



import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FoodCard = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MenuItem', { item })}
      activeOpacity={0.8}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.price}>Rs {item.price}</Text>

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 18,
    overflow: 'hidden',
    width: '48%',
    marginBottom: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  image: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
    backgroundColor: '#2A2A2A',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '400',
    color: '#BBB',
  },
  category: {
    fontSize: 15,
    fontWeight: '400',
    color: '#d1c1c1ff',

  },
});

export default FoodCard;
