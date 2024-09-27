function e(e,t,l,o){Object.defineProperty(e,t,{get:l,set:o,enumerable:!0,configurable:!0})}var t=globalThis,l={},o={},a=t.parcelRequire1e7e;null==a&&((a=function(e){if(e in l)return l[e].exports;if(e in o){var t=o[e];delete o[e];var a={id:e,exports:{}};return l[e]=a,t.call(a.exports,a,a.exports),a.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){o[e]=t},t.parcelRequire1e7e=a);var n=a.register;n("27Lyk",function(t,l){e(t.exports,"register",()=>o,e=>o=e);var o,a=new Map;o=function(e,t){for(var l=0;l<t.length-1;l+=2)a.set(t[l],{baseUrl:e,path:t[l+1]})}}),n("9QUIF",function(e,t){let l="STAGE",o={PROD:{ENDPOINT:"",UPLOAD_ENDPOINT:""},STAGE:{ENDPOINT:window.location.protocol+"//"+window.location.host,UPLOAD_ENDPOINT:window.location.protocol+"//"+window.location.host+"/fileUpload"},DEV:{ENDPOINT:window.location.protocol+"//"+window.location.host,UPLOAD_ENDPOINT:window.location.protocol+"//"+window.location.host+"/fileUpload"}};e.exports={ENDPOINT:o[l].ENDPOINT,UPLOAD_ENDPOINT:o[l].UPLOAD_ENDPOINT}}),n("eGMSd",function(t,l){e(t.exports,"default",()=>o);var o=new class{constructor(){if(this.modal=this.getDynamicModal(),this.callbackDismiss=null,!this.modal){this.modal=this.initDynamicModal();let e=this;$(this.modal).on("hide.bs.modal",function(t){e.callbackDismiss&&(e.callbackDismiss(),e.callbackDismiss=null)})}}dynamicModalDialog(e,t,l,o,a,n,i){this.setDynamicModalContent('<div class="modal-header '+n+' text-white"><h5 class="modal-title" id="dynamicModalLabel">'+a+'</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body">'+e+'</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">'+o+"</button>"+(null!==t?"<button id="+t+' type="button" class="btn btn-primary">'+l+"</button>":"")+"</div>"),this.callbackDismiss=i,$(this.modal).modal("show")}getDynamicModal(){return document.getElementById("dynamicModal")}setDynamicModalContent(e){this.modal.querySelector(".modal-content").innerHTML=e}closeDynamicModal(e){$(this.modal).modal("hide"),e&&e()}initDynamicModal(){let e=document.createElement("div");return e.classList.add("modal","fade"),e.setAttribute("id","dynamicModal"),e.setAttribute("tabindex","-1"),e.setAttribute("role","dialog"),e.setAttribute("aria-labelledby","dynamicModalLabel"),e.setAttribute("aria-hidden","true"),e.innerHTML='<div class="modal-dialog modal-sm modal-dialog-centered" role="document"><div class="modal-content"></div></div>',document.body.appendChild(e),e}}}),n("ck9ES",function(t,l){e(t.exports,"LOADER_ELEM_ID",()=>n),e(t.exports,"uriUserPage",()=>i),e(t.exports,"uriCollectionPage",()=>s),e(t.exports,"LevelPrivacy",()=>c),e(t.exports,"PRIVACY_BADGE_STYLE",()=>r),e(t.exports,"PRIVACY_BADGE_TEXT",()=>d),e(t.exports,"startLoader",()=>u),e(t.exports,"cancelLoader",()=>m),e(t.exports,"callJsonApi",()=>p),e(t.exports,"looksLikeMail",()=>g),e(t.exports,"activateGoHomeLink",()=>b),e(t.exports,"MEDIA_CONSTRAINTS",()=>h);var o=a("9QUIF");let n="loader",i="/index.html?userid=",s="/index.html?collectionid=";Object.freeze({none:0,owner:1,admin:2,member:3,guest:4});let c=Object.freeze({public:1,onlyreg:2,private:3}),r={[c.public]:"badge-public",[c.onlyreg]:"badge-onlyreg",[c.private]:"badge-private"},d={[c.public]:"PUBLIC",[c.onlyreg]:"REG USERS",[c.private]:"PRIVATE"},u=(e,t)=>{let l=document.getElementById(e);l.nextElementSibling.textContent=t,l.classList.add(e)},m=e=>{let t=document.getElementById(e);t.classList.remove(e),t.nextElementSibling.textContent=""},p=async(e,t,l)=>{let a={method:t||"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}};l&&(a.body=JSON.stringify(l));try{u(n,"Loading...");let t=await fetch(o.ENDPOINT+e,a);m(n);let l=await t.json();if(l&&!l.error)return l;return l?.error||"An error occurred"}catch(e){return m(n),e}},g=e=>{let t=e.lastIndexOf("@"),l=e.lastIndexOf(".");return t<l&&t>0&&-1==e.indexOf("@@")&&l>2&&e.length-l>2},b=()=>{let e=document.getElementById("goHome");"localhost:80"===window.location.host||"http://localhost"===window.location.origin?e.href=window.location.origin+"/index.html":e.href=window.location.origin};/^((?!chrome|android).)*safari/i.test(navigator.userAgent);let h={audio:{echoCancellation:!1,noiseSuppression:!1,autoGainControl:!1,latency:0,channelCount:1}}}),n("hcAI8",function(t,l){e(t.exports,"checkIfTermsAccepted",()=>n),e(t.exports,"generateAcceptTermsModal",()=>r);var o=a("ck9ES");let n=(e,t)=>{(0,o.cancelLoader)(o.LOADER_ELEM_ID),t(e?.terms_accepted)},i=()=>{$("#acceptTermsModal").modal({backdrop:"static",keyboard:!1}),$("#acceptTermsModal").modal("show"),document.getElementById("buttonAcceptTerms").onclick=s,document.getElementById("buttonRejectTerms").onclick=c},s=async()=>{(await (0,o.callJsonApi)("/acceptterms","PUT")).ok&&$("#acceptTermsModal").modal("hide")},c=async()=>{(await (0,o.callJsonApi)("/rejectterms","PUT")).ok&&($("#acceptTermsModal").modal("hide"),window.location.href=window.location.origin)},r=e=>{if(!document.getElementById("acceptTermsModal")){let t=`<div class="modal fade" id="acceptTermsModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title">Accept Terms</h5>                
                </div>
                <div class="modal-body">
                <p>By clicking on OK you accept the Terms of Use.</p>
                <p>More information at: <span> <a href="${window.location.origin}/static/terms.html" target="_blank">${window.location.origin}/static/terms.html</a></span></p>
                </div>
                <div class="modal-footer">
                <button id="buttonRejectTerms" type="button" class="btn btn-secondary" data-dismiss="modal">Reject</button>
                <button id="buttonAcceptTerms" type="button" class="btn btn-primary">OK</button>
                </div>
            </div>
            </div>
        </div>`;document.getElementsByTagName(e)[0].insertAdjacentHTML("afterend",t)}i()}}),n("lRrDz",function(t,l){e(t.exports,"getCollections",()=>i),e(t.exports,"getCollectionsError",()=>s),e(t.exports,"createListCollections",()=>c);var o=a("9QUIF"),n=a("eGMSd");let i=async()=>{let e=await fetch(o.ENDPOINT+"/mycollections"),t=null;return e?.ok&&(t=await e.json()),t},s=()=>{(0,n.default).dynamicModalDialog("Problem getting collections",null,"","Close","Error","bg-danger")},c=(e,t,l)=>{let o=e.all_collections,a=document.getElementById(t),n="<option value='0'>...</option>",i=null;o.forEach(e=>{if(e){i=e.uuid===l?"selected>":null;let t=`<option value='${e.uuid}' ${i||">"}${e.title}</option>`;n+=t}});let s=`<select class='custom-select' id='inputGroupSelectCollect'>${n}</select>`;a.insertAdjacentHTML("afterbegin",s)}}),a("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["4mD5z","index.f5625ef4.js","acVlS","homepage_video_compress.2a128691.mp4"]'));var i=a("9QUIF"),s=a("eGMSd"),c=a("ck9ES");const r=(e,t)=>{d(e,t),document.querySelectorAll(".breadcrumb-item a").forEach(function(e){e.addEventListener("click",function(e){e.preventDefault(),document.querySelector(".active-breadcrumb")?.classList.remove("active-breadcrumb"),e.currentTarget.classList.add("active-breadcrumb"),u(e.currentTarget.getAttribute("data-section"))})})},d=(e,t)=>{let l=document.getElementById("breadcrumbnavbar"),o="";o=e.ok?`<li class='breadcrumb-item ${t?"":"active-breadcrumb"}' aria-current='page'><a href='#' data-section='my-comp'>My Music</a></li>
        <li class='breadcrumb-item'><a href='#' data-section='all-comp'>All</a></li>`:`<li class='breadcrumb-item ${t?"":"active-breadcrumb"}' aria-current='page'><a href='#' data-section='recent-comp'>Recent</a></li>
        <li class='breadcrumb-item'><a href='#' data-section='all-comp'>All</a></li>`,l.innerHTML=o};function u(e){let t=new URL(window.location.href);switch(t.searchParams.delete("userid"),t.searchParams.delete("collectionid"),history.replaceState(null,null,t),e){case"recent-comp":document.getElementById("legendbuttons").scrollIntoView({block:"start",behavior:"smooth"}),Y();break;case"my-comp":V();break;case"all-comp":document.getElementById("initialmessage").classList.remove("d-flex"),document.getElementById("initialmessage").hidden=!0,document.getElementById("legendbuttons").scrollIntoView({block:"start",behavior:"smooth"}),z();break;default:console.log("section default")}}var m=a("hcAI8");let p=null;const g=e=>{let t=!1;return("/mycompositions"===e||e.includes("/compositionsbyuserid/")||e.includes("/collectionastreebyid/"))&&(t=!0),t},b=()=>p,h=e=>{p=e},y=(e,t)=>!g(e)||t!==b(),v=e=>{let t={},l={};return e.forEach(e=>{let o=e.collection_uid,a=e.user_id;null!==o?(t[o]||(t[o]=[]),t[o].push(e)):(l[a]||(l[a]=[]),l[a].push(e))}),{groupedbycoll:t,groupedbyuser_aux:l}},f=(e,t)=>{let l={},o=[];return e.forEach(e=>{let a=e.collection_uid;null!==a&&a!==t?(l[a]||(l[a]=[]),l[a].push(e)):o.push(e)}),{groupedbycoll:l,singlecomps:o}},E=e=>{let t={},l={},o=[];return e.forEach(e=>{let a=e.collection_uid;null!==a?(t[a]||(t[a]=[]),t[a].push(e)):e.contributors.length?(l.collabs||(l.collabs=[]),l.collabs.push(e)):o.push(e)}),{groupedbycoll:t,groupedbycollab:l,singlecomps:o}},w=e=>{let t={},l=[];for(let o in e)1===e[o].length?l.push(e[o][0]):(t[o]||(t[o]=[]),t[o]=e[o]);return{singlecomps:l,groupedbyuser_final:t}},I=e=>{let{groupedbycoll:t,groupedbyuser_aux:l}=v(e),{singlecomps:o,groupedbyuser_final:a}=w(l);return{groupedbycoll:t,groupedbyuser_final:a,singlecomps:o}},T=e=>{let{groupedbycoll:t,groupedbycollab:l,singlecomps:o}=E(e);return{groupedbycoll:t,groupedbycollab:l,singlecomps:o}},x=(e,t)=>{let{groupedbycoll:l,singlecomps:o}=f(e,t);return{groupedbycoll:l,singlecomps:o}};var c=a("ck9ES"),A={};A=new URL("homepage_video_compress.2a128691.mp4",import.meta.url).toString();const k=new URL(A),C={coll:"badge-collection",user:"badge-warning",collab:"badge-collab"},L={coll:"border-collection",user:"border-warning",collab:"border-collab"},B={coll:c.uriCollectionPage,user:c.uriUserPage},M=`<div class="fullscreen-video-container">
    <video playsinline autoplay loop muted>
      <source src="${k}">
    </video>  
  <div class='fullscreen-video-content'>
    <div class="typewriter">
      <h1>Welcome!</h1>      
    </div>
    <div class="h-100 d-flex">
      <div class="m-auto">
        <a id="start-link" class="btn btn-link" href="/login.html" role="button"><b>LET'S START?</b></a>
      </div>
    </div>    
  </div>
</div>`,_=(e,t,l,o,a)=>{let n=e||!g(o)&&t||l;return`<ul class="nav justify-content-end">
              ${n?'<li class="legenditem nav-item"><h4><span class="badge badge-light">Groups by:&nbsp;</span></h4></li>':""}
              ${e?'<li class="legenditem nav-item"><h4><span class="badge badge-collection">Collections&nbsp;<span class="badge badge-light">'+e+"</span></span></h4></li>":""}            
              ${!g(o)&&t?'<li class="legenditem nav-item"><h4><span class="badge badge-warning">Users&nbsp;<span class="badge badge-light">'+t+"</span></span></h4></li>":""}
              ${l?'<li class="legenditem nav-item"><h4><span class="badge badge-success">Singles&nbsp;<span class="badge badge-light">'+l+"</span></span></h4></li>":""}
              <li class="legenditem nav-item"><h4><span class="badge badge-light">Total compositions:&nbsp;</span><span class="badge badge-light">${a}</span></h4></li>
            </ul>`},D=(e,t)=>{document.getElementById("grid").innerHTML="",document.getElementById("grid").insertAdjacentHTML("afterbegin",e),document.getElementById("legendbuttons").innerHTML="",document.getElementById("legendbuttons").insertAdjacentHTML("afterbegin",t),document.getElementById("searchInput").removeAttribute("disabled")},O=(e,t)=>{let l=y(t,e.username),o=e.contributors.length;return`<div class='card border-success'>                       
              <div class="card-body">
              ${j?`<span class="badge ${c.PRIVACY_BADGE_STYLE[e.privacy]}">${c.PRIVACY_BADGE_TEXT[e.privacy]}</span>`:""}
              ${e.opentocontrib?'<p class="badge badge-info">OPEN TO CONTRIB</p>':""}               
                  <div>
                    <p class="list-group-item-heading">  
                      <a href='${H+e.uuid}' class='card-url'>
                        <h5 class='card-title'>${e.title}</h5>
                      </a>
                    </p>
                    <p class='card-text text-truncate'>${e.description||""}</p>
                    <p class='text-black-50'>${o?"Collaborators: "+o:""}</p>
                    ${l?`<span class="d-inline-block text-truncate" style="max-width: 250px;">
                    <i class='fa fa-user'></i>&nbsp;
                    <a href='${c.uriUserPage+e.owner_uuid}' class='card-url'>
                      ${e.username}&nbsp;
                    </a>
                  </span>`:""}
                    <span class="d-inline-block text-truncate" style="max-width: 250px;">
                      <i class='fa fa-music'></i>&nbsp;${"Tracks: "+e.tracks?.length}
                    </span>                  
                  </div>                
              </div>            
          </div>`},N=(e,t,l)=>{let o=y(l,e.username),a=e.contributors.length;return`<div class="list-group-item ">
              ${j?`<span class="badge ${c.PRIVACY_BADGE_STYLE[e.privacy]}">${c.PRIVACY_BADGE_TEXT[e.privacy]}</span>`:""}
              ${e.opentocontrib?'<span class="badge badge-info">OPEN TO CONTRIB</span>':""}  
              <p class="list-group-item-heading">
                <a href='${H+e.uuid}' class='card-url'>
                    <h5 class='card-title'>${e.title}</h5>
                </a>
              </p>
              <p class='text-black-50'>${a?"Collaborators: "+a:""}</p>
              <p class="list-group-item-text text-truncate">
                ${e.description||""}
              </p>
              ${"user"!==t&&o?'<span class="d-inline-block text-truncate" style="max-width: 220px;"><i class="fa fa-user"></i>&nbsp;<a href='+c.uriUserPage+e.owner_uuid+' class="card-url">'+e.username+"&nbsp;</a></span>":""}            
              <span class="d-inline-block text-truncate" style="max-width: 200px;">
                <i class='fa fa-music'></i>&nbsp;${"Tracks: "+e.tracks?.length}
              </span>
            </div>`},P=(e,t,l,o,a)=>{let n=C[e],i=L[e],s=B[e],c=`<span class="badge ${n} d-inline-block text-truncate" style="max-width:85%;">
                              <span class="badge badge-light">${t}</span>&nbsp;
                              ${s?`<a href=${s+o} class="card-header-url">${l}</a>`:`${l}`}                              
                          </span>`;return`<div class='card ${i}'>                        
              <h4>${c}</h4>        
              <div class="card-body">
                <div class="list-group border">              
                  ${a}
                </div>
              </div>
            </div>`},S=e=>{let t=document.getElementById("welcomecontainer");if(!e&&!t.lastChild){let e=document.createElement("div");e.id="welcometext",e.innerHTML=j?"":`${M}`,document.getElementById("welcomecontainer").appendChild(e)}},R=(e,t,l)=>{S(!0);let o=document.createElement("div");o.id="infocontainer",o.innerHTML=`<div class="card border-collection mb-3">
                                          <div class="card-header bg-transparent border-collection"><b>Collection</b></div>
                                          <div class="card-body text-dark">
                                            <h5 class="card-title">${e}</h5>
                                            <p class="card-text" style="width:300px;">Owner: <a href=${c.uriUserPage+l} class="card-url">${t}</a></p>
                                          </div>
                                        </div>`,document.getElementById("welcomecontainer").appendChild(o)},U=(e,t)=>{S(!0);let l=document.createElement("div");l.id="infocontainer",l.innerHTML=`<div class="card mb-3" style="max-width: 540px;">
                                    <div class="row no-gutters">
                                      <div class="col-md-4">
                                        <img class="img-fluid" src="https://picsum.photos/seed/${t}/200" alt="User Picture">
                                      </div>
                                      <div class="col-md-8">
                                        <div class="card-body">
                                          <h5 class="card-title">User</h5>
                                          <p class="card-text" style="width:300px;">${e?`${e}`:""}</p>                                        
                                          <p class="card-text"><small class="text-muted"></small></p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>`,document.getElementById("welcomecontainer").appendChild(l)},H="/composition.html?compositionId=";let j=!1;const G=e=>{e||(0,m.generateAcceptTermsModal)("header")},J=async()=>{let e=await (0,c.callJsonApi)("/profile","GET");return e.ok&&(h(e.name),document.getElementById("userlogin").style.display="none",document.getElementById("useroptions").style.display="",document.getElementById("display_profile_name").innerText=`[${e.name}]`,(0,m.checkIfTermsAccepted)(e,G)),e},V=async()=>{let e="/mycompositions",t=await (0,c.callJsonApi)(e,"GET");if(t.compositions)return Q(t.compositions,e);alert("invalid return value for compisitions list")},q=async(e,t)=>{let l="/compositionsbyuserid/"+e,o=await (0,c.callJsonApi)(l,"GET");if(o.compositions)return h(o.username),U(o.username,e),Q(o.compositions,l);alert("invalid return value for user id"),t.ok?u("my-comp"):u("recent-comp")},F=async(e,t)=>{let l="/collectionastreebyid/"+e,o=await (0,c.callJsonApi)(l,"GET");if(o.compositions)return h(o.username),R(o.collection_name,o.username,o.owneruid),Q(o.compositions,l);alert("invalid return value for collection id"),t.ok?u("my-comp"):u("recent-comp")},Y=async()=>{let e=await (0,c.callJsonApi)("/recentcompositions","GET");if(e.compositions)return Q(e.compositions,"/recentcompositions");alert("invalid return value for compisitions list")},z=async()=>{let e=await (0,c.callJsonApi)("/compositions","GET");if(e.compositions)return Q(e.compositions,"/compositions");alert("invalid return value for compisitions list")},Q=(e,t)=>{document.getElementById("loadertext").textContent="",document.getElementById("grid").innerHTML="",document.getElementById("legendbuttons").innerHTML="";let l=!t.includes("/compositionsbyuserid/")&&!t.includes("/collectionastreebyid/");l&&S(!1),!e.length&&l?(document.getElementById("initialmessage").hidden=!1,document.getElementById("initialmessage").classList.add("d-flex")):X(e,t)},X=(e,t)=>{t.includes("/collectionastreebyid/")?Z(x(e,t.replace("/collectionastreebyid/","")),null,t,e.length):g(t)?Z(T(e),"groupedbycollab",t,e.length):Z(I(e),"groupedbyuser_final",t,e.length)},K=(e,t,l)=>{let o="";for(let a in e){let n=e[a],i="",s="",c=null;for(let e of("collab"===t?s="Collaborations":"coll"===t?(s=Object.values(n)[0].parent_collection,c=Object.values(n)[0].collection_uid):(s=Object.values(n)[0].username,c=Object.values(n)[0].owner_uuid),n))i+=N(e,t,l);o+=P(t,n.length,s,c,i)}return o},W=(e,t)=>{let l="",o=e.singlecomps;return o?.forEach(e=>{let o=O(e,t);l+=o}),l},Z=(e,t,l,o)=>{let a="",n=Object.keys(e.groupedbycoll).length,i=t?Object.keys(e[t]).length:0,s=e.singlecomps.length;n>0&&(a+=K(e.groupedbycoll,"coll",l)),i>0&&(a+=K(e[t],"groupedbycollab"===t?"collab":"user",l)),s>0&&(a+=W(e,l)),D(a,_(n,i,s,l,o))},ee=async()=>{let e=window.location.search,t=e.split("userid=")[1],l=e.split("collectionid=")[1],o=await J();j=o.ok,t?await q(t,o):l?await F(l,o):o.ok?await V():await Y(),r(o,t||l)};document.getElementById("userlogin").innerHTML=`<li class='nav-item'>
        <a class='dropdown-item' href='${window.location.origin}/login.html'>Register / Login</a>
    </li>
    <li class='nav-item'>
        <a class='dropdown-item' href='${H}demopage'>Test DAW</a>
    </li>
    <li class='nav-item'>
        <a class='dropdown-item' href='${window.location.origin}/static/howto.html'>How-To</a>
    </li>
    `,document.getElementById("useroptions").innerHTML=`<li class='nav-item'>
      <a class='nav-link' href='${window.location.origin+"/profile.html"}'>Profile <i id='display_profile_name'></i></a>
    </li>
    <li class='nav-item'>
          <a class='nav-link' href='#' id='createNewButton' data-toggle='modal' data-target='#newMusicModal'>/ Create new</a>
    </li>
    <li class='nav-item'>
        <a class='nav-link' href='#' id='openMyCollectionsButton' data-toggle='modal' data-target='#editCollectionsModal'>/ My Collections</a>
    </li>
    <li class='nav-item'>
        <a class='nav-link' href='${window.location.origin+"/static/howto.html"}'>/ How-to</a>
    </li>
    `,(0,c.activateGoHomeLink)(),ee();var et=a("lRrDz"),i=a("9QUIF");let el=!1;const eo=document.getElementById("openMyCollectionsButton"),ea=document.getElementById("editmycollectionsbutton"),en=async()=>{let e=await fetch("/mycollectionsastree");return await e.json()},ei=e=>{let t=`
        <span id='removeCollIcon${e.uuid}' data-uuid='${e.uuid}' data-title='${e.title}' role='button' class='badge badge-pill badge-danger' hidden>-</span>
        <li id='${e.uuid}' class='list-group-item border-bottom-0 border-right-0 border-top-0 border-warning'>
            <input type='text' class='form-control border-secondary' id='treecolltitleinput${e.uuid}' data-uuid='${e.uuid}' placeholder='Type a new title'
            title='collectiontitle' value='${e.title}' disabled>
        </li>`;if(e.compositions.length>0||e.collections.length>0){for(let l of(t+="<ul>",e.compositions))t+=`<li class='list-group-item border-0'><a href='${H+l.uuid}'><u>${l.title}</u></a></li>`;for(let l of e.collections)t+=ei(l);t+="</ul>"}return t},es=async()=>{let e=document.getElementById("listCollContainerAllColl"),t=await en(),l="<ul>";for(let e of t)l+=ei(e);l+="</ul>",e.innerHTML=l},ec=()=>{el?(el=!1,ea.innerText="Edit",ed()):(el=!0,ea.innerText="Done",er())},er=()=>{document.querySelectorAll("[id*='removeCollIcon']").forEach(e=>{e.removeAttribute("hidden"),ep(e.getAttribute("data-uuid"),e.getAttribute("data-title"))}),document.querySelectorAll("[id*='treecolltitleinput']").forEach(e=>{e.removeAttribute("disabled"),eg(e.getAttribute("data-uuid"),e.value)})},ed=()=>{document.querySelectorAll("[id*='removeCollIcon']").forEach(e=>{e.setAttribute("hidden","true")}),document.querySelectorAll("[id*='treecolltitleinput']").forEach(e=>{e.setAttribute("disabled","true")})},eu=async()=>{el=!1,ea.innerText="Edit",await es(),ea.addEventListener("click",ec,!1)};eo?.addEventListener("click",eu,!1);const em=async(e,t,l)=>{if("SPAN"===e.target.tagName){if(!0==confirm(`Are you sure you want remove the collection ${l} and all of its content?`)){let e=await fetch(i.ENDPOINT+"/deletecollection/"+t,{method:"DELETE"});if(e?.ok){document.getElementById("removeCollIcon"+t).remove();let e=document.getElementById(t);e?.nextSibling?.tagName==="UL"&&e.nextSibling.remove(),e.remove()}}else e.target.checked=!1}},ep=(e,t)=>{document.getElementById("removeCollIcon"+e).onclick=async l=>{await em(l,e,t)}},eg=(e,t)=>{document.getElementById("treecolltitleinput"+e).onblur=l=>{eh(l,e,t)}},eb=(e,t)=>{fetch(i.ENDPOINT+"/updatecolltitle",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:e,uuid:t})}).then().catch(e=>{console.error("Error updating value:",e)})},eh=(e,t,l)=>{let o=e.target.value;if(l!==o){if(o&&""!==o)eb(o,t);else{e.target.value=l,alert("Introduce a valid title, please");return}}},ey=document.getElementById("createNewButton"),ev=document.getElementById("createNewButtonAtHome"),ef=()=>{j?(document.getElementById("newtitle").value="",document.getElementById("newdescription").value="",ew(document.getElementById("newcreation")),(0,et.getCollections)().then(e=>{e?eE(e):(0,et.getCollectionsError)()})):window.location.href="/login.html"};ey?.addEventListener("click",ef,!1),ev?.addEventListener("click",ef,!1);const eE=e=>{document.getElementById("listCollContainer").replaceChildren(),(0,et.createListCollections)(e,"listCollContainer")},ew=e=>{e?.addEventListener("click",eI)},eI=e=>{let t=document.getElementById("typeOfNewCreation").value,l="/newcomposition";"coll"===t&&(l="/newcollection");let o=document.getElementById("newtitle").value,a=document.querySelector('input[name="newMusicPrivacyRadios"]:checked').value;if(!o){alert("Introduce a valid title, please");return}let n=document.getElementById("newdescription").value,s=document.getElementById("inputGroupSelectCollect"),c=s?.value||null;"0"===c&&(c=null);let r=JSON.stringify({title:o,privacy_level:a,parent_uuid:c,description:n});fetch(i.ENDPOINT+l,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:r}).then(e=>(e.ok||e.statusText,e.json())).then(e=>{if(e)eT(e);else throw Error(e)}).catch(e=>{})},eT=e=>{$("#newMusicModal").modal("hide"),e.composition?window.location.href=H+e.composition.uuid:e.ok?(0,s.default).dynamicModalDialog("Collection created successfully!",null,"","Close","New Collection","bg-success"):(0,s.default).dynamicModalDialog("An error happened, item not created",null,"","Close","Error at Creation","bg-danger")};
//# sourceMappingURL=index.f5625ef4.js.map
