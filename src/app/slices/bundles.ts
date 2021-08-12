import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import bundleCode from '../../esbuildBundler';
import { RootState } from '../store';
import { Cell } from '../types/Cell';

export const createBundle = createAsyncThunk(
  'bundles/createBundle',
  async ({ id, inputCode }: { id: string; inputCode: string }) => {
    const result = await bundleCode(inputCode);
    return { id, result };
  }
);
interface BundlesState {
  data: {
    [key: string]: {
      loading: boolean;
      code: string;
      error: string;
    };
  };
}
interface BundleStatusAction {
  id: string;
}

const initialState: BundlesState = {
  data: {},
};

const bundleSlice = createSlice({
  name: 'Cells',
  initialState,
  reducers: {
    bundleStart: (state, action: PayloadAction<BundleStatusAction>) => {
      state.data[action.payload.id] = {
        loading: true,
        code: '',
        error: '',
      };
    },
    bundleEnd: (state, action: PayloadAction<BundleStatusAction>) => {
      state.data[action.payload.id].loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createBundle.fulfilled, (state, action) => {
      state.data[action.payload.id].code = action.payload.result.code;
      state.data[action.payload.id].error = action.payload.result.error;
    });
  },
});

export const { bundleStart, bundleEnd } = bundleSlice.actions;
export const selectBundles = (state: RootState) => state.bundles;
export default bundleSlice.reducer;
