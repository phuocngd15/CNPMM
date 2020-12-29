 import React, { useEffect, useRef, useState } from 'react';
 import {
   CButton,
   CCard,
   CCardBody,
   CCardHeader,
   CCol,
   CForm,
   CFormGroup,
   CFormText,
   CTextarea,
   CInput,
   CInputFile,
   CInputCheckbox,
   CInputRadio,
   CLabel,
   CSelect
 } from '@coreui/react';
 import CIcon from '@coreui/icons-react';
 import { postExamRequest, addExam } from '../../../Store/slice/examSlide';
 import { useDispatch } from 'react-redux';
 import { useHistory } from 'react-router-dom';
  import Dropzone from 'react-dropzone';

 const AddExam = () => {
   const dispatch = useDispatch();
   let history = useHistory();
    let titleRef = useRef();
    let descriptionRef = useRef();
    let LCRef = useRef();
    let AudioRef = useRef();
    let RCRef = useRef();
    let exam = { titleRef, descriptionRef, LCRef, AudioRef, RCRef };

    const handleAddExam = async () => {
      console.log(exam);
    };
   const [title, setStateTitle] = useState('');
   const [description, setStateDescription] = useState('');
   const [LC, setStateLC] = useState();
    const [Audio, setStateAudio] = useState();
    const [RC, setStateRC] = useState();

   const onDrop = files => {
     const [uploadFile] = files;
     setStateLC(uploadFile);

      const fileReader = new FileReader();
      fileReader.onload=()=>{
        se
      }
   };

   const createExam = e => {
     e.preventDefault();
     const newExam = {
       title: title,
       description: description,
       LC: LC
        Audio: Audio,
        RC: RC
     };
      history.push('/');
      dispatch(addExam(newExam));
     console.log(newExam);
   };
   return (
     <>
       <CCard>
         <CCardHeader className='exams-title'>THÊM ĐỀ THI</CCardHeader>
         <CCardBody className='exams-content'>
           <CForm
             onSubmit={e => createExam(e)}
             encType='multipart/form-data'
             className='form-horizontal'>
             <CFormGroup row className='exams-content-group'>
               <CCol md='3'>
                 <CLabel htmlFor='text-tieude'>Tên đề thi</CLabel>
               </CCol>
               <CCol xs='12' md='6'>
                 <CInput
                   id='text-tieude'
                   name='text-tieude'
                    ref={titleRef}
                   value={title}
                   onChange={e => setStateTitle(e.target.value)}
                   placeholder='Tên đề thi'
                   required
                 />
               </CCol>
             </CFormGroup>
             <CFormGroup row className='exams-content-group'>
               <CCol md='3'>
                 <CLabel htmlFor='text-tieude'>Mô tả</CLabel>
               </CCol>
               <CCol xs='12' md='6'>
                 <CInput
                   id='text-mota'
                   name='text-mota'
                    ref={descriptionRef}
                   value={description}
                   onChange={e => setStateDescription(e.target.value)}
                   placeholder='Mô tả'
                 />
               </CCol>
             </CFormGroup>

             {/* <CFormGroup row>
               <CCol md='3'>
                 <CLabel>Loại đề</CLabel>
               </CCol>
               <CCol md='9'>
                 <CFormGroup variant='custom-radio' inline>
                   <CInputRadio
                     custom
                     id='inline-radio1'
                     name='inline-radios'
                     value='option1'
                   />
                   <CLabel variant='custom-checkbox' htmlFor='inline-radio1'>
                     Listening
                   </CLabel>
                 </CFormGroup>
                 <CFormGroup variant='custom-radio' inline>
                   <CInputRadio
                     custom
                     id='inline-radio2'
                     name='inline-radios'
                     value='option2'
                   />
                   <CLabel variant='custom-checkbox' htmlFor='inline-radio2'>
                     Reading
                   </CLabel>
                 </CFormGroup>
               </CCol>
             </CFormGroup> */}
             <CFormGroup row className='exams-content-group'>
               <CCol md='3'>
                 <CLabel htmlFor='filepdf-dethinghe'>Đề thi nghe</CLabel>
               </CCol>
               <CCol xs='12' md='6'>
                 <CInputFile
                   id='filepdf-dethinghe'
                   name='filepdf-dethinghe'
                    ref={LCRef}
                   value={LC}
                   onChange={e => setStateLC(e.target.value)}
                   required
                 />
               </CCol>
             </CFormGroup>
             {/* <CFormGroup row className='exams-content-group'>
               <CCol md='3'>
                 <CLabel htmlFor='fileaudio-dethinghe'>File nghe</CLabel>
               </CCol>
               <CCol xs='12' md='6'>
                 <CInputFile
                   id='fileaudio-nghe'
                   name='fileaudio-dethinghe'
                    ref={AudioRef}
                   value={Audio}
                   onChange={e => setStateAudio(e.target.value)}
                   required
                 />
               </CCol>
             </CFormGroup>
             <CFormGroup row className='exams-content-group'>
               <CCol md='3'>
                 <CLabel htmlFor='filepdf-dethidoc'>Đề thi đọc</CLabel>
               </CCol>
               <CCol xs='12' md='6'>
                 <CInputFile
                   id='filepdf-dethidoc'
                   name='filepdf-dethidoc'
                    ref={RCRef}
                   value={RC}
                   onChange={e => setStateRC(e.target.value)}
                   required
                 />
               </CCol>
             </CFormGroup> */}
             <CButton
               type='submit'
               size='sm'
               className='mr-5'
               color='primary'
                onClick={handleAddExam}
             >
               <CIcon name='cil-scrubber' /> Thêm mới
             </CButton>
             <CButton type='reset' size='sm' color='danger'>
               <CIcon name='cil-ban' /> Quay lại
             </CButton>
           </CForm>
         </CCardBody>
       </CCard>
     </>
   );
 };

 export default AddExam;
