import { useSelector } from 'react-redux';
import { getCookie } from '../helpers/cookie';
import './Layout.scss';
import { Link, NavLink, Outlet } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import logo from "./logo.png";

export default function Layout() {
    const navLinkActive = (e) => {
        // console.log(e);
        return e.isActive ? "layout__header__nav__list__item layout__header__nav__list__item--active" : 'layout__header__nav__list__item'
    }

    const isLogin = useSelector(state => state.LoginReducer);
    console.log(isLogin);

    const token = getCookie("token");
    const avatar = getCookie("avatar");
    const name = getCookie("fullName");

    // console.log(avatar);
    
    return (
        <>
            <div className="layout">
                <header className="layout__header">
                    <div className="layout__header__logo">
                        <Link to="/">
                            <img src={logo} alt="abc" />
                            {/* Quiz */}
                        </Link>
                    </div>
                    {token && (<>
                        <nav className="layout__header__nav">
                            <ul className="layout__header__nav__list">
                                <li className="layout__header__nav__list__item">
                                    <NavLink className={navLinkActive} to="/">Home</NavLink>
                                </li>
                                <li className="layout__header__nav__list__item">
                                    <NavLink className={navLinkActive} to="/topic">Topic</NavLink>
                                </li>
                                <li className="layout__header__nav__list__item">
                                    <NavLink className={navLinkActive} to="/history">History</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </>)}
                    <div className='layout__header__account'>
                        {token ? (<>
                            <div className='layout__header__account__user'>
                                <div className='layout__header__account__user__ava'>
                                    <img src={avatar} alt='loading'/>
                                </div>
                                <span className='layout__header__account__user__name'>{name}</span>
                                <div className='layout__header__account__user__sub-menu'>
                                    <NavLink to="/logout">Log Out 
                                        <BiLogOut/>
                                    </NavLink>
                                </div>
                            </div>
                            {/* <NavLink>Log Out</NavLink> */}
                        </>) 
                        : 
                        (<>
                            <ul>
                                <li className='layout__header__nav__list__item'>
                                    <NavLink className={navLinkActive} to="/login">Login</NavLink>
                                </li>
                                <li className='layout__header__nav__list__item'>
                                    <NavLink className={navLinkActive} to="/register">Register</NavLink>
                                </li>
                            </ul>
                        </>)}
                    </div>
                </header>
                <main className="layout__main">
                    <div className="layout__main__content">
                        <Outlet /> {/** thêm thẻ Outlet thì mới render ra dc components */}
                    </div>
                </main>
                {/* <footer className="layout__footer">Copyrights @2023</footer> */}
            </div>
        </>
    )
}