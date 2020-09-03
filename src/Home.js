import React, {useState, useEffect} from 'react';
import {API_ROOT} from "./const";
import Flow from "./Flow"
import {getToken} from './utils';

function Home(){
  const [meta, setMeta] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetch(API_ROOT+"/meta?token="+getToken()).then(
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
      <div className="loading"> ☪ </div>
    );
  }

  return (
    <div className="Home">
      <Flow meta={meta} />
    </div>
  );
}

export default Home;