import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component{
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.onModalClose();
        }
    }

    handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onModalClose();
        }
    }

    render() {
        const { onModalClose, children } = this.props;
        const { handleBackdropClick } = this;
        
        return createPortal(
            <div className={s.overlay} onClick={handleBackdropClick}>
                <button type='button' className={s.close} onClick={onModalClose}>
                    <i className="fa fa-times" aria-hidden="true"></i>
                </button>
                <div className={s.modal}>
                    {children}
                </div>
            </div>,
            modalRoot
        );
    }
}