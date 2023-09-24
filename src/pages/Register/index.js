import './Register.scss';
import { generateToken } from "../../helpers/token";
import { useNavigate } from 'react-router';
import { checkExist, register } from '../../services/usersServices';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import GoBack from "../../components/GoBack";

export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const fullName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const avatar = e.target[3].value;
        const token = generateToken(20);
        // console.log(e)
        
        // Check xem tai khoan da ton tai hay chua
        const dataApi = await checkExist("email", email);

        if (dataApi) {
            if (dataApi.length === 0) {
                const user = {
                    fullName: fullName,
                    email: email,
                    password: password,
                    avatar: avatar,
                    token: token
                }
                const res = await register(user);
                if (res) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // console.log(res);
                    navigate("/login");
                }
            }
            else {
                // console.log(dataApi);
                Swal.fire('This email already exists');
            }
        }
    }

    return (
        <>
            <GoBack/>
            <div className="register">
                <div className='register__main'>
                    <h2 className="register__name">Register</h2>
                    <form className="register__form" onSubmit={handleSubmit}>
                        <div className='register__form__full-name'>
                            <label htmlFor="full-name">Full Name</label>
                            <input type="text" placeholder="Your Full Name" id='full-name' required/>
                        </div>
                        <div className='register__form__email'>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Your Email" id='email' required/>
                        </div>
                        <div className='register__form__password'>
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Your Password" id='password' required/>
                        </div>
                        <div className='register__form__avatar'>
                            <label htmlFor="avatar">Avatar</label>
                            <input type="text" placeholder="Enter your Image URL" id='avatar' required/>
                        </div>
                        <button className='register__form__btn'>Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}