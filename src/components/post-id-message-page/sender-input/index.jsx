import { useForm } from 'react-hook-form';
import { forwardRef, useEffect } from 'react';
import './SenderInput.scss';

function SenderInput({ setError }, senderInputRef) {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'all',
  });

  useEffect(() => {
    setError((prev) => ({
      ...prev,
      sender: !errors.nameInput,
    }));
  }, [errors.nameInput]);

  return (
    <form className='message-form__sender' onSubmit={(e) => e.preventDefault()}>
      <label htmlFor='nameInput' className='message-form__title'>
        From.
      </label>
      <input
        className={`message-form__inputs ${errors.nameInput && `form--error`}`}
        id='nameInput'
        placeholder='이름을 입력해 주세요.'
        autoComplete='off'
        autoFocus
        {...register('nameInput', {
          required: '이름을 입력해주세요.',
          onChange: (e) => (senderInputRef.current = e.target.value),
        })}
      />
      {errors.nameInput && <p className='form--error'>{errors.nameInput.message}</p>}
    </form>
  );
}

export default forwardRef(SenderInput);
