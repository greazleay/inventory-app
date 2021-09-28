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
import SearchResults from './components/SearchResults';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useDebounce from './hooks/useDebounce';
import useHttp from './hooks/useHttp';

const App = () => {
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(true);
  const [results, setResults] = useState([]);
  const [isHomeLoading, homeData] = useHttp('https://inv-hub.herokuapp.com/api', [])

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

  const handleSearch = (data) => {
    setSearchTerm(data)
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 2000)

  useEffect(() => {
    const fetchResults = async () => {

      try {
        const res = await fetch(`https://inv-hub.herokuapp.com/api/products/search?q=${debouncedSearchTerm}`);
        if (!res.ok) {
          setIsSearching(false);
          setResults([]);
          setSearchTerm('');
        }
        const data = await res.json();
        setIsSearching(false);
        setResults(data);
        setSearchTerm('');
      } catch (err) {
        if (err) return console.log(`${err.name}: ${err.message}`)
      }
    };
    if (debouncedSearchTerm) fetchResults()
  }, [debouncedSearchTerm])

  return (
    <Router>
      <div className="container">
        <NavBar searchTerm={searchTerm} handleChange={handleSearch} />
        <Switch>
          <Route exact path="/inventory-app"><Home isHomeLoading={isHomeLoading} homeData={homeData}/></Route>
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
          <Route exact path="/search"><SearchResults isSearching={isSearching} results={results} /></Route>
          <Redirect to="/inventory-app" />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;