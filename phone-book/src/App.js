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

var SearchTypes = [
  {
    number: '0',
    name: 'Name'
  }, {
    number: '1',
    name: 'Phone'
  }
]

class App extends Component {
  render() {
    return (
      <ContactsList />
    );
  }
};

class ContactsList extends Component {
  constructor() {
    super();
    this.state = {
      displayedContacts: CONTACTS,
      searchType: SearchTypes[0]
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchTypeChanging = this.handleSearchTypeChanging.bind(this);
  }

  handleSearch(event) {
    var searchQuery = event.target.value.toLowerCase();
    var isNameSearch = this.state.searchType === SearchTypes[0];
    var displayedContacts = CONTACTS.filter(function(el) {
      var searchValue;
      if(isNameSearch) {
        searchValue = el.name.toLocaleLowerCase();
      } else {
        searchQuery = getClearPhoneNumber(searchQuery);
        searchValue = getClearPhoneNumber(el.phone.toLocaleLowerCase());
      }
      return searchValue.indexOf(searchQuery) !== -1;
    });

    this.setState({
      displayedContacts: displayedContacts,
      searchType: this.state.searchType
    });
  }

  handleSearchTypeChanging(event) {
    var type = event.target.value;
    this.setState({
      displayedContacts: this.state.displayedContacts,
      searchType: SearchTypes[type]
    })
  }

  render() {
    return (
      <div className="contacts">
        <div className="search-area">
          <input type="text" className="search-input" onChange={this.handleSearch}/>
          <select className="search-select" onChange={this.handleSearchTypeChanging}>
            {
              SearchTypes.map(function(el) {
                return <option key={el.number} value={el.number}>{el.name}</option>
              })
            }
          </select>
        </div>
        <ul className="contacts-list">
          {
            this.state.displayedContacts.map(function(el) {
              return <Contact key={el.id} name={el.name} phone={el.phone} image={el.image} />
            })
          }
        </ul>
      </div>  
    );
  }
}

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

function getClearPhoneNumber(number) {
  return number.replace(/\s|-/g, '');
};

export default App;
