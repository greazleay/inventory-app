import NavBar from './components/NavBar';
import Home from './components/Home';
import Categories from './components/category/Categories';
import CategoryDetails from './components/category/CategoryDetails';
import NewCategory from './components/category/NewCategory';
import ModifyCategory from './components/category/ModifyCategory';
import DeleteCategory from './components/category/DeleteCategory';
import Products from './components/product/Products';
import ProductDetails from './components/product/ProductDetails';
import NewProduct from './components/product/NewProduct';
import ModifyProduct from './components/product/ModifyProduct';
import DeleteProduct from './components/product/DeleteProduct';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';

const App = () => {
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    let res;
    try {
      res = await fetch('https://inv-hub.herokuapp.com/api/categories');
    } catch (err) {
      if (err) return console.log(`${err.name}: ${err.message}`)
    };

    const data = await res.json();
    setCategories(data);
    setLoadingCategories(false);
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const filteredCategory = categories.map(category => {
    return { id: category._id, name: category.name }
  });

  return (
    <Router>
      <div className="container">
        <NavBar />
        <Switch>
          <Route exact path="/inventory-app"><Home /></Route>
          <Route exact path="/categories"><Categories categories={categories} loading={loadingCategories} /></Route>
          <Route exact path="/categories/:id"><CategoryDetails /></Route>
          <Route exact path="/new-category"><NewCategory reloadCategories={fetchCategories} /></Route>
          <Route exact path="/categories/:id/modify"><ModifyCategory refetchCategories={fetchCategories} /></Route>
          <Route exact path="/categories/:id/delete"><DeleteCategory refetchCategories={fetchCategories} /></Route>
          <Route exact path="/products"><Products /></Route>
          <Route exact path="/products/:id"><ProductDetails /></Route>
          <Route exact path="/new-product"><NewProduct categories={filteredCategory} /></Route>
          <Route exact path="/products/:id/modify"><ModifyProduct categoryList={filteredCategory} /></Route>
          <Route exact path="/products/:id/delete"><DeleteProduct /></Route>
          <Redirect to="/inventory-app" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;