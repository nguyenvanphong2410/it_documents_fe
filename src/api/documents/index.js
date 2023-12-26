import { getAllCheckedDocument, getAllCheckedDocumentFail, getAllCheckedDocumentSuccess, getAllDocument, getAllDocumentFail, getAllDocumentNew, getAllDocumentNewFail, getAllDocumentNewSuccess, getAllDocumentOfName, getAllDocumentOfNameAdmin, getAllDocumentOfNameAdminFail, getAllDocumentOfNameAdminSuccess, getAllDocumentOfNameFail, getAllDocumentOfNameSuccess, getAllDocumentSuccess, getAllPendingDocument, getAllPendingDocumentFail, getAllPendingDocumentOver, getAllPendingDocumentOverFail, getAllPendingDocumentOverSuccess, getAllPendingDocumentSuccess, updateViewPost, updateViewPostFail, updateViewPostSuccess } from "../../states/modules/document";
import callApi from "../../api/callApi";
// import store from "@/states/configureStore";
// import store from "../../states/configureStore";

export const requestGetAllDocument = () => async (dispatch, getState) => {
    const filter = getState().document.dataFilter
    console.log('fiter api requestGetAllDocument', filter)
    return callApi({
        method: 'get',
        apiPath: `api/post/all_document`,
        actionTypes: [getAllDocument, getAllDocumentSuccess, getAllDocumentFail],
        variables: { ...filter },
        dispatch,
        getState
    })
}
export const requestGetAllDocumentNew = () => async (dispatch, getState) => {
    // const filter = getState().document.dataFilter
    // console.log('fiter api requestGetAllDocument', filter)
    return callApi({
        method: 'get',
        apiPath: `api/post/all_document_new`,
        actionTypes: [getAllDocumentNew, getAllDocumentNewSuccess, getAllDocumentNewFail],
        variables: {},
        dispatch,
        getState
    })
}

export const requestGetAllPendingDocument = () => async (dispatch, getState) => {
    const pendingFilter = getState().document.dataPendingFilter
    console.log('fiter api requestGetAllPendingDocument', pendingFilter)
    return callApi({
        method: 'get',
        apiPath: `api/post/all_document_pending`,
        actionTypes: [getAllPendingDocument, getAllPendingDocumentSuccess, getAllPendingDocumentFail],
        variables: { ...pendingFilter },
        dispatch,
        getState
    })
}

export const requestGetAllCheckedDocument = () => async (dispatch, getState) => {
    const checkedFilter = getState().document.dataCheckedFilter
    console.log('fiter api requestGetAllPendingDocument', checkedFilter)
    return callApi({
        method: 'get',
        apiPath: `api/post/all_document_checked`,
        actionTypes: [getAllCheckedDocument, getAllCheckedDocumentSuccess, getAllCheckedDocumentFail],
        variables: { ...checkedFilter },
        dispatch,
        getState
    })
}

export const requestGetAllPendingDocumentOver = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `api/post/all_document_pending_over`,
        actionTypes: [getAllPendingDocumentOver, getAllPendingDocumentOverSuccess, getAllPendingDocumentOverFail],
        variables: {},
        dispatch,
        getState
    })
}

export const requestGetAllDocumentOfName = () => async (dispatch, getState) => {
    const documentOfFilter = getState().document.dataDocumentOfNameFilter
    console.log('fiter api requestGetAllDocumentOfName', documentOfFilter)
    return callApi({
        method: 'get',
        apiPath: `api/post/all_document_name`,
        actionTypes: [getAllDocumentOfName, getAllDocumentOfNameSuccess, getAllDocumentOfNameFail],
        variables: { ...documentOfFilter },
        dispatch,
        getState
    })
}

export const requestGetAllDocumentOfNameAdmin = () => async (dispatch, getState) => {
    const documentOfNameAdminFilter = getState().document.dataDocumentOfNameAdminFilter
    console.log('fiter api requestGetAllDocumentOfNameAdmin', documentOfNameAdminFilter)
    return callApi({
        method: 'get',
        apiPath: `api/post/all_document_name`,
        actionTypes: [getAllDocumentOfNameAdmin, getAllDocumentOfNameAdminSuccess, getAllDocumentOfNameAdminFail],
        variables: { ...documentOfNameAdminFilter },
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

export const requestUpdateViewPost = (id) => async (dispatch, getState) => {
    console.log('id view upadte', id)
    return callApi({
        method: 'patch',
        apiPath: `api/post/updatedView/${id}`,
        actionTypes: [updateViewPost, updateViewPostSuccess, updateViewPostFail],
        variables: {},
        dispatch,
        getState
    })
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

