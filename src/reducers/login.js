export default function LoginReducer(state = false, action) {
    // console.log(state, action);
    switch (action.type) {
        case "CHECK_LOGIN":
            return action.status;
        default:
            return state;
    }
}