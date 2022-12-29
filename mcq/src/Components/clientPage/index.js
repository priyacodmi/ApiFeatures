import React, { useEffect, useState } from "react";
import API from "services/axios";
import styles from "./client.module.css";

const ClientPage = () => {
  const initialState = {
    questionText: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOptions: "",
  };

  const [question, setQuestion] = useState(initialState);
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [showTrialForm, setShowTrialForm] = useState(false);
  const [trialName, setTrialName] = useState("");
  const [selectedQuestionsId, setSelectedQuestionsId] = useState([]);

  useEffect(() => {
    API.get("/question/all")
      .then((res) => setData(res.data))
      .catch((error) => console.log(error, "error"));
  }, [message]);

  const handleQuestionData = (key, event) => {
    setQuestion({
      ...question,
      [key]: event.target.value,
    });
  };

  const handleInputChange = (e) => {
    let isChecked = e.target.checked;
    if (isChecked) {
      setSelectedQuestionsId((prevData) => [...prevData, e.target.id]);
    }
  };

  const submitQuestion = (key) => {
    const data = {
      questionText: question.questionText,
      options: `${question.option1}, ${question.option2}, ${question.option3}, ${question.option4}`,
      correctOption: question.correctOptions,
    };

    API.post("/question/createQuestions", data)
      .then((response) => {
        setMessage(response.data.msg);
        alert(response.data.msg);
        setShowForm(false);
        setQuestion("");
      })
      .catch((error) => {
        console.log(error.message, "err");
      });
  };

  const createTrialHandler = () => {
    const trailData = {
      trailName: trialName,
      questionsId: selectedQuestionsId,
    };
    API.post("/trails", trailData)
      .then((response) => {
        console.log(response.data);
        setShowTrialForm(false);
      })
      .catch((error) => {
        console.log(error.message, "err");
      });
  };

  return (
    <div className={styles.clientContainer}>
      <button
        className={styles.testButton}
        onClick={() => setShowForm((s) => !s)}
      >
        Create Question
      </button>
      <button
        className={styles.trialButton}
        onClick={() => setShowTrialForm((s) => !s)}
      >
        Create Trial
      </button>

      {showForm && (
        <div className={styles.questionCreate}>
          <div className={styles.registrationContent}>
            <label htmlFor="question">Question</label>
            <input
              type="text"
              placeholder="Enter question here"
              id="question"
              required
              value={question?.questionText}
              onChange={(e) => handleQuestionData("questionText", e)}
            />
          </div>
          <div className={styles.registrationContent}>
            <label htmlFor="options">Options</label>
            <input
              type="text"
              placeholder="Option 1"
              id="option1"
              required
              value={question?.option1}
              onChange={(e) => handleQuestionData("option1", e)}
            />
            <input
              type="text"
              placeholder="Option 2"
              id="option2"
              required
              value={question?.option2}
              onChange={(e) => handleQuestionData("option2", e)}
            />
            <input
              type="text"
              placeholder="Option 3"
              id="option3"
              required
              value={question?.option3}
              onChange={(e) => handleQuestionData("option3", e)}
            />
            <input
              type="text"
              placeholder="Option 4"
              id="option4"
              required
              value={question?.option4}
              onChange={(e) => handleQuestionData("option4", e)}
            />
          </div>
          <div className={styles.registrationContent}>
            <label htmlFor="correctOption">Correct Option</label>
            <input
              type="text"
              placeholder="Enter correctOption here"
              id="correctOption"
              required
              value={question?.correctOptions}
              onChange={(e) => handleQuestionData("correctOptions", e)}
            />
          </div>
          <button className={styles.registerBtn} onClick={submitQuestion}>
            Register
          </button>
        </div>
      )}

      {showTrialForm && (
        <div className={styles.questionCreate}>
          <div className={styles.registrationContent}>
            <label htmlFor="trialName">Trial Name</label>
            <input
              type="text"
              placeholder="Enter Trial Name"
              id="trialName"
              required
              value={trialName}
              onChange={(e) => setTrialName(e.target.value)}
            />
          </div>
          <button className={styles.registerBtn} onClick={createTrialHandler}>
            Create Trial
          </button>
        </div>
      )}

      <div className={styles.questionsContainer}>
        {data?.questions?.map((item, index) => {
          return (
            <div className={styles.questions} key={item._id}>
              <p className={styles.questionId}>Question {index + 1}</p>
              <span className={styles.question}>
                <div className={styles.selectQuestion}>
                  <h2 className={styles.questionText}>{item.questionText}</h2>
                  <input
                    type="checkbox"
                    id={item._id}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className={styles.options}>
                  {item.options.map((option) => {
                    return <p className={styles.option}> {option}</p>;
                  })}
                </div>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientPage;
