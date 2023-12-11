import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { TouchableOpacity, Image } from 'react-native';

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress, profile }) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
      <Image
        source={iconUrl}
        resizeMode='cover'
        style={[styles.btnImg(dimension), profile && { borderRadius: 50 }]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.small / 1.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnImg: (dimension) => ({
    width: dimension,
    height: dimension,
    borderRadius: SIZES.small / 1.25,
  }),
});

export default ScreenHeaderBtn;
