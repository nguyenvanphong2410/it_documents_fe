import { createSlice } from "@reduxjs/toolkit";

const document = createSlice({
  name: "document",
  initialState: {
    isLoadingGetAll: false,
    isLoadingGetAllPending: false,
    isLoadingGetAllDocumentOfName: false,
    isLoadingUpdateView: false,
    isShowModalDocumentOfName: false,
    isShowModalDocumentOfNameAdmin: false,
    isLoadingGetAllDocumentOfNameAdmin: false,



    listDocuments: [],
    listDocumentsPending: [],
    listDocumentsDocumentOfName: [],
    listDocumentsDocumentOfNameAdmin: [],

    dataFilter: {
      search: "",
      sort_by: "",
      sort_order: "",
      page: 1,
      number_view: null,
      compare_view: null,
      page_size: 12,
    },

    dataPendingFilter: {
      search: "",
      sort_by: "",
      sort_order: "",
      page: 1,
      number_view: null,
      compare_view: null,
      page_size: 8,
    },

    dataDocumentOfNameFilter: {
      search: "",
      sort_by: "",
      sort_order: "",
      page: 1,
      number_view: null,
      compare_view: null,
      page_size: 100,
    },

    dataDocumentOfNameAdminFilter: {
      search: "",
      sort_by: "",
      sort_order: "",
      page: 1,
      number_view: null,
      compare_view: null,
      page_size: 100,
    },

    modalDocumentDelete: {
      isShowModalDelete: false,
    },

    modalDocumentOfName: {
      isShowModalDocumentOfName: false,
    },

    modalDocumentOfNameAdmin: {
      isShowModalDocumentOfNameAdmin: false,
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

    //MODAL DOCUMENT OF NAME
    setOpenModalDocumentOfName: (state, actions) => ({
      ...state,
      modalDocumentOfName: {
        ...state.modalDocumentOfName,
        isShowModalDocumentOfName: actions.payload,
      },
    }),

    //MODAL DOCUMENT OF NAME Admin
    setOpenModalDocumentOfNameAdmin: (state, actions) => ({
      ...state,
      modalDocumentOfNameAdmin: {
        ...state.modalDocumentOfNameAdmin,
        isShowModalDocumentOfNameAdmin: actions.payload,
      },
    }),

    //GET ALL Documents
    getAllDocument: (state) => ({
      ...state,
      isLoadingGetAll: true
    }),
    getAllDocumentSuccess: (state, action) => ({
      ...state,
      listDocuments: action.payload,
      isLoadingGetAll: false
    }),
    getAllDocumentFail: (state) => ({
      ...state,
      isLoadingGetAll: false
    }),

    //GET ALL Documents Pending
    getAllPendingDocument: (state) => ({
      ...state,
      isLoadingGetAllPending: true
    }),
    getAllPendingDocumentSuccess: (state, action) => ({
      ...state,
      listDocumentsPending: action.payload,
      isLoadingGetAllPending: false
    }),
    getAllPendingDocumentFail: (state) => ({
      ...state,
      isLoadingGetAllPending: false
    }),

    //GET ALL DocumentsOfName
    getAllDocumentOfName: (state) => ({
      ...state,
      isLoadingGetAllDocumentOfName: true
    }),
    getAllDocumentOfNameSuccess: (state, action) => ({
      ...state,
      listDocumentsDocumentOfName: action.payload,
      isLoadingGetAllDocumentOfName: false
    }),
    getAllDocumentOfNameFail: (state) => ({
      ...state,
      isLoadingGetAllDocumentOfName: false
    }),

    //GET ALL DocumentsOfName
    getAllDocumentOfNameAdmin: (state) => ({
      ...state,
      isLoadingGetAllDocumentOfNameAdmin: true
    }),
    getAllDocumentOfNameAdminSuccess: (state, action) => ({
      ...state,
      listDocumentsDocumentOfNameAdmin: action.payload,
      isLoadingGetAllDocumentOfNameAdmin: false
    }),
    getAllDocumentOfNameAdminFail: (state) => ({
      ...state,
      isLoadingGetAllDocumentOfNameAdmin: false
    }),


    //Update View
    updateViewPost: (state) => ({
      ...state,
      isLoadingUpdateView: true
    }),
    updateViewPostSuccess: (state, action) => ({
      ...state,
      isLoadingUpdateView: false
    }),
    updateViewPostFail: (state) => ({
      ...state,
      isLoadingUpdateView: false
    }),

    //Filter
    setDataFilter: (state, action) => ({
      ...state,
      dataFilter: { ...action.payload }
    }),
    //Pending Filter
    setDataPendingFilter: (state, action) => ({
      ...state,
      dataPendingFilter: { ...action.payload }
    }),
    //DocumentOfName Filter
    setDataDocumentOfNameFilter: (state, action) => ({
      ...state,
      dataDocumentOfNameFilter: { ...action.payload }
    }),

    //DocumentOfNameAdmin Filter
    setDataDocumentOfNameAdminFilter: (state, action) => ({
      ...state,
      dataDocumentOfNameAdminFilter: { ...action.payload }
    }),

  },
});
// console.log('data document', document)
export const {
  setOpenModalDelete,
  setOpenModalDocumentOfName,
  setOpenModalDocumentOfNameAdmin,
  getAllDocument, getAllDocumentSuccess, getAllDocumentFail,
  getAllPendingDocument, getAllPendingDocumentSuccess, getAllPendingDocumentFail,
  getAllDocumentOfName, getAllDocumentOfNameSuccess, getAllDocumentOfNameFail,
  getAllDocumentOfNameAdmin, getAllDocumentOfNameAdminSuccess, getAllDocumentOfNameAdminFail,
  updateViewPost, updateViewPostSuccess, updateViewPostFail,
  setDataFilter, setDataPendingFilter, setDataDocumentOfNameFilter, setDataDocumentOfNameAdminFilter


} = document.actions

export default document.reducer;
