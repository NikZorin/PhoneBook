import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Contacts.css';

var CONTACTS = [];
  
  var SearchTypes = [
    {
      number: '0',
      name: 'Name'
    }, {
      number: '1',
      name: 'Phone'
    }
  ]

class Contacts extends Component {
    constructor() {
      super();

      this.state = {
        displayedContacts: CONTACTS,
        displayedFormattedContacts: getFormattedArray(1, CONTACTS),
        searchType: SearchTypes[0],
        contactsInRow: 1
      };
  
      this.handleSearch = this.handleSearch.bind(this);
      this.handleSearchTypeChanging = this.handleSearchTypeChanging.bind(this);
      this.handleChangeRowNumber = this.handleChangeRowNumber.bind(this);
    }

    componentWillMount = () => {
      fetch('/contacts/all')
      .then(response => response.json())
      .then((data) => {
        CONTACTS = data;
        this.setState({
          displayedContacts: data,
          displayedFormattedContacts: getFormattedArray(1, data)
        })
      })
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
  
      this.setState(prevState => ({
        displayedContacts: displayedContacts,
        displayedFormattedContacts: getFormattedArray(prevState.contactsInRow, displayedContacts)
      }));
    }
  
    handleSearchTypeChanging(event) {
      var type = event.target.value;
      this.setState(prevState => ({
        searchType: SearchTypes[type]
      }));
    }
  
    handleChangeRowNumber(number) {
      this.setState(prevState => ({
        contactsInRow: number,
        displayedFormattedContacts: getFormattedArray(number, prevState.displayedContacts)
      }));
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
            <div>
              <button className="row-type" onClick={() => this.handleChangeRowNumber(1)}>&#8226;</button>
              <button className="row-type" onClick={() => this.handleChangeRowNumber(2)}>&#8226;&#8226;</button>
              <button className="row-type" onClick={() => this.handleChangeRowNumber(3)}>&#8226;&#8226;&#8226;</button>
            </div>
          </div>
          <ul className="contacts-list">
            {
              this.state.displayedFormattedContacts.map(function(group) {
                return <div className="contact-group"> {
                  group.map(function(el) {
                    return <Contact key={el.id} id={el.id} name={el.name} phone={el.phone} image={el.image} />
                  })
                  }
                  </div>
              })
            }
          </ul>
        </div>  
      );
    }
  }
  
  class Contact extends Component {

    constructor() {
        super();

        this.state = {
            redirect: false
        };

        this.getInfo = this.getInfo.bind(this);
    }

    render() {
      return (
        this.state.redirect ?
        <Redirect to={`/contact/${this.props.id}`}/> :
        <div className="contact" onClick={() => this.getInfo(this.props.id)}>
          <img src={this.props.image} alt="User logo" width="60px" height="60px" className="contact-image"/>
          <div>
            <div className="contact-name">{this.props.name}</div>
            <div className="contact-phone">{this.props.phone}</div>
          </div>
        </div>
      );
    }

    getInfo(id) {
        this.setState({
            redirect: true
        })
    }
  };

  function getClearPhoneNumber(number) {
    return number.replace(/\s|-/g, '');
  };
  
  function getFormattedArray(dimention, array) {
    var count = 0;
    var limit = array.length;
    var mas = [];
    while(count < limit) {
      var masX = []
      for(var i = 0; i < dimention; i++) {
        masX.push(array[count++]);
        if(count === limit) break;
      }
      mas.push(masX);
    }
    return mas;
  }

  export default Contacts;