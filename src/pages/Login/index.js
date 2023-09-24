import { login } from "../../services/usersServices";
import "./Login.scss";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const userArray = await login(email, password);
        if (userArray.length > 0) { // check xem co tk hoac mk do khong
            // console.log(userArray);
            setCookie("id", userArray[0].id, 1)
            setCookie("fullName", userArray[0].fullName, 1)
            setCookie("email", userArray[0].email, 1)
            setCookie("token", userArray[0].token, 1)
            setCookie("avatar", userArray[0].avatar, 1)
            dispatch(checkLogin(true));
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login successfully !',
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/");
        }
        else {
            Swal.fire('Wrong account or password');
        }
    }

    return (
        <>
            <div className="login">
                <h2 className="login__name">Login</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email: </label>
                    <input type="email" placeholder="Email" id="email"/>
                    <label htmlFor="password">Password: </label> 
                    <input type="password" placeholder="Password" id="password"/>
                    <Link to="/register">You don't have an account? Register now!</Link>
                    <button className="login__form-btn">Login</button>
                </form>
            </div>
        </>
    )
}