import { useNavigate } from "react-router";
import { deleteAllCookies } from "../../helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";

export default function LogOut() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(() => {
        deleteAllCookies();
        navigate("/login");
        dispatch(checkLogin(false));
    }, [])

    return (
        <></>
    )
}