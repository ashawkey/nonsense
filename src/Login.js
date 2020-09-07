import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import "./Login.css";

function Login() {

  const [token, setToken] = useState('');
  const history = useHistory();

  useEffect(() => {
    setToken(localStorage['nonsense_token'] || '');
  }, []);

  function handleTokenChange(event) {
    setToken(event.target.value); // here event.target is <input>
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (token !== '') {
      localStorage['nonsense_token'] = token;
      alert("Hello, "+token+"!");
    }
    else {
      localStorage['nonsense_token'] = 'nonsense';
      alert("Hello, nonsense!");
    }
    history.push('/');
  }
    
  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className='title'> Make any sense ? </div>
        <input type="text" value={token} placeholder="nonsense" maxLength="99" onChange={handleTokenChange} />
        
      </form>
    </div>
  );
}

export default Login;
