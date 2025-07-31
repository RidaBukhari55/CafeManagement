import { useEffect, useState } from 'react';
import { Button, Modal, StyleSheet, TextInput, View } from 'react-native';

const ManagerForm = ({ visible, onClose, onSubmit, itemToEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [price, setPrice] = useState('');
   const [tax, setTax] = useState('');

  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setDescription(itemToEdit.description);

      setPrice(itemToEdit.price.toString());
      setTax(itemToEdit.tax.toString());

      setCategory(itemToEdit.category);
      setImage(itemToEdit.image);
    } else {
      setName('');
      setDescription('');

      setPrice('');
      setTax('');

      setCategory('');
      setImage('');
    }
  }, [itemToEdit]);

  const formatDriveUrl = (url) => {
  const match = url.match(/\/d\/(.*?)\//) || url.match(/id=([^&]+)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url; // Return as is if not a Google Drive link
};

const handleSubmit = async () => {
  const formattedImageUrl = formatDriveUrl(image);

  const item = {
    name,
    description,
    price: parseFloat(price),
    tax: parseFloat(tax),
    category,
    image: formattedImageUrl,
  };

  try {
    const url = itemToEdit
      ? `https://cafe-app-7a85a-default-rtdb.firebaseio.com/foodItems/${itemToEdit.id}.json`
      : `https://cafe-app-7a85a-default-rtdb.firebaseio.com/foodItems.json`;

    const method = itemToEdit ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error('Something went wrong while storing data!');
    }

    const responseData = await response.json();

    const finalItem = {
      id: itemToEdit ? itemToEdit.id : responseData.name, // Firebase POST returns { name: generatedId }
      ...item,
    };

    onSubmit(finalItem); // 🟢 pass updated/created item
    onClose();
  } catch (error) {
    console.error('❌ Error storing data:', error);
  }
};


  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <TextInput placeholder="Food Name" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Food Description" value={description} onChangeText={setDescription} style={styles.input} />

        <TextInput placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" style={styles.input} />
        <TextInput placeholder="Tax" value={tax} onChangeText={setTax} keyboardType="numeric" style={styles.input} />

        <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={styles.input} />
        <TextInput placeholder="Image URL" value={image} onChangeText={setImage} style={styles.input} />
        <View style={styles.buttons}>
          <Button title="Cancel" onPress={onClose} color="gray" />
          <Button title={itemToEdit ? "Update" : "Add"} onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 20
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 5
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default ManagerForm;

