(this["webpackJsonpcountdown-timer"]=this["webpackJsonpcountdown-timer"]||[]).push([[0],{2:function(e,t,a){e.exports={CountdownTimer:"CountdownTimer_CountdownTimer__1B0Pd",Unit:"CountdownTimer_Unit__LY2FV",UnitSeparator:"CountdownTimer_UnitSeparator__2lab1",UnitText:"CountdownTimer_UnitText__21JMV",Digit:"CountdownTimer_Digit__F23_P",Days:"CountdownTimer_Days__3jQPU",Num:"CountdownTimer_Num__13ykV",SecondsLeft:"CountdownTimer_SecondsLeft__1taG2",Secs:"CountdownTimer_Secs__3j3jy",DigitUnit:"CountdownTimer_DigitUnit__1WHlk",Center:"CountdownTimer_Center__15X0L",Up:"CountdownTimer_Up__3Ykf4",Down:"CountdownTimer_Down__30Akg",Prev:"CountdownTimer_Prev__1PIdE",flipUp:"CountdownTimer_flipUp__2NOqN",Active:"CountdownTimer_Active__2sfYY",flipDown:"CountdownTimer_flipDown__BO1ag"}},20:function(e,t,a){e.exports=a(33)},30:function(e,t,a){},31:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(14),o=a.n(i),c=a(15),l=a(16),s=a(18),m=a(17),u=a(6),d=a(19),f=a(5),g=a(7);var p=1,_=60,v=3600,E=84e3,b=a(3),T=a.n(b),C=a(2),h=a.n(C),y=function(e){return r.a.createElement("div",{className:T()(h.a.DigitUnit,e.className)},r.a.createElement("div",{className:h.a.Up},r.a.createElement("div",{className:h.a.Num},e.number)),r.a.createElement("div",{className:h.a.Center}),r.a.createElement("div",{className:h.a.Down},r.a.createElement("div",{className:h.a.Num},e.number)))},w=function(e){var t=0===e.start?e.max:e.start-1;return r.a.createElement("div",{className:h.a.Digit},r.a.createElement(y,{key:"".concat(e.id,"-").concat(t),number:t,className:Object(g.a)({},h.a.Active,e.flipIndicator)}),r.a.createElement(y,{key:"".concat(e.id,"-").concat(e.start),number:e.start,className:Object(g.a)({},h.a.Prev,e.flipIndicator)}))};w.defaultProps={max:9,start:0};var N=function(e){return Math.floor(Math.max(e-(new Date).getTime(),0)/1e3)},x=function(e){var t=Object(n.useState)(N(e.time)),a=Object(f.a)(t,2),i=a[0],o=a[1];Object(n.useEffect)((function(){o(N(e.time))}),[e.time]);var c=i,l={},s=Math.floor(c/E);c-=86400*s;for(var m=[],u=s.toString(),d=0;d<u.length;d++)m.push({max:9,flip:E*d});l.days={cssClass:"Days",formatted:s,digits:m};var b=Math.floor(c/v);c-=b*v,l.hours={cssClass:"Hours",formatted:b,digits:[{max:2,flip:10*v},{max:9,flip:v}]};var C=Math.floor(c/_);c-=C*_,l.mins={cssClass:"Mins",formatted:C,digits:[{max:5,flip:10*_},{max:9,flip:_}]};var y=Math.floor(c);l.secs={cssClass:"Secs",formatted:y,digits:[{max:5,flip:10*p},{max:9,flip:p}]},function(e,t){var a=Object(n.useRef)();Object(n.useEffect)((function(){a.current=e}),[e]),Object(n.useEffect)((function(){if(null!==t){var e=setInterval((function(){a.current()}),t);return function(){return clearInterval(e)}}}),[t])}((function(){o(i-1),0===Math.floor(i)&&e.callback&&e.callback.call()}),Math.floor(i)<=0?null:1e3);var x={};return Object.keys(l).forEach((function(e){for(var t=l[e],a=t.formatted.toString().split("");a.length<t.digits.length;)a.unshift("0");x[e]=r.a.createElement("div",{className:T()("inline-block",h.a.Unit,h.a[t.cssClass])},a.map((function(a,n){return r.a.createElement(w,{id:"".concat(e,"-").concat(n),key:"".concat(e,"-").concat(n),unit:e,start:parseInt(a),max:t.digits[n].max,flipIndicator:i%t.digits[n].flip===0&&i>0})})),r.a.createElement("div",{className:h.a.UnitText},e))})),r.a.createElement("div",{className:T()("text-center",h.a.CountdownTimer,Object(g.a)({},h.a.SecondsLeft,i<_))},i>=E?r.a.createElement(r.a.Fragment,null,x.days,r.a.createElement("div",{className:T()(h.a.UnitSeparator,h.a.Days)})):r.a.createElement(r.a.Fragment,null),i>=_?r.a.createElement(r.a.Fragment,null,x.hours,r.a.createElement("div",{className:T()(h.a.UnitSeparator)},":"),x.mins,r.a.createElement("div",{className:T()(h.a.UnitSeparator)},":")):r.a.createElement(r.a.Fragment,null),x.secs)};x.defaultProps={time:0};var j=x,O=a(12),k=a(8),D=a(9),S=a(4),U=a.n(S),P="px-4 py-1 my-1 rounded-full",M=function(e){var t=e.children,a=Object(O.a)(e,["children"]);return r.a.createElement("button",Object.assign({className:T()(P,{"bg-red-700 active:bg-red-800 text-white":"red"===a.colour},{"bg-gray-500 active:bg-gray-600":!a.colour}),type:"button"},a),t)},I=function(e){var t=e.modifyTime,a=e.resetToPresent,i=Object(O.a)(e,["modifyTime","resetToPresent"]),o=Object(n.useState)(!0),c=Object(f.a)(o,2),l=c[0],s=c[1],m=new Date(i.time),u=Object(n.useState)(0),d=Object(f.a)(u,2),g=d[0],b=d[1],C=Object(n.useState)(1),h=Object(f.a)(C,2),y=h[0],w=h[1],N=function(e){t(e*(l?1:-1))};return r.a.createElement("div",{className:"inline-block p-4 m-4 rounded-lg bg-gray-400 text-gray-800"},r.a.createElement("div",{className:"text-lg"},r.a.createElement(k.a,{icon:D.a})," Time Control"),r.a.createElement("div",{className:"flex flex-col justify-center p-2 m-2 rounded-lg bg-gray-300"},m.toLocaleDateString()," ",m.toLocaleTimeString()),r.a.createElement("div",{className:"flex"},r.a.createElement("div",{className:T()(U.a.OperationToggle,"flex flex-col justify-center p-2 m-2 rounded-lg bg-gray-300")},r.a.createElement("input",{id:U.a.opToggle,type:"checkbox",checked:l,onChange:function(){s(!l)}}),r.a.createElement("label",{htmlFor:U.a.opToggle,className:U.a.Add},r.a.createElement(k.a,{icon:D.c,className:"cursor-pointer"})),r.a.createElement("label",{htmlFor:U.a.opToggle,className:U.a.Subtract},r.a.createElement(k.a,{icon:D.b,className:"cursor-pointer"}))),r.a.createElement("div",{className:"p-2 m-2 rounded-lg bg-gray-300"},"Preset",r.a.createElement("div",{className:"flex flex-col"},r.a.createElement(M,{onClick:function(){N(p)}},"1 second"),r.a.createElement(M,{onClick:function(){N(_)}},"1 minute"),r.a.createElement(M,{onClick:function(){N(v)}},"1 hour"),r.a.createElement(M,{onClick:function(){N(E)}},"1 day"),r.a.createElement(M,{onClick:function(){a()},colour:"red"},"Now"))),r.a.createElement("div",{className:"p-2 m-2 rounded-lg bg-gray-300"},"Custom",r.a.createElement("div",{className:"flex flex-col"},r.a.createElement("input",{className:P,placeholder:"Duration",type:"number",min:"0",required:!0,value:g,onChange:function(e){e.target.checkValidity()&&b(parseInt(e.target.value))}}),r.a.createElement("div",{className:U.a.Dropdown},r.a.createElement("select",{className:T()(P,"appearance-none","w-full"),value:y,onChange:function(e){e.target.checkValidity()&&w(parseInt(e.target.value))}},r.a.createElement("option",{value:p},"seconds"),r.a.createElement("option",{value:_},"minutes"),r.a.createElement("option",{value:v},"hours"),r.a.createElement("option",{value:E},"days"))),r.a.createElement(M,{onClick:function(){N(g*y)}},"Modify")))))},A=(a(30),function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(s.a)(this,Object(m.a)(t).call(this))).state={time:(new Date).getTime()},e.modifyTime=e.modifyTime.bind(Object(u.a)(e)),e.resetToPresent=e.resetToPresent.bind(Object(u.a)(e)),e}return Object(d.a)(t,e),Object(l.a)(t,[{key:"modifyTime",value:function(e){this.setState({time:this.state.time+1e3*e})}},{key:"resetToPresent",value:function(){this.setState({time:(new Date).getTime()})}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(j,{time:this.state.time,now:(new Date).getTime()}),r.a.createElement(I,{time:this.state.time,modifyTime:this.modifyTime,resetToPresent:this.resetToPresent}))}}]),t}(n.Component));a(31),a(32);o.a.render(r.a.createElement(A,null),document.getElementById("root"))},4:function(e,t,a){e.exports={OperationToggle:"TimeController_OperationToggle__3lE-q",opToggle:"TimeController_opToggle__2XE4u",Add:"TimeController_Add__Bincv",Subtract:"TimeController_Subtract__2AXLu",Dropdown:"TimeController_Dropdown__3Uft8"}}},[[20,1,2]]]);
//# sourceMappingURL=main.ddf7fe8c.chunk.js.map