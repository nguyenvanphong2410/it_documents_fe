import { createSlice } from "@reduxjs/toolkit";

const document = createSlice({
  name: "document",
  initialState: {
    isLoadingGetAll: false,
    isLoadingGetAllDocumentNew: false,
    isLoadingGetAllPending: false,
    isLoadingGetAllPendingOver: false,
    isLoadingGetAllChecked: false,
    isLoadingGetAllDocumentOfName: false,
    isLoadingUpdateView: false,
    isShowModalDocumentOfName: false,
    isShowModalDocumentOfNameAdmin: false,
    isLoadingGetAllDocumentOfNameAdmin: false,



    listDocuments: [],
    listDocumentsNew: [],
    listDocumentsPending: [],
    listDocumentsPendingOver: [],
    listDocumentsChecked: [],
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

    dataCheckedFilter: {
      search: "",
      sort_by: "",
      sort_order: "",
      page: 1,
      number_view: null,
      compare_view: null,
      page_size: 1,
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

    //GET ALL Documents New
    getAllDocumentNew: (state) => ({
      ...state,
      isLoadingGetAllDocumentsNew: true
    }),
    getAllDocumentNewSuccess: (state, action) => ({
      ...state,
      listDocumentsNew: action.payload,
      isLoadingGetAllDocumentsNew: false
    }),
    getAllDocumentNewFail: (state) => ({
      ...state,
      isLoadingGetAllDocumentsNew: false
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

    //GET ALL Documents Checked
    getAllCheckedDocument: (state) => ({
      ...state,
      isLoadingGetAllChecked: true
    }),
    getAllCheckedDocumentSuccess: (state, action) => ({
      ...state,
      listDocumentsChecked: action.payload,
      isLoadingGetAllChecked: false
    }),
    getAllCheckedDocumentFail: (state) => ({
      ...state,
      isLoadingGetAllChecked: false
    }),

    //GET ALL Documents Pending Over
    getAllPendingDocumentOver: (state) => ({
      ...state,
      isLoadingGetAllPendingOver: true
    }),
    getAllPendingDocumentOverSuccess: (state, action) => ({
      ...state,
      listDocumentsPendingOver: action.payload,
      isLoadingGetAllPendingOver: false
    }),
    getAllPendingDocumentOverFail: (state) => ({
      ...state,
      isLoadingGetAllPendingOver: false
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
    //Pending Filter
    setDataCheckedFilter: (state, action) => ({
      ...state,
      dataCheckedFilter: { ...action.payload }
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
  getAllDocumentNew, getAllDocumentNewSuccess, getAllDocumentNewFail,
  getAllPendingDocument, getAllPendingDocumentSuccess, getAllPendingDocumentFail,
  getAllCheckedDocument, getAllCheckedDocumentSuccess, getAllCheckedDocumentFail,
  getAllPendingDocumentOver, getAllPendingDocumentOverSuccess, getAllPendingDocumentOverFail,
  getAllDocumentOfName, getAllDocumentOfNameSuccess, getAllDocumentOfNameFail,
  getAllDocumentOfNameAdmin, getAllDocumentOfNameAdminSuccess, getAllDocumentOfNameAdminFail,
  updateViewPost, updateViewPostSuccess, updateViewPostFail,
  setDataFilter, setDataPendingFilter, setDataCheckedFilter, setDataDocumentOfNameFilter, setDataDocumentOfNameAdminFilter


} = document.actions

export default document.reducer;
