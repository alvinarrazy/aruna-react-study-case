import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

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

//For building number button combination which will be pressed
const buildCombinations = (arr: any[], num: number) => {
  const res = [];
  let temp: any[], i, j, max = 1 << arr.length;
  for (i = 0; i < max; i++) {
    temp = [];
    for (j = 0; j < arr.length; j++) {
      if (i & 1 << j) {
        temp.push(arr[j]);
      };
    };
    if (temp.length === num) {
      res.push(temp.reduce(function (a, b) { return a + b; }));
    };
  };
  return res;
}


test('Operator only', () => {

  render(<App />);


  const resultBox = screen.getByTestId(dataTestIdConst.RESULT_BOX)

  for (let o of operators) {
    let button = screen.getByTestId(`${dataTestIdConst.OPERATOR}-${o}`)

    //Before clicked
    expect(resultBox).not.toHaveTextContent('Error: assign more than one number for the operator to process')
    //First click
    fireEvent.click(button)
    expect(resultBox).toHaveTextContent('Error: assign more than one number for the operator to process')
    //Second click
    fireEvent.click(button)
    expect(resultBox).not.toHaveTextContent('Error: assign more than one number for the operator to process')
  }
});

test('1 number with no operator', () => {

  render(<App />);


  const resultBox = screen.getByTestId(dataTestIdConst.RESULT_BOX)

  for (let n of numbers) {
    let button = screen.getByTestId(`${dataTestIdConst.NUMBER_BUTTON}-${n.label}`)

    //Before clicked
    expect(resultBox).not.toHaveTextContent(n.label)
    expect(button).toHaveTextContent('X')
    //First click
    fireEvent.click(button)
    expect(resultBox).toHaveTextContent(n.label)
    expect(button).toHaveTextContent('✓')
    //Second click
    fireEvent.click(button)
    expect(resultBox).not.toHaveTextContent(n.label)
    expect(button).toHaveTextContent('X')
  }
});

test('n numbers with no operator', () => {

  render(<App />);


  const resultBox = screen.getByTestId(dataTestIdConst.RESULT_BOX)

  for (let combinationNumber = 2; combinationNumber <= 3; combinationNumber++) {
    let numberCombinations = buildCombinations(["0", "1", "2"], combinationNumber)

    for (let combination of numberCombinations) {
      //Get combination index
      let indexes = combination.split('')
      indexes = indexes.map((i: string) => Number(i))

      //First click for each button
      for (let i of indexes) {
        let button = screen.getByTestId(`${dataTestIdConst.NUMBER_BUTTON}-${numbers[i].label}`)
        fireEvent.click(button)
      }

      //Check result box
      for (let i of indexes) {
        expect(resultBox).toHaveTextContent(numbers[i].label)
        expect(resultBox).toHaveTextContent('...')
      }

      //Second click for each button
      for (let i of indexes) {
        let button = screen.getByTestId(`${dataTestIdConst.NUMBER_BUTTON}-${numbers[i].label}`)
        fireEvent.click(button)
      }

      //Check result box
      for (let i of indexes) {
        expect(resultBox).toHaveTextContent('')
      }
    }
  }

});


test('1 number with an operator', () => {

  render(<App />);


  const resultBox = screen.getByTestId(dataTestIdConst.RESULT_BOX)

  for (let o of operators) {
    let operatorButton = screen.getByTestId(`${dataTestIdConst.OPERATOR}-${o}`)
    //Operator button assigned
    fireEvent.click(operatorButton)

    for (let n of numbers) {
      let button = screen.getByTestId(`${dataTestIdConst.NUMBER_BUTTON}-${n.label}`)

      //First click assigning 1 number with the operator
      fireEvent.click(button)
      expect(resultBox).toHaveTextContent('Error: assign more than one number for the operator to process')
      expect(button).toHaveTextContent('✓')
      //Second click assigning no number with the operator
      fireEvent.click(button)
      expect(resultBox).toHaveTextContent('Error: assign more than one number for the operator to process')
      expect(button).toHaveTextContent('X')
    }
  }
});

test('n number with an operator', () => {

  render(<App />);


  const resultBox = screen.getByTestId(dataTestIdConst.RESULT_BOX)

  for (let o of operators) {
    let operatorButton = screen.getByTestId(`${dataTestIdConst.OPERATOR}-${o}`)
    //Operator button assigned
    fireEvent.click(operatorButton)

    for (let combinationNumber = 2; combinationNumber <= 3; combinationNumber++) {
      let numberCombinations = buildCombinations(["0", "1", "2"], combinationNumber)

      for (let combination of numberCombinations) {
        //Get combination index
        let indexes = combination.split('')
        indexes = indexes.map((i: string) => Number(i))

        //First click for each button with the operator
        for (let i of indexes) {
          let button = screen.getByTestId(`${dataTestIdConst.NUMBER_BUTTON}-${numbers[i].label}`)
          fireEvent.click(button)
        }

        //Check result box
        for (let i of indexes) {
          expect(resultBox).toHaveTextContent(numbers[i].label)
          expect(resultBox).toHaveTextContent(operatorButton.innerHTML)
        }

        //Second click for each button, cancelling all numbers but keep the operator
        for (let i of indexes) {
          let button = screen.getByTestId(`${dataTestIdConst.NUMBER_BUTTON}-${numbers[i].label}`)
          fireEvent.click(button)
        }

        //Check result box
        for (let i of indexes) {
          expect(resultBox).toHaveTextContent('Error: assign more than one number for the operator to process')
        }
      }
    }
  }
});