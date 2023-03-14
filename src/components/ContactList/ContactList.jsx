import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { getContacts, getFilter } from 'redux/selectors';

import { GridWrapper, Li, Name, Number } from './ContactList.styled';
import './ContactList.css';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const normalizedFilter = filter.toLowerCase();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <ol>
      {filteredContacts.map(contact => (
        <Contact
          key={contact.id}
          contact={contact}
          onDeleteContact={handleDeleteContact}
        />
      ))}
    </ol>
  );
};

const Contact = ({ contact, onDeleteContact }) => {
  const { id, name, phone } = contact;

  return (
    <Li>
      <GridWrapper>
        <Name>{name}:</Name>
        <Number>{phone}</Number>
      </GridWrapper>

      {/* old style button */}
      {/* <Button onClick={() => onDeleteContact(id)} type="button">
        Delete
      </Button> */}

      <button
        className="btn-delete btn-rotating"
        onClick={() => onDeleteContact(id)}
        type="button"
      >
        <span>Are you sure?</span>
        <span>Delete</span>
      </button>
    </Li>
  );
};
