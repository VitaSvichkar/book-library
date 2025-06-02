import { closeModal, getStateModal } from '../../features/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from './Modal';
import { ModalMyLibrary } from './ModalMyLibrary';

export function ModalWrapper() {
  const modal = useSelector(getStateModal);
  const dispatch = useDispatch();
  console.log(modal);

  function handleCloseModal(e) {
    if (e.target !== e.currentTarget) {
      return;
    }
    dispatch(closeModal());
  }

  if (modal.type === 'CATALOG') {
    return (
      <Modal book={modal.selectedBook} handleCloseModal={handleCloseModal} />
    );
  } else if (modal.type === 'LIBRARY') {
    return (
      <ModalMyLibrary
        book={modal.selectedBook}
        handleCloseModal={handleCloseModal}
      />
    );
  }
}
