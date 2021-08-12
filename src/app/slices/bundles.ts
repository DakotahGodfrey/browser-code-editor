import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Cell } from '../types/Cell';

interface BundlesState {
  data: {
    [key: string]: {
      loading: boolean;
      code: string;
      error: string;
    };
  };
}
interface BundleStartAction {
  cellID: string;
}
interface BundleCompleteAction {
  cellID: string;
  bundle: {
    code: string;
    error: string;
  };
}

const initialState: BundlesState = {
  data: {},
};

const bundleSlice = createSlice({
  name: 'Cells',
  initialState,
  reducers: {
    bundleStart: (state, action: PayloadAction<BundleStartAction>) => {
      state.data[action.payload.cellID] = {
        loading: true,
        code: '',
        error: '',
      };
    },
    bundleComplete: (state, action: PayloadAction<BundleCompleteAction>) => {
      state.data[action.payload.cellID] = {
        loading: false,
        code: action.payload.bundle.code,
        error: action.payload.bundle.error,
      };
    },
  },
});

export const { bundleStart, bundleComplete } = bundleSlice.actions;
export const selectCells = (state: RootState) => state.bundles;
export default bundleSlice.reducer;
