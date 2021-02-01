import React from 'react';
//import db from '../../../db.json';
import Widget from '../../components/Widget';
import QuizBackground from '../../components/QuizBackground';
import QuizLogo from '../../components/QuizLogo';
import Button from '../../components/Button';
import QuizContainer2 from '../../components/QuizContainer2';
import AlternativesForm from '../../components/alternativesForms';
import BackLinkArrow from '../../components/BackLinkArrow';

function ResultWidget({ results }) {
    return (
        <Widget>
            <Widget.Header>
                Tela de Resultado
	     </Widget.Header>
            <Widget.Content>
                <p>Você acertou
                    {' '}
                    {/*results.reduce((somatorioAtual, resultAtual) => {
                        const isAcerto = resultAtual === true;
                        if (isAcerto) {
                            return somatorioAtual + 1;
                        }
                        return somatorioAtual;
                    }, 0)*/}
                    {results.filter((x) => x).length}
                    {' '}
                perguntas</p>
                <ul>
                    {results.map((result, index) => (
                        <li key={`result__${result}`}>
                            #{index + 1} Resultado:{result === true ? 'Acertou!' : 'Errou'}
                        </li>
                    ))}
                </ul>
            </Widget.Content>
        </Widget>
    );
}


function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Carregando...
	     </Widget.Header>
            <Widget.Content>
                [Desafios do Loading]
	     </Widget.Content>
        </Widget>
    );
}

function QuestionWidget({ question, totalQuestion, questionIndex, onSubmit, addResult }) {
    // const [results, setResults] = React.useState([true, false, true]);
    const [isQuestionSubmited, setIsQuestionSubmited] = React.useState();
    const questionId = `question__${questionIndex}`;
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSeleted = selectedAlternative !== undefined;
    return (
        <Widget>
            <Widget.Header>
                <BackLinkArrow href="/" />
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
                <AlternativesForm onSubmit={(infosDoEvento) => {
                    infosDoEvento.preventDefault();
                    setIsQuestionSubmited(true);
                    setTimeout(() => {
                        addResult(isCorrect);
                        onSubmit();
                        setIsQuestionSubmited(false);
                        setSelectedAlternative(undefined);
                    }, 3 * 1000);
                }}
                >
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        console.log('Para de reclamar um pouquinho só');
                        const alternativeId = `alternative__${alternativeIndex}`;
                        const alternativeStatus = isQuestionSubmited && isCorrect ? 'SUCCESS' : 'ERROR';
                        const isSelected = selectedAlternative === alternativeIndex;
                        return (
                            <Widget.Topic
                                as="label"
                                key={alternativeId}
                                htmlFor={alternativeId}
                                data-selected={isSelected}
                                data-status={setIsQuestionSubmited && alternativeStatus}>
                                <input id={alternativeId}
                                    type="radio"
                                    name={questionId}
                                    onChange={() => setSelectedAlternative(alternativeIndex)}
                                    style={{ display: 'none' }} />
                                {alternative}
                            </Widget.Topic>);
                    })}
                    {/*<pre>
                        {JSON.stringify(question, null, 4)}
                    </pre>*/}
                    <Button type="submit"
                        disabled={!hasAlternativeSeleted}
                    >
                        Confirmar
                    </Button>
                    {/*
                       <p>selectedAlternative:{`${selectedAlternative}`}</p>
                    */}
                    {isQuestionSubmited && isCorrect && <p> Você acertou! </p>}
                    {isQuestionSubmited && !isCorrect && <p> Você errou! </p>}
                </AlternativesForm>
            </Widget.Content >
        </Widget >
    );
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};
export default function QuizPage({ externalQuestions, externalBg }) {
    const [results, setResults] = React.useState([]);
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    console.log("perguntas :", externalQuestions.questions);
    const totalQuestions = externalQuestions.length;
    const [currentQuestion, setcurrentQuestion] = React.useState(0);
    const questionIndex = currentQuestion;
    const question = externalQuestions[questionIndex];
    const bg = externalBg;
    console.log(question);
    function addResult(result) {
        // result.push(result);
        setResults([
            ...results,
            result,
        ]);
    }

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
        <QuizBackground backgroundImage={bg}>
            <QuizContainer2>
                <QuizLogo />
                {screenState == screenStates.QUIZ && (<QuestionWidget
                    question={question}
                    totalQuestion={totalQuestions}
                    questionIndex={questionIndex}
                    onSubmit={handleSubmitQuiz}
                    addResult={addResult}
                />)}
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <ResultWidget results={results} />}
            </QuizContainer2>
        </QuizBackground>
    );
}
