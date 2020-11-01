import React from 'react';
import {Link} from 'react-router-dom';
import './Flow.css';
import {convertTime, padNumber, truncateString} from './utils'


function Flow(props) {
  return (
    <div className="flow">
      {props.items.map((value, index) => (
        <FlowItem value={value} key={index} />
      ))}
    </div>
  );
}

  
function FlowItem(props) {
  // props.value = [nid, mtime, ctime, body]
  return (
    <div className="flow-item">
      <Link to={"/edit/"+props.value[0]}> 
        <div className="date"> 
          <span> {padNumber(props.value[0], 6)} </span>
          <span> {' ' + convertTime(props.value[2])} </span>
          <span> {' ' + convertTime(props.value[1])} </span>
        </div>
        <hr />
        <div className="content">
          {truncateString(props.value[3], 300)}
        </div>
      </Link>
    </div>
  );
}


export default Flow;