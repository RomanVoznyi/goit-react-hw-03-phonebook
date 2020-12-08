import React from 'react';
import s from './ContactList.module.css';

const ContactList = ({ contacts, onDelete }) => (
  <ul className={s.contacsList}>
    {contacts.map(({ id, name, number }) => (
      <li key={id} className={s.item}>
        <span className={s.name}>{name}</span>: {number}
        <button
          type="button"
          className={s.close}
          onClick={() => onDelete(id)}
        ></button>
      </li>
    ))}
  </ul>
);

export default ContactList;
