import React, {useState, useEffect, useRef} from 'react';
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {Prompt} from "react-router";
import {convertTime, padNumber, getToken} from './utils'
import {API_ROOT} from "./const";
import "./Editor.css"
import MarkdownRender from './Markdown';


function Editor() {
  const [text, setText] = useState('');
  const [ctime, setCtime] = useState(0);
  const [mtime, setMtime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState('saved');
  const [state, setState] = useState(0); // 0 = edit, 1 = view
  const [id, setId] = useState('-1');

  const textareaRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const history = useHistory();
  const {nid} = useParams();

  // load text if exists else load empty template
  useEffect(() => {
    if (nid === '-1') {
      setId(nid);
      setCtime(Date.now() / 1000);
      setMtime(Date.now() / 1000);
      setText('');
      setLoading(false);
    }
    else {
      setId(nid); // asynchronous, use id in this block will cause error. [fix1: add id to dependence]
      fetch(API_ROOT+"/get?nid="+nid).then(
        res => res.json()
      ).then(
        res => {
          if (res['success']) {
            setCtime(res['content'][0]);
            setMtime(res['content'][1]);
            setText(res['content'][2]);
            setState(res['content'][3]);
            setLoading(false);
          }
        }
      );
    }
  }, [nid]);

  // check save every 1s
  useEffect(() => {
    const saver = setInterval(checkSave, 1000);
    return () => {
      clearInterval(saver);
    };
  });

  // leave tab warning
  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeunload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    }
  });

  function handleBeforeunload(event) {
    if (saving === 'failed' || saving === 'unsaved' || saving === 'saving') {
      event.preventDefault();
      // chrome has banned custom message, so this will not show.
      return event.returnValue = 'Draft unsaved';
    }
  }

  function checkSave() {
    if (saving === 'unsaved') {
      setSaving('saving');

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
            setSaving('failed');
            console.error('Post error: ', error)
          }
        ).then(
          res => {
            setId(res['nid'].toString());
            setSaving('saved');
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
            setSaving('failed');
            console.error('Update error: ', error)
          }
        ).then(
          res => {
            setSaving('saved');
          }
        );
      }
    }
  }

  function handleChange(event) {
    event.preventDefault();
    setText(event.target.value);
    setSaving('unsaved');
  }

  function handlePreview(event) {
    event.preventDefault();
    setState(1 - state);
    setSaving('unsaved');
  }

  function handleDelete(event) {
    event.preventDefault();
    if (window.confirm('Are you sure to delete?')) {
      let formData = new FormData();
      formData.append('nid', id);
      fetch(API_ROOT+"/delete", {
        method: "POST",
        body: formData,
      }).then(
        res => res.json()
      ).then(
        res => {
          history.push("/");
        }
      );
    }
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
    if (state === 0) return "edit";
    else if (state === 1) return "view";
    else return "error";
  }

  function render_saving_button(saving) {
    if (saving === 'failed') return (<span style={{color: 'red'}}> failed </span>);
    else if (saving === 'saved') return (<span style={{color: 'green'}}> saved </span>);
    else return saving;
  }

  function render_editor(state) {
    if (state === 0) return (<textarea ref={textareaRef} onKeyDown={textarea_onkeydown_fixtab} onChange={handleChange} value={text} />);
    else if (state === 1) return (<MarkdownRender className="markdown" source={text}/>);
    else return "error";
  }

  if (loading) {
    return (
      <div className="loading"> ☪ </div>
    );
  }

  return (
      <div className="editor">
        <div className='date'>
          | <span> {(id === '-1') ? 'new' : padNumber(id, 6)} </span>
          | <span> {convertTime(mtime)} </span>
          | <span onClick={handlePreview} className='state-button'> {render_state_button(state)} </span>
          | <span onClick={handleDelete} className='delete-button'> delete </span>
          | <span> {render_saving_button(saving)} </span> |
        </div>
        {render_editor(state)}
        <Prompt message='Draft unsaved, are you sure to leave?' when={saving === 'failed' || saving === 'unsaved' || saving === 'saving'}/>
      </div>
  );
}

export default Editor;