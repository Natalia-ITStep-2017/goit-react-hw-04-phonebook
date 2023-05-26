import css from './app.module.css';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import Form from './form/form';
import Filter from './filter/filter';
import ContactList from './contactList/contactList';

const Phonebook = () => {

  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const [isfirstRender, setIsfirstRender] = useState(true);

  useEffect(() => {
      const localStorageContact = JSON.parse(localStorage.getItem('contacts'));
      if (localStorageContact) {
        setContacts ([...localStorageContact])
      }
  }, [])

  const handleAddContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const isExistedName = contacts.map(({ name }) => name.toLowerCase())
      .includes(name.toLowerCase());

    if (isExistedName) {
      alert(`Contact with name "${name}" already exist`);
      return
    }

    setContacts([...contacts, contact])
  }

  const handleDeleteContact = (contactId) => {
    setContacts((prev) =>
      prev.filter(({ id }) => id !== contactId)
    )
  }

  useEffect(() => {
    if(!isfirstRender)
      localStorage.setItem('contacts', JSON.stringify(contacts))
    else setIsfirstRender(false)
  },
    [contacts, isfirstRender])

  const handleChange = (event) => {
    const { value } = event.currentTarget;
    setFilter(value);
  }

  const filterContacts = () => contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <h1 className={css.title}> Phonebook </h1>
      <Form onSubmit={handleAddContact} />
      <h2 className={css.title}> Contacts </h2>
      <Filter
        value={filter}
        onChange={handleChange} />
      {filterContacts().length !== 0 ? (
        <ContactList
          contacts={filterContacts()}
          onDeleteContact={handleDeleteContact} />
      ) : (
        <p className={css.message}>No contacts</p>
      )}
    </div>
  )
}

export default Phonebook




