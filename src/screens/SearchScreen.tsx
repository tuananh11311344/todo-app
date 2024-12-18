import { View, Text } from 'react-native'
import React from 'react'
import Container from '../components/Container'
import TextComponent from '../components/TextComponent'

const SearchScreen = ({navigation}: any) => {
  return (
    <Container back>
        <TextComponent text="Search Screen"/>
    </Container>
  )
}

export default SearchScreen