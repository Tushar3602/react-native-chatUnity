import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
// import { Toast } from '../../components';
import { customFetch } from '../../utils/customFetch';
import Colors from '../../constants/Colors';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserUpdateLoading, setIsUserUpdateIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const sendFormDataToServer = async () => {
    if (!name || !email) {
      // Toast('please fill all details');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('avatar', {
      uri: image,
      type: 'image/jpeg', // Adjust the content type based on your image
      name: 'avatar.jpg',
    });

    setIsUserUpdateIsLoading(true);
    try {
      const response = await customFetch.patch('/users/update-user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Toast('User updated successfully');

      fetchUser();
      // Handle the response from the server
      // console.log('Upload response:', response.data);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      console.log('error', errorMessage);
      // Toast(errorMessage);
      console.error('Upload error:', error);
    } finally {
      setIsUserUpdateIsLoading(false);
    }
  };

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await customFetch('/users/current-user');
      const user = data.user;
      setName(user.name);
      setEmail(user.email);
      setImage(user?.avatar);
      setUser(user);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      console.log('error', errorMessage);
      // Toast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={{
            uri:
              image ||
              'https://i0.wp.com/www.dc-hauswartungen.ch/wp-content/uploads/2018/01/dummy_profile.png?ssl=1',
          }}
          style={styles.img}
        />
      </View>

      <Button title='Pick an image from camera roll' onPress={pickImage} />

      <View>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Name'
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>

      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder='Email'
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
      </View>

      <TouchableOpacity
        style={styles.submitBtn}
        onPress={sendFormDataToServer}
        disabled={isUserUpdateLoading}
      >
        {isUserUpdateLoading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.submitBtnText}>SUBMIT</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  imgContainer: {
    marginTop: -100,
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: Colors.primary,
    padding: 5,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  label: { fontWeight: '500', letterSpacing: 1, color: Colors.mediumDark },
  textInput: {
    borderWidth: 1,
    fontWeight: '300',
    width: 300,
    borderRadius: 3,
    paddingHorizontal: 7,
    letterSpacing: 0.5,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    width: 300,
    paddingVertical: 7,
    borderRadius: 3,
  },
  submitBtnText: {
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
    textAlign: 'center',
  },
});

export default Profile;
