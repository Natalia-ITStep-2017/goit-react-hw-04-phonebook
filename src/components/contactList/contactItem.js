import PropTypes from "prop-types";
import css from './contact.module.css';
import { useContext } from "react";
import { Context } from "components/App";

const ContactItem = ({ item }) => {

  const { contacts, setContacts } = useContext(Context)
  const { name, number } = item

  const handleDeleteContact = () => {
    setContacts(contacts.filter(({ id }) => id !== item.id)
    )
  }

  return (
    < li
      className={css.contact__item}
    >
      <span className={css.contact__name}>
        {name}:
      </span>
      <span className={css.contact__number}>
        {number}
      </span>
      <button
        type="button"
        className={css.contact__deleteBtn}
        onClick={handleDeleteContact}>
        Delete
      </button>
    </li >)
}

ContactItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired
};

export default ContactItem