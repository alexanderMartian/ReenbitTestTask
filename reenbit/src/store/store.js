import {configureStore} from '@reduxjs/toolkit';
import chatReducer from "./reducers/сhatReducer";

export default configureStore({
  reducer: {
    chat: chatReducer,
  },
});
