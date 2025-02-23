import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastMessage = ({ show, onClose, title, message }) => {
    return (
        <ToastContainer position="top-end" className="p-3">
            <Toast show={show} onClose={onClose} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                </Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastMessage;