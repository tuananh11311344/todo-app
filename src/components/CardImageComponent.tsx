import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  color?: string;
  onPress?: () => void;
}

const CardImageComponent = (props: Props) => {
  const {children, color, onPress} = props;
  const renderCard = (
    <ImageBackground
      source={require('../../assets/images/card-bg.png')}
      imageStyle={{borderRadius: 12}}
      style={[globalStyles.card]}>
      <View
        style={[
          {
            backgroundColor: color ?? 'rgba(113,72,217,0.9)',
            flex: 1,
            borderRadius: 12,
            padding: 12,
          },
        ]}>
        {children}
      </View>
    </ImageBackground>
  );
  return onPress ? (
    <TouchableOpacity onPress={onPress}>{renderCard}</TouchableOpacity>
  ) : (
    renderCard
  );
};

export default CardImageComponent;
