import React, {ReactNode, useState} from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import {globalStyles} from '../styles/globalStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../constants/colors';
import {Eye, EyeSlash} from 'iconsax-react-native';

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
  flex?: number;
  isPassword?: boolean;
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
    flex,
    isPassword,
  } = props;
  const [showPass, setShowPass] = useState(false);
  return (
    <View style={{marginBottom: 16}}>
      {title && <TextComponent flex={flex} text={title} />}
      <RowComponent
        styles={[
          globalStyles.inputContainer,
          {
            marginTop: title ? 8 : 0,
            paddingHorizontal: 10,
            paddingVertical: 14,
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
            secureTextEntry={isPassword ? !showPass : false}
            placeholder={placeholder ?? ''}
            value={value}
            onChangeText={val => onChange(val)}
            placeholderTextColor="#676767"
            multiline={multible}
            numberOfLines={numberOfLine}
            autoCapitalize='none'
          />
        </View>
        {affix && affix}
        {allowClear && value && (
          <TouchableOpacity onPress={() => onChange('')}>
            <AntDesign name="close" size={20} color={colors.white} />
          </TouchableOpacity>
        )}
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            {showPass ? (
              <EyeSlash size={20} color={colors.desc} />
            ) : (
              <Eye size={20} color={colors.desc} />
            )}
          </TouchableOpacity>
        )}
      </RowComponent>
    </View>
  );
};

export default InputComponent;
