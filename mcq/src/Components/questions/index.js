import { useEffect, useState } from "react";
import { qBank } from "../../helper";
import "./question.css";

const Question = () => {
  const [question, setQuestion] = useState([]);
  const [questionSelected, setQuestionSelected] = useState({});
  useEffect(() => {
    setQuestion(qBank);
  }, []);
  const handleQuestionSelect = (e) => {
    const { id, value } = e.target;
    setQuestionSelected({ ...questionSelected, [id]: value });
  };

  const setQuestionsInArray = (object) => {
    let newArray = [];
    for (let item in object) {
      newArray.push({
        questionid: item,
        selectedAnswer: object[item],
      });
    }
    console.log(newArray);
  };

  const questionsSubmitHandler = (object) => {
    setQuestionsInArray(object);
  };

  return (
    <section className="section_question">
      <div className="question_layout">
        {question?.map((item, id) => (
          <div className="question_outer">
            <div className="question_upper_wrapper">
              <div className="question_upper">{` Question ${id + 1} `}</div>
            </div>
            <div className="question_lower">
              <div className="question_lower_container">
                <div className="question_lower_container_upper">
                  {item.question}
                </div>
              </div>
              <div className="question_container_lower">
                {item?.answers?.map((items, id) => (
                  <button
                    className="btn_option1"
                    onClick={handleQuestionSelect}
                    value={items}
                    id={item.questionId}
                  >
                    {`${id + 1} - ${items}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="submit">
        <button
          className="submit_button"
          onClick={() => questionsSubmitHandler(questionSelected)}
        >
          Submit
        </button>
      </div>
    </section>
  );
};
export default Question;
