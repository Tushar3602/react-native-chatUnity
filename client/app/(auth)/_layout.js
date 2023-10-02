import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from '../../components';
import { customFetch } from '../../utils/customFetch';

const Layout = () => {
  const router = useRouter();

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    Toast('Logout successfully!');
    setTimeout(() => {
      router.replace('/login');
    }, 1000);
  };

  const handleDeleteUser = () => {
    Alert.alert(
      'Are you sure you want to delete your account permanently?',
      '',
      [
        {
          text: 'No',
          onPress: () => null,
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await customFetch.delete('/users/delete-user-profile');
              Toast('User deleted successfully!');
              setTimeout(() => {
                router.replace('/login');
              }, 1000);
            } catch (error) {
              const errorMessage =
                error?.response?.data?.msg || 'Something went wrong';
              console.log('error', errorMessage);
              Toast(errorMessage);
            }
          },
        },
      ]
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: { backgroundColor: '#222' },
        tabBarLabelStyle: { fontSize: 12, letterSpacing: 1 },
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Entypo
              name='home'
              size={24}
              color={focused ? Colors.primary : Colors.grey}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name='person'
              size={24}
              color={focused ? Colors.primary : Colors.grey}
            />
          ),
          headerRight: () => {
            return (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.btn} onPress={logout}>
                  <Text style={styles.btnText}>Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: '#C61541' }]}
                  onPress={handleDeleteUser}
                >
                  <Text style={styles.btnText}>Delete Profile</Text>
                </TouchableOpacity>
              </View>
            );
          },
          headerTitleStyle: {
            color: Colors.lightGrey,
            textTransform: 'capitalize',
          },
          headerStyle: {
            backgroundColor: '#222',
          },
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  btn: {
    marginRight: 10,
    padding: 10,
    borderRadius: 3,
    backgroundColor: '#AECBF6',
  },
  btnText: {
    letterSpacing: 1,
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default Layout;
