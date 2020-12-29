import React, { useState, useEffect } from 'react';
import { CCol, CFormGroup, CLabel, CRow } from '@coreui/react';
import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { chooseAnswer } from '../../../redux/slice/doExamSlice';

const Question = props => {
  const { stt } = props;
  const { answerSheet, isSumited } = useSelector(state => state.doExam);
  //console.log(answerSheet[stt - 1]);
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState([
    { id: 1, isChose: false },
    { id: 2, isChose: false },
    { id: 3, isChose: false },
    { id: 4, isChose: false }
  ]);

  const handleChoose = id => {
    let newState = cloneDeep(answer);
    newState.forEach(item => {
      if (item.id === id) {
        item.isChose = !item.isChose;
      } else {
        item.isChose = false;
      }
    });
    const newDapAn = newState.filter(e => e.isChose);

    if (newDapAn.length) {
      dispatch(chooseAnswer({ stt: stt, dapAn: newDapAn[0].id }));
    } else {
      dispatch(chooseAnswer({ stt: stt, dapAn: null }));
    }
    setAnswer(newState);
  };

  const buildAnswerRow = answer => {
    const answerHTML = answer.map(item => {
      return (
        <input
          key={item.id}
          type='radio'
          className={`answer-item answer-${item.id}`}
          checked={item.isChose}
          onClick={() => handleChoose(item.id)}
        />
      );
    });
    answerHTML.unshift(<span className='answer-row-stt'>{stt}</span>);
    return answerHTML;
  };

  const buildAnswerRowSubmited = answer => {
    const answerHTML = answer.map(item => {
      return (
        <input
          key={item.id}
          type='radio'
          className={`answer-item answer-${item.id}`}
          checked={item.isChose}
          onClick={() => handleChoose(item.id)}
        />
      );
    });
    answerHTML.unshift(<span className='answer-row-stt'>{stt}</span>);
    return answerHTML;
  };
  if (!answerSheet)
    return (
      <>
        <div>
          <span className='answer-row'></span>
        </div>
      </>
    );
  return (
    <>
      <div>
        <span className='answer-row'>
          {isSumited ? buildAnswerRowSubmited(answer) : buildAnswerRow(answer)}
        </span>
      </div>
    </>
  );
};

export default Question;
