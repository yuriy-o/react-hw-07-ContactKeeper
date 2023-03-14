import { Field, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';

import { addContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import { nanoidUA } from 'components/additions/nanoidUA';
import './ContactForm.css';

import {
  FormStyle,
  Label,
  Span,
  Input,
  Error,
  InputMaskWrapper,
  Hr,
} from './ContactForm.styled';

const Schema = Yup.object().shape({
  name: Yup.string()
    .max(15)
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  phone: Yup.string()
    // .min(4)
    // .max(4)
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,9}?\)?[-.\s]?\d{1,9}[-.\s]?\d{1,9}[-.\s]?\d{1,9}[-.\s]?\d{1,9}[-.\s]?\d{1,9}[-.\s]?\d{1,9}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    resetForm();

    const { name, phone } = values;

    const contact = {
      name,
      phone,
    };

    const dublicateContact = findDublicateContact(contact, contacts);

    dublicateContact
      ? alert(`${contact.name} is already in contacts`)
      : dispatch(addContact({ ...values, id: nanoidUA() }));
  };

  const findDublicateContact = (contact, contactsList) => {
    return contactsList.find(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
  };

  return (
    <Formik
      initialValues={{ name: '', phone: '' }}
      onSubmit={handleSubmit}
      validationSchema={Schema}
    >
      <FormStyle autoComplete="off">
        <Label>
          <Span>Name</Span>
          <Input
            type="text"
            name="name"
            placeholder="Enter your first and second name"
            required
          />
          <Error component="span" name="name" />
        </Label>

        <Label>
          <Span>Number</Span>
          <Field name="phone" required>
            {({ field }) => (
              <InputMaskWrapper
                {...field}
                mask="+38 (099) 999-9999"
                maskchar="_"
                placeholder="+38 (0__) ___-____"
              />
            )}
          </Field>

          <Error component="span" name="phone" />
        </Label>

        {/* //! button with old style */}
        {/* <Button type="submit">Add contact</Button> */}

        <button className="custom-btn-7 btn-7">
          <span>Add contact</span>
        </button>
        <Hr></Hr>
      </FormStyle>
    </Formik>
  );
};
