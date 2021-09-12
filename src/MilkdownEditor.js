
import React from 'react';
import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core';
import { ReactEditor, useEditor } from '@milkdown/react';

import { clipboard } from '@milkdown/plugin-clipboard';
import { cursor } from '@milkdown/plugin-cursor';
import { emoji } from '@milkdown/plugin-emoji';
import { history } from '@milkdown/plugin-history';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { math } from '@milkdown/plugin-math';
import { prism } from '@milkdown/plugin-prism';
import { slash } from '@milkdown/plugin-slash';
import { tooltip } from '@milkdown/plugin-tooltip';
import { gfm } from '@milkdown/preset-gfm';
//import { commonmark } from '@milkdown/preset-commonmark';
import { nord } from '@milkdown/theme-nord';

// import { Doc } from 'yjs';
// import { WebsocketProvider } from 'y-websocket';
// import { collaborative } from '@milkdown/plugin-collaborative';

import "./MilkdownEditor.css"

export function MilkdownEditor(props) {
  // const doc = new Doc();
  // const wsProvider = new WebsocketProvider('ws://localhost:11234', 'milkdown', doc);
  const editor = useEditor((root) => { 
      return Editor.make()
      .config((ctx) => {
          ctx.set(rootCtx, root);
          ctx.set(defaultValueCtx, props.content);
          ctx.set(listenerCtx, { markdown: [props.onChange] });
      })
      .use(nord)
      .use(gfm)
      //.use(commonmark) // do not support table
      // .use(collaborative(doc, wsProvider.awareness))
      .use(clipboard)
      .use(listener)
      .use(history)
      .use(cursor)
      .use(prism)
      .use(tooltip)
      .use(math)
      .use(emoji)
      .use(slash); 
    }, [] // do not reload the editor itself!
  );
  return (
    <ReactEditor className="milk" editor={editor} />
  );
}