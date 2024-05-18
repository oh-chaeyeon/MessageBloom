import '@toast-ui/editor/dist/toastui-editor.css';
import './ContentTextarea.scss';
import { forwardRef, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Editor } from '@toast-ui/react-editor';
import { debounce } from 'lodash';

function ContentTextarea({ setError }, contentTextareaRef) {
  const ref = useRef(null);
  const {
    register,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'all' });

  useEffect(() => {
    register('content', { required: '내용을 입력해주세요.' });
  }, [register]);

  useEffect(() => {
    setError((prev) => ({
      ...prev,
      content: !errors.content,
    }));
  }, [errors.content]);

  useEffect(() => {
    trigger('content');
  }, []);

  useEffect(() => {
    setError((prev) => ({
      ...prev,
      content: !errors.content,
    }));
  }, [errors.content, setError]);

  const getEditorContent = debounce(() => {
    const editorInstance = ref.current.getInstance();
    const markdownContent = editorInstance.getMarkdown();
    setValue('content', markdownContent, { shouldValidate: true });
    contentTextareaRef.current = markdownContent;
  }, 500);

  return (
    <div className='message-form__content'>
      <label htmlFor='textarea' className='message-form__title'>
        내용을 입력해 주세요
      </label>
      <Editor
        id='textarea'
        minHeight='400px'
        initialEditType='wysiwyg'
        placeholder='좋은 추억이나 감사의 메세지를 작성해 주세요!'
        ref={ref}
        onChange={getEditorContent}
        hideModeSwitch={true}
        autofocus={false}
      />
      {errors.content && <p className='form--error'>{errors.content.message}</p>}
    </div>
  );
}
export default forwardRef(ContentTextarea);
