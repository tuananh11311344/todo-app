import {View, Text} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {fontFamilies} from '../constants/fontFamilies';
interface Props {
  text: string;
  font?: string;
  size?: number;
  color?: string;
}

const TitleComponent = (props: Props) => {
  const {text, font, size, color} = props;
  return (
    <TextComponent
      text={text}
      font={font ?? fontFamilies.semiBold}
      color={color}
      size={size ?? 20}
    />
  );
};

export default TitleComponent;
