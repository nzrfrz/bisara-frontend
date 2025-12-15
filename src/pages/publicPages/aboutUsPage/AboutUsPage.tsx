import comingSoonImg from "../../../assets/coming-soon.png";

export const AboutUsPage = () => {
  return (
    <div style={{ textAlign: "center", padding: 40 }}>
      <img
        src={comingSoonImg}
        alt="Coming Soon"
        style={{ maxWidth: 400, width: "100%" }}
      />
      <h2>About Us</h2>
      <p>Fitur ini sedang dalam pengembangan</p>
    </div>
  );
};
