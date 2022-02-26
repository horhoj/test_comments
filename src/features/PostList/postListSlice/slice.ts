import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestError } from '../../../store/types';
import { PostListItem } from '../types';
import { getErrorData } from '../../../store/helpers';
import { SLICE_NAME } from './types';
import * as thunks from './thunks';

interface InitialState {
  isLoading: boolean;
  requestError: RequestError | null;
  postList: PostListItem[] | null;
}

const initialState: InitialState = {
  isLoading: false,
  postList: null,
  requestError: null,
};

export const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    deletePost: (state, action: PayloadAction<number>) => {
      if (state.postList) {
        state.postList = state.postList.filter(
          (postItem) => postItem.id !== action.payload,
        );
      }
    },

    patchPost: (
      state,
      action: PayloadAction<{ id: number; postListItem: PostListItem }>,
    ) => {
      if (state.postList) {
        const index = state.postList.findIndex(
          (postListItem) => postListItem.id === action.payload.id,
        );
        state.postList[index] = action.payload.postListItem;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunks.getPostListRequest.pending, (state) => {
        state.isLoading = true;
        state.requestError = null;
        state.postList = null;
      })
      .addCase(thunks.getPostListRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.postList = action.payload;
      })
      .addCase(thunks.getPostListRequest.rejected, (state, { error }) => {
        state.isLoading = false;
        state.requestError = getErrorData(error);
      });
  },
});
