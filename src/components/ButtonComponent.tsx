import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {fontFamilies} from '../constants/fontFamilies';
import {colors} from '../constants/colors';

interface Props {
  text: string;
  isLoading?: boolean;
  onPress: () => void;
  color?: string;
}

const ButtonComponent = (props: Props) => {
  const {text, isLoading, onPress, color} = props;
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color ? color : isLoading ? colors.grey : colors.blue,
        padding: 12,
        borderRadius: 14,
      }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <TextComponent
          text={text}
          flex={0}
          styles={{textTransform: 'uppercase'}}
          size={16}
          font={fontFamilies.semiBold}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
