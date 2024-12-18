import {View, Text} from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import {colors} from '../constants/colors';
import { fontFamilies } from '../constants/fontFamilies';

interface Props {
  color?: string;
  value: number;
  maxValue?: number;
  radius?: number
}

const CicularComponent = (props: Props) => {
  const {color, value, maxValue, radius} = props;
  return (
    <CircularProgress
      value={value}
      title={`${value}%`}
      radius={radius ?? 46}
      showProgressValue={false}
      activeStrokeColor={color ?? colors.blue}
      inActiveStrokeColor={colors.subTitle}
      titleColor={colors.text}
      titleFontSize={20}
      titleStyle={{
        fontFamily: fontFamilies.semiBold
      }}
    />
  );
};

export default CicularComponent;
