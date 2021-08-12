import { configureStore } from '@reduxjs/toolkit';
import CellsReducer from './slices/cells';

export const store = configureStore({
  reducer: { cells: CellsReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
