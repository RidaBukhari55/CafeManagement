// import { useNavigation, useRoute } from '@react-navigation/native';
// import { StyleSheet, TouchableOpacity, View } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const Footer = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const currentRoute = route.name;

//   return (
//     <View style={styles.footer}>
//       <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//         <Icon
//           name="home"
//           size={24}
//           color={currentRoute === 'Home' ? '#6b4c3b' : '#fff'} 
//         />
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => alert('Favorites')}>
//         <Icon
//           name="heart"
//           size={24}
//           color={currentRoute === 'Favorites' ? '#6b4c3b' : '#fff'} 
//         />
//       </TouchableOpacity>

//       <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//   <Icon
//     name="user"
//     size={24}
//     color={currentRoute === 'Signup' ? '#6b4c3b' : '#fff'}
//   />
// </TouchableOpacity>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#201520',
//     paddingVertical: 30,
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     width: '100%',
//     zIndex: 10,
//   },
// });

// export default Footer;


import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUser } from '../Data/UserData';

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const currentRoute = route.name;
  const user = getUser(); // 👈 get user state

  const handleAccountPress = () => {
    if (user) {
      navigation.navigate('Account');
    } else {
      navigation.navigate('Signup'); // 👈 pehle signup
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon
          name="home"
          size={24}
          color={currentRoute === 'Home' ? '#6b4c3b' : '#fff'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('Favorites')}>
        <Icon
          name="heart"
          size={24}
          color={currentRoute === 'Favorites' ? '#6b4c3b' : '#fff'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleAccountPress}>
        <Icon
          name="user"
          size={24}
          color={
            currentRoute === 'Account' || currentRoute === 'Login'
              ? '#6b4c3b'
              : '#fff'
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000ff',
    paddingVertical: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    zIndex: 10,
  },
});

export default Footer;
