import {View, Text, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import TextComponent from '../../components/TextComponent';
import {TaskModel} from '../../models/TaskModel';
import SectionComponent from '../../components/SectionComponent';
import InputComponent from '../../components/InputComponent';
import {User} from 'iconsax-react-native';
import {colors} from '../../constants/colors';
import DateTimePickerComponent from '../../components/DateTimePickerComponent';
import RowComponent from '../../components/RowComponent';
import SpaceComponent from '../../components/SpaceComponent';
import ButtonComponent from '../../components/ButtonComponent';
import DropdownPicker from '../../components/DropdownPicker';
import {SelectModel} from '../../models/SelectModel';
import fireStore from '@react-native-firebase/firestore';

const initValue: TaskModel = {
  title: '',
  description: '',
  dueDate: new Date(),
  start: new Date(),
  end: new Date(),
  uids: [],
  fileUrls: [],
};

const AddNewTask = ({navigation}: any) => {
  const [taskDetail, setTaskDetail] = useState<TaskModel>(initValue);
  const [userSelect, setUserSelect] = useState<SelectModel[]>([]);

  useEffect(() => {
    handleGetAllUser();
  }, []);

  const handleGetAllUser = async () => {
    await fireStore()
      .collection('users')
      .get()
      .then(snap => {
        if (snap.empty) {
          console.log('Users data not found');
        } else {
          const items: SelectModel[] = [];
          snap.forEach(item => {
            items.push({
              label: item.data().name,
              value: item.id,
            });
          });

          setUserSelect(items);
        }
      })
      .catch(error => console.log(error.message));
  };

  const handleChangeValue = (id: string, value: string | Date | string[]) => {
    const item: any = {...taskDetail};
    item[`${id}`] = value;

    setTaskDetail(item);
  };

  const handleAddNewTask = async () => {
    console.log(taskDetail);
  };
  return (
    <Container back title="Add new task" isScroll>
      <SectionComponent styles={{paddingVertical: 14}}>
        <InputComponent
          value={taskDetail.title}
          onChange={val => handleChangeValue('title', val)}
          title="Title"
          allowClear
          placeholder="Title of task"
        />
        <InputComponent
          value={taskDetail.description}
          onChange={val => handleChangeValue('description', val)}
          title="Description"
          allowClear
          placeholder="Content"
          multible
          numberOfLine={3}
        />
        <DateTimePickerComponent
          title="Due date"
          type="date"
          selected={taskDetail.dueDate}
          onSelect={val => handleChangeValue('dueDate', val)}
        />
        <RowComponent>
          <View style={{flex: 1}}>
            <DateTimePickerComponent
              selected={taskDetail.start}
              title="Start"
              type="time"
              onSelect={val => handleChangeValue('start', val)}
            />
          </View>
          <SpaceComponent width={14} />
          <View style={{flex: 1}}>
            <SpaceComponent width={10} />
            <DateTimePickerComponent
              selected={taskDetail.end}
              title="End"
              type="time"
              onSelect={val => handleChangeValue('end', val)}
            />
          </View>
        </RowComponent>
        <DropdownPicker
          title="Members"
          selected={taskDetail.uids}
          items={userSelect}
          onSelect={val => handleChangeValue('uids', val)}
          multible
        />
      </SectionComponent>

      <SectionComponent>
        <ButtonComponent text="Save" onPress={handleAddNewTask} />
      </SectionComponent>
    </Container>
  );
};

export default AddNewTask;
