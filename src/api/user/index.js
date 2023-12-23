import callApi from "../../api/callApi";
import { getAllUser, getAllUserFail, getAllUserSuccess } from "../../states/modules/user";
// import store from "../../states/configureStore";

export const requestGetAllUser = () => async (dispatch, getState) => {
    const filterUser = getState().user.dataFilterUser
    return callApi({
        method: 'get',
        apiPath: `api/user/all_user`,
        actionTypes: [getAllUser, getAllUserSuccess, getAllUserFail],
        variables: { ...filterUser },
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
