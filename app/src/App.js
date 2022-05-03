import React, {useState} from 'react';

export default function App() {
  const questions = [
    {
      questionText: 'What is the capital of France?',
      answerOptions: [
        {answerText: 'New York', isCorrect: false},
        {answerText: 'London', isCorrect: false},
        {answerText: 'Paris', isCorrect: true},
        {answerText: 'Dublin', isCorrect: false},
      ],
    },
    {
      questionText: 'Who is CEO of Tesla?',
      answerOptions: [
        {answerText: 'Jeff Bezos', isCorrect: false},
        {answerText: 'Elon Musk', isCorrect: true},
        {answerText: 'Bill Gates', isCorrect: false},
        {answerText: 'Tony Stark', isCorrect: false},
      ],
    },
    {
      questionText: 'The iPhone was created by which company?',
      answerOptions: [
        {answerText: 'Apple', isCorrect: true},
        {answerText: 'Intel', isCorrect: false},
        {answerText: 'Amazon', isCorrect: false},
        {answerText: 'Microsoft', isCorrect: false},
      ],
    },
    {
      questionText: 'How many Harry Potter books are there?',
      answerOptions: [
        {answerText: '1', isCorrect: false},
        {answerText: '4', isCorrect: false},
        {answerText: '6', isCorrect: false},
        {answerText: '7', isCorrect: true},
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const [isClicked, setIsClicked] = useState(false);
  const [correctAnswerId, setCorrectAnswerId] = useState(null);

  const handleAnswerQuestion = (isCorrect, index) => {
    setIsClicked(true)
    setCorrectAnswerId(index)

    if (isCorrect) {
      setScore(score + 1)
    }

    let nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setTimeout(() => {
        setCurrentQuestion(nextQuestion)
        setIsClicked(null)
      }, 500)
    } else {
      setTimeout(() => {
        setShowScore(true)
        setIsClicked(null)
      }, 500)
    }
  }

  const handleResetQuiz = () => {
    setShowScore(false);
    setCurrentQuestion(0);
    setScore(0)
  }

  return (
      <div className='app'>
        {showScore ?
            <div className="score">
              <div className='score-section'>You scored {score} out of {questions.length}</div>
              <button className="reset-btn" onClick={handleResetQuiz}>Reset Quiz</button>
            </div>
            :
            <>
              <div className='question-section'>
                <div className='question-count'>
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className='question-text'>{questions[currentQuestion].questionText}</div>
              </div>
              <div className='answer-section'>
                {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                    <button
                        key={index}
                        className={isClicked && correctAnswerId === index ? (answerOption.isCorrect ? 'correct' : 'incorrect') : ''}
                        onClick={() => handleAnswerQuestion(answerOption.isCorrect, index)}>{answerOption.answerText}
                    </button>
                ))}
              </div>
            </>
        }
      </div>
  );
}
