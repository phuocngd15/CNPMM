import React from 'react';
import { CFooter, CRow, CCol, CContainer } from '@coreui/react';
import { mdiPhoneIncomingOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { mdiMapMarker } from '@mdi/js';
import { mdiEmail } from '@mdi/js';
const TheFooter = () => {
  return (
    <div className='footer container-fluid'>
      <CContainer>
        <CRow>
          <CCol md='6' className='footer-col-left'>
            <div>
              <h4>SPE</h4>
              <hr />
              Website thi thử TOEIC online miễn phí có chấm điểm và xem đáp án
              ngay, kiểm tra trình độ TOEIC chính xác, nhanh chóng!
            </div>
          </CCol>
          <CCol md='6' className='footer-col-right'>
            <div>
              <h4>Liên hệ</h4>
              <hr />
              <p>
                <Icon
                  path={mdiPhoneIncomingOutline}
                  title='Phone Number'
                  size={1}
                  horizontal
                  vertical
                  rotate={180}
                  color='white'
                  className='mr-2'
                />
                0123456789
              </p>
              <p>
                <Icon
                  path={mdiMapMarker}
                  title='Location'
                  size={1}
                  horizontal
                  vertical
                  rotate={180}
                  color='white'
                  className='mr-2'
                />
                Số 1, đường Võ Văn Ngân, quận Thủ Đức, thành phố Hồ Chí Minh.
              </p>
              <p>
                <Icon
                  path={mdiEmail}
                  title='Email address'
                  size={1}
                  horizontal
                  vertical
                  rotate={180}
                  color='white'
                  className='mr-2'
                />
                speaddmin@gmail.com
              </p>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default React.memo(TheFooter);
