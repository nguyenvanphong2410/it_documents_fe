import callApi from "../../api/callApi";
// import store from "@/states/configureStore";
// import store from "../../states/configureStore";
import { getAllDocument, getAllFailDocument, getAllSuccessDocument } from "../../states/modules/document";

export const requestGetAllDocument = () => async (dispatch, getState) => {
    const filter = getState().document.dataFilter
    return callApi({
        method: 'get',
        apiPath: `api/post/all`,
        actionTypes: [getAllDocument, getAllSuccessDocument, getAllFailDocument],
        variables: { ...filter },
        dispatch,
        getState
    })
}

export const requestGetDetailsCategory = (id) => async (dispatch, getState) => {
    // return callApi({
    //     method: 'get',
    //     apiPath: `api/category/details/${id}`,
    //     actionTypes: [getDetailsCategory, getDetailsCategorySuccess, getDetailsCategoryFail],
    //     variables: {},
    //     dispatch,
    //     getState
    // })
}

// export const requestCreateCategory = (data) => {
//     const dispatch = store.dispatch;
//     const getState = store.getState;
//     return callApi({
//         method: 'post',
//         apiPath: `api/category/create`,
//         actionTypes: [requestAddCategory, requestAddCategorySuccess, requestAddCategoryFail],
//         variables: { ...data },
//         dispatch,
//         getState,
//         headers: { 'Content-Type': 'multipart/form-data' }
//     })
// }

export const handleUpdateCategory = (data, id) => {
    // const dispatch = store.dispatch;
    // const getState = store.getState;
    // return callApi({
    //     method: 'put',
    //     apiPath: `api/category/update/${id}`,
    //     actionTypes: [requestUpdateCategory, requestUpdateCategorySuccess, requestUpdateCategoryFail],
    //     variables: { ...data },
    //     dispatch,
    //     getState,
    //     headers: { 'Content-Type': 'multipart/form-data' }
    // })
}

