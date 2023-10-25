import {
  USER_DETAIL_REQUEST,
  USER_DETAIL_REQUEST_FAIL,
  USER_DETAIL_REQUEST_SUCCESS,
  USER_LOGOUT_REQUEST_SUCCESS,
} from "./user.action";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  userDetail: {},
  userId: "",
  userName: "",
  userEmail: "",
  userBlogs: [],
  userFollowers: [],
  userFollowersCount: 0,
  userFollowsTo: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGOUT_REQUEST_SUCCESS:      
      return initialState;
    case USER_DETAIL_REQUEST:
      return { ...state, isLoading: true };
    case USER_DETAIL_REQUEST_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isError: false,
        isLoading: false,
        userDetail: payload.userDetail,
        userId: payload.userDetail._id,
        userName: payload.userDetail.name,
        userEmail: payload.userDetail.email,
        userBlogs: payload.userBlogs,
        userFollowers: payload.userFollowers,
        userFollowersCount: payload.userFollowers.length,
        userFollowsTo: payload.userFollowsTo,
      };
    case USER_DETAIL_REQUEST_FAIL:
      return { ...state, isLoading: true };
   

    default:
      return state;
  }
};
