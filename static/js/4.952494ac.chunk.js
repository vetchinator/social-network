(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[4],{126:function(e,s,a){e.exports={dialog:"Dialog_dialog__3csl3",list:"Dialog_list__Fs-Sf",item:"Dialog_item__Upx0F",active:"Dialog_active__2Zvuv",messages:"Dialog_messages__3QVnB",message:"Dialog_message__2K6Mj"}},133:function(e,s,a){"use strict";a.r(s);a(0);var t=a(126),i=a.n(t),c=a(13),n=a(52),d=a(1),r=function(e){var s=e.name,a="/dialog/"+e.id;return Object(d.jsx)(c.b,{to:a,activeClassName:i.a.item+" "+i.a.active,children:Object(d.jsxs)("div",{className:i.a.item,children:[Object(d.jsx)("img",{src:n.a,alt:"user logo"}),Object(d.jsx)("p",{children:s})]})})},j=function(e){var s=e.message;return Object(d.jsx)("div",{className:i.a.message,children:Object(d.jsx)("p",{children:s})})},l=a(47),g=a(7),o=function(e){return e.dialogsPage.dialogs},m=function(e){return e.dialogsPage.messages},b=a(61),u=function(e){var s=Object(l.a)(),a=s.register,t=s.handleSubmit,i=s.reset;return Object(d.jsxs)("form",{onSubmit:t((function(s){e.sendMessage(s.addMessage),i()})),children:[Object(d.jsx)("div",{children:Object(d.jsx)("textarea",{name:"addMessage",ref:a})}),Object(d.jsx)("div",{children:Object(d.jsx)("button",{type:"submit",children:"Send Message"})})]})};s.default=function(){var e=Object(g.d)(o),s=Object(g.d)(m),a=Object(g.c)(),t=e.map((function(e){return Object(d.jsx)(r,{name:e.name,id:e.id},e.id)})),c=s.map((function(e){return Object(d.jsx)(j,{message:e.message},e.id)}));return Object(d.jsxs)("div",{className:i.a.dialog,children:[Object(d.jsx)("div",{className:i.a.list,children:t}),Object(d.jsxs)("div",{className:i.a.messages,children:[c,Object(d.jsx)("div",{children:Object(d.jsx)(u,{sendMessage:function(e){a(b.a.sendMessage(e))}})})]})]})}}}]);
//# sourceMappingURL=4.952494ac.chunk.js.map