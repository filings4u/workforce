
(() => {
  "use strict";

  function ready(fn){
    if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn, {once:true});
    else fn();
  }

  ready(initNavigation);

  function initNavigation(){
    const desktop = document.getElementById("desktopNav");
    const mobile = document.getElementById("mobileNav");
    const toggle = document.getElementById("mobileToggle");
    if(!desktop || !mobile || !toggle) return;

    const desktopMarkup = `
      <div class="nav-item"><a class="nav-link" href="index.html">Home</a></div>
      <div class="nav-item">
        <a class="nav-link" href="platform.html">Platform <span class="chevron">▼</span></a>
        <div class="dropdown">
          <a href="platform.html">Platform Overview</a>
          <a href="platform.html#workforce">Workforce Management</a>
          <a href="platform.html#programs">DOT &amp; Non-DOT Programs</a>
          <a href="platform.html#random">Random Pools</a>
          <a href="platform.html#testing">Testing Management</a>
          <a href="platform.html#records">Documents &amp; Reporting</a>
        </div>
      </div>
      <div class="nav-item">
        <a class="nav-link" href="employers.html">Solutions <span class="chevron">▼</span></a>
        <div class="dropdown">
          <a href="employers.html">For Employers</a>
          <a href="owner-operators.html">For Owner-Operators</a>
          <a href="ctpa.html">For C/TPAs</a>
        </div>
      </div>
      <div class="nav-item"><a class="nav-link" href="pricing.html">Pricing</a></div>
      <div class="nav-item"><a class="nav-link" href="contact.html">Contact</a></div>
    `;
    desktop.innerHTML = desktopMarkup;

    mobile.innerHTML = `
      <div class="mobile-nav-item"><a class="mobile-nav-link" href="index.html">Home</a></div>
      <div class="mobile-nav-item">
        <a class="mobile-nav-link" href="platform.html">Platform <span class="chevron">▼</span></a>
        <div class="mobile-dropdown">
          <a href="platform.html">Platform Overview</a>
          <a href="platform.html#workforce">Workforce Management</a>
          <a href="platform.html#programs">DOT &amp; Non-DOT Programs</a>
          <a href="platform.html#random">Random Pools</a>
          <a href="platform.html#testing">Testing Management</a>
          <a href="platform.html#records">Documents &amp; Reporting</a>
        </div>
      </div>
      <div class="mobile-nav-item">
        <a class="mobile-nav-link" href="employers.html">Solutions <span class="chevron">▼</span></a>
        <div class="mobile-dropdown">
          <a href="employers.html">Employers</a>
          <a href="owner-operators.html">Owner-Operators</a>
          <a href="ctpa.html">C/TPAs</a>
        </div>
      </div>
      <div class="mobile-nav-item"><a class="mobile-nav-link" href="pricing.html">Pricing</a></div>
      <div class="mobile-nav-item"><a class="mobile-nav-link" href="contact.html">Contact</a></div>
      <div class="mobile-nav-actions">
        <a class="btn btn-blue" href="https://app.screenings4u.com">Sign In</a>
        <a class="btn btn-orange" href="pricing.html">Start Your Account</a>
      </div>
    `;

    toggle.addEventListener("click", () => {
      const isOpen = mobile.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? "×" : "☰";
      document.body.classList.toggle("s4u-mobile-nav-open", isOpen);
    });

    mobile.querySelectorAll(".mobile-nav-item").forEach(item => {
      const link = item.querySelector(":scope > .mobile-nav-link");
      const drop = item.querySelector(":scope > .mobile-dropdown");
      if(!link || !drop) return;
      link.addEventListener("click", e => {
        if(window.innerWidth <= 1120){
          e.preventDefault();
          item.classList.toggle("open");
        }
      });
    });

    document.addEventListener("click", e => {
      if(window.innerWidth > 1120) return;
      if(!mobile.contains(e.target) && e.target !== toggle && mobile.classList.contains("is-open")){
        mobile.classList.remove("is-open");
        document.body.classList.remove("s4u-mobile-nav-open");
        toggle.textContent = "☰";
        toggle.setAttribute("aria-expanded","false");
      }
    });
  }
})();
