import React, {ReactNode} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import {globalStyles} from '../styles/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../constants/colors';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  title?: string;
  prefix?: ReactNode;
  affix?: ReactNode;
  allowClear?: boolean;
  multible?: boolean;
  numberOfLine?: number;
}

const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    placeholder,
    title,
    prefix,
    affix,
    allowClear,
    multible,
    numberOfLine,
  } = props;
  return (
    <View style={{marginBottom: 16}}>
      {title && <TextComponent text={title} />}
      <RowComponent
        styles={[
          globalStyles.inputContainer,
          {
            marginTop: title ? 8 : 0,
            paddingVertical: 14,
            paddingHorizontal: 10,
            alignItems: 'flex-start',
            minHeight: multible && numberOfLine ? 32 * numberOfLine : 32,
          },
        ]}>
        {prefix && prefix}
        <View
          style={{
            flex: 1,
            paddingLeft: prefix ? 8 : 0,
            paddingRight: affix ? 8 : 0,
          }}>
          <TextInput
            style={[
              globalStyles.text,
              {
                margin: 0,
                padding: 0,
                flex: 1,
                textAlignVertical: 'top',
              },
            ]}
            placeholder={placeholder ?? ''}
            value={value}
            onChangeText={val => onChange(val)}
            placeholderTextColor="#676767"
            multiline={multible}
            numberOfLines={numberOfLine}
          />
        </View>
        {affix && affix}
        {allowClear && value && (
          <TouchableOpacity onPress={() => onChange('')}>
            <AntDesign name="close" size={20} color={colors.white} />
          </TouchableOpacity>
        )}
      </RowComponent>
    </View>
  );
};

export default InputComponent;
