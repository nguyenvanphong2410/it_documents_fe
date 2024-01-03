import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    isLoadingGetAllUser: false,

    listUsers: [],
    dataFilterUser: {
      search: "",
      sort_by: "",
      sort_order: "",
      page: 1,
      page_size: 8,
    },

    modalDeleteUser: {
      isShowModalDeleteUser: false,
    },
    

  },
  reducers: {

    //MODAL DELETE
    setOpenModalDeleteUser: (state, actions) => ({
      ...state,
      modalDeleteUser: {
        ...state.modalDeleteUser,
        isShowModalDeleteUser: actions.payload,
      },
    }),

    //GET ALL CATEGORY
    getAllUser: (state) => ({
      ...state,
      isLoadingGetAllUser: true
    }),
    getAllUserSuccess: (state, action) => ({
      ...state,
      listUsers: action.payload,
      isLoadingGetAllUser: false
    }),
    getAllUserFail: (state) => ({
      ...state,
      isLoadingGetAllUser: false
    }),

    //Active
    setActiveUser: (state, action) => ({
      ...state,
      categoryActiveUser: { ...action.payload }
    }),

    //Filter
    setDataFilterUser: (state, action) => ({
      ...state,
      dataFilterUser: { ...action.payload }
    }),
  },
});

export const {
  setOpenModalDeleteUser,
  setActiveUser,
  setDataFilterUser,
  getAllUser, getAllUserSuccess, getAllUserFail,

} = user.actions

export default user.reducer;
