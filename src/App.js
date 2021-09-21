import NavBar from './components/NavBar';
import Home from './components/Home';
import Categories from './components/category/Categories';
import CategoryDetail from './components/category/CategoryDetail';
import NewCategory from './components/category/NewCategory';
import ModifyCategory from './components/category/ModifyCategory';
import DeleteCategory from './components/category/DeleteCategory';
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
          <Route exact path="/categories/:id"><CategoryDetail /></Route>
          <Route exact path="/new-category"><NewCategory /></Route>
          <Route exact path="/categories/:id/modify"><ModifyCategory /></Route>
          <Route exact path="/categories/:id/delete"><DeleteCategory /></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
