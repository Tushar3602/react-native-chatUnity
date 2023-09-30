import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { customFetch } from '../utils/customFetch';
import Toast from './Toast';
import { useRouter } from 'expo-router';
import ProfileImage from './ProfileImage';

const FriendsRequest = ({ _id, name, email, avatar, fetchFriendRequests }) => {
  const router = useRouter();

  const acceptFriendRequest = async () => {
    try {
      await customFetch.post(`/users/friend-request/accept/${_id}`);
      fetchFriendRequests();
      router.push('home/chats');
      Toast('Friend request accepted');
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      console.log('error', errorMessage);
      Toast(errorMessage);
    }
  };
  return (
    <TouchableOpacity style={styles.container}>
      <ProfileImage avatar={avatar} />
      <Text
        style={{
          flex: 1,
          paddingLeft: 5,
          letterSpacing: 0.5,
          fontWeight: 'bold',
        }}
      >
        {name} sent you a friend request
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: Colors.primary,
          padding: 7,
          borderRadius: 3,
        }}
        onPress={acceptFriendRequest}
      >
        <Text
          style={{
            textAlign: 'center',
            letterSpacing: 1,
            color: '#fff',
            fontWeight: 'bold',
          }}
        >
          Accept
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    padding: 5,
    elevation: 3,
    gap: 5,
  },
});

export default FriendsRequest;
