import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from "prop-types";
import css from './form.module.css';

const Form = ({ onSubmit }) => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.currentTarget;
    if (name === 'name') { setName(value) }
    else if (name === 'number') { setNumber(value) }
  }

  const handleAddContact = (event) => {
    event.preventDefault();

    onSubmit({ name, number });
    reset()
  }

  const reset = () => {
    setName('');
    setNumber('')
  }

  const nameInputId = nanoid();
  const numberInputId = nanoid();

  return (
    <form className={css.addForm}
      onSubmit={handleAddContact}>
      <label
        htmlFor={nameInputId}
        className={css.addForm__lable}>
        Name
      </label>
      <input
        type="text"
        name="name"
        id={nameInputId}
        className={css.addForm__input}
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
      />

      <label
        className={css.addForm__lable}
        htmlFor={numberInputId}>
        Phone
      </label>
      <input
        type="tel"
        name="number"
        id={numberInputId}
        className={css.addForm__input}
        pattern="^[\+]?[0-9]+(([\( \) \-][0-9])?[0-9]*)*$"
        title="Name may contain only numbers, round brackets, dash and spaces. For example 067 555 55 55, +38(067)55 55 555, +38-067-55-555-55"
        required
        value={number}
        onChange={handleChange}
      />

      <button
        className={css.button}
        type='submit'
      > Add contact </button>
    </form>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form