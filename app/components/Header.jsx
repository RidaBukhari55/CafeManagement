import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ navigation, userId }) => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../../assets/images/logo.png')} 
        style={styles.logo}
      />

      <Text style={styles.title}> Java Junction</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Bill', { userId })}>
        <Icon name="shopping-cart" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000000ff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 4,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign : 'center',
  },
});
