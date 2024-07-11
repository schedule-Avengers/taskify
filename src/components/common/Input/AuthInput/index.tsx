import { forwardRef, useState } from 'react';
import {
  UseFormTrigger,
  UseFormClearErrors,
  UseFormRegister,
  FieldValues,
} from 'react-hook-form';
import classNames from 'classnames/bind';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import styles from './authInput.module.scss';

const cx = classNames.bind(styles);

interface InputProps<T extends FieldValues> {
  id: string;
  placeholder?: string;
  type: 'password' | 'text';
  name: string;
  trigger: UseFormTrigger<T>;
  clearErrors: UseFormClearErrors<T>;
  register: UseFormRegister<T>;
  errorMessage?: string | '';
}

const index = forwardRef<HTMLInputElement, InputProps<any>>((props, ref) => {
  const {
    id,
    placeholder,
    errorMessage,
    type,
    trigger,
    clearErrors,
    register,
    name,
  } = props;

  const [inputType, setInputType] = useState(type);

  const toggleInputType = () => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <>
      <div className={cx('inputContainer')}>
        <input
          className={`${cx('formInput')} ${errorMessage ? cx('error') : ''}`}
          id={id}
          placeholder={placeholder}
          type={inputType}
          {...register(name)}
          onBlur={() => trigger(name)}
          onFocus={() => clearErrors(name)}
          ref={ref}
        />
        {type === 'password' && (
          <button
            type='button'
            className={cx('toggleButton')}
            onClick={toggleInputType}
          >
            {inputType === 'password' ? (
              <FaRegEyeSlash size={24} />
            ) : (
              <FaRegEye size={24} />
            )}
          </button>
        )}
      </div>
      {errorMessage && (
        <span className={cx('errorMessage')}>{errorMessage}</span>
      )}
    </>
  );
});

index.displayName = 'index';

export default index;
