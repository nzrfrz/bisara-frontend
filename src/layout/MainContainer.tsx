import { BreadcrumbRC } from "./BreadcrumbRC";

interface IMainContainer {
  scrolly?: boolean,
  scrollx?: boolean,
  children?: React.ReactNode
}

export const MainContainer: React.FC<IMainContainer> = ({
  children,
  scrolly = false,
  scrollx = false,
}) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <div style={{ padding: 16 }}>
        <BreadcrumbRC />
      </div>
      <div
        className="scroll-container"
        style={{
          width: '100%',
          height: '100%',
          padding: '0px 16px',
          overflowX: scrollx === false ? 'hidden' : 'scroll',
          overflowY: scrolly === false ? 'hidden' : 'scroll'
        }}
      >
        {children}
      </div>
    </div>
  );
};