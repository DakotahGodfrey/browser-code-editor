import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface BundlesState {
  data: number[];
}

const initialState: BundlesState = {
  data: [],
};

const bundleSlice = createSlice({
  name: 'Cells',
  initialState,
  reducers: {},
});

// Other code such as selectors can use the imported `RootState` type
// export const selectBundles = (state: RootState) => state.bundles;

export default bundleSlice.reducer;
