import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../constants/Colors';
import { customFetch } from '../utils/customFetch';
import Toast from './Toast';
import ProfileImage from './ProfileImage';
import { MaterialIcons } from '@expo/vector-icons';

const User = ({ _id, name, avatar, email, role }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sentFriendRequest, setSentFriendRequest] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [requestSent, setRequestSent] = useState(false);

  const sendFriendsRequest = async () => {
    setIsLoading(true);
    try {
      await customFetch.post(`/users/friend-request/${_id}`);
      setRequestSent(true);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      console.log('error', error);
      Toast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSentFriendRequest = async () => {
    try {
      const { data } = await customFetch('/users/sent/friend-request');
      setSentFriendRequest(data.sentFriendRequests);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      console.log('error', error);
      Toast(errorMessage);
    }
  };
  const fetchUserFriends = async () => {
    try {
      const { data } = await customFetch('/users/friends-list');
      setUserFriends(data.friendsIds);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      console.log('error', error);
      Toast(errorMessage);
    }
  };
  useEffect(() => {
    fetchSentFriendRequest();
    fetchUserFriends();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <ProfileImage avatar={avatar} />
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', gap: 7 }}>
          <Text style={styles.name}>{name}</Text>
          {role === 'admin' && (
            <MaterialIcons name='verified' size={20} color='#294DD0' />
          )}
        </View>
        <Text>{email}</Text>
      </View>

      {userFriends.includes(_id) ? (
        <View style={styles.addFriend}>
          <Text style={styles.addFriendText}>Friends</Text>
        </View>
      ) : requestSent ||
        sentFriendRequest.some((friend) => friend._id === _id) ? (
        <View style={[styles.addFriend, { backgroundColor: '#0BB9BF' }]}>
          <Text style={styles.addFriendText}>Request Sent</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.addFriend, { backgroundColor: '#860050' }]}
          onPress={sendFriendsRequest}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text style={[styles.addFriendText]}>Add friend</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
    padding: 10,
  },
  name: {
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'capitalize',
  },
  addFriend: {
    backgroundColor: Colors.primary,
    paddingVertical: 7,
    paddingHorizontal: 5,
    borderRadius: 7,
    width: 120,
    alignItems: 'center',
  },
  addFriendText: {
    color: '#fff',
    fontWeight: '400',
    textTransform: 'capitalize',
    letterSpacing: 1,
  },
});
export default User;
