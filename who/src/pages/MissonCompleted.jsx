import { useNavigate } from 'react-router-dom'
import './MissonCompleted.css'
import bgBlack from '../assets/background/bg-black.png'
import coffeeCircle from '../assets/background/coffee-circle.png'
import coffeeStain from '../assets/background/coffee-stain.png'
import prison from '../assets/background/prison.png'
import completed from '../assets/background/completed.png'
import file from '../assets/question/file.png'
import tape from '../assets/question/tape2.png'
import dongchang from '../assets/suspect/dongchang.png'

export default function MissonCompleted() {
  const navigate = useNavigate()
  const detectiveName = window.localStorage.getItem('detectiveName') || '00'

  return (
    <main className="mission-completed-shell">
      <img
        className="mission-completed-black-bg"
        src={bgBlack}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
      <img
        className="mission-completed-coffee-stain"
        src={coffeeStain}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
      <img
        className="mission-completed-coffee-circle"
        src={coffeeCircle}
        alt=""
        aria-hidden="true"
        draggable="false"
      />

      <section className="mission-case-file" aria-label="검거 성공 결과">
        <img
          className="mission-file-bg"
          src={file}
          alt=""
          aria-hidden="true"
          draggable="false"
        />
        <div className="mission-file-divider" aria-hidden="true" />

        <article className="mission-suspect-page">
          <img
            className="mission-tape mission-tape-left"
            src={tape}
            alt=""
            aria-hidden="true"
            draggable="false"
          />
          <div className="mission-mugshot">
            <img
              className="mission-suspect-photo"
              src={dongchang}
              alt="조동창 증명사진"
              draggable="false"
            />
            <img
              className="mission-prison-bars"
              src={prison}
              alt=""
              aria-hidden="true"
              draggable="false"
            />
          </div>
          <p className="mission-suspect-name">조동창 (19)</p>
        </article>

        <article className="mission-message-page">
          <img
            className="mission-tape mission-tape-right"
            src={tape}
            alt=""
            aria-hidden="true"
            draggable="false"
          />
          <img
            className="mission-completed-stamp"
            src={completed}
            alt=""
            aria-hidden="true"
            draggable="false"
          />
          <div className="mission-message-copy">
            <p>
              {detectiveName} 탐정님은
              <br />
              미림마이스터고 실습실 살인 사건
              <br />
              범인 검거에 성공하셨습니다!
            </p>
            <button
              className="mission-detail-button"
              type="button"
              onClick={() => navigate('/truthreveal')}
            >
              사건의 전말 확인하기
            </button>
          </div>
        </article>
      </section>
    </main>
  )
}
