import { MainContainer } from "../../../layout";
import comingSoonImg from '../../../assets/coming-soon-illustration.png';

export const MinigamesPage = () => {
  return (
    <MainContainer>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            width: 600,
            height: 'auto',
            objectFit: 'cover',
          }}
        >
          <img src={comingSoonImg} width="100%" height="100%" />
        </div>
      </div>
    </MainContainer>
  );
};