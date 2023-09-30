import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { customFetch } from '../../../utils/customFetch';
import { useState } from 'react';
import { Toast, UserChat } from '../../../components';
import { useEffect } from 'react';
import Colors from '../../../constants/Colors';

const Chats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [acceptedFriends, setAcceptedFriends] = useState([]);

  const fetchAcceptedFriends = async () => {
    setIsLoading(true);
    try {
      const { data } = await customFetch('/users/accepted-friends');
      setAcceptedFriends(data.friends);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      console.log('error', errorMessage);
      Toast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAcceptedFriends();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  if (acceptedFriends.length === 0) {
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
          No friend to chat with ...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.secondary }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 10 }}
      >
        <View>
          {acceptedFriends.map((friend) => {
            return <UserChat key={friend._id} {...friend} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Chats;
