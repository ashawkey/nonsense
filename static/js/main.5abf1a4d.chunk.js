(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{14:function(e,t,n){},19:function(e,t,n){e.exports=n(35)},24:function(e,t,n){},29:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(16),l=n.n(r),o=(n(24),n(7)),u=n(1),s=n(17),i=n.n(s),m=(n(14),n(3)),f="https://www.hawia.xyz/api/nonsense";n(29);function d(e){var t=new Date(1e3*e),n=t.getFullYear(),a=t.getMonth()+1,c=t.getDate(),r=t.getHours(),l=t.getMinutes();return n+"-"+a+"-"+c+" "+(r<=9?"0"+r:r)+":"+(l<=9?"0"+l:l)}function E(e,t){var n="000000000"+e.toString();return n.substr(n.length-t)}function v(){return localStorage.nonsense_token||"nonsense"}function h(e){return c.a.createElement("div",{className:"flow-item"},c.a.createElement(o.b,{to:"/edit/"+e.value[0]},c.a.createElement("div",{className:"date"},c.a.createElement("span",null," ",E(e.value[0],6)," "),c.a.createElement("span",null," "," "+d(e.value[2])," "),c.a.createElement("span",null," "," "+d(e.value[1])," ")),c.a.createElement("hr",null),c.a.createElement("div",{className:"content"},(t=e.value[3],n=300,t.length>n?t.substring(0,n)+"......":t))));var t,n}var b=function(e){return c.a.createElement("div",{className:"flow"},e.meta.map((function(e,t){return c.a.createElement(h,{value:e,key:t})})))};var p=function(){var e=Object(a.useState)([]),t=Object(m.a)(e,2),n=t[0],r=t[1],l=Object(a.useState)(!0),o=Object(m.a)(l,2),u=o[0],s=o[1];return Object(a.useEffect)((function(){fetch(f+"/meta?token="+v()).then((function(e){return e.json()})).then((function(e){r(e),s(!1)}))}),[]),u?c.a.createElement("div",{className:"loading"},c.a.createElement("span",{className:"icon icon-hour-glass"})):c.a.createElement("div",{className:"Home"},c.a.createElement(b,{meta:n}))};n(33);var j=function(){var e=Object(a.useState)(""),t=Object(m.a)(e,2),n=t[0],r=t[1];return Object(a.useEffect)((function(){r(localStorage.nonsense_token||"nonsense")}),[]),c.a.createElement("div",null,c.a.createElement("form",{onSubmit:function(e){e.preventDefault(),""!==n?(localStorage.nonsense_token=n,alert("Hello, "+n+"!")):(localStorage.nonsense_token="nonsense",alert("Updated."))},className:"login-form"},c.a.createElement("div",{className:"title"}," Make any sense ? "),c.a.createElement("input",{type:"text",value:n,placeholder:"nonsense",maxLength:"99",onChange:function(e){r(e.target.value)}})))};n(34);var g=function(){var e=Object(a.useState)(""),t=Object(m.a)(e,2),n=t[0],r=t[1],l=Object(a.useState)(0),o=Object(m.a)(l,2),s=(o[0],o[1]),i=Object(a.useState)(0),h=Object(m.a)(i,2),b=h[0],p=h[1],j=Object(a.useState)(!0),g=Object(m.a)(j,2),O=g[0],N=g[1],w=Object(a.useState)("saved"),S=Object(m.a)(w,2),y=S[0],k=S[1],D=Object(a.useState)(""),x=Object(m.a)(D,2),C=x[0],M=x[1],_=Object(u.g)(),F=Object(u.h)().nid;function H(e){if("failed"===y||"unsaved"===y)return e.preventDefault(),e.returnValue="Draft unsaved"}function I(){if("unsaved"===y){k("saving");var e=new FormData;e.append("nid",C),e.append("body",n),fetch(f+"/update",{method:"POST",body:e}).then((function(e){return e.json()})).catch((function(e){k("failed"),console.error("Update error: ",e)})).then((function(e){k("saved")}))}}return Object(a.useEffect)((function(){"-1"===F?fetch(f+"/post?token="+v()).then((function(e){return e.json()})).then((function(e){M(e.nid.toString()),s(e.ctime),p(e.ctime),r(""),N(!1)})):(M(F),fetch(f+"/get?nid="+F).then((function(e){return e.json()})).then((function(e){e.success&&(s(e.content[0]),p(e.content[1]),r(e.content[2]),N(!1))})))}),[F]),Object(a.useEffect)((function(){var e=setInterval(I,1e3);return function(){clearInterval(e)}})),Object(a.useEffect)((function(){return window.addEventListener("beforeunload",H),function(){window.removeEventListener("beforeunload",H)}})),O?c.a.createElement("div",{className:"loading"},c.a.createElement("span",{className:"icon icon-hour-glass"})):c.a.createElement("div",{className:"editor"},c.a.createElement("div",{className:"date"},"| ",c.a.createElement("span",null," ",E(C,6)," "),"| ",c.a.createElement("span",null," ",d(b)," "),"| ",c.a.createElement("span",{onClick:function(e){if(e.preventDefault(),window.confirm("Are you sure to delete?")){var t=new FormData;t.append("nid",C),fetch(f+"/delete",{method:"POST",body:t}).then((function(e){return e.json()})).then((function(e){_.push("/")}))}},className:"delete-button"}," delete "),"| ",c.a.createElement("span",null," ",y," ")," |"),c.a.createElement("textarea",{onChange:function(e){e.preventDefault(),r(e.target.value),k("unsaved")},value:n}),c.a.createElement(u.a,{message:"Draft unsaved, are you sure to leave?",when:"failed"===y||"unsaved"===y}))};var O=function(){var e=Object(u.g)(),t=Object(a.useState)(""),n=Object(m.a)(t,2),r=n[0],l=n[1];return c.a.createElement("form",{onSubmit:function(t){t.preventDefault(),""!==r&&(e.push("/search/"+r),l(""))}},c.a.createElement("input",{type:"text",value:r,placeholder:"Search",onChange:function(e){l(e.target.value)}}))};var N=function(){var e=Object(u.h)().keyword,t=Object(a.useState)([]),n=Object(m.a)(t,2),r=n[0],l=n[1];return Object(a.useEffect)((function(){fetch(f+"/search?keyword="+e+"&token="+v()).then((function(e){return e.json()})).then((function(e){l(e)}))}),[e]),c.a.createElement("div",{className:"search-results"},c.a.createElement(b,{meta:r}))};function w(){return c.a.createElement("div",{className:"no-match"},c.a.createElement("p",null," No match! "))}var S=function(){return c.a.createElement("div",{className:"App"},c.a.createElement(o.a,null,c.a.createElement("div",{className:"header"},c.a.createElement("div",{className:"title"}," ",c.a.createElement(o.b,{to:"/"}," NoNSeNSe ")," "),c.a.createElement("div",{className:"new-button"}," ",c.a.createElement(o.b,{to:"/edit/-1"}," \u271b ")," "),c.a.createElement("div",{className:"login-button"}," ",c.a.createElement(o.b,{to:"/login"}," \u2756 ")," "),c.a.createElement("div",{className:"search-bar"}," ",c.a.createElement(O,null)," ")),c.a.createElement("div",{className:"content"},c.a.createElement("hr",{className:"fancy-line"}),c.a.createElement(u.d,null,c.a.createElement(u.b,{exact:!0,path:"/login"},c.a.createElement(j,null)),c.a.createElement(u.b,{exact:!0,path:"/"},c.a.createElement(p,null)),c.a.createElement(u.b,{path:"/search/:keyword"},c.a.createElement(N,null)),c.a.createElement(u.b,{path:"/edit/:nid"},c.a.createElement(g,null)),c.a.createElement(u.b,{path:"*"},c.a.createElement(w,null))),c.a.createElement("hr",{className:"fancy-line"})),c.a.createElement(i.a,{showUnder:160},c.a.createElement("span",{className:"icon icon-circle-up"})),c.a.createElement("div",{className:"footer"},"@ ",c.a.createElement("a",{href:"https://github.com/ashawkey"}," hawkey "))))};l.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(S,null)),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.5abf1a4d.chunk.js.map