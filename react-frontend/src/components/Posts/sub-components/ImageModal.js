import React from 'react';

// Styles
import { Modal, ModalContent, Caption, Close } from '../Styles';

const ImageModal = ({ modalInfo, toggleModal }) => {
  return (
    <Modal>
      <Close onClick={toggleModal}>&times;</Close>

      <ModalContent src={modalInfo.image} />

      <Caption>{modalInfo.caption}</Caption>
    </Modal>
  );
};

export default ImageModal;