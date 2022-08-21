import styles from './SearchDataContainer.module.scss';
import {useSelector} from "react-redux";
import ChatsItem from "../ChatsItem/ChatsItem";
import SearchUsersItem from "../SearchUsersItem/SearchUsersItem";

const SearchDataContainer = ({inputValue}) => {
  const data = useSelector((state) => state.chat.allChatsHistory);

  const filteredContacts = data.filter( item => item.name.toLowerCase().includes(inputValue.toLowerCase()) )
  const filteredMessages = data.filter( item => {
    const result = item.messages.filter( item => item.message.toLowerCase().includes(inputValue.toLowerCase()))
    if (result.length > 0) {
      return result;
    }
  })
  const emptySearch = filteredContacts.length === 0 && filteredMessages.length === 0;

  if (emptySearch) {
    return (
      <h2 className={styles.noMatch}>There are no items matching your search</h2>
    )
  }

  return (
    <>
      {filteredContacts.length === 0 ? null :
        <div className={styles.contacts}>
          <h3>Contacts</h3>
          {filteredContacts.length > 0 && filteredContacts.map(({img, name, id, messages}) =>
            <SearchUsersItem
              key={Math.random() * 0.25}
              img={img}
              name={name}
              id={id}
            />
          )}
        </div>
      }
      {filteredMessages.length === 0 ? null :
        <div className={styles.messages}>
          <h3>Messages</h3>
          {filteredMessages.map(({img, name, id, messages}) =>
            <ChatsItem
              key={Math.random() * 0.25}
              img={img}
              name={name}
              messages={messages}
              id={id}
            />
          )}
        </div>
      }
    </>
  );
}

export default SearchDataContainer;
