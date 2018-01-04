import React, { Component } from 'react';
import NewContact from './NewContact';
import Contacts from './Contacts';
import ContactInfo from './ContactInfo';
import Login from './Login'
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/contacts" component={Contacts}/>
          <Route path="/new_contact" component={NewContact}/>
          <Route path="/*" component={Contacts}/>
        </Switch>
      </BrowserRouter>
    );
  }
};

export default App;
