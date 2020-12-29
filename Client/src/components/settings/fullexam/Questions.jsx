import React from 'react';
import Question from './Question';
const Questions = props => {
  const buildAnswerSheet = props => {
    const { fromIndex = 1, toIndex = 25 } = props;
    let answers = [];
    let count = parseInt(fromIndex);
    let end = parseInt(toIndex);
    while (count <= end) {
      answers.push(<Question stt={count} />);
      count++;
    }
    return answers;
  };
  return (
    <div className='answer-column'>
      <div
        className={`answer-row answer-abcd ${
          props.fromIndex > 100 ? 'modified' : ''
        }`}>
        <span className='answer-a'> A</span>
        <span className='answer-b'> B</span>
        <span className='answer-c'> C</span>
        <span className='answer-d'> D</span>
      </div>
      {buildAnswerSheet(props)}
    </div>
  );
};

export default Questions;
