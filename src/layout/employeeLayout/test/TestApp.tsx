import "./styles.scss";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";

const TestApp = () => {
  return (
    <div className="app__wrapper">
      <Sidebar />
      <div className="main__content">
        <Header />
        <MainContent />
      </div>
    </div>
  );
};

export default TestApp;
