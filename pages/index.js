import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import React from 'react';
import { useRouter } from 'next/router';
import Input from '../src/components/Input';
import Button from '../src/components/Button';


/*
const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`
 */

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  color:black;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

/*
const BackgroundImage = styled.div`
background-image:url(${db.bg});
flex:1;
background-size:cover;
background-position:center;`
  ;
*/

/*
export default function Home() {
return (
  <BackgroundImage>
    <QuizContainer>
      <Widget>
        <Widget.Header>
          <h1> O PODER DO .NET COM NEXT JS!</h1>
        </Widget.Header>
        <Widget.Content>
          <p> Com o .Net consegue-se interligar tudo! </p>
        </Widget.Content>
      </Widget>
      <Widget>
        <Widget.Header>
          <h1>.NET NO BACK , NEXT JS NO FRONT</h1>
        </Widget.Header>
        <Widget.Content>
          <p> Com o .Net consegue-se interligar tudo! </p>
        </Widget.Content>
      </Widget>
    </QuizContainer>
  </BackgroundImage>
)
}
*/

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  return (
    <QuizBackground backgroundImage={db.bg}>

      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(infosDoEvento) => {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Fazendo uma submissão por meio do react');
            }}>
              <Input
                name="nomeDoUsuario"
                onChange={function (infosDoEvento) {
                  setName(infosDoEvento.target.value);
                }}
                placeholder="Diga o seu nome"
                value={name}
              />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget>
          <Widget.Content>
            <h1>O poder do .NET com REACT!</h1>
            <p>
              O .NET no lado do servidor é muito poderoso!
              Sabe-se que o NextJs é muito bom para se criar componentes.
              Estas duas tecnologias tornam seu App Web muito rico!
              {' '}
            </p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/mehrthur-teste" />
    </QuizBackground>
  );
}
