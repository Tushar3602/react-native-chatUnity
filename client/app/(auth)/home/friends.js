import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { customFetch } from '../../../utils/customFetch';
import Colors from '../../../constants/Colors';
import { FriendsRequest, Toast } from '../../../components';

const Friends = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [friendRequests, setFriendRequest] = useState([]);

  const fetchFriendRequests = async () => {
    setIsLoading(true);
    try {
      const { data } = await customFetch('/users/friend-request');
      setFriendRequest(data.friendsRequest);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      console.log('error', errorMessage);
      Toast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  if (friendRequests.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.secondary,
        }}
      >
        <Text style={{ color: Colors.medium, fontWeight: '300', fontSize: 24 }}>
          Empty friends request list ...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
      <Text style={{ letterSpacing: 1, fontWeight: 'bold', fontSize: 17 }}>
        Your Friend Request
      </Text>

      <View style={{ marginTop: 20 }}>
        {friendRequests.map((item) => {
          return (
            <FriendsRequest
              key={item._id}
              {...item}
              fetchFriendRequests={fetchFriendRequests}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Friends;

const styles = StyleSheet.create({});
