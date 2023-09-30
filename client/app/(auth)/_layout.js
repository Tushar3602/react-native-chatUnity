import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from '../../components';

const Layout = () => {
  const router = useRouter();

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    Toast('Logout successfully!');
    setTimeout(() => {
      router.replace('/login');
    }, 1000);
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
              <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                <Text style={styles.logoutBtnText}>Logout</Text>
              </TouchableOpacity>
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
  logoutBtn: {
    marginRight: 20,
    padding: 10,
    borderRadius: 3,
    backgroundColor: '#C61541',
  },
  logoutBtnText: {
    letterSpacing: 1,
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default Layout;
