import styles from "./CurrentChatItem.module.scss"

const CurrentChatItem = ({img, date, time, message, isYourMessage}) => {
  const stylesContainer = isYourMessage ? styles.containerYourMessage : styles.container;
  const stylesMessage = isYourMessage ? styles.yourMessage : styles.notYourMessage;

  return (
    <div className={stylesContainer}>
      {!isYourMessage &&
        <div className={styles.imgWrapper}>
          <img src={img} alt="userIcon"/>
        </div>
      }
      <div className={stylesMessage}>
        <p>{message}</p>
        <p>{date + ", " + time}</p>
      </div>
    </div>
  )
}

export default CurrentChatItem;