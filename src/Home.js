import React, {useState} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {API_ROOT} from "./const";
import Flow from "./Flow"
import {getToken} from './utils';


function Home(){
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  function loadMore(page) {
    fetch(API_ROOT+"/meta?token="+getToken()+"&page="+page).then(
      res => res.json()
    ).then(
      res => {
        setItems(items.concat(res['meta']));
        setHasMore(res['hasMore']);
      }
    );
  }

  const loader = <div className="loading" key={0}> ☪ </div>; // key: fix InfiniteScroll unique key warning

  return (
    <div className="Home">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={loader}
      >
        <Flow items={items} />
      </InfiniteScroll>
    </div>
    
  );
}

export default Home;