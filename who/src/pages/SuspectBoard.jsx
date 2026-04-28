import "./SuspectBoard.css";
import dongchang from "../assets/suspect/dongchang.png";
import sarang from "../assets/suspect/sarang.png";
import teamwon from "../assets/suspect/teamwon.png";
import coffeeStain from "../assets/background/coffee-stain.png";
import topsecretStamp from "../assets/background/topsecret.png";
import yideung from "../assets/suspect/yideung.png";

const suspects = [
  {
    id: 1,
    name: "우팀원",
    age: "19살",
    school: "미림마이스터고등학교",
    trait: "피해자와 같이 IT쇼를 준비하는 학생",
    image: teamwon,
  },
  {
    id: 3,
    name: "조동창",
    age: "19살",
    school: "미림마이스터고등학교",
    trait: "피해자와 같은 중학교 출신",
    image: dongchang,
  },
  {
    id: 2,
    name: "윤이등",
    age: "19살",
    school: "미림마이스터고등학교",
    trait: "미림마이스터고 소프트웨어과 전교 2등",
    image: yideung,
  },
  {
    id: 4,
    name: "이사랑",
    age: "19살",
    school: "미림마이스터고등학교",
    trait: "피해자와 같은 반 학생",
    image: sarang,
  },
];

function SuspectCard({ suspect }) {
  return (
    <article className="suspect-card">
      <div className="photo-frame">
        <img
          src={suspect.image}
          alt={`${suspect.name} 증명사진`}
          className="suspect-photo"
        />
      </div>

      <table className="suspect-table">
        <tbody>
          <tr>
            <th>{`용의자 ${suspect.id}`}</th>
            <td>{suspect.name}</td>
          </tr>
          <tr>
            <th>나이</th>
            <td>{suspect.age}</td>
          </tr>
          <tr>
            <th>학교</th>
            <td>{suspect.school}</td>
          </tr>
          <tr>
            <th>특징</th>
            <td>{suspect.trait}</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

export default function SuspectBoard() {
  return (
    <section className="suspect-board">
      <div className="center-divider" />
      <div className="coffee-ring" />

      <img className="coffee-stain" src={coffeeStain} alt="" aria-hidden="true" draggable="false" />
      <img className="top-secret-stamp" src={topsecretStamp} alt="" aria-hidden="true" draggable="false" />

      <header className="board-header">
        <h1>사건번호 01</h1>
        <h2>실습실 살인사건</h2>
      </header>

      <div className="suspect-grid">
        {suspects.map((suspect, index) => (
          <SuspectCard key={`${suspect.name}-${index}`} suspect={suspect} />
        ))}
      </div>
    </section>
  );
}
