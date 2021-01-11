import React from 'react';
import styled from 'styled-components';

/* The Modal (background) */
const Modal = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
`;

const LogoutModal = ({ logout, setShowLogoutModal }) => {
  return (
    <Modal>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Logout</h5>
            <button onClick={setShowLogoutModal.bind(null, false)} type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Are you sure you want to logout?
          </div>
          <div className="modal-footer">
            <button onClick={setShowLogoutModal.bind(null, false)} type="button" className="btn btn-danger" data-dismiss="modal">Cancel</button>
            <button onClick={logout} type="button" className="btn btn-primary">OK</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;