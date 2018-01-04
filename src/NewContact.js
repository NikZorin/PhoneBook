import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewContact extends Component {
    render() {
      return (
        <div>
          <input/>
          <input/>
          <input/>
          <Link to="contacts">BACK!!!</Link>
        </div>
      )
    }
  }

  export default NewContact;