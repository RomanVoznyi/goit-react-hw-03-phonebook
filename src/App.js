import React, { Component } from 'react';
import ContactForm from './Components/ContactForm';
import ContactList from './Components/ContactList';
import Filter from './Components/Filter';
import s from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const checkStorage = localStorage.getItem('contacts');
    if (checkStorage) {
      this.setState({ contacts: JSON.parse(checkStorage) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleSubmit = newContact => {
    const { id, name, number } = newContact;

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id, name, number }],
    }));
  };

  getVisibleContacts = () => {
    const value = this.state.filter;
    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(value.toLowerCase()),
    );
  };

  changeInput = evt => {
    this.setState({ filter: evt.target.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <div className={s.myPhonebook}>
        <h2 className={s.bigHeader}>My phonebook</h2>
        <ContactForm onSubmit={this.handleSubmit} contacts={contacts} />
        <Filter value={filter} onChange={this.changeInput} />
        <h2 className={s.smallHeader}>My contacts:</h2>
        <ContactList
          contacts={this.getVisibleContacts()}
          onDelete={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
