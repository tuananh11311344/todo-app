import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import SectionComponent from '../../components/SectionComponent';
import TitleComponent from '../../components/TitleComponent';
import {fontFamilies} from '../../constants/fontFamilies';
import InputComponent from '../../components/InputComponent';
import {Lock, Sms} from 'iconsax-react-native';
import {colors} from '../../constants/colors';
import ButtonComponent from '../../components/ButtonComponent';
import SpaceComponent from '../../components/SpaceComponent';
import {globalStyles} from '../../styles/globalStyles';
import auth from '@react-native-firebase/auth';
import TextComponent from '../../components/TextComponent';

const SignInScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (email || password) {
      setErrorText('');
    }
  }, [email, password]);

  const handleSignInWithEmail = async () => {
    if (!email || !password) {
      setErrorText('Please enter your email and password !!!');
    } else {
      setErrorText('');
      setIsLoading(true);
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          const user = userCredential.user;

          console.log("User:", user)

          //save user to firebase
          setIsLoading(false);
        })
        .catch(error => {
          setIsLoading(false);
          setErrorText(error.message);
        });
    }
  };
  return (
    <Container>
      <SectionComponent
        styles={{
          justifyContent: 'center',
          flex: 1,
        }}>
        <TitleComponent
          text="SIGN IN"
          size={28}
          font={fontFamilies.bold}
          styles={{flex: 0, textAlign: 'center'}}
        />
        <View style={{marginVertical: 20}}>
          <InputComponent
            value={email}
            title="Email"
            flex={0}
            placeholder="Email"
            onChange={val => setEmail(val)}
            allowClear
            prefix={<Sms size={20} color={colors.desc} />}
          />
          <InputComponent
            value={password}
            title="Password"
            flex={0}
            placeholder="Password"
            onChange={val => setPassword(val)}
            prefix={<Lock size={20} color={colors.desc} />}
            isPassword
          />
        </View>
        {errorText && (
          <TextComponent
            text={errorText}
            color="coral"
            flex={0}
            styles={{paddingBottom: 10}}
          />
        )}
        <ButtonComponent
          isLoading={isLoading}
          text="sign in"
          onPress={handleSignInWithEmail}
        />
        <SpaceComponent height={20} />
        <Text style={[globalStyles.text, {textAlign: 'center'}]}>
          You have an already account?{' '}
          <Text
            style={{color: 'coral'}}
            onPress={() => navigation.navigate('LoginScreen')}>
            Login
          </Text>
        </Text>
      </SectionComponent>
    </Container>
  );
};

export default SignInScreen;
