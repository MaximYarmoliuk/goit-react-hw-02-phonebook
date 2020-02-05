import React, { Component } from "react";
import { uuid } from "uuidv4";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";

export default class App extends Component {
  state = {
    contacts: [],
    filter: ""
  };

  addContact = ({ name, number }) => {
    const checkOnExist = this.state.contacts.find(
      contact => contact.name === name
    );

    const checkLength = string => string.length < 1;
    const contact = {
      id: uuid(),
      name,
      number
    };
    checkOnExist
      ? alert(`${name} is already in contacts`)
      : checkLength(`${name}`) || checkLength(`${number}`)
      ? alert("Please, fill in all required entry fields")
      : this.setState(prevState => {
          return {
            contacts: [...prevState.contacts, contact]
          };
        });
  };

  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId)
      };
    });
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm contacts={filteredContacts} addContact={this.addContact} />
        <h2>Contacts</h2>
        {contacts.length >= 2 && (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        )}

        <ContactList
          contacts={filteredContacts}
          onRemoveContact={this.removeContact}
        />
      </div>
    );
  }
}
