/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router"
import { getQuestions } from "../../services/questionsServices";
import { getUserAnswer } from "../../services/answersServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "./Result.scss"
import { getTopic } from "../../services/topicServices";

export default function Result() {
    const navigate = useNavigate();
    const params = useParams();
    const [dataResult, setDataResult] = useState([]);
    const [topicId, setTopicId] = useState();
    const [info, setInfo] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const userAnswers = await getUserAnswer(params.id);
            const questionData = await getQuestions(userAnswers.topicId);
            // const topicList = await getTopics();
            // console.log(questionData);
            // console.log(userAnswers.answers);

            let finalResult = [];
            for (let i = 0; i < questionData.length; i++) {
                finalResult.push({
                    ...questionData[i],
                    ...userAnswers.answers.find(item => item.questionId === questionData[i].id)
                })
            }
            setDataResult(finalResult);
            console.log(finalResult);
            let topicId = 0;
            for (let i = 0; i < 1; i++) {
                topicId = finalResult[i].topicId;
            }
            setTopicId(topicId);

            // correct, false:
            const infoTopic = await getTopic(userAnswers.topicId);
            let countAnswerTrue = 0;
            for(const item of finalResult) {
                if(item.answer === item.correctAnswer) {
                    countAnswerTrue += 1;
                }
            }

            let info = {
                ...infoTopic,
                countAnswerTrue: countAnswerTrue,
                totalAnswer: finalResult.length
            };
            console.log(info);
            setInfo(info);
        }
        fetchApi();
    }, []);
    
    return (
        <>
            {dataResult.length > 0 && 
            (
                <>
                    <button className="btn__back" onClick={() => {navigate(-1)}}>Back</button>
                    <div className="result">
                        <h2 className="result__name">Result</h2>
                            <div className="result__contents">
                                <span className="result__correct">Correct: {info.countAnswerTrue} </span>
                                <span className="result__false">False: {info.totalAnswer - info.countAnswerTrue} </span>
                                <span className="result__total">Total: {(info.countAnswerTrue / info.totalAnswer * 10).toFixed(1)}/10</span>
                            </div>
                        <div className="result__answer-list">
                            {dataResult.map((item, index) => (
                                <>
                                    <div className="question" key={item.id}>
                                            <h4 className="question__name">Question {item.id}: {item.question}</h4>
                                            {item.answer === item.correctAnswer ? (<span className="answer--correct">Correct</span>) : (<span className="answer--false">False</span>)}
                                            {item.answers.map((ans, indexAns) => {
                                                let className = "";
                                                let checked = false;
                                                if (item.answer === indexAns) {
                                                    checked = true;
                                                    className = "result__selected"
                                                }
                                                if (item.correctAnswer === indexAns) {
                                                    className += " result__correct"
                                                }
                                                return <div key={indexAns}>
                                                    <input type="radio" checked={checked} disabled />
                                                    <label className={className}>{ans}</label>
                                                </div>
                                            })}
                                    </div>
                                </>
                            ))}
                        </div>
                        <button className="do-again">
                            <Link to={"/quiz/" + topicId}>Do Again !</Link>
                        </button>
                    </div>
                </>
            )}
        </>
    )
}