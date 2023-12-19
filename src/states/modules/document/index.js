import { createSlice } from "@reduxjs/toolkit";

const document = createSlice({
  name: "document",
  initialState: {
    isLoadingGetAll: false,

    listDocuments: [],
    dataFilter: {
      search: "",
      sort_by: "",
      sort_order: "",
      page: 1,
      page_size: 9,
    },

    modalDocumentDelete: {
      isShowModalDelete: false,
    },

  },
  reducers: {

    //MODAL DELETE
    setOpenModalDelete: (state, actions) => ({
      ...state,
      modalDocumentDelete: {
        ...state.modalDocumentDelete,
        isShowModalDelete: actions.payload,
      },
    }),

    //GET ALL CATEGORY
    getAllDocument: (state) => ({
      ...state,
      isLoadingGetAll: true
    }),
    getAllSuccessDocument: (state, action) => ({
      ...state,
      listDocuments: action.payload.data,
      isLoadingGetAll: false
    }),
    getAllFailDocument: (state) => ({
      ...state,
      isLoadingGetAll: false
    }),

    //Filter
    setDataFilter: (state, action) => ({
      ...state,
      dataFilter: { ...action.payload }
    }),

  },
});
// console.log('data document', document)
export const {
  setOpenModalDelete,
  getAllDocument, getAllSuccessDocument, getAllFailDocument,
  setDataFilter

} = document.actions

export default document.reducer;
