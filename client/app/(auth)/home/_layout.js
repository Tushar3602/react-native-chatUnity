import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';

const Layout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: '',
          headerLeft: () => {
            return <Text style={styles.titleBar}>ChatUnity</Text>;
          },
          headerRight: () => {
            return (
              <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => router.push('home/chats')}>
                  <Ionicons
                    name='chatbox-ellipses-outline'
                    size={28}
                    color='#BF0B7A'
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('home/friends')}>
                  <Ionicons
                    name='people-circle-outline'
                    size={28}
                    color='#fff'
                  />
                </TouchableOpacity>
              </View>
            );
          },
          headerStyle: {
            backgroundColor: '#222',
          },

          tabBarLabel: 'Home',
        }}
      />

      <Stack.Screen
        name='friends'
        options={{
          headerTitle: 'friends',
          headerTitleAlign: 'center',
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name='arrow-back-outline' size={24} color='#fff' />
              </TouchableOpacity>
            );
          },
          headerStyle: {
            backgroundColor: '#222',
          },
          headerTitleStyle: {
            color: '#fff',
          },
        }}
      />

      <Stack.Screen
        name='chats'
        options={{
          headerTitle: 'Chats',
          headerTitleAlign: 'center',
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.replace('home')}>
                <Ionicons name='arrow-back-outline' size={24} color='#fff' />
              </TouchableOpacity>
            );
          },
          headerStyle: {
            backgroundColor: '#222',
          },
          headerTitleStyle: {
            color: '#fff',
          },
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
    marginRight: 10,
  },
  titleBar: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    letterSpacing: 2,
    marginLeft: 10,
  },
  backBtn: {
    padding: 10,
    backgroundColor: Colors.secondary,
    borderRadius: 50,
  },
});

export default Layout;
