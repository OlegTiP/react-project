import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CartItem } from './cartSlice';

export const fetchPizzas = createAsyncThunk<CartItem[], Record<string, string>>(
   'pizza/fetchPizzasStatus',
   async (params) => {
      const {sortBy, order, category, search, currentPage} = params;
      const { data } = await axios.get<CartItem[]>(
         `https://661d6b6498427bbbef01c82c.mockapi.io/items?limit=4&page=${currentPage}&${category}&sortBy=${sortBy}&order=${order}${search}`
       );
     return data;
   },
 );

type Pizza = {
   id: string;
   title: string;
   price: number;
   imageUrl: string;
   sizes: number[];
   types: number[];
   rating: number;
}
interface PizzaSliceState {
   items: Pizza[];
   status: 'loading' | 'succes' | 'error';
}

const initialState: PizzaSliceState = {
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

export const selectFilter = (state: RootState) => state.filter;
export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItem } = pizzaSlice.actions;

export default pizzaSlice.reducer;