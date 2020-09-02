import React from 'react';
import {Link} from 'react-router-dom';
import './Flow.css';
import {convertTime, padNumber} from './utils'


function Flow(props) {
  return (
    <div className="flow">
      {props.meta.map((value, index) => (
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
          {padNumber(props.value[0], 6)+' '+convertTime(props.value[2])} 
        </div>
        <hr />
        <div className="content">
          {props.value[3]}
        </div>
      </Link>
    </div>
  );
}


export default Flow;