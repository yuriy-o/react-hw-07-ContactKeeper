import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/operations';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactsFilter } from './ContactsFilter/ContactsFilter';
import { getError, getIsLoading } from '../redux/selectors';

import { Container, H1, H2 } from './App.styled';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <H1>Phonebook</H1>
      <ContactForm />
      <H2>Contacts</H2>
      <ContactsFilter />
      {isLoading && !error && <p>Request in progress...</p>}
      <ContactList />
    </Container>
  );
};
