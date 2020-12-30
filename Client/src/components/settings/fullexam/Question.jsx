import React, { useState, useEffect } from 'react';
import { CCol, CFormGroup, CLabel, CRow } from '@coreui/react';
import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { chooseAnswer } from '../../../redux/slice/doExamSlice';

const Question = props => {
  const { stt } = props;
  const { answerSheet, isSumited } = useSelector(state => state.doExam);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState([
    { id: 1, isChose: false },
    { id: 2, isChose: false },
    { id: 3, isChose: false },
    { id: 4, isChose: false }
  ]);
  const handleChoose = id => {
    if (isSumited) return null;
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

  useEffect(() => {
    // show đáp án
    if (isSumited) {
      const correctAnswer = answerSheet.find(e => e.stt === stt);
      const tranferIntToABCD = number => {
        switch (number) {
          case 1:
            return 'A';
          case 2:
            return 'B';
          case 3:
            return 'C';
          case 4:
            return 'D';
          default:
            return null;
        }
      };
      const setColor = (checkedAnswers, trueAnswer) => {
        const checkedAnswer = checkedAnswers.find(
          e => e.id === trueAnswer.dapAn
        );
        console.log(checkedAnswer);
        if (checkedAnswer.isChose) return 'correct-answer';
        else return 'wrong-answer';
      };
      const className = setColor(answer, correctAnswer);

      const answerCheckHtml = () => {
        const notRender = className === 'correct-answer';
        if (notRender) return <div>{`U+1F5F8`}</div>;
        return (
          <div className={`answer-item ${className}`}>
            {tranferIntToABCD(correctAnswer.dapAn)}
          </div>
        );
      };

      setCorrectAnswer(answerCheckHtml());
    }
  }, [answer, answerSheet, isSumited, stt]);

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
    answerHTML.push(correctAnswer);
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
        <span className='answer-row'>{buildAnswerRow(answer)}</span>
      </div>
    </>
  );
};

export default Question;
