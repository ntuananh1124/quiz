import { useNavigate } from "react-router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./GoBack.scss";

export default function GoBack() {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate("/login")
    } 
    return (
        <>
            <button className="go-back__btn" onClick={handleBack}>
                <AiOutlineArrowLeft/>
                <span>Go Back</span>
            </button>
        </>
    )
}