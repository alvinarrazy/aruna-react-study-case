import React from 'react';
import './App.css';
import './Theme/css/theme.css'
import { Container, Card, Button, InputGroup, Form } from 'react-bootstrap'

import { Header } from './Components'

const dataTestIdConst = {
  OPERATOR: 'OPERATOR',
  NUMBER_BUTTON: 'NUMBER_BUTTON',
  NUMBER_LABEL: 'NUMBER_LABEL',
  RESULT_BOX: 'RESULT_BOX'
}

const numbers = [
  {
    label: '10',
    value: 10
  },
  {
    label: '5',
    value: 5
  },
  {
    label: '2',
    value: 2
  }
]

const operators = ['+', '-', '÷', 'x']

function App() {
  const [chosenNumbers, setNumbers] = React.useState<number[]>([])
  const [operator, setOperator] = React.useState<string | null>(null)

  function handleChangeNumbers(val: number) {
    let arr = [...chosenNumbers]

    if (arr.includes(val)) { //Cancel number
      arr = arr.filter(el => el !== val)
    }
    else { //Push number
      arr.push(val)
    }
    //Assign number
    return setNumbers(arr)
  }

  function handleChangeOperator(val: string) {
    //Handle cancel operator
    if (operator === val) return setOperator(null)
    //Handle assign operator
    else setOperator(val)
  }

  function handleResultBox() {
    //Handle error if chosen numbers are less than 2
    if (operator && chosenNumbers.length < 2) return 'Error: assign more than two numbers for the operator to process'

    let string = ''
    let operatorString = ` ${operator ?? '...'} `

    //Handle calculation, undefined if operator hasn't been set
    let calculationResult: number | undefined = operator ? chosenNumbers.reduce((a, b) => {
      switch (operator) {
        case '+':
          return a + b
        case '-':
          return a - b
        case 'x':
          return a * b
        case '÷':
          return a / b
        default: return 0
      }
    })
      :
      undefined

    for (let [index, n] of chosenNumbers.entries()) { //Iterate every chosen numbers
      if (index === 0) //For the first number
        string = String(n) + ' '
      else //For the rest of the numbers
        string = string + operatorString + String(n)
    }
    //Final string
    if (operator)
      string = string + ' = ' + `${calculationResult !== undefined ? String(calculationResult) : 'Choose an operator'}`
    return string
  }

  return (
    <Container>
      <Header
        title="Alvin's Calculator"
        subTitle='For Aruna Technical Test'
      />
      <Container className='d-flex justify-content-center'>
        <Card style={{ width: '36rem' }}>
          <Container className='p-4'>
            <div className='row border mb-3'>
              <div className='col pt-3 pb-3 d-flex align-items-center' style={{ height: '4em' }}>
                <p data-testid={`${dataTestIdConst.RESULT_BOX}`} className='m-0'>{handleResultBox()}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                {
                  operators.map((o, index, arr) => {
                    const val = arr[index];
                    const valPlusOne = arr[index + 1];
                    if (index % 2 === 0)
                      return (
                        <div key={index} className='row h-50 mb-2'>
                          <div className='col '>
                            <Button
                              variant={operator === val ? 'success' : 'primary'}
                              onClick={() => handleChangeOperator(val)}
                              size='lg'
                              style={{ width: '100%', height: '100%' }}
                              data-testid={`${dataTestIdConst.OPERATOR}-${val}`}
                            >
                              {val}
                            </Button>
                          </div>
                          <div className='col'>
                            <Button
                              variant={operator === valPlusOne ? 'success' : 'primary'}
                              onClick={() => handleChangeOperator(valPlusOne)}
                              size='lg'
                              style={{ width: '100%', height: '100%' }}
                              data-testid={`${dataTestIdConst.OPERATOR}-${valPlusOne}`}
                            >
                              {valPlusOne}
                            </Button>
                          </div>
                        </div>
                      )
                  })
                }
              </div>
              <div className='col'>
                <p>Numbers</p>
                {
                  numbers.map(n => {
                    return (
                      <div key={n.value} className='row mb-3'>
                        <InputGroup>
                          <InputGroup.Text
                            data-testid={`${dataTestIdConst.NUMBER_LABEL}-${n.label}`}
                            style={{ width: '80%', display: 'flex', justifyContent: 'center' }}
                          >
                            {n.label}
                          </InputGroup.Text>
                          <Button
                            variant={chosenNumbers.includes(n.value) ? "success" : "danger"}
                            onClick={() => handleChangeNumbers(n.value)} style={{ width: '20%' }}
                            data-testid={`${dataTestIdConst.NUMBER_BUTTON}-${n.label}`}
                          >
                            {chosenNumbers.includes(n.value) ? "✓" : "X"}
                          </Button>
                        </InputGroup>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </Container>
        </Card>
      </Container>
    </Container>
  );
}

export default App;
