import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Neon Hub West Central',
  status: 'Active & Transmitting',
  accessInstructions: 'Enter through the North Gate. Station is located on Level P2, adjacent to the elevator lobby. Use the VoltCharge NFC card for authentication if mobile app fails.',
  latitude: 37.7749,
  longitude: -122.4194,
  slots: [
    { id: '1', name: 'Slot A-101', type: 'Level 3 Ultra Fast (350kW)', status: 'AVAILABLE', health: 98 },
    { id: '2', name: 'Slot A-102', type: 'Level 2 Standard (22kW)', status: 'IN USE', health: 100, eta: '12m' },
  ],
};

const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    updateStationName: (state, action) => {
      state.name = action.payload;
    },
    updateAccessInstructions: (state, action) => {
      state.accessInstructions = action.payload;
    },
    addSlot: (state, action) => {
      state.slots.push(action.payload);
    },
  },
});

export const { updateStationName, updateAccessInstructions, addSlot } = stationSlice.actions;
export default stationSlice.reducer;
