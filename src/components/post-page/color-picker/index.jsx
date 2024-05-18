import { useState } from 'react';
import checkIcon from '../../../assets/icon/ic_check.svg';
import './ColorPicker.scss';
import { COLOR_NAMES } from '../../../utils/post/postPageConstants';

function ColorOption({ handleColorChange, colorName, selectedColor }) {
  return (
    <>
      <input
        type='radio'
        id={colorName}
        name='colors'
        value={colorName}
        onChange={handleColorChange}
      />
      <label
        className={`background-form__radio-color-label ${
          selectedColor === `${colorName}` && 'background-form__radio-color--active'
        }`}
        htmlFor={colorName}>
        <div
          className={`background-form__check-icon ${
            selectedColor === `${colorName}` && 'background-form__radio-color--active'
          }`}>
          <img src={checkIcon} alt='체크 아이콘' />
        </div>
      </label>
    </>
  );
}

export default function ColorPicker({ setRecipient }) {
  const [selectedColor, setSelectedColor] = useState(COLOR_NAMES[0]);

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
    setRecipient((prev) => ({ ...prev, backgroundColor: event.target.value }));
  };

  return (
    <div className='background-form__color-picker'>
      {COLOR_NAMES.map((colorName, i) => (
        <ColorOption
          key={i}
          handleColorChange={handleColorChange}
          colorName={colorName}
          selectedColor={selectedColor}
        />
      ))}
    </div>
  );
}
