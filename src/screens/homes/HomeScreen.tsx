import {
  Add,
  Edit2,
  Element4,
  Logout,
  Notification,
  SearchNormal1,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import AvatarGroup from '../../components/AvatarGroup';
import CardComponent from '../../components/CardComponent';
import CicularComponent from '../../components/CicularComponent';
import Container from '../../components/Container';
import ProgressBarComponent from '../../components/ProgressBarComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import SpaceComponent from '../../components/SpaceComponent';
import TagComponent from '../../components/TagComponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import {globalStyles} from '../../styles/globalStyles';
import CardImageComponent from '../../components/CardImageComponent';
import auth from '@react-native-firebase/auth';
import fireStore, {Timestamp} from '@react-native-firebase/firestore';
import {TaskModel} from '../../models/TaskModel';

const HomeScreen = ({navigation}: any) => {
  const user = auth().currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  useEffect(() => {
    getNewTasks();
  }, []);

  const getNewTasks = async () => {
    setIsLoading(true);
    await fireStore()
      .collection('tasks')
      .orderBy('dueDate', 'desc')
      .limitToLast(3)
      .onSnapshot(snap => {
        if (snap.empty) {
          console.log(`task not found!`);
        } else {
          const items: TaskModel[] = [];
          snap.forEach((item: any) =>
            items.push({
              id: item.id,
              ...item.data(),
            }),
          );
          setIsLoading(false);
          setTasks(items);
        }
      });
  };

  return (
    <View style={{flex: 1}}>
      <Container isScroll>
        <SectionComponent>
          <RowComponent justify="space-between">
            <Element4 size={24} color={colors.desc} />
            <Notification size={24} color={colors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent>
            <View
              style={{
                flex: 1,
              }}>
              <TextComponent text={`Hi, ${user?.email}`} />
              <TitleComponent text="Be Productive today" />
            </View>
            <TouchableOpacity>
              <Logout
                size={22}
                color="coral"
                onPress={async () => auth().signOut()}
              />
            </TouchableOpacity>
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent
            styles={[globalStyles.inputContainer]}
            onPress={() => navigation.navigate('SearchScreen')}>
            <TextComponent color="#696B6F" text="Search task" />
            <SearchNormal1 size={20} color={colors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <CardComponent>
            <RowComponent>
              <View style={{flex: 1}}>
                <TitleComponent text="Task progress" />
                <TextComponent text="30/40 tasks done" />
                <SpaceComponent height={12} />
                <RowComponent justify="flex-start">
                  <TagComponent
                    text="Match 22"
                    onPress={() => console.log('Say Hi!!!')}
                  />
                </RowComponent>
              </View>
              <View>
                <CicularComponent value={80} />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
        {isLoading ? (
          <ActivityIndicator />
        ) : tasks.length > 0 ? (
          <SectionComponent>
            <RowComponent styles={{alignItems: 'flex-start'}}>
              <View style={{flex: 1}}>
                <CardImageComponent>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={globalStyles.iconContainer}>
                    <Edit2 size={20} color={colors.white} />
                  </TouchableOpacity>
                  <TitleComponent text={tasks[0].title} />
                  <TextComponent text={tasks[0].description} size={13} />

                  <View style={{marginVertical: 28}}>
                    <AvatarGroup uids={tasks[0].uids} />
                    {tasks[0].progress && (
                      <ProgressBarComponent
                        percent="70%"
                        color="#0AACFF"
                        size="large"
                      />
                    )}
                  </View>
                  <TextComponent
                    text={`Due ${(
                      tasks[0].dueDate as unknown as Timestamp
                    ).toDate()}`}
                    size={12}
                    color={colors.desc}
                  />
                </CardImageComponent>
              </View>
              <SpaceComponent width={16} />
              <View style={{flex: 1}}>
                {tasks[1] && (
                  <CardImageComponent color="rgba(33, 150, 243, 0.9)">
                    <TouchableOpacity
                      onPress={() => {}}
                      style={globalStyles.iconContainer}>
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponent text={tasks[1].title} size={18} />
                    <AvatarGroup uids={tasks[1].uids} />
                    {tasks[1].progress && (
                      <ProgressBarComponent percent="40%" color="#A2F068" />
                    )}
                  </CardImageComponent>
                )}

                <SpaceComponent height={16} />
                {tasks[2] && (
                  <CardImageComponent color="rgba(18, 181, 22, 0.9)">
                    <TouchableOpacity
                      onPress={() => {}}
                      style={globalStyles.iconContainer}>
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponent text={tasks[2].title} />
                    <TextComponent text={tasks[2].description} size={13} />
                  </CardImageComponent>
                )}
              </View>
            </RowComponent>
          </SectionComponent>
        ) : (
          <></>
        )}

        <SectionComponent>
          <TextComponent
            flex={1}
            font={fontFamilies.bold}
            size={21}
            text="Urgents tasks"
          />
          <CardComponent>
            <RowComponent>
              <CicularComponent value={40} radius={36} />
              <View
                style={{flex: 1, justifyContent: 'center', paddingLeft: 12}}>
                <TextComponent text="Title of task" />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
      </Container>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('AddNewTask')}
          style={[
            globalStyles.row,
            {
              backgroundColor: colors.blue,
              padding: 10,
              borderRadius: 12,
              paddingVertical: 14,
              width: '80%',
            },
          ]}>
          <TextComponent text="Add new tasks" flex={0} />
          <Add size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
