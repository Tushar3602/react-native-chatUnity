import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import ProfileImage from './ProfileImage';
import Colors from '../constants/Colors';
import { useRouter } from 'expo-router';
import Toast from './Toast';
import { customFetch } from '../utils/customFetch';
import { formatTime } from '../utils/formatTime';

const UserChat = ({ _id, name, avatar }) => {
  const router = useRouter();
  const [lastMessage, setLastMessage] = useState('');

  const fetchMessages = async () => {
    try {
      const { data } = await customFetch(`/messages/${_id}`);
      const userMessages = data.filter(
        (messages) => messages.messageType === 'text'
      );
      setLastMessage(userMessages[userMessages.length - 1]);
    } catch (error) {
      console.log(error);
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      console.log('error', errorMessage);
      Toast(errorMessage);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        router.push({
          pathname: 'chatMessages',
          params: { id: _id, name, avatar },
        })
      }
    >
      <ProfileImage avatar={avatar} />

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: '500',
            textTransform: 'capitalize',
            letterSpacing: 1,
          }}
        >
          {name}
        </Text>
        <Text style={{ marginTop: 3, color: Colors.medium, fontWeight: '400' }}>
          {lastMessage?.message}
        </Text>
      </View>

      <View>
        {lastMessage && (
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: Colors.medium,
            }}
          >
            {formatTime(lastMessage.createdAt)}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default UserChat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Colors.lightGrey,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
    gap: 7,

    elevation: 5,
  },
});
