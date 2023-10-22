
const initialState = {
    isAuthenticated: false,
    isLoading: false,
    isError: false,
    userDetail:{},
    userId: '',
    userName: '',
    userEmail: '',
    userBlogs: [],
    userFollowers: [],
    userFollowersCount: 0,
    
}

export const userReducer = (state = initialState, {type,payload }) => {
    switch (type) {
        
        default:
        return state
    }
}