(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{1205:function(e,t,r){Promise.resolve().then(r.t.bind(r,5227,23)),Promise.resolve().then(r.t.bind(r,1553,23)),Promise.resolve().then(r.t.bind(r,2778,23)),Promise.resolve().then(r.bind(r,8172)),Promise.resolve().then(r.bind(r,5532))},8172:function(e,t,r){"use strict";r.d(t,{default:function(){return c}});var n=r(7437),s=r(2265),l=r(8575),a=r(1455),i=r(8705),o=r(1255);let u=()=>(0,a.xC)({reducer:{[i.R]:o.V1}});function c(e){let{children:t}=e,r=(0,s.useRef)(void 0);return r.current||(r.current=u()),(0,n.jsx)(l.zt,{store:r.current,children:t})}},8705:function(e,t,r){"use strict";r.d(t,{R:function(){return n}});let n="searchResult"},1255:function(e,t,r){"use strict";r.d(t,{CY:function(){return d},V1:function(){return p},i_:function(){return o},kG:function(){return f},sO:function(){return c},wq:function(){return i}});var n=r(1455),s=r(2713),l=r(3464),a=r(8705);let i=(0,n.hg)("".concat(a.R,"/getSearchResult"),async(e,t)=>{let{rejectWithValue:r}=t;try{return(await (0,l.Z)({method:"get",url:"https://itunes.apple.com/tw/rss/topfreeapplications/limit=100/json",responseType:"json"})).data.feed}catch(e){return r(e)}}),o=(0,n.hg)("".concat(a.R,"/getRecommendation"),async(e,t)=>{let{rejectWithValue:r}=t;try{return(await (0,l.Z)({method:"get",url:"https://itunes.apple.com/tw/rss/topgrossingapplications/limit=10/json",responseType:"json"})).data.feed}catch(e){return r(e)}}),u=(0,n.oM)({name:"searchResult",initialState:{searchResultRsp:null,recommendationRsp:null,keyword:null},reducers:{updateKeyword:(e,t)=>{e.keyword=t.payload}},extraReducers:e=>{e.addMatcher(e=>e.type===i.fulfilled.type||e.type===i.rejected.type,(e,t)=>{e.searchResultRsp=t.payload}),e.addMatcher(e=>e.type===o.fulfilled.type||e.type===o.rejected.type,(e,t)=>{e.recommendationRsp=t.payload})}}),c=(0,s.P1)(e=>{var t,r;return null===(r=e[a.R])||void 0===r?void 0:null===(t=r.searchResultRsp)||void 0===t?void 0:t.entry},e=>{var t;return null===(t=e[a.R])||void 0===t?void 0:t.keyword},(e,t)=>{if(!t)return{isKeyword:!1,result:e||[]};let r=t.toLowerCase(),n=e=>e.toLowerCase().includes(r);return{isKeyword:!0,result:e.filter(e=>n(e["im:name"].label)||n(e.summary.label)||n(e.title.label))}}),d=(0,s.P1)(e=>{var t,r;return null===(r=e[a.R])||void 0===r?void 0:null===(t=r.recommendationRsp)||void 0===t?void 0:t.entry},c,(e,t)=>{let{isKeyword:r,result:n}=t;return{result:r?n:e||[]}}),{updateKeyword:f}=u.actions,p=u.reducer},5532:function(e,t,r){"use strict";r.d(t,{default:function(){return i}});var n=r(7437),s=r(2265),l=r(5475),a=r(9379);function i(e){let{children:t}=e,[r]=(0,s.useState)(()=>new a.qH);return(0,l.useServerInsertedHTML)(()=>{let e=r.getStyleElement();return r.instance.clearTag(),(0,n.jsx)(n.Fragment,{children:e})}),(0,n.jsx)(n.Fragment,{children:t})}},2778:function(){},1553:function(e){e.exports={style:{fontFamily:"'__geistMono_fc2ce1', '__geistMono_Fallback_fc2ce1'"},className:"__className_fc2ce1",variable:"__variable_fc2ce1"}},5227:function(e){e.exports={style:{fontFamily:"'__geistSans_de3c7b', '__geistSans_Fallback_de3c7b'"},className:"__className_de3c7b",variable:"__variable_de3c7b"}}},function(e){e.O(0,[83,326,971,117,744],function(){return e(e.s=1205)}),_N_E=e.O()}]);