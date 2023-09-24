import { useNavigate, useParams } from "react-router"
import { getTopic } from "../../services/topicServices";
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";import { getQuestions } from "../../services/questionsServices";
import LoadingAnimation from '../../components/LoadingAnimation';
import { postUserData } from "../../services/answersServices";
import { getCookie } from "../../helpers/cookie";
import "./Quiz.scss";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

export default function Quiz() {
    const [topic, setTopic] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();
    
    const handleBack = () => {
        Swal.fire({
            title: 'Are you sure ?',
            text: "Your work has not submitted !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
            })
            .then((result) => {
            if (result.isConfirmed) {
                navigate(-1);
            }
        })
        
    }

    useEffect(() => {
        const fetchApi = async () => {
            const topicData = await getTopic(params.id);
            setTopic(topicData);
        }
        fetchApi();
    }, []);
    
    useEffect(() => {
        const fetchApi = async () => {
            const questionData = await getQuestions(params.id);
            setQuestions(questionData);
            // console.log(questionData);
            setLoading(false);
        };
        setTimeout(fetchApi, 1000);
    }, []);

    // console.log(questions);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Tạo mảng chứa câu hỏi và câu trả lời của User:
        let userAnswer = [];
        for (let i = 0; i < e.target.length; i++) {
            if (e.target[i].checked) {
                userAnswer.push({
                    questionId: parseInt(e.target[i].name),
                    answer: parseInt(e.target[i].value)
                });
            }
        };

        const data = {
            userId: parseInt(getCookie("id")),
            topicId: topic[0].id,
            answers: userAnswer
        }

        const postData = await postUserData(data);
        console.log(postData);
        navigate(`/result/${postData.id}`)
    }

    return (
        <>
            {topic.length > 0 && (
                <>
                    <button className="go-back__btn" onClick={handleBack}>
                        <AiOutlineArrowLeft/>
                        <span>Go Back</span>
                    </button>
                    <div className="quiz__list">
                        <h2>Topic: {topic[0].name}</h2>
                    </div>
                </>
            )}
            {isLoading ? (<>
                        <LoadingAnimation/>
                    </>) : (questions.length > 0 && (
                        <>
                            <form className="question-form" onSubmit={handleSubmit}>
                                {questions.map((item, index) => 
                                    <>
                                        <div className="question" key={item.id}>
                                                <h4>Question {item.id}: {item.question}</h4>
                                                {item.answers.map((ans, indexAns) => (<>
                                                    <div className="question__answer" key={indexAns}>
                                                        <input type="radio" id={`quiz-${item.id}--ans-${indexAns}`} name={item.id} value={indexAns}/>
                                                        <label htmlFor={`quiz-${item.id}--ans-${indexAns}`}>{ans}</label>
                                                    </div>
                                                </>))}
                                        </div>
                                    </>
                                )}
                                <button className="submit-btn">Submit</button>
                            </form>
                        </>
                    ))}
        </>
    )
}