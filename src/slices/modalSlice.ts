// // modalSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface ModalState {
//   isOpen: boolean;
//   modalType: 'order' | 'ingredient' | null;
//   modalData: any;
// }

// const initialState: ModalState = {
//   isOpen: false,
//   modalType: null,
//   modalData: null
// };

// const modalSlice = createSlice({
//   name: 'modal',
//   initialState,
//   reducers: {
//     openModal: (
//       state,
//       action: PayloadAction<{
//         modalType: 'order' | 'ingredient';
//         modalData: any;
//       }>
//     ) => {
//       state.isOpen = true;
//       state.modalType = action.payload.modalType;
//       state.modalData = action.payload.modalData;
//     },
//     closeModal: (state) => {
//       state.isOpen = false;
//       state.modalType = null;
//       state.modalData = null;
//     }
//   }
// });

// export const { openModal, closeModal } = modalSlice.actions;
// export default modalSlice.reducer;
