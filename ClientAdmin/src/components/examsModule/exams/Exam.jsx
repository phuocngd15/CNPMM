import React, { useState } from 'react';
import { CLink } from '@coreui/react';
import { mdiPencilOutline } from '@mdi/js';
import { mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';

const Exam = ({ exam, stt }) => {
  return (
    <tr>
      <td className='text-center'>{stt}</td>
      <td className='text-center'>{exam.title}</td>
      <td className='text-center '>{exam.description}</td>
      <td className='text-center '>{exam.createdAt}</td>
      <td className='text-center '>
        <Icon
          path={mdiPencilOutline}
          size={1}
          title='Edit Exam'
          className='mr-1'
        />
        <Icon path={mdiDelete} size={1} title='Delete Exam' className='mr-1' />
      </td>
    </tr>
  );
};

export default Exam;
