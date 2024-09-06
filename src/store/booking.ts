import { createSlice } from '@reduxjs/toolkit';
import { IinitialState } from '../utils/interface';
const initialState: IinitialState['booking'] = {
  noOfPassenger: 0,
  depatureFlight: null,
  returnFlight: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {
    setFlightFliter(state, action) {
      state.noOfPassenger = action.payload.noOfPassenger;
    },

    setDepatureFlightChoose(state, action) {
      state.depatureFlight = action.payload.depatureFlight;
    },

    setReturnFlightChoose(state, action) {
      state.returnFlight = action.payload.returnFlight;
    },
    reset(state) {
      state.noOfPassenger = 0;
      state.depatureFlight = null;
      state.returnFlight = null;
    },
  },
});

export const bookingActions = bookingSlice.actions;
export default bookingSlice.reducer;
