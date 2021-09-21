import NavBar from './components/NavBar';
import Home from './components/Home';
import Categories from './components/category/Categories';
import CategoryDetails from './components/category/CategoryDetail';
import NewCategory from './components/category/NewCategory';
import ModifyCategory from './components/category/ModifyCategory';
import DeleteCategory from './components/category/DeleteCategory';
import Products from './components/product/Products';
import ProductDetails from './components/product/ProductDetails';
import NewProduct from './components/product/NewProduct';
import ModifyProduct from './components/product/ModifyProduct';
import DeleteProduct from './components/product/DeleteProduct';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

const App = () => {
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await fetch('https://inv-hub.herokuapp.com/api/categories');
    const data = await res.json();
    setCategories(data);
    setLoadingCategories(false)
  };

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <Router>
      <div className="container">
        <NavBar />
        <Switch>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/categories"><Categories categories={categories} loading={loadingCategories} /></Route>
          <Route exact path="/categories/:id"><CategoryDetails /></Route>
          <Route exact path="/new-category"><NewCategory /></Route>
          <Route exact path="/categories/:id/modify"><ModifyCategory /></Route>
          <Route exact path="/categories/:id/delete"><DeleteCategory /></Route>
          <Route exact path="/products"><Products /></Route>
          <Route exact path="/products/:id"><ProductDetails /></Route>
          <Route exact path="/new-product"><NewProduct /></Route>
          <Route exact path="/products/:id/modify"><ModifyProduct /></Route>
          <Route exact path="/products/:id/delete"><DeleteProduct /></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
