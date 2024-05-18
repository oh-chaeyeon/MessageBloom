import './main.scss';
import section01 from '../../assets/image/main/section01.svg';
import section02 from '../../assets/image/main/section02.png';
import ButtonLink from '../../components/commons/button-link';

export default function Main() {
  return (
    <div className='layout-main'>
      <section className='container container__img-right'>
        <div className='container__text'>
          <p className='container__btn-point'>Point. 01</p>
          <h2 className='container__section-title'>
            누구나 손쉽게, 온라인 롤링 페이퍼를 만들 수 있어요
          </h2>
          <p className='container__description'>로그인 없이 자유롭게 만들어요.</p>
        </div>
        <div>
          <img
            src={section01}
            alt='롤링페이퍼 예시 사진'
            className='container__photo container__photo--message'
          />
        </div>
      </section>
      <section className='container container__img-left'>
        <div className='container__text'>
          <p className='container__btn-point'>Point. 02</p>
          <h2 className='container__section-title'>서로에게 이모지로 감정을 표현해보세요</h2>
          <p className='container__description'>롤링 페이퍼에 이모지를 추가할 수 있어요.</p>
        </div>
        <div>
          <img
            src={section02}
            alt='이모지 추가 예시 사진'
            className='container__photo container__photo--emoji'
          />
        </div>
      </section>
      <ButtonLink to='/list' buttonText='구경해보기' />
    </div>
  );
}
