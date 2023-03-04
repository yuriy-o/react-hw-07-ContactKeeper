import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { getContacts, getFilter } from 'redux/selectors';

import { Button, GridWrapper, Li, Name, Number } from './ContactList.styled';

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

      <Button onClick={() => onDeleteContact(id)} type="button">
        Delete
      </Button>
    </Li>
  );
};
