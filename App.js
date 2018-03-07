import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, CardSection, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount () {
      firebase.initializeApp({
      apiKey: "AIzaSyDIo-Uwqd0U7QyaRK6otJsXQlcgBwSjI5A",
      authDomain: "auth-reactnative-f426a.firebaseapp.com",
      databaseURL: "https://auth-reactnative-f426a.firebaseio.com",
      projectId: "auth-reactnative-f426a",
      storageBucket: "auth-reactnative-f426a.appspot.com",
      messagingSenderId: "178345962832"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent () {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />
      default:
        return <Spinner />
    }
  }

  render () {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
