import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ChatMessageHeader, Toast } from '../components';
import EmojiSelector from 'react-native-emoji-selector';
import { useState, useEffect } from 'react';
import { customFetch } from '../utils/customFetch';
import * as ImagePicker from 'expo-image-picker';
import { formatTime } from '../utils/formatTime';
import day from 'dayjs';

const ChatMessages = () => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const router = useRoute();
  const { id, name, avatar } = router.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const scrollViewRef = useRef(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      handleSendMessage('image', result.assets[0].uri);
    }
  };

  const handleSendMessage = async (type, response) => {
    let data;
    if (type === 'text') {
      data = {
        messageType: 'text',
        message: response,
      };
    } else {
      data = new FormData();

      data.append('messageType', 'image');
      data.append('message', {
        uri: response,
        type: 'image/jpeg', // Adjust the content type based on your image
        name: 'image.jpg',
      });
    }

    try {
      await customFetch.post(
        `/messages/${id}`,
        data,
        type === 'image' && {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage('');
      fetchMessages();
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      console.log('error', errorMessage);
      Toast(errorMessage);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data } = await customFetch(`/messages/${id}`);
      setMessages(data);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      console.log('error', errorMessage);
      Toast(errorMessage);
    }
  };
  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessages = async () => {
    try {
      const { data } = await customFetch.post('/messages/deleteMessages', {
        messagesIds: selectedMessages,
      });
      Toast('Message deleted successfully');
      fetchMessages();
      setSelectedMessages([]);
    } catch (error) {
      const errorMessage = error?.response?.data?.msg || 'Something went wrong';
      console.log('error', errorMessage);
      Toast(errorMessage);
    }
  };

  const handleSelectMessage = async (id) => {
    const selected = selectedMessages.find((message) => message === id);

    if (selected) {
      setSelectedMessages((selectedMessages) => {
        const newSelectedMessages = selectedMessages.filter(
          (message) => message !== id
        );
        return newSelectedMessages;
      });
    } else {
      setSelectedMessages((selectedMessages) => [...selectedMessages, id]);
    }
  };

  return (
    <>
      <ChatMessageHeader
        avatar={avatar}
        name={name}
        id={id}
        selectedMessages={selectedMessages}
        deleteMessages={deleteMessages}
      />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: Colors.secondary }}
      >
        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          contentContainerStyle={{ padding: 10 }}
        >
          {messages.map((message) => {
            const isSelectedForDelete = selectedMessages.includes(message._id);
            if (message.messageType === 'text') {
              return (
                <TouchableOpacity
                  key={message._id}
                  style={[
                    message.receiverId === id
                      ? styles.senderMessage
                      : styles.receiverMessage,
                    isSelectedForDelete && {
                      backgroundColor: '#F0FFFF',
                    },
                  ]}
                  onLongPress={() => {
                    if (message.receiverId === id) {
                      handleSelectMessage(message._id);
                    }
                  }}
                >
                  <Text style={{ letterSpacing: 0.2, fontSize: 15 }}>
                    {message.message}
                  </Text>
                  <Text style={styles.time}>
                    {formatTime(message.createdAt)}
                  </Text>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  key={message._id}
                  style={[
                    message.receiverId === id
                      ? styles.senderMessage
                      : styles.receiverMessage,
                    isSelectedForDelete && {
                      backgroundColor: '#F0FFFF',
                    },
                  ]}
                  onLongPress={() => {
                    if (message.receiverId === id) {
                      handleSelectMessage(message._id);
                    }
                  }}
                >
                  <Image
                    source={{ uri: message.message }}
                    style={{ width: 180, height: 180, borderRadius: 5 }}
                  />
                  <Text style={styles.imgTime}>
                    {formatTime(message.createdAt)}
                  </Text>
                </TouchableOpacity>
              );
            }
          })}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={{ backgroundColor: Colors.mediumDark, borderRadius: 50 }}
            onPress={() => setShowEmojiSelector(!showEmojiSelector)}
          >
            <MaterialCommunityIcons
              name='emoticon-happy'
              size={24}
              color={'#E8AF68'}
            />
          </TouchableOpacity>
          <TextInput
            value={message}
            onChangeText={(value) => setMessage(value)}
            placeholder='Type Your Message...'
            style={styles.textInput}
          />

          <TouchableOpacity onPress={pickImage}>
            <Entypo name='camera' size={24} color={Colors.mediumDark} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='mic-outline' size={24} color={Colors.mediumDark} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sendBtn}
            onPress={() => handleSendMessage('text', message)}
          >
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>

        {showEmojiSelector && (
          <EmojiSelector
            columns={8}
            onEmojiSelected={(emoji) =>
              setMessage((message) => message + emoji)
            }
          />
        )}
      </KeyboardAvoidingView>
    </>
  );
};

export default ChatMessages;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: Colors.lightGrey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderColor: Colors.medium,
    gap: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.medium,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    letterSpacing: 0.5,
  },
  sendText: { color: '#fff', fontWeight: 'bold' },
  sendBtn: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 50,
  },
  senderMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 5,
    maxWidth: '60%',
    marginBottom: 10,
  },
  receiverMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingVertical: 3,
    paddingHorizontal: 7,
    borderRadius: 5,
    maxWidth: '60%',
    margin: 10,
  },
  time: {
    fontSize: 13,
    textAlign: 'right',
    color: Colors.medium,
  },
  imgTime: {
    position: 'absolute',
    right: 10,
    bottom: 7,
    color: '#fff',
  },
});
