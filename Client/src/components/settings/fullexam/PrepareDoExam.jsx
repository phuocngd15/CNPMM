import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/core';
import MoonLoader from 'react-spinners/MoonLoader';
import { useParams, useHistory } from 'react-router-dom';
import { CButton, CContainer, CLink } from '@coreui/react';
import { getExam, getGGExam } from '../../../redux/slice/doExamSlice';
import { axiosGet } from '../../../share/axios';

const PrepareDoExam = () => {
  // let id = useParams();
  const { id } = useParams();
  const prepareDoExam = useSelector(state => state.doExam);
  const { title } = prepareDoExam;
  const realTitle = title || null;
  console.log(prepareDoExam);
  const dispatch = useDispatch();
  //old
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const reqModel = {
        url: `http://localhost:9999/api/Fullexam/info`,
        id: id
      };
      dispatch(getExam(reqModel));
    })();
    return () => {
      cancelled = true;
    };
  }, [dispatch, id]);

  if (prepareDoExam.loading) {
    const override = css`
      display: block;
      margin: 0 auto;
      border-color: red;
    `;
    return (
      <CContainer className='intro-container'>
        <div className='sweet-loading'>
          <MoonLoader
            css={override}
            size={150}
            color={'#123abc'}
            loading={prepareDoExam.loading}
          />
        </div>
      </CContainer>
    );
  }
  return (
    <CContainer className='intro-container'>
      <h1>{realTitle}</h1>
      <h4>Total time: 120 minutes</h4>
      <ul>
        <li>Listening: 45 minutes</li>
        <li>Reading: 75 minutes</li>
      </ul>
      <CButton
        variant='outline'
        color='success'
        size='lg'
        className='intro-container-btn-start'>
        <CLink to='/doExam'>START</CLink>
      </CButton>
    </CContainer>
  );
};

export default PrepareDoExam;
