import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    searchQuery : null,
}


const productSlice = createSlice({
    name : "product",
    initialState,
    reducers : {
        setSearchQuery(state, value) {
        state.searchQuery = value.payload;
        }
    }
    
})


export const { setSearchQuery } = productSlice.actions;

export default productSlice.reducer;