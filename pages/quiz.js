
import React from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Button from '../src/components/Button';
import QuizContainer2 from '../src/components/QuizContainer2';

function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Carregando...
	     </Widget.Header>
            <Widget.Content>
                [Desafio do Loading]
	     </Widget.Content>
        </Widget>
    );
}

function QuestionWidget({ question, totalQuestion, questionIndex, onSubmit }) {
    const questionId = `question__${questionIndex}`;
    return (
        <Widget>
            <Widget.Header>
                <h3>
                    {`Pergunta ${questionIndex + 1} de ${totalQuestion}`}
                </h3>
            </Widget.Header>
            <img
                alt="Descricao"
                style={{
                    width: '100%',
                    heigth: '120px',
                    objectFit: 'cover'
                }}
                src={question.image}
            />
            <Widget.Content>
                <h2>
                    {question.title}
                </h2>
                <p>
                    {question.description}
                </p>
                <form onSubmit={(infosDoEvento) => {
                    infosDoEvento.preventDefault();
                    onSubmit();
                }}
                >
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        console.log('Para de reclamar um pouquinho só');
                        const alternativeId = `alternative__${alternativeIndex}`;
                        return (
                            <Widget.Topic
                                as="label"
                                htmlFor={alternativeId}>
                                <input id={alternativeId}
                                    type="radio"
                                    name={questionId}
                                    /*style={{ display: 'none' }}*/ />
                                {alternative}
                            </Widget.Topic>);
                    })}
                    {/*<pre>
                        {JSON.stringify(question, null, 4)}
                    </pre>*/}
                    <Button type="submit">
                        Confirmar
                </Button>
                </form>
            </Widget.Content>
        </Widget>
    );
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};
export default function QuizPage() {

    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    console.log("perguntas :", db.questions);
    const totalQuestions = db.questions.length;
    const [currentQuestion, setcurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];

    React.useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        }, 1 * 1000);
    }, []);

    function handleSubmitQuiz() {
        const nextQuestion = questionIndex + 1;
        if (nextQuestion < totalQuestions) {
            setcurrentQuestion(nextQuestion);
        } else {
            setScreenState(screenStates.RESULT);
        }
    }
    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer2>
                <QuizLogo />
                {screenState == screenStates.QUIZ && (<QuestionWidget
                    question={question}
                    totalQuestion={totalQuestions}
                    questionIndex={questionIndex}
                    onSubmit={handleSubmitQuiz}
                />)}
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <div>Você acertou X questões, parabéns!</div>}
            </QuizContainer2>
        </QuizBackground>
    );
}
