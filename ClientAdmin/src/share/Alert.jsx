import Swal from 'sweetalert2';
// 200, 201
// 404

const StatusMiddleWare = (status, data) => {
  const { infoMessage, type = 'success', isContinue = false } = data;
  if (!infoMessage) {
    return true;
  }

  switch (status) {
    case 200:
    case 201:
      infoMessage && Swal.fire('', infoMessage, type);
      return isContinue;
    case 404:
      Swal.fire('', infoMessage, 'error');
      return false;
    default:
      return false;
  }
};
export { StatusMiddleWare };
