import "./styles.scss";
const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <input type="text" className="search" placeholder="Search" />
        <span className="items">6,540 Items</span>
      </div>
      <div className="header__right">
        <button className="statistic">Show Statistic</button>
        <button className="filter">Filter</button>
        <button className="list">List</button>
        <button className="export">Export</button>
        <button className="new__product">+ New Product</button>
      </div>
    </header>
  );
};

export default Header;
