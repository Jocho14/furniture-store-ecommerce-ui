import "./styles.scss";
const MainContent = () => {
  return (
    <div className="main__content__wrapper">
      <div className="statistics">
        <div className="stat">
          <span className="value">$412,450.99</span>
          <span className="label">Payment Success</span>
        </div>
        <div className="stat">
          <span className="value">894</span>
          <span className="label">Payment Canceled</span>
        </div>
        <div className="stat">
          <span className="value">2,850</span>
          <span className="label">Total Customer</span>
        </div>
        <div className="stat">
          <span className="value">10,650</span>
          <span className="label">Total Orders</span>
        </div>
      </div>

      <table className="product__table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Volume</th>
            <th>Type</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Micellar Hyaluronic Aloe Water</td>
            <td>$40</td>
            <td>386 Items Left</td>
            <td>400 ml</td>
            <td>Sunscreen</td>
            <td>4.6</td>
          </tr>
          {/* Add more rows */}
        </tbody>
      </table>

      <div className="pagination">
        <span>Showing 10 from 435</span>
        <div className="pagination__controls">
          <button className="prev">&lt;</button>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <button className="next">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
