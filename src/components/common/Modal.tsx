import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const cx = classNames.bind(styles);

const Modal: React.FC<ModalProps> = ({ children, isOpen }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={cx('modal-overlay')}>
      <div className={cx('modal-content')}>{children}</div>
    </div>,
    document.getElementById('modal-root') as HTMLElement,
  );
};

export default Modal;
