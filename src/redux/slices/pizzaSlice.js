import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk(
   'pizza/fetchPizzasStatus',
   async (params, thunkApi) => {
      const {sortBy, order, category, search, currentPage} = params;
      const { data } = await axios.get(
         `https://661d6b6498427bbbef01c82c.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`
       );
     return data;
   },
 )

const initialState = {
   items: [],
   status: 'loading',
};

const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   extraReducers: (builder) => {
      builder
         .addCase(fetchPizzas.pending, (state) => {
            state.status = "loading"
            state.items = []
         })
         .addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "success";
         })
         .addCase(fetchPizzas.rejected, (state) => {
            state.status = "error"
            state.items = []
         })
   }
});

export const selectFilter = (state) => state.filter;
export const selectPizzaData = (state) => state.pizza;

export const { setItem } = pizzaSlice.actions;

export default pizzaSlice.reducer;