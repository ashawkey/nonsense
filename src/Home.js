import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {API_ROOT} from "./const";
import Flow from "./Flow"

function Home(){
  const [meta, setMeta] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetch(API_ROOT+"/meta").then(
      res => res.json()
    ).then(
      res => {
        setMeta(res);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <span className="icon icon-hour-glass" />
      </div>
    );
  }

  return (
    <div className="Home">
      <Flow meta={meta} />
    </div>
  );
}

export default Home;