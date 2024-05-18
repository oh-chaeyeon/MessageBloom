import './Post.scss';
import { useState, useEffect } from 'react';
import { DEFAULT_RECIPIENT } from '../../utils/post/postPageConstants';
import { postRecipient } from '../../apis/api';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ToggleOption from '../../components/post-page/toggle-options';
import ButtonLink from '../../components/commons/button-link';

export default function Post() {
  const [recipient, setRecipient] = useState(DEFAULT_RECIPIENT);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'all',
  });
  const toInput = watch('toInput');

  const handleCreateClick = async () => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(recipient));
    const { id } = await postRecipient(formData.get('data'));
    navigate(`/post/${id}`);
  };

  useEffect(() => {
    setRecipient({ ...recipient, name: toInput });
  }, [toInput]);

  return (
    <>
      <form className='background-form' onSubmit={(e) => e.preventDefault()}>
        <div className='background-form__header'>
          <label className='background-form__title'>To.</label>
          <input
            className={`background-form__input ${errors.toInput && 'form--error'}`}
            id='toInput'
            placeholder='받는 사람 이름을 입력해 주세요'
            autoFocus
            autoComplete='off'
            {...register('toInput', { required: '이름을 입력해주세요' })}
          />
        </div>
        {errors.toInput && <p className='form--error'>{errors.toInput.message}</p>}
        <div className='background-form-group'>
          <p>배경화면을 선택해주세요.</p>
          <p>컬러를 선택하거나, 이미지를 선택할 수 있습니다.</p>
        </div>
        <ToggleOption setRecipient={setRecipient} />
        <ButtonLink
          buttonText={'생성하기'}
          onClick={handleCreateClick}
          fullWidth
          disabled={!!errors.toInput}
        />
      </form>
    </>
  );
}
