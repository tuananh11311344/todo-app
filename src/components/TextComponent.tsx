import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';
import {fontFamilies} from '../constants/fontFamilies';
import {colors} from '../constants/colors';

interface Props {
  text: String;
  size?: number;
  font?: string;
  color?: string;
  flex?: number;
  styles?: StyleProp<TextStyle>;
}

const TextComponent = (props: Props) => {
  const {text, size, font, color, flex, styles} = props;
  return (
    <Text
      style={[
        globalStyles.text,
        {
          flex: flex ?? 1,
          fontSize: size ?? 14,
          fontFamily: font ?? fontFamilies.regular,
          color: color ?? colors.desc,
        },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default TextComponent;
