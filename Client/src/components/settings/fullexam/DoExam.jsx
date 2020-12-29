import { CCol, CRow, CButton } from '@coreui/react';
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import rc from './LC.pdf';
import Questions from './Questions';
import { mdiTriangle } from '@mdi/js';
import Icon from '@mdi/react';
import { mdiPause } from '@mdi/js';
import audio from './TEST 01.mp3';
import useSound from 'use-sound';
import TimeSlider from 'react-input-slider';
import Countdown from 'react-countdown';
import { useDispatch, useSelector } from 'react-redux';
import PlayerAudio, { useAudio } from '../../audio/PlayerAudio';
import Axios from 'axios';
import { axiosPost } from '../../../share/axios';

const DoExam = props => {
  const url = rc;
  const [isPlaying, toggle] = useAudio({ url: audio });
  // pdf

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };
  const changePage = offset => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const previousPage = () => {
    window.scrollTo(180, 180);
    changePage(-1);
  };

  const nextPage = () => {
    window.scrollTo(180, 180);
    changePage(1);
  };

  return (
    <div className='doExam-main'>
      <CRow>
        <CCol md='6' sm='12' className='exam'>
          <Document
            className='doExam-exam'
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}>
            <Page scale={1.2} pageNumber={pageNumber} height={800} />

            <div>
              <div className='pagec'>
                Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
              </div>

              <div className='button'>
                <button
                  type='button'
                  disabled={pageNumber <= 1}
                  onClick={previousPage}
                  className='Pre mr-2'>
                  <Icon
                    path={mdiTriangle}
                    title='Previous'
                    size={1}
                    horizontal
                    vertical
                    rotate={90}
                  />
                </button>
                <button
                  type='button'
                  disabled={pageNumber >= numPages}
                  onClick={nextPage}>
                  <Icon
                    path={mdiTriangle}
                    title='Next page'
                    size={1}
                    horizontal
                    vertical
                    rotate={270}
                  />
                </button>
              </div>
            </div>
          </Document>
        </CCol>
        <CCol md='6' sm='12'>
          <div className='doExam-main-intro'>
            <h3>Mark your answer on your answer sheet</h3>
            <div>
              <OClock onPlayAudio={toggle} />
            </div>
          </div>
          <AnswerSheet />
        </CCol>
      </CRow>
    </div>
  );
};

const AnswerSheet = () => {
  return (
    <CRow>
      <CCol md='6' sm='12'>
        <div className='answer-sheet'>
          <div className='answer-sheet-header'>LISTENING SECTION</div>
          <CRow className='answer-sheet-column'>
            <CCol md='3' sm='3'>
              <Questions fromIndex='1' toIndex='25' />
            </CCol>
            <CCol md='3' sm='3'>
              <Questions fromIndex='26' toIndex='50' />
            </CCol>
            <CCol md='3' sm='3'>
              <Questions fromIndex='51' toIndex='75' />
            </CCol>
            <CCol md='3' sm='3'>
              <Questions fromIndex='76' toIndex='100' />
            </CCol>
          </CRow>
        </div>
      </CCol>
      <CCol md='6' sm='12'>
        <div className='answer-sheet'>
          <div className='answer-sheet-header'>READING SECTION</div>
          <CRow className='answer-sheet-column'>
            <CCol md='3' sm='3'>
              <Questions fromIndex='101' toIndex='125' />
            </CCol>
            <CCol md='3' sm='3'>
              <Questions fromIndex='126' toIndex='150' />
            </CCol>
            <CCol md='3' sm='3'>
              <Questions fromIndex='151' toIndex='175' />
            </CCol>
            <CCol md='3' sm='3'>
              <Questions fromIndex='176' toIndex='200' />
            </CCol>
          </CRow>
        </div>
      </CCol>
    </CRow>
  );
};

const OClock = props => {
  const { onPlayAudio } = props;
  const [isStart, setIsStart] = useState(false);
  const [timer, setTimer] = useState(Date.now());
  const examInfo = useSelector(state => state.doExam);
  const accountLogin = useSelector(state => state.authentication.loginState);
  const { answerSheet } = examInfo;
  const { email } = accountLogin;

  const handleSubmit = async () => {
    setIsStart(false);
    onPlayAudio(false);
    let examResult = {
      email: email,
      answerSheet: answerSheet,
      url: 'http://localhost:9999/ketQuaBaiThi'
    };
    // phd submit dethi
    const res = await axiosPost(examResult);
  };

  const handleHetThoiGian = isCompleted => {
    if (isCompleted) {
      handleSubmit();
    }
  };
  const renderBtn = isStart => {
    console.log('rerender');

    if (isStart)
      return (
        <>
          <Countdown
            onComplete={e => handleHetThoiGian(e.completed)}
            className='doExam-main-counter'
            date={timer + 7200000}
          />
          <CButton
            variant='outline'
            color='danger'
            size='lg'
            className='intro-container-btn-start'
            onClick={handleSubmit}>
            Nộp bài
          </CButton>
        </>
      );
    return (
      <CButton
        variant='outline'
        color='success'
        size='lg'
        className='intro-container-btn-start'
        onClick={() => {
          setIsStart(true);
          onPlayAudio(true);
        }}>
        Bắt đầu
      </CButton>
    );
  };
  return <>{renderBtn(isStart)}</>;
};
export default DoExam;
