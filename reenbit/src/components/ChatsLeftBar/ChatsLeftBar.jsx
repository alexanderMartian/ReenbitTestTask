import ChatsHeader from "../ChatsHeader/ChatsHeader";
import styles from "./ChatsLeftBar.module.scss"
import {useState} from "react";
import ChatsContainer from "../ChatsContainer/ChatsContainer";
import SearchDataContainer from "../SearchDataContainer/SearchDataContainer";

const ChatsLeftBar = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles.leftSide}>
      <ChatsHeader setInputValue={setInputValue}/>
      {inputValue.length < 1 ? <ChatsContainer/> : <SearchDataContainer inputValue={inputValue}/>}
    </div>
  )
}

export default ChatsLeftBar;