class t extends HTMLElement{connectedCallback(){let t=this.getAttribute("static-path")||"",e=this.hasAttribute("show-license")||!1,i=this.hasAttribute("show-fab-button")||!1;this.innerHTML=`
      <footer class="footer bodyFooter">
       ${e?`
        <div class="row ml-2 mr-2">
            <div class="col">
                <div class="float-right hidden-first">
                    <p xmlns:cc="http://creativecommons.org/ns#" >This work is licensed under <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""></a></p>
                </div>
            </div>
        </div>`:""}
        <div class="footerMenu">
          <hr>
          <ul>
            <li><a href="${t}about.html">About</a></li>
            <li><a href="${t}terms.html">Terms of use</a></li>
            <li><a href="${t}privacy.html">Privacy</a></li>
            <li><a href="${t}cookies.html">Cookies</a></li>
            <li><a href="${t}github.html">GitHub</a></li>
            <li><a href="${t}research.html">Research</a></li>
            <li><a href="${t}support.html">Support</a></li>
          </ul>
          <span id="companyName">&copy; Hi-Audio</span>
        </div>
        ${i?`
          <div class="fab">
            <a class="floatingbutton" href="#" data-toggle="modal" data-target="#bugReportModal">
              <i class="fas fa-bug" style="color:white;"></i>
            </a>
          </div>
        `:""}
      </footer>
    `}}customElements.define("hi-audio-footer",t);
//# sourceMappingURL=composition.ca0baee3.js.map
