import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { memo } from 'react';
import arrow from '../../../../assets/image/icons/arrow.svg';
import edit from '../../../../assets/image/icons/edit.svg';
import trash from '../../../../assets/image/icons/trash.svg';
import formatPhone from '../../../../utils/formatPhone';
import { Card, ListHeader } from './styles';

function ContactList({
  filteredContacts,
  orderBy,
  onToogleOrderBy,
  onDeleteContact,
}) {
  return (
    <>
      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" className="sort-button" onClick={onToogleOrderBy}>
            <span>
              Nome
            </span>
            <img src={arrow} alt="icon de ordenação por nome(cima/baixo)" />
          </button>
        </ListHeader>
      )}

      {
        filteredContacts.map((contact) => (
          <Card key={contact.id}>
            <div className="info">
              <div className="contact-name">
                <strong>{contact.name}</strong>
                {
                  contact.category.name && <small>{contact.category.name}</small>
                }
              </div>
              <span>{contact.email}</span>
              <span>{formatPhone(contact.phone)}</span>
            </div>

            <div className="actions">
              <Link to={`/edit/${contact.id}`}>
                <img src={edit} alt="botão de editar contato" />
              </Link>
              <button type="button" onClick={() => onDeleteContact(contact)}>
                <img src={trash} alt="botão de remover contato" />
              </button>
            </div>
          </Card>
        ))
      }

    </>
  );
}

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  orderBy: PropTypes.string.isRequired,
  onToogleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,

};

export default memo(ContactList);
