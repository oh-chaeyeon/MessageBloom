import { useState } from 'react';
import ColorPicker from '../color-picker';
import ImagePicker from '../image-picker';
import './ToggleOption.scss';

export default function ToggleOption({ setRecipient }) {
  const [selectedValue, setSelectedValue] = useState('color');
  const [customImg, setCustomImg] = useState(null);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
    const isColor = value === 'color';

    if (isColor) {
      setRecipient((prevRecipient) => ({ ...prevRecipient, backgroundColor: 'beige' }));
    } else {
      customImg
        ? setRecipient((prevRecipient) => ({ ...prevRecipient, backgroundImageURL: customImg }))
        : setRecipient((prevRecipient) => ({ ...prevRecipient, backgroundImageURL: null }));
    }
  };

  return (
    <>
      <div className='background-form__radio-group'>
        <label
          className={`background-form__radio-label ${
            selectedValue === 'color' && 'background-form__radio--active'
          }`}
          htmlFor='color'>
          컬러
        </label>
        <input
          className='background-form__radio'
          type='radio'
          id='color'
          name='background'
          value='color'
          onChange={handleChange}
        />
        <label
          className={`background-form__radio-label ${
            selectedValue === 'image' && 'background-form__radio--active'
          }`}
          htmlFor='image'>
          이미지
        </label>
        <input
          className='background-form__radio'
          type='radio'
          id='image'
          name='background'
          value='image'
          onChange={handleChange}
        />
      </div>
      {selectedValue === 'color' ? (
        <ColorPicker setRecipient={setRecipient} />
      ) : (
        <ImagePicker
          setRecipient={setRecipient}
          customImg={customImg}
          setCustomImg={setCustomImg}
        />
      )}
    </>
  );
}
