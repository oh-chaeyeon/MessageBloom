import { forwardRef } from 'react';
import CustomDropdown from '../custom-drop-down';
import { FONTS } from '../../../utils/post-id-message/postMessagePageConstants';

function FontOptions(_, fontOptionsRef) {
  return (
    <div className='message-form__font'>
      <span className='message-form__title'>폰트 선택</span>
      <CustomDropdown props={FONTS} ref={fontOptionsRef} />
    </div>
  );
}

export default forwardRef(FontOptions);
