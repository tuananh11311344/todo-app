import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {fontFamilies} from '../constants/fontFamilies';
import TextComponent from './TextComponent';

interface Props {
  text: string;
  font?: string;
  size?: number;
  color?: string;
  flex?: number;
  styles?: StyleProp<TextStyle>;
}

const TitleComponent = (props: Props) => {
  const {text, font, size, color, flex, styles} = props;

  return (
    <TextComponent
      size={size ?? 20}
      font={font ?? fontFamilies.semiBold}
      color={color}
      text={text}
      flex={flex ?? 1}
      styles={[
        {
          marginTop: 4,
        },
        styles,
      ]}
    />
  );
};

export default TitleComponent;
