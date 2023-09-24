import { Link } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import "./Home.scss";

export default function Home() {
    const token = getCookie("token");
    const userName = getCookie("fullName");
    return (
        <>
            {token ? (<>
                <div className="home">
                    <h2>Welcome {userName} to Quiz</h2>
                    <button className="start__btn">
                        <Link to="/topic">Get Started</Link>
                    </button>
                </div>
            </>) : (<>
                <div>Please Login to continue</div>
            </>)}
        </>
    )
}