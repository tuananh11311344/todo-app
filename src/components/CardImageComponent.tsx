import {View, Text, ImageBackground} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  color?: string;
}

const CardImageComponent = (props: Props) => {
  const {children, color} = props;
  return (
    <ImageBackground
      source={require('../../assets/images/card-bg.png')}
      imageStyle= {{borderRadius: 12}}
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
};

export default CardImageComponent;
