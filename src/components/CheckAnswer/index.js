import { useEffect, useState } from "react";

export default function CheckAnswer({data}) {
    const [correctAns, setCorrectAns] = useState(0);
    const [falseAns, setFalseAns] = useState(0);
    console.log(data);

    for (let i = 0; i < data.length; i++) {
        if (data[i].correctAnswer === data[i].answer) {
            setCorrectAns(correctAns + 1);
        }
        else setFalseAns(falseAns + 1);
    }

    return (
        <>
            <div className="result__contents">
                <span className="result__correct">Correct: {correctAns} </span>
                <span className="result__false">False: {falseAns} </span>
                {/* <span className="result__mark"></span> */}
            </div>
        </>
    )
}