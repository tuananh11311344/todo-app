import {View, Text, StyleProp, ViewStyle, TouchableOpacity} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  text: string;
  color?: string;
  tagStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const TagComponent = (props: Props) => {
  const {text, color, tagStyle, textStyle, onPress} = props;
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[globalStyles.tag, tagStyle]}>
      <TextComponent text={text} styles={textStyle} />
    </TouchableOpacity>
  );
};

export default TagComponent;
