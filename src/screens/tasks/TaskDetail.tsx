import firestore, {Timestamp} from '@react-native-firebase/firestore';
import {
  AddSquare,
  ArrowLeft2,
  CalendarEdit,
  Clock,
  DocumentUpload,
  TickCircle,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, TouchableOpacity, View} from 'react-native';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import {colors} from '../../constants/colors';
import {TaskModel} from '../../models/TaskModel';
import TitleComponent from '../../components/TitleComponent';
import SpaceComponent from '../../components/SpaceComponent';
import TextComponent from '../../components/TextComponent';
import AvatarGroup from '../../components/AvatarGroup';
import {HandleDateTime} from '../../utils/handleDateTime';
import CardComponent from '../../components/CardComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {globalStyles} from '../../styles/globalStyles';
import {fontFamilies} from '../../constants/fontFamilies';
import {Slider} from '@miblanchard/react-native-slider';
import ButtonComponent from '../../components/ButtonComponent';

const TaskDetail = ({navigation, route}: any) => {
  const {id, color} = route.params;
  const [taskDetail, setTaskDetail] = useState<TaskModel>();
  const [progress, setProgress] = useState(0);
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [subTasks, setSubtasks] = useState<any[]>([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    getTaskDetail();
  }, [id]);

  useEffect(() => {
    if (taskDetail) {
      setProgress(taskDetail.progress ?? 0);
      setFileUrls(taskDetail.fileUrls);
    }
  }, [taskDetail]);

  useEffect(() => {    
    if (
      progress !== taskDetail?.progress ||
      fileUrls.length !== taskDetail.fileUrls.length
    ) {
      setIsChanged(true);
    }else{
      setIsChanged(false);
    }
  }, [progress, fileUrls, taskDetail]);

  const getTaskDetail = () => {
    firestore()
      .doc(`tasks/${id}`)
      .onSnapshot((snap: any) => {
        if (snap.exists) {
          setTaskDetail({
            ...snap.data(),
            id,
          });
        } else {
          console.log('Task detail not found');
        }
      });
  };

  const handleUpdateTask = async () => {
    const data = {...taskDetail, progress, fileUrls, updateAt: Date.now()};
    await firestore()
      .doc(`tasks/${id}`)
      .update(data)
      .then(() => {
        Alert.alert('Update task successfully');
      })
      .catch(error => console.log(error));
  };

  return taskDetail ? (
    <View style={{flex: 1, backgroundColor: colors.bgColor}}>
      <SectionComponent
        styles={{
          backgroundColor: color ?? 'coral',
          paddingVertical: 20,
          paddingTop: 48,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <RowComponent>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={24} color={colors.text} />
          </TouchableOpacity>
          <SpaceComponent width={12} />
          <TitleComponent size={20} text={taskDetail.title} />
        </RowComponent>
        <SpaceComponent height={30} />
        <TextComponent text="Due date" />
        <RowComponent styles={{marginTop: 4}}>
          <RowComponent styles={{flex: 1}}>
            <Clock size={18} color={colors.text} />
            <SpaceComponent width={8} />
            <TextComponent
              text={`${HandleDateTime.GetHour(
                taskDetail.start as unknown as Timestamp,
              )}- ${HandleDateTime.GetHour(
                taskDetail.end as unknown as Timestamp,
              )}`}
            />
          </RowComponent>
          <RowComponent styles={{flex: 1}}>
            <CalendarEdit size={18} color={colors.text} />
            <SpaceComponent width={8} />
            <TextComponent
              text={`${HandleDateTime.FormatDate(
                taskDetail.dueDate as unknown as Timestamp,
              )}`}
            />
          </RowComponent>
          <RowComponent styles={{flex: 1, justifyContent: 'flex-end'}}>
            <AvatarGroup uids={taskDetail.uids} />
          </RowComponent>
        </RowComponent>
      </SectionComponent>
      <ScrollView style={[{flex: 1, backgroundColor: colors.bgColor}]}>
        <SectionComponent>
          <TitleComponent text="Description" size={22} />
          <CardComponent
            bgColor={colors.bgColor}
            styles={{
              borderWidth: 1,
              borderColor: colors.grey,
              borderRadius: 20,
            }}>
            <TextComponent
              text={taskDetail.description}
              styles={{lineHeight: 22}}
            />
          </CardComponent>
        </SectionComponent>
        <SectionComponent>
          <CardComponent>
            <RowComponent>
              <TextComponent text="Files & Links" flex={0} />
              <RowComponent styles={{flex: 1}}>
                <Ionicons
                  name="document-text"
                  size={32}
                  color={'#0263D1'}
                  style={[globalStyles.documentImg]}
                />
                <FontAwesome5
                  name="file-pdf"
                  size={30}
                  color={colors.error}
                  style={[globalStyles.documentImg]}
                />
                <MaterialCommunityIcons
                  name="file-excel"
                  size={32}
                  color={colors.success}
                  style={[globalStyles.documentImg]}
                />
                <AntDesign name="addfile" size={28} color={colors.white} />
              </RowComponent>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 100,
                borderWidth: 2,
                borderColor: colors.success,
                marginRight: 4,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: colors.success,
                  width: 16,
                  height: 16,
                  borderRadius: 100,
                }}
              />
            </View>
            <TextComponent
              flex={1}
              text="Progress"
              font={fontFamilies.medium}
              size={14}
            />
          </RowComponent>
          <SpaceComponent height={12} />

          <RowComponent>
            <View style={{flex: 1}}>
              <Slider
                value={progress}
                onValueChange={val => setProgress(val[0])}
                thumbStyle={{
                  borderWidth: 2,
                  borderColor: colors.white,
                }}
                thumbTintColor={colors.success}
                maximumTrackTintColor={colors.subTitle}
                minimumTrackTintColor={colors.success}
                trackStyle={{height: 10, borderRadius: 100}}
              />
            </View>
            <SpaceComponent width={20} />
            <TextComponent
              text={`${Math.floor(progress * 100)} %`}
              font={fontFamilies.bold}
              flex={0}
              size={18}
            />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent>
            <TitleComponent text="Sub tasks" size={20} flex={1} />
            <TouchableOpacity>
              <AddSquare
                size={24}
                color={colors.success}
                variant="Bold"
                style={{marginTop: 4}}
              />
            </TouchableOpacity>
          </RowComponent>
          <SpaceComponent height={12} />
          {Array.from({length: 3}).map((item, index) => (
            <CardComponent key={`subtask${index}`} styles={{marginBottom: 12}}>
              <RowComponent>
                <TickCircle variant="Bold" color={colors.success} size={22} />
                <SpaceComponent width={12} />
                <TextComponent text="fafafafa" />
              </RowComponent>
            </CardComponent>
          ))}
        </SectionComponent>
        {isChanged && (
          <SectionComponent>
            <ButtonComponent text="Update" onPress={handleUpdateTask} />
          </SectionComponent>
        )}
      </ScrollView>
    </View>
  ) : (
    <></>
  );
};

export default TaskDetail;
