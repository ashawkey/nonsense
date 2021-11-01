import React, {useState, useEffect, useRef} from 'react';
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {Prompt} from "react-router";
import {convertTime, getToken} from './utils'
import {API_ROOT} from "./const";
import "./Editor.css"
//import MarkdownRender from './Markdown';
import { MilkdownEditor } from './MilkdownEditor';

import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"
//import "ace-builds/src-noconflict/keybinding-vim";
import "ace-builds/src-noconflict/keybinding-vscode";


function Editor() {
  const [text, setText] = useState('');
  //const [ctime, setCtime] = useState(0);
  const [mtime, setMtime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState('🟢');
  const [state, setState] = useState(1); // 0 = raw, 1 = milk, 2 = ace
  const [id, setId] = useState('-1');

  // textarea cursor location (fix tab)
  const textareaRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);

  const history = useHistory();
  const {nid} = useParams();

  // load text if exists else load empty template
  useEffect(() => {
    if (nid === '-1') {
      setId(nid);
      //setCtime(Date.now() / 1000);
      setMtime(Date.now() / 1000);
      setText('');
      document.title = "NoNSeNSe";
      setLoading(false);
    }
    else {
      setId(nid); // asynchronous, use id in this block will cause error. [fix1: add id to dependence]
      fetch(API_ROOT+"/get?nid="+nid+"&token="+getToken()).then(
        res => res.json()
      ).then(
        res => {
          if (res['success']) {
            //setCtime(res['content'][0]);
            setMtime(res['content'][1]);
            setText(res['content'][2]);
            setState(res['content'][4]);
            document.title = "NoNSeNSe | " + res['content'][2].substring(0, 20);
            setLoading(false);
          }
          else {
            setState(res['error']);
            setLoading(false);
          }
        }
      );
    }
    return () => {
      // leave editor, reset title.
      document.title = "NoNSeNSe";
    }
  }, [nid]);

  // check save every 1s
  useEffect(() => {
    function checkSave() {
      if (saving === '🟠') {
        setSaving('🟡');
  
        if (id === '-1') {
          // post new 
          let formData = new FormData();
          formData.append('token', getToken());
          formData.append('body', text);
          formData.append('state', state);
  
          fetch(API_ROOT+"/post", {
            method: "POST",
            body: formData,
          }).then(
            res => res.json()
          ).catch(
            error => {
              console.error('Post error: ', error);
              setSaving('🔴');
            }
          ).then(
            res => {
              console.log(res);
              setId(res['nid'].toString());
              setSaving('🟢');
            }
          );
        }
        else {
          // update current
          let formData = new FormData();
          formData.append('nid', id);
          formData.append('body', text);
          formData.append('state', state);
    
          fetch(API_ROOT+"/update", {
            method: "POST",
            body: formData,
          }).then(
            res => res.json()
          ).catch(
            error => {
              console.error('Update error: ', error);
              setSaving('🔴');
            }
          ).then(
            res => {
              setSaving('🟢');
            }
          );
        }
      }
    }
    const saver = setInterval(checkSave, 1000);
    return () => {
      clearInterval(saver);
    };
  });

  // leave tab warning
  useEffect(() => {
    // define inside to avoid `missing dependency` warning.
    function handleBeforeUnload(event) {
      if (saving === '🔴' || saving === '🟠' || saving === '🟡') {
        event.preventDefault();
        // chrome has banned custom message, so this will not show.
        return event.returnValue = 'Draft unsaved';
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [saving]);

  

  function handleChange(event) {
    event.preventDefault();
    setText(event.target.value);
    setSaving('🟠');
  }

  function handleAceChange(value) {
    setText(value);
    setSaving('🟠');
  }

  function handleMilkdownChange(getMarkdown) {
    const result = getMarkdown();
    setText(result);
    setSaving('🟠');
  }

  function handleChangeState(event, state) {
    event.preventDefault();
    setState(state);
    setSaving('🟠');
  }

  function handleDelete(event) {
    event.preventDefault();
    if (window.confirm('Are you sure to delete?')) {
      let formData = new FormData();
      formData.append('nid', id);
      formData.append('token', getToken());
      fetch(API_ROOT+"/delete", {
        method: "POST",
        body: formData,
      }).then(
        res => res.json()
      ).then(
        res => {
          if (res['success']) {
            document.title = "NoNSeNSe";
            history.push("/");
          }
          else {
            alert(res['error']);
          }
        }
      );
    }
  }

  function handleSave(event) {
    event.preventDefault();
    setSaving('🟠');
  }

  // fix tab from unfocus to insert 4 spaces
  function textarea_onkeydown_fixtab(event) {
    if (event.keyCode === 9) {
      event.preventDefault();
      setText(text.substring(0, textareaRef.current.selectionStart) + '    ' + text.substring(textareaRef.current.selectionEnd));
      setCursorPosition(textareaRef.current.selectionStart);
    }
  }
  
  useEffect(() => {
    if (textareaRef.current != null){
      textareaRef.current.selectionStart = cursorPosition + 4;
      textareaRef.current.selectionEnd = cursorPosition + 4;
    }
  }, [cursorPosition]);

  function render_state_button(state) {
    // mobile phone adaptation
    if (window.screen.width <= 600) {
      if (state === 0) return "R";
      else if (state === 1) return "M";
      else if (state === 2) return "A";
      else return "E";
    }
    else {
      if (state === 0) return "Raw";
      else if (state === 1) return "Milk";
      else if (state === 2) return "Ace";
      else return "Error";
    }
  }

  function render_saving_button(saving) {
    if (saving === '🔴') return (<span role="img" aria-label="failed"> 🔴 </span>);
    else if (saving === '🟢') return (<span role="img" aria-label="saved"> 🟢 </span>);
    else return saving;
  }

  function render_editor(state) {
    if (state === 0) 
      return (
        <textarea 
          ref={textareaRef} 
          onKeyDown={textarea_onkeydown_fixtab} 
          onChange={handleChange} 
          value={text} 
          style={{
            height: window.innerHeight - 200, // header is about 200 pixels height
          }}
        />
      );
    else if (state === 1) 
      return (
        <MilkdownEditor content={text} onChange={handleMilkdownChange} />
        // <MarkdownRender 
        //   className="markdown" 
        //   source={text}
        // />
      );
    else if (state === 2) 
      return (
        <AceEditor
          mode="markdown"
          theme="github"
          name="editor"
          value={text}
          onChange={handleAceChange}
          height={(window.innerHeight - 200).toString() + 'px'} // fix Ace height requires string warning
          width={"100%"}
          showGutter={window.screen.width <= 600 ? false : true}
          showPrintMargin={false}
          highlightActiveLine={true}
          placeholder=""
          keyboardHandler="vscode"
          fontSize={16}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: window.screen.width <= 600 ? false : true,
            tabSize: 2,
            fontFamily: "Consolas,'Microsoft Yahei','Helvetica Neue', Helvetica, Arial, sans-serif"
          }}
        />
      );
    else 
      return state;
  }

  if (loading) {
    return (
      <div className="loading"> <span role="img" aria-label="loading">🌒</span> </div>
    );
  }

  return (
      <div className="editor">
        <div className='date'>
          {/*| <span> {(id === '-1') ? 'new' : padNumber(id, 6)} </span>*/}
          | <span> {convertTime(mtime)} </span>
          | <span onClick={(e) => {handleChangeState(e, 0)}} className='button'> {render_state_button(0)} </span>
          | <span onClick={(e) => {handleChangeState(e, 1)}} className='button'> {render_state_button(1)} </span>
          | <span onClick={(e) => {handleChangeState(e, 2)}} className='button'> {render_state_button(2)} </span>
          | <span onClick={handleDelete} className='button' role="img" aria-label="delete"> ❌ </span>
          | <span onClick={handleSave} className='button'> {render_saving_button(saving)} </span> |
        </div>
        {render_editor(state)}
        <Prompt message='Draft unsaved, are you sure to leave?' when={saving === '🔴' || saving === '🟠' || saving === '🟡'}/>
      </div>
  );
}

export default Editor;