import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Cell } from '../types/Cell';

const randomID = () => Math.random().toString(36).substr(2, 5);

interface MoveCellAction {
  id: string;
  direction: 'up' | 'down';
}
interface InsertCellAction {
  id?: string | null;
  content: string;
  type: 'code' | 'text';
}
interface UpdateCellAction {
  id: string;
  content: string;
}
interface DeleteCellAction {
  id: string;
}
interface CellsState {
  data: { [key: string]: Cell };
  loading: boolean;
  error: string | null;
  order: string[];
}

const initialState: CellsState = {
  data: {},
  loading: false,
  error: null,
  order: [],
};

const cellSlice = createSlice({
  name: 'Cells',
  initialState,
  reducers: {
    updateCell: (state, action: PayloadAction<UpdateCellAction>) => {
      state.data[action.payload.id].content = action.payload.content;
    },
    deleteCell: (state, action: PayloadAction<DeleteCellAction>) => {
      delete state.data[action.payload.id];
      state.order = state.order.filter((id) => id !== action.payload.id);
    },
    moveCell: (state, action: PayloadAction<MoveCellAction>) => {
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex =
        action.payload.direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= state.order.length) {
        return;
      }
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
    },
    insertCell: (state, action: PayloadAction<InsertCellAction>) => {
      const cell: Cell = {
        content: action.payload.content,
        type: action.payload.type,
        id: randomID(),
      };
      state.data[cell.id] = cell;
      if (!action.payload.id) {
        state.order.push(cell.id);
      } else {
        const index = state.order.findIndex((id) => id === action.payload.id);
        state.order.splice(index, 0, cell.id);
      }
    },
  },
});
export const { updateCell, deleteCell, moveCell, insertCell } =
  cellSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCells = (state: RootState) => state.cells;
export default cellSlice.reducer;
