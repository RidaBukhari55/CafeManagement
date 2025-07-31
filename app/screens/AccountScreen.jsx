import { useEffect, useState } from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { getUser, setUser } from '../Data/UserData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = ({ navigation }) => {
  const name = getUser();
  const [modalVis, setModalVis] = useState(false);

  useEffect(() => {
    if (!name) {
      navigation.replace('Login');
    }
  }, []);

  const submitHandler = () => setModalVis(true);
  const cancelLogout = () => setModalVis(false);
  const confirmLogout = async () => {
  try {
    setModalVis(false);

    await AsyncStorage.removeItem('loggedInUserId'); 
    setUser(''); 
    navigation.replace('Login');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

  return (
    <SafeAreaView style={styles.container}>
   
      <Modal
        animationType="slide"
        visible={modalVis}
        transparent={true}
        onRequestClose={cancelLogout}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity style={styles.modalButton} onPress={confirmLogout}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={cancelLogout}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      
      <View style={styles.header}>
        <Text style={styles.heading}>Welcome</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={submitHandler}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

     
      <Text style={styles.username}>{name}</Text>
      <View style={styles.divider} />

      
     <TouchableOpacity
  style={styles.fieldButton}
  onPress={() => navigation.navigate('MonthlyOrders')} 
>
  <Text style={styles.fieldText}>My Orders</Text>
</TouchableOpacity>
      <TouchableOpacity style={styles.fieldButton}>
        <Text style={styles.fieldText}>My Favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.fieldButton}>
        <Text style={styles.fieldText}>Settings</Text>
      </TouchableOpacity>
      
    
      <TouchableOpacity
        style={styles.orderButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.orderButtonText}>Start Ordering</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AccountScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#201520',
    padding: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'rgb(253, 252, 252)',
    marginTop: 10,
    marginLeft: 20
  },
  username: {
    fontSize: 22,
    color: '#fff',
    marginTop: 5 , 
     marginLeft: 20
  },
  logoutButton: {
    backgroundColor: 'rgb(241, 233, 197)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    marginRight: 20
  },
  logoutText: {
    color: '#3e2f1c',
    fontSize: 16,
    fontWeight: 'bold'
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
    width: '100%',
    alignSelf: 'center'
  },
  fieldButton: {
    backgroundColor: 'rgb(241, 233, 197)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
    marginLeft: 20,
    marginRight: 20
  },
  fieldText: {
    color: 'rgba(107, 90, 90, 0.87)',
    fontSize: 16,
    fontWeight: '600'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 10
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  modalButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15
  },
  modalButton: {
    backgroundColor: '#6b4c3b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  cancelButton: {
    backgroundColor: '#888'
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  orderButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 30,
    alignItems: 'center',
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4
  },
  orderButtonText: {
    color: '#6b4c3b',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
