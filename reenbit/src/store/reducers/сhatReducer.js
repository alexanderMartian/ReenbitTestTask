import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import data from "../../data/data"
import axios from "axios";

const initialState = {
  isActive: false,
  allChatsHistory:
    localStorage.getItem("allChatsHistory")
      ? JSON.parse(localStorage.getItem("allChatsHistory"))
      : data,
  currentID: 0,
};

export const getJoke = createAsyncThunk('cart/get', async (item) => {
    try {
      const url = "https://api.chucknorris.io/jokes/random";
      const result =  await axios.get(url);
      return [result.data.value, item]
    } catch (e) {
      console.error(e, "Some problems with request");
    }
});

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    showChat(state, payload) {
      state.currentID = payload.payload;
      state.isActive = true;
    },
    hideChat(state) {
      state.isActive = false;
    },
    addMessage(state, payload) {
      const date = new Date();
      const message = {
        date: `${date.getMonth()}/${date.getDate()}/${JSON.stringify(date.getFullYear()).split("0")[1]}`,
        time: `${date.toLocaleString('en-US', { hour: 'numeric', hour12: true, minute: "numeric" })}`,
        message: `${payload.payload}`,
        isYourMessage: true,
      }
      state.allChatsHistory.map( item => {
        if (item.id === state.currentID) {
          item.messages.unshift(message);
          const index = state.allChatsHistory.findIndex( item => item.id === state.currentID);
          const current = state.allChatsHistory[index];
          state.allChatsHistory.splice(index, 1);
          state.allChatsHistory.unshift(current);
        }
      })
    },
},extraReducers: {
    [getJoke.fulfilled]: (state, action) => {

      const createMessage = (message) => {
        const date = new Date();
        return {
          date: `${date.getMonth()}/${date.getDate()}/${JSON.stringify(date.getFullYear()).split("0")[1]}`,
          time: `${date.toLocaleString('en-US', {hour: 'numeric', hour12: true, minute: "numeric"})}`,
          message: `${message}`,
          isYourMessage: false,
        }
      }
      state.allChatsHistory.map( item => {
        if (item.id === action.payload[1]) {
          item.messages.unshift(createMessage(action.payload[0]));
        }
      })
      localStorage.setItem("allChatsHistory", JSON.stringify(state.allChatsHistory));
    }
  }
})

export default chatSlice.reducer;
export const {showChat, hideChat, addMessage} = chatSlice.actions;
