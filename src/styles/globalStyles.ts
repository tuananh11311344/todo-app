import {StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  text: {
    fontSize: 14,
    fontFamily: fontFamilies.regular,
    color: colors.text,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 20
  },
  inputContainer: {
    backgroundColor: colors.grey,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  tag: {
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 100,
    backgroundColor: colors.blue,
  },
  card: {
    borderRadius: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:16
  },
});
