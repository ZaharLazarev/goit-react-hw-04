import React from 'react';
import ReactModal from 'react-modal';

export default function ImageModal({ image, onClose }) {
  return (
    <ReactModal
      isOpen={!!image}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
        content: {
          width:'90%',
          height:'90%',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor:'transparent',
          border:'none'
        },
      }}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        style={{ width: '100%', height: '90%' }}
      />
      <button onClick={onClose}>Close</button>
    </ReactModal>
  );
}
