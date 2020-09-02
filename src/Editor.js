import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {Prompt} from "react-router";
import {convertTime, padNumber} from './utils'
import {API_ROOT} from "./const";
import "./Editor.css"


function Editor() {
  const [text, setText] = useState('');
  const [ctime, setCtime] = useState(0);
  const [mtime, setMtime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState('saved');
  const [id, setId] = useState('');
  const {nid} = useParams();

  // load text if exists else create new
  useEffect(() => {
    if (nid === '-1') {
      fetch(API_ROOT+"/post", {
        method: "POST",
      }).then(
        res => res.json()
      ).then(
        res => {
          setId(res['nid'].toString());
          setText('');
          setLoading(false);
        }
      );
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
    if (saving === 'unsaved' || saving === 'failed') {
      setSaving('saving');

      let formData = new FormData();
      formData.append('nid', id);
      formData.append('body', text);

      console.log('save', id, text);

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

  function handleChange(event) {
    event.preventDefault();
    setText(event.target.value);
    setSaving('unsaved');
  }

  if (loading) {
    return (
      <div className="loading">
        <span className="icon icon-hour-glass" />
      </div>
    );
  }

  return (
      <div className="editor">
        <div className='date'>
          <span> {padNumber(id, 6) + ' ' + convertTime(ctime) + ' ('+convertTime(ctime)+')'} </span>
          <span> {saving} </span>
        </div>
        <textarea onChange={handleChange} value={text} />
        <Prompt message='Draft unsaved, are you sure to leave?' when={saving === 'failed' || saving === 'unsaved'}/>
      </div>
  );
}

export default Editor;