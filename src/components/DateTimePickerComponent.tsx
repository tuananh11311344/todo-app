import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {ArrowDown2} from 'iconsax-react-native';
import React, {useState} from 'react';
import {View} from 'react-native';
import {colors} from '../constants/colors';
import {globalStyles} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';

interface Props {
  type?: 'date' | 'time';
  title?: string;
  selected?: Date;
  onSelect: (val: Date) => void;
}

const DateTimePickerComponent = (props: Props) => {
  const {type, title, selected, onSelect} = props;

  const showCalendar = () => {
    DateTimePickerAndroid.open({
      mode: type ?? 'date',
      value: selected ?? new Date(),
      onChange: (_, date?: Date) => onSelect(date || new Date()),
    });
  };

  const valueSelect = (
    type?: 'date' | 'time' | 'datetime',
    selected?: Date,
  ): string => {
    if (!selected) return '';
    switch (type) {
      case 'date':
        return `${selected.getDate()}/${
          selected.getMonth() + 1
        }/${selected.getFullYear()}`;
      case 'time':
        return `${selected.getHours()}:${selected.getMinutes()}`;
      default:
        return '';
    }
  };

  return (
    <>
      <View style={{marginBottom: 16}}>
        {title && <TextComponent text={title} />}
        <RowComponent
          onPress={showCalendar}
          styles={[
            globalStyles.inputContainer,
            {marginTop: title ? 8 : 0, paddingHorizontal: 10},
          ]}>
          <TextComponent
            flex={1}
            text={
              selected
                ? valueSelect(type, selected)
                : ''
            }
            color={selected ? colors.text : '#676767'}
          />
          <ArrowDown2 size={20} color={colors.text} />
        </RowComponent>
      </View>
    </>
  );
};

export default DateTimePickerComponent;
