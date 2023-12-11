import { StyleSheet, Image } from 'react-native';

const ProfileImage = ({ avatar, width, height }) => {
  return (
    <Image
      source={{
        uri:
          avatar ||
          'https://image.freepik.com/free-vector/businessman-profile-cartoon_18591-58479.jpg',
      }}
      style={styles.img(width, height)}
    />
  );
};

export default ProfileImage;

const styles = StyleSheet.create({
  img(width, height) {
    return {
      width: width || 50,
      height: height || 50,
      borderRadius: 25,
      borderWidth: 1,
      resizeMode: 'cover',
    };
  },
});
