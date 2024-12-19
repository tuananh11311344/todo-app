import React, {useEffect, useState} from 'react';
import {FlatList, Modal, TouchableOpacity, View} from 'react-native';
import {SelectModel} from '../models/SelectModel';
import TextComponent from './TextComponent';
import RowComponent from './RowComponent';
import {globalStyles} from '../styles/globalStyles';
import {colors} from '../constants/colors';
import {ArrowDown2, SearchNormal1, TickCircle} from 'iconsax-react-native';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SpaceComponent from './SpaceComponent';

interface Props {
  title?: string;
  items: SelectModel[];
  selected?: string[];
  onSelect: (val: string[]) => void;
  multible?: boolean;
}

const DropdownPicker = (props: Props) => {
  const {title, items, selected, onSelect, multible} = props;
  const [isVisible, setIsVisible] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [result, setResult] = useState<SelectModel[]>([]);
  const [dataSelect, setDataSelect] = useState<string[]>([]);

  useEffect(() => {
    selected && setDataSelect(selected);
  }, [isVisible, selected]);

  useEffect(() => {
    if (!searchKey) {
      setResult([]);
    } else {
      const data = items.filter(element =>
        element.label.toLowerCase().includes(searchKey.toLowerCase()),
      );
      setResult(data);
    }
  }, [searchKey]);

  const handleSelectItem = (id: string) => {
    if (multible) {
      const data = [...dataSelect];
      const index = data.findIndex(element => element === id);
      if (index !== -1) {
        data.splice(index, 1);
      } else {
        data.push(id);
      }
      setDataSelect(data);
    } else {
      setDataSelect([id]);
    }
  };
  const handleConfirmSelect = () => {
    onSelect(dataSelect);
    setIsVisible(false);
    setDataSelect([]);
    setSearchKey('');
  };

  const handleRemoveItemSelected = (index: number) => {
    if (selected) {
      selected.splice(index, 1);

      onSelect(selected);
    }
  };

  const renderSelectedItem = (id: string, index: number) => {
    const item = items.find(element => element.value === id);
    return (
      item && (
        <RowComponent
          key={id}
          styles={{
            marginRight: 4,
            padding: 6,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: colors.subTitle,
            marginBottom: 8,
          }}>
          <TextComponent flex={0} text={item.label} />
          <SpaceComponent width={10} />
          <AntDesign
            name="close"
            size={14}
            color={colors.text}
            onPress={() => handleRemoveItemSelected(index)}
          />
        </RowComponent>
      )
    );
  };
  return (
    <View style={{marginBottom: 16}}>
      {title && <TextComponent text={title} />}
      <RowComponent
        onPress={() => setIsVisible(true)}
        styles={[
          globalStyles.inputContainer,
          {
            marginTop: title ? 8 : 0,
            paddingVertical: 14,
            paddingHorizontal: 10,
          },
        ]}>
        <View style={{flex: 1, paddingRight: 12}}>
          {selected && selected?.length > 0 ? (
            <RowComponent justify="flex-start" styles={{flexWrap: 'wrap'}}>
              {selected.map((id, index) => renderSelectedItem(id, index))}
            </RowComponent>
          ) : (
            <TextComponent text="Select" color={colors.subTitle} />
          )}
        </View>
        <ArrowDown2 size={20} color={colors.text} />
      </RowComponent>
      <Modal
        visible={isVisible}
        style={{flex: 1}}
        transparent
        animationType="slide"
        statusBarTranslucent>
        <View
          style={[
            globalStyles.container,
            {
              padding: 20,
              paddingTop: 60,
              paddingBottom: 60,
            },
          ]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            data={searchKey ? result : items}
            ListHeaderComponent={
              <RowComponent styles={{alignItems: 'center'}}>
                <View style={{flex: 1, marginRight: 12}}>
                  <InputComponent
                    value={searchKey}
                    placeholder="Search..."
                    prefix={<SearchNormal1 size={20} color={colors.subTitle} />}
                    onChange={val => setSearchKey(val)}
                  />
                </View>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <TextComponent
                    text="Cancel"
                    color="coral"
                    flex={0}
                    styles={{marginBottom: 16}}
                  />
                </TouchableOpacity>
              </RowComponent>
            }
            renderItem={({item}) => (
              <RowComponent
                key={item.value}
                styles={{paddingVertical: 12}}
                onPress={() => handleSelectItem(item.value)}>
                <TextComponent
                  size={16}
                  text={item.label}
                  color={
                    dataSelect.includes(item.value) ? 'coral' : colors.text
                  }
                />
                {dataSelect.includes(item.value) && (
                  <TickCircle size={22} color="coral" />
                )}
              </RowComponent>
            )}
          />
          <ButtonComponent text="Confirm" onPress={handleConfirmSelect} />
        </View>
      </Modal>
    </View>
  );
};

export default DropdownPicker;
