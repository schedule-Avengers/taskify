import { useState, HTMLInputTypeAttribute } from 'react';
import {
  UseFormTrigger,
  UseFormClearErrors,
  UseFormRegister,
  FieldValues,
  Path,
} from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import classNames from 'classnames/bind';
import styles from './authInput.module.scss';

const cx = classNames.bind(styles);

interface Inputs {
  email?: string;
  nickname?: string;
  password?: string;
  passwordConfirm?: string;
  checkbox?: boolean;
}

interface InputProps<TFormInput extends FieldValues = FieldValues> {
  id: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  name: Path<TFormInput>;
  register: UseFormRegister<TFormInput>;
  trigger: UseFormTrigger<TFormInput>;
  clearErrors: UseFormClearErrors<TFormInput>;
  errorMessage?: string | '';
}

function index<TFormInput extends Inputs>({
  id,
  placeholder,
  type,
  name,
  register,
  trigger,
  clearErrors,
  errorMessage,
  ...props
}: InputProps<TFormInput>) {
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
          {...props}
          onBlur={() => trigger(name)}
          onFocus={() => clearErrors(name)}
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
}

index.displayName = 'index';

export default index;
