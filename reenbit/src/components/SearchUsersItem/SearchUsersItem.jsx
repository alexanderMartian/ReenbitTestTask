import styles from "./SearchUsersItem.module.scss";
import {ReactComponent as Checked} from './svg/checked.svg';
import {useDispatch} from "react-redux";
import {showChat} from "../../store/reducers/сhatReducer";


const SearchUsersItem = ({img, name, id}) => {
  const dispatch = useDispatch();

  const openChat = () => {
    dispatch(showChat(id));
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
        <div className={styles.informationItem}>
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
}

export default SearchUsersItem;
