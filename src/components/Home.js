import "../assets/css/Home.css";
import React from "react";
import { Link } from "react-router-dom";

const Home = ({ isHomeLoading, homeData }) => {
  return (
    <main className="main">
      <div className="welcome">
        <h1>Welcome to Inventory Hub</h1>
        <hr />
        <p>
          Sed vitae imperdiet quam. Aenean arcu ipsum, mattis eu dui non,
          efficitur sodales metus. Quisque malesuada dignissim consectetur.
          Mauris lectus leo, sagittis in gravida ut, consequat vitae sem.
          Quisque dolor libero, luctus ut eleifend quis, lacinia tempus tellus.
          Fusce orci lectus, feugiat sed tincidunt vel, laoreet et lectus. Morbi
          quis sem enim. Proin lobortis, mauris quis bibendum fringilla, mi diam
          convallis ante, nec laoreet est nisl in libero. Duis lobortis.
        </p>
        {!isHomeLoading && <div>
          <Link to='/categories'>
            <h4>Total Categories: {homeData.category_count}</h4>
          </Link>
          <Link to='/products'>
            <h4>Total Products: {homeData.product_count}</h4>
          </Link>
        </div>}
      </div>
    </main>
  );
};

export default Home;
