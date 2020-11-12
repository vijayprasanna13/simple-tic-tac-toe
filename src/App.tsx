import React, { ChangeEvent, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import TicTacToe from "./TicTacToe";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Form, Card } from 'react-bootstrap';

function App() {
  const [N, setN] = useState(3)

  const [inputValue, setInputValue] = useState(N)

  const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(parseInt(e.target.value))
  }

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setN(inputValue);
  }

  const [restartFlag, setRestartFlag] = useState(false);

  const handleEndGame = (message: string) => {
    toast(message);
    setTimeout(() => {
      setRestartFlag(!restartFlag);
    }, 3000)
  }

  return (
    <div>
      <section aria-label="Game Title says tic tac toe">
        <h1 style={{ textAlign: 'center' }}>Tic Tac Toe</h1>
      </section>

      <ToastContainer />

      <div style={{ display: 'flex', justifyContent: 'center', padding: '1%' }}>
        <section aria-label="Input for the game">
          {/* <input type="number" value={inputValue} onChange={onInputValueChange}></input> */}

          <Form inline>
            <Form.Group>
              <Form.Control
                type="number"
                value={inputValue}
                onChange={onInputValueChange}
                className="mx-sm-3"
                aria-describedby="passwordHelpInline"
              />
            </Form.Group>
          </Form>
        </section>

        <Button onClick={handleButtonClick} variant="outline-info" aria-label="Click here to start game">Start Game!</Button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }} >
        <Card>
          <Card.Body>
            <TicTacToe n={N} notify={handleEndGame} restart={restartFlag} />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default App;
