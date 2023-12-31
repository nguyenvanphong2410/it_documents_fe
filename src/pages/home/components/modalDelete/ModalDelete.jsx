import React from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModalDelete } from '../../../../states/modules/document';
import { userRequest } from '../../../../requestMethods';
// import { Context } from '../../../../context/Context';
import styles from './style.module.scss'
import { Slide, ToastContainer, toast } from 'react-toastify';
const ModalDelete = ({ idDelete, name }) => {
  const isShowModal = useSelector(state => state.document.modalDocumentDelete.isShowModalDelete);

  // console.log('id meme', idDelete)
  // console.log('Type la', typeof (idDelete))

  const dispatch = useDispatch();
  // const { user } = useContext(Context);
  const handleCLoseModal = () => {
    dispatch(setOpenModalDelete(false));
  };

  const handleOkModal = async () => {
    try {
      userRequest.delete(`/post/${idDelete}`);
      console.log('Xóa thành công');
      handleCLoseModal();
      
      // Hiện toast message
      toast.success('Xóa thành công tác tác giả ', name);
  
      // Đặt thời gian chờ 2 giây trước khi tải lại trang
      setTimeout(() => {
        // Tải lại trang sau 2 giây
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <>
      <ToastContainer
        transition={Slide}
        autoClose={2500}
        hideProgressBar={false}
      />
      <Modal
        title="Xóa tài liệu"
        open={isShowModal}
        onOk={handleOkModal}
        onCancel={handleCLoseModal}
      >
        <p>Bạn có muốn xóa tài liệu
          <span className={styles.nameDelete}>
            {name}
          </span>
          <span className={styles.iconDelete}>
            ?
          </span>
        </p>
      </Modal>
    </>
  );
};
export default ModalDelete;