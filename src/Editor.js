import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {Prompt} from "react-router";
import {convertTime, padNumber, getToken} from './utils'
import {API_ROOT} from "./const";
import "./Editor.css"
import { func } from 'prop-types';
import MarkdownRender from './Markdown';


function Editor() {
  const [text, setText] = useState('');
  const [ctime, setCtime] = useState(0);
  const [mtime, setMtime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState('saved');
  const [preview, setPreview] = useState(false);
  const [id, setId] = useState('-1');

  const history = useHistory();
  const {nid} = useParams();

  // load text if exists else load empty template
  useEffect(() => {
    if (nid === '-1') {
      setId(nid);
      setCtime(Date.now());
      setMtime(Date.now());
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
            setLoading(false);
          }
        }
      );
    }
  }, [nid]);

  useEffect(() => {
    const saver = setInterval(checkSave, 1000);
    return () => {
      clearInterval(saver);
    };
  });

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeunload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    }
  });

  function handleBeforeunload(event) {
    if (saving === 'failed' || saving === 'unsaved') {
      event.preventDefault();
      // chrome has banned custom message, so this will not show.
      return event.returnValue = 'Draft unsaved';
    }
  }

  function checkSave() {
    if (saving === 'unsaved') {
      setSaving('saving');

      if (id === '-1') {
        // create new 
        let formData = new FormData();
        formData.append('token', getToken());
        formData.append('body', text);

        fetch(API_ROOT+"/post", {
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
            setId(res['nid'].toString());
            setSaving('saved');
          }
        );

      }
      else {
        let formData = new FormData();
        formData.append('nid', id);
        formData.append('body', text);
  
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
    setPreview(!preview);
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
          | <span onClick={handlePreview} className='preview-button'> {preview ? "view" : "edit"} </span>
          | <span onClick={handleDelete} className='delete-button'> delete </span>
          | <span> {saving} </span> |
        </div>
        {preview ? <MarkdownRender className="markdown" source={text}/> : <textarea onChange={handleChange} value={text} />}
        <Prompt message='Draft unsaved, are you sure to leave?' when={saving === 'failed' || saving === 'unsaved'}/>
      </div>
  );
}

export default Editor;