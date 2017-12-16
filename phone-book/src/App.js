import React, { Component } from 'react';
import './App.css';

var CONTACTS = [
  {
    id: 1,
    name: 'Nikolay Zorin',
    phone: '+375 29 277-14-13',
    image: 'https://pp.userapi.com/c836531/v836531575/5ce58/ipXKh_jW8mY.jpg'
  }, {
    id: 2,
    name: 'Marina Zueva',
    phone: '+375 29 890-88-26',
    image: 'https://pp.userapi.com/c840427/v840427684/32d3e/Ccq4eBlnkYk.jpg'
  }
];

class App extends Component {
  render() {
    return (
      <div className="contacts">
        <ul className="contacts-list">
          {
            CONTACTS.map(function(el) {
              return <Contact key={el.id} name={el.name} phone={el.phone} image={el.image} />
            })
          }
        </ul>
      </div>  
    );
  }
};

class Contact extends Component {
  render() {
    return (
      <li className="contact">
        <img src={this.props.image} alt="User logo" width="60px" height="60px" className="contact-image"/>
        <div>
          <div className="contact-name">{this.props.name}</div>
          <div className="contact-phone">{this.props.phone}</div>
        </div>
      </li>
    );
  }
};

export default App;
