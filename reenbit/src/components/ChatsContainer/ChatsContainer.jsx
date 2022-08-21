import styles from "./ChatsContainer.module.scss";
import ChatsItem from "../ChatsItem/ChatsItem";
import {useSelector} from 'react-redux';

const ChatsContainer = () => {
  const data = useSelector((state) => state.chat.allChatsHistory);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Chats</h1>
        {data.length > 0 && data.map(({img, name, id, messages}) =>
          <ChatsItem
            key={Math.random() * 0.25}
            img={img}
            name={name}
            messages={messages}
            id={id}
          />
        )}
    </div>
  );
}

export default ChatsContainer;
