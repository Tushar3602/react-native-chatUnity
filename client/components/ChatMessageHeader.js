import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';
import ProfileImage from './ProfileImage';

const ChatMessageHeader = ({
  avatar,
  name,
  selectedMessages,
  deleteMessages,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => router.back()} style={styles.btn}>
          <Ionicons name='arrow-back-outline' size={24} color={Colors.grey} />
        </TouchableOpacity>

        {selectedMessages.length > 0 ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View style={styles.innerContainer}>
              <TouchableOpacity onPress={deleteMessages}>
                <FontAwesome5 name='trash' size={22} color={Colors.grey} />
              </TouchableOpacity>
              <Text
                style={{ fontSize: 22, color: Colors.grey, fontWeight: '500' }}
              >
                {selectedMessages.length}
              </Text>
            </View>

            <View style={styles.innerContainer}>
              <Ionicons
                name='md-arrow-redo-sharp'
                size={24}
                color={Colors.grey}
              />
              <Ionicons name='md-arrow-undo' size={24} color={Colors.grey} />
              <Ionicons name='star' size={24} color={Colors.grey} />
            </View>
          </View>
        ) : (
          <View style={styles.innerContainer}>
            <ProfileImage avatar={avatar} width={45} height={45} />
            <Text style={styles.text}>{name}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ChatMessageHeader;

const styles = StyleSheet.create({
  container: {
    height: 85,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingBottom: 7,
    backgroundColor: '#222',
    elevation: 10,
  },
  innerContainer: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  text: {
    color: Colors.lightGrey,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '400',
  },
});
