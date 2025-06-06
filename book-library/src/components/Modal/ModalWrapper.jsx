import { closeModal, getStateModal } from '../../features/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ModalCatalog } from './ModalCatalog';
import { ModalMyLibrary } from './ModalMyLibrary';
import { useEffect } from 'react';

export function ModalWrapper() {
  const modal = useSelector(getStateModal);
  const dispatch = useDispatch();

  function handleCloseModal(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    dispatch(closeModal());
  }

  useEffect(() => {
    const scrollWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (modal.type) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollWidth}px`;
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [modal.type]);

  switch (modal.type) {
    case 'CATALOG':
      return (
        <ModalCatalog
          book={modal.selectedBook}
          handleCloseModal={handleCloseModal}
        />
      );
    case 'LIBRARY':
      return (
        <ModalMyLibrary
          book={modal.selectedBook}
          handleCloseModal={handleCloseModal}
        />
      );
    default:
      return null;
  }
}
