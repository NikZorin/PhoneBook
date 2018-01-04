import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ContactInfo extends Component {

    render() {
      return (
        <div>
          <div>Name</div>
          <div>Number {this.props.match.params.id}</div>
          <Link to="/contacts">BACK!!!</Link>
        </div>
      )
    }
  }

  export default ContactInfo;