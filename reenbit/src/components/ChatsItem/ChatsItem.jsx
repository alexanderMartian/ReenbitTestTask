import styles from "./ChatsItem.module.scss";
import {ReactComponent as Checked} from './svg/checked.svg';
import {useDispatch} from "react-redux";
import {showChat} from "../../store/reducers/сhatReducer";
import dateCalculating from "./function/dateCalculating";

const ChatsItem = ({img, name, messages, id}) => {
  const dispatch = useDispatch();

  const openChat = () => {
    dispatch(showChat(id));
  }

  const textClipping = (item) => {
    return item.length > 75 ? item.substr(0, 75)+ "..." : item
  }

  return (
    <div onClick={openChat} className={styles.container}>
      <div className={styles.information}>
        <div className={styles.userImg}>
          <img src={img} alt="userImg"/>
          <div className={styles.checkedContainer}>
            <Checked/>
          </div>
        </div>
        <div className={styles.userText}>
          <p>{name}</p>
          <p>{textClipping(messages[0].message)}</p>
        </div>
      </div>
      <div className={styles.date}>{dateCalculating(messages[0].date)}</div>
    </div>
  );
}

export default ChatsItem;
