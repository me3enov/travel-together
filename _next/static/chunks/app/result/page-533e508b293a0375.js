(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[609],{352:function(e,t,s){Promise.resolve().then(s.bind(s,7906))},7906:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return x}});var r=s(7437),a=s(2265),l=s(3145),o=s(9376),n=s(4131),c=s(9885),i=s(1131);let d=async e=>{try{if(!(await fetch("https://script.google.com/macros/s/AKfycbzGyl5LYpAk4mCq78JHRZ1rMC17LoGXL61AjU_GQEzRbE2bhris8YrbFUqqI7xFCvXesw/exec",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}})).ok)throw Error("Ошибка при сохранении данных в Google Sheets")}catch(e){console.error("Ошибка отправки данных в Google Sheets:",e)}};var x=()=>{let e=(0,o.useRouter)(),[t,s]=(0,a.useState)([]),[x,h]=(0,a.useState)(void 0);(0,a.useEffect)(()=>{let e=JSON.parse(localStorage.getItem("permanentCards")||"[]"),t=n.Z.get("playerName");s(e),h(t),t&&e.length>0&&d({playerName:t,mainPreferences:e.filter(e=>e.main&&e.tokenPlaced).map(e=>{var t;return{name:e.name,score:null!==(t=e.score)&&void 0!==t?t:0}}),leisurePreferences:e.filter(e=>!e.main&&e.tokenPlaced).map(e=>{var t;return{name:e.name,score:null!==(t=e.score)&&void 0!==t?t:0}})})},[]);let m=t.filter(e=>e.main&&e.tokenPlaced).sort((e,t)=>{var s,r;return(null!==(s=t.score)&&void 0!==s?s:0)-(null!==(r=e.score)&&void 0!==r?r:0)}),u=t.filter(e=>!e.main&&e.tokenPlaced).sort((e,t)=>{var s,r;return(null!==(s=t.score)&&void 0!==s?s:0)-(null!==(r=e.score)&&void 0!==r?r:0)});return(0,r.jsxs)("div",{className:"flex flex-col min-h-screen bg-white",children:[(0,r.jsx)(c.Z,{showHomeButton:!1}),(0,r.jsxs)("div",{className:"flex-grow flex flex-col items-center justify-center py-16 px-4",children:[(0,r.jsx)(l.default,{src:"https://i.giphy.com/XcH2j14aWyAknYAE1U.webp",alt:"Giphy Image",width:50,height:50}),(0,r.jsx)("h1",{className:"text-4xl font-bold mb-4 text-gray-800",children:"".concat(x,", congratulations on completing the Travel Together game!")}),(0,r.jsx)("p",{className:"text-xl text-gray-600 mb-8 text-center",children:"You have explored your preferences and discovered what kind of trip would suit you best. Check out your top choices below."}),(0,r.jsx)("h2",{className:"text-3xl font-semibold mb-8 text-gray-800",children:"Main Preferences"}),(0,r.jsx)("div",{className:"overflow-x-auto w-full max-w-4xl",children:(0,r.jsxs)("table",{className:"min-w-full bg-white shadow-md rounded-lg overflow-hidden",children:[(0,r.jsx)("thead",{className:"bg-blue-500 text-white",children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{className:"text-left px-6 py-3 font-semibold text-sm uppercase",children:"Name"}),(0,r.jsx)("th",{className:"text-left px-6 py-3 font-semibold text-sm uppercase",children:"Score"})]})}),(0,r.jsx)("tbody",{className:"divide-y divide-gray-200",children:m.map((e,t)=>(0,r.jsxs)("tr",{className:"hover:bg-gray-100",children:[(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-800",children:e.name}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-800",children:e.score})]},"".concat(e.name,"-").concat(t)))})]})}),(0,r.jsx)("h2",{className:"text-3xl font-semibold mt-16 mb-8 text-gray-800",children:"Leisure Preferences"}),(0,r.jsx)("div",{className:"overflow-x-auto w-full max-w-4xl",children:(0,r.jsxs)("table",{className:"min-w-full bg-white shadow-md rounded-lg overflow-hidden",children:[(0,r.jsx)("thead",{className:"bg-blue-500 text-white",children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{className:"text-left px-6 py-3 font-semibold text-sm uppercase",children:"Name"}),(0,r.jsx)("th",{className:"text-left px-6 py-3 font-semibold text-sm uppercase",children:"Score"})]})}),(0,r.jsx)("tbody",{className:"divide-y divide-gray-200",children:u.map((e,t)=>(0,r.jsxs)("tr",{className:"hover:bg-gray-100",children:[(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-800",children:e.name}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-gray-800",children:e.score})]},"".concat(e.name,"-").concat(t)))})]})}),(0,r.jsx)("div",{className:"mt-12",children:(0,r.jsx)("button",{onClick:()=>{n.Z.remove("gameState"),n.Z.remove("currentRound"),n.Z.remove("currentSelection"),n.Z.remove("isRescue"),n.Z.remove("playerName"),localStorage.clear(),e.push("/")},className:"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300",children:"Start Over"})})]}),(0,r.jsx)(i.Z,{})]})}},1131:function(e,t,s){"use strict";var r=s(7437);t.Z=()=>(0,r.jsx)("footer",{className:"w-full h-16 py-4 bottom-0",children:(0,r.jsx)("p",{className:"text-center text-sm text-white",children:"by Artem 2024"})})},9885:function(e,t,s){"use strict";s.d(t,{Z:function(){return d}});var r=s(7437),a=s(8575),l=s(2265),o=s(9106),n=()=>{let[e,t]=(0,l.useState)(!1);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("button",{onClick:()=>{t(!0)},className:"w-[40px] h-[32px] cursor-pointer transition-colors duration-300 hover:bg-transparent",children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"40",height:"32",fill:"none",className:"transition-colors duration-300",children:(0,r.jsx)("path",{d:"M34.29 18.32v11.9c0 .43-.156.802-.47 1.116a1.526 1.526 0 0 1-1.117.471h-9.527v-9.52h-6.352v9.52H7.297c-.43 0-.802-.157-1.116-.47a1.524 1.524 0 0 1-.472-1.116v-11.9L20 6.421l14.266 11.751Z",className:"hover:fill-white",fill:"currentColor"})})}),e&&(0,r.jsx)("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-40",children:(0,r.jsx)(o.Z,{onClose:()=>{t(!1)}})})]})},c=s(3145),i=e=>{let{value:t,count:s}=e;return(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,r.jsx)(c.default,{src:1===t?"/travel-together/icons/token1.svg":"/travel-together/icons/token2.svg",alt:"Token ".concat(t),width:32,height:32}),(0,r.jsxs)("span",{className:"text-white text-lg font-bold",children:["X ",s]})]})},d=e=>{let{showHomeButton:t}=e,s=(0,a.v9)(e=>e.token.availableTokens);return(0,r.jsxs)("header",{className:"w-full h-16 flex justify-between items-center p-4 bg-transparent fixed top-0 left-0 z-50",children:[t&&(0,r.jsx)(n,{}),t&&(0,r.jsxs)("div",{className:"flex space-x-8",children:[(0,r.jsx)(i,{value:1,count:s.first}),(0,r.jsx)(i,{value:2,count:s.second})]})]})}},9106:function(e,t,s){"use strict";var r=s(7437),a=s(9376),l=s(4131),o=s(6089),n=s(3333);t.Z=e=>{let{onClose:t}=e,s=(0,a.useRouter)();return(0,r.jsx)("div",{className:"flex flex-col space-y-4 mt-0",children:(0,r.jsxs)("div",{className:"relative bg-white rounded-[30px] p-[20px] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full space-y-5",onClick:e=>e.stopPropagation(),children:[(0,r.jsx)(n.Z,{onClose:t}),(0,r.jsx)("h2",{className:"text-lg font-semibold text-center text-[var(--header-text-color)] uppercase h-10",children:"Are you sure you want to reset?"}),(0,r.jsxs)("div",{className:"flex justify-around space-x-4 mt-4",children:[(0,r.jsx)(o.Z,{label:"Yes",onClick:()=>{l.Z.remove("gameState"),l.Z.remove("currentRound"),l.Z.remove("currentSelection"),l.Z.remove("isRescue"),localStorage.clear(),s.push("/")}}),(0,r.jsx)(o.Z,{label:"No",onClick:t})]})]})})}},6089:function(e,t,s){"use strict";var r=s(7437);t.Z=e=>{let{label:t,onClick:s,disabled:a=!1}=e;return(0,r.jsx)("button",{className:"w-full h-10 rounded-full uppercase transition-all duration-300 ease-in-out \n                    ".concat(a?"bg-gray-300 text-gray-500 cursor-not-allowed":"bg-[var(--primary-color)] text-white hover:bg-gradient-to-r hover:from-[var(--primary-color)] hover:to-[var(--hover-primary-color)] hover:bg-size-200 hover:bg-pos-0 hover:bg-right-200"),onClick:s,disabled:a,children:t})}},3333:function(e,t,s){"use strict";var r=s(7437);t.Z=e=>{let{onClose:t}=e;return(0,r.jsx)("button",{className:"absolute top-[-10px] right-[-10px] w-[15px] h-[15px] cursor-pointer transition-colors duration-300 hover:bg-transparent",onClick:t,children:(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"15",height:"15",fill:"none",className:"transition-colors duration-300",children:(0,r.jsx)("path",{d:"M15 1.364 13.636 0 7.5 6.136 1.364 0 0 1.364 6.136 7.5 0 13.636 1.364 15 7.5 8.864 13.636 15 15 13.636 8.864 7.5 15 1.364Z",className:"hover:fill-white",fill:"currentColor"})})})}}},function(e){e.O(0,[55,145,971,117,744],function(){return e(e.s=352)}),_N_E=e.O()}]);