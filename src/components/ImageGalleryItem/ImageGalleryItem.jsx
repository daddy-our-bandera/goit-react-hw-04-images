import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ image }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const { webformatURL, largeImageURL, tags } = image;

  return (
    <>
      <img
        className={css.ImageGalleryItem}
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
      />

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
