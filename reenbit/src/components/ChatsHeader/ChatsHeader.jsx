import styles from "./ChatsHeader.module.scss";
import {ReactComponent as UserLogo} from './svg/userIcon.svg';
import {ReactComponent as Checked} from './svg/checked.svg';

const ChatsHeader = ({setInputValue}) => {

  return (
    <div className={styles.container}>
      <div className={styles.logoItem}>
        <UserLogo/>
        <div className={styles.checkedContainer}>
          <Checked/>
        </div>
      </div>
      <div className={styles.searchBox}>
        <input
          onChange={ ({target}) => setInputValue(target.value) }
          className={styles.searchBar}
          type="text"
          placeholder="Search, or start new chat"
        />
      </div>
    </div>
  );
}

export default ChatsHeader;
