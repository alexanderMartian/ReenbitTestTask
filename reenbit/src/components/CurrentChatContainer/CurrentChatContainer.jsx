import styles from "./CurrentChatContainer.module.scss";
import CurrentChatItem from "../CurrentChatItem/CurrentChatItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {ReactComponent as Checked} from "../ChatsItem/svg/checked.svg";
import {ReactComponent as Arrow} from "../CurrentChatContainer/svg/arrow.svg";
import {ReactComponent as Send} from "../CurrentChatContainer/svg/send.svg";
import {hideChat, addMessage, showChat} from "../../store/reducers/сhatReducer";
import {getJoke} from "../../store/reducers/сhatReducer";

const CurrentChatContainer = () => {
  const [reversedMessages, setReversedMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const chatRef = useRef(null);
  const {currentID, allChatsHistory, isActive} = useSelector((state) => state.chat);

  const currentUser = allChatsHistory.find(item => item.id === currentID);
  const pageWidth = document.documentElement.scrollWidth;
  const chatHistory = reversedMessages?.map( ({date, time, message, isYourMessage}) =>
    <CurrentChatItem
      img={currentUser.img}
      key={Math.random() * 0.25}
      date={date}
      time={time}
      message={message}
      isYourMessage={isYourMessage}
    />
  )
  useEffect( ()=> {
    if (pageWidth >= 768) {
      dispatch(showChat(1));
    }
  },[pageWidth])
  
  useEffect( () => {
    if (reversedMessages?.length > 0) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [reversedMessages])

  useEffect( () => {
    if (isActive) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [isActive])

  useEffect( () => {
    setReversedMessages(currentUser?.messages && Array.from(currentUser.messages).reverse())
  }, [currentUser])

  const handleBack = () => dispatch(hideChat());
  const handleSend = () => {
    setInputValue("");
    dispatch(addMessage(inputValue));
    setTimeout(() => {
      dispatch(getJoke(currentID));
    }, 10000);
  }

  if (isActive) {
    return (
      <div className={styles.container}>
          <div onClick={handleBack} className={styles.arrow}>
            <Arrow/>
          </div>
        <div className={styles.chatInfo}>
          <div className={styles.img}>
            <img src={currentUser.img} alt="userIcon"/>
            <div className={styles.checkedContainer}>
              <Checked/>
            </div>
          </div>
          <p>{currentUser.name}</p>
        </div>
        <div ref={chatRef} className={styles.chatContainer}>
          {chatHistory}
        </div>
        <div className={styles.searchBox}>
          <input
            className={styles.searchBar}
            type="text"
            placeholder="Type your message"
            value={inputValue}
            onChange={ ({target: {value}}) => setInputValue(value)}
            onKeyPress={ ({key}) => {
              if (key === "Enter" && inputValue.length > 0) {
                handleSend();
              }
            }}
          />
          {inputValue.length > 0 &&
          <div onClick={handleSend} className={styles.send}>
            <Send/>
          </div>}
        </div>
      </div>
    )
  }
  if (!isActive) {
    return null;
  }
}

export default CurrentChatContainer;