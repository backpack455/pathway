import React, { Component,} from 'react';
import {Label, Container, Header, Content, Form, Item, Input, Button, Left, Textarea} from 'native-base';
import {Text, Icon, Dimensions, Image, View, StatusBar} from 'react-native'
import {Block} from 'galio-framework'
import { StyleSheet, Alert } from 'react-native'
// v9 compat packages are API compatible with v8 code
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const textColor = '#fff'
const themecolor = '#28407E'


export default class FormExample extends Component {
  state = {
    name: '',
    author: '',
    quote: ''
  };

  submissionHandler = async uri => {
        firebase.firestore()
        .collection('Quote Post Board')
        .add({
            name: this.state.name,
            author: this.state.author,
            quote: this.state.quote
        })
    setTimeout(() => {
        this.props.navigation.goBack()
    })
  }
  onChangeName = (text) => {
    this.setState({
      name: text,
    })
  }

  onChangeAuthor = (text) => {
    this.setState({
      author: text,
    })
  }

  onChangeDescription = (text) => {
    this.setState({
      description: text,
    })
  }
  render() {
    return (
      <Container>
        <Content>
            <StatusBar barStyle="light-content"/>
          <Form>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input style={FormStyles.formInput} onChangeText={this.onChangeName}/>
            </Item>
            <Item stackedLabel>
              <Label>Author</Label>
              <Input style={FormStyles.formInput} onChangeText={this.onChangeAuthor}/>
            </Item>
            <Content padder stackedLabel>
              <Form>
                <Textarea rowSpan={3} placeholder="Description" style={FormStyles.formInput} onChangeText={this.onChangeDescription} />
                <Item></Item>
              </Form>
            </Content>
            <Button style={{backgroundColor: `${themecolor}`, alignSelf: "stretch", flex: 1}} onPress={this.submissionHandler}>
              <Text style={{color: `${textColor}`, textAlign: 'center', paddingLeft: 200}}>Submit</Text>
              </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const FormStyles = StyleSheet.create({
  formInput: {
    padding: 10,

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: {
    color: '#000'
  },
  text: {
    color: '#ffffff',
    fontSize: 16
  }})