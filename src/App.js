import React from 'react';
import {Switch, Route, Link, HashRouter} from "react-router-dom";

import ScrollToTop from 'react-scroll-up';
import './App.css';

import Home from "./Home";
import Login from "./Login";
import Editor from "./Editor";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";


function App() {
  return (
    <div className="App">
      <HashRouter>
        <div className="header"> 
          <div className='title'> <Link to="/"> NoNSeNSe </Link> </div>
          <div className="new-button"> <Link to={"/edit/-1"}> ✛ </Link> </div>
          <div className="login-button"> <Link to={"/login"}> ❖ </Link> </div>
          <div className='search-bar'> <SearchBar/> </div>
        </div>
        <div className="content">
          <hr className="fancy-line" />
          <Switch>
            {/* Login page */}
            <Route exact path="/login">
              <Login />
            </Route>
            {/* Home page */}
            <Route exact path="/">
              <Home />
            </Route>
            {/* Search page */}
            <Route path="/search/:keyword">
              <SearchResults />
            </Route>
            {/* Edit page */}
            <Route path="/edit/:nid">
              <Editor />
            </Route>
            {/* fallback */}
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
          <hr className="fancy-line" />
        </div>
        <ScrollToTop showUnder={160}>
          <span className="icon icon-circle-up" />
        </ScrollToTop>
        <div className="footer"> 
          @ <a href='https://github.com/ashawkey'> hawkey </a>
        </div>
      </HashRouter>
    </div>
  );
}

function NoMatch() {
  return (
    <div className="no-match">
      <p> No match! </p>
    </div>
  );
}

export default App;