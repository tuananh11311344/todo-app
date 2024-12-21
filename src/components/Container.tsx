import {ArrowLeft2} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title?: string;
  back?: boolean;
  right?: ReactNode;
  children: ReactNode;
  isScroll?: boolean;
  styles?: StyleProp<ViewStyle>;
}

const Container = (props: Props) => {
  const {title, back, right, children, isScroll, styles} = props;

  const navigation: any = useNavigation();

  return (
    <View style={[globalStyles.container, {flex: 1}]}>
      <RowComponent
        styles={[
          {
            paddingHorizontal: 16,
            paddingBottom: 30,
            justifyContent: 'center',
            alignItems: 'center',
          },
          styles,
        ]}>
        {back && (
          <TouchableOpacity
            style={{zIndex: 1}}
            onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={24} color={colors.text} />
          </TouchableOpacity>
        )}
        <View style={{flex: 1}}>
          {title && (
            <TextComponent
              flex={0}
              font={fontFamilies.bold}
              size={16}
              text={title}
              styles={{textAlign: 'center', marginLeft: back ? -24 : 0}}
            />
          )}
        </View>
      </RowComponent>
      {isScroll ? (
        <ScrollView style={{flex: 1, flexGrow: 1}}>{children}</ScrollView>
      ) : (
        <View style={{flex: 1}}>{children}</View>
      )}
    </View>
  );
};

export default Container;
