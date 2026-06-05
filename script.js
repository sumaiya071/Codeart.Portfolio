function locoScroll() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
window.locoScroll = locoScroll;
}
locoScroll()

function cursorEffect() {
    var page1Content = document.querySelector(".page1-content") 
var cursor = document.querySelector(".cursor")

page1Content.addEventListener("mousemove",function(dets){
   gsap.to(cursor,{
    x:dets.x,
    y:dets.y
   })
})
page1Content.addEventListener("mouseenter",function(){
    gsap.to(cursor,{
        scale:1,
        opacity:1
    })
})
page1Content.addEventListener("mouseleave",function(){
    gsap.to(cursor,{
        scale:0,
        opacity:0
    })
})
}
cursorEffect()

function menuTrigger() {
 
    const trigger    = document.getElementById('menuTrigger');
    const dropdown   = document.getElementById('pillDropdown');
    if (!trigger || !dropdown) return;
   
    const pills = dropdown.querySelectorAll('.pill');
    const wrap  = trigger.closest('.menu-wrap');
    let isOpen  = false;
    var closeTimer = null;

    function positionDropdown() {
        var rect = trigger.getBoundingClientRect();
        dropdown.style.top   = (rect.bottom + 12) + 'px';
        dropdown.style.right = (window.innerWidth - rect.right) + 'px';
        dropdown.style.left  = 'auto';
    }
   
    /* ── OPEN ── */
    function openMenu() {
      clearTimeout(closeTimer);       /* cancel any pending close */
      if (isOpen) return;
      isOpen = true;
      positionDropdown();
      trigger.classList.add('is-open');
      dropdown.style.pointerEvents = 'all';
      pills.forEach(p => p.classList.add('is-visible'));
    }
   
    /* ── CLOSE ── */
    function closeMenu() {
      if (!isOpen) return;
      isOpen = false;
      trigger.classList.remove('is-open');
      dropdown.classList.remove('is-open');
      pills.forEach(p => p.classList.remove('is-visible'));
    }
   
    function scheduleClose() {
        clearTimeout(closeTimer);
        closeTimer = setTimeout(closeMenu, 120);
    }
    /* Hover */
    wrap.addEventListener('mouseenter',     openMenu);
    wrap.addEventListener('mouseleave',     scheduleClose);
    dropdown.addEventListener('mouseenter', openMenu);        /* cancel close when mouse enters pills */
    dropdown.addEventListener('mouseleave', scheduleClose);   /* schedule close when mouse leaves pills */

    /* Click toggle (mobile + desktop) */
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      isOpen ? closeMenu() : openMenu();
    });
   
    /* Outside click closes */
    document.addEventListener('click', function (e) {
        if (!wrap.contains(e.target) && !dropdown.contains(e.target)) closeMenu();
    });
   
    /* Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    /* Reposition on resize / scroll (needed because dropdown is fixed) */
    window.addEventListener('resize', function() { if (isOpen) positionDropdown(); });
    window.addEventListener('scroll', function() { if (isOpen) positionDropdown(); }, { passive: true });

    /* ── SMOOTH SCROLL ───────────────────────────────── */ 
    var scrollMap = {
      navAbout:   'about',
      navWork:    'work',
      navConnect: 'connect'
    };
   
    Object.keys(scrollMap).forEach(function (id) {
      var link = document.getElementById(id);
      if (!link) return;
   
      link.addEventListener('click', function (e) {
        e.preventDefault();
        closeMenu();
   
        var target = document.getElementById(scrollMap[id]);
        if (!target) return;
   
        if (window.locoScroll) {
                window.locoScroll.scrollTo(target);
            } else {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
      });
    });
   }
  menuTrigger();

function page2Animation() { 
    gsap.from(".elem h1",{
        y:120,
        stagger:0.2,
        duration:1,
        scrollTrigger:{
            trigger: ".page2",
            scroller: ".main",
            start: "top 47%",
            end: "top 46%",
            //markers:true,
            scrub: 2
        }
    })
}
page2Animation()

const rows = document.querySelectorAll('.project-row');
const hoverImg = document.getElementById('hoverImg');

document.addEventListener('mousemove', e => {
  hoverImg.style.left = (e.clientX + 30) + 'px';
  hoverImg.style.top  = (e.clientY - 110) + 'px';
});

rows.forEach(row => {
  row.addEventListener('mouseenter', () => {
    const src = row.dataset.img;
    if (!src) return;
    hoverImg.src = src;
    hoverImg.classList.add('visible');
  });
  row.addEventListener('mouseleave', () => {
    hoverImg.classList.remove('visible');
  });
});


(function () {
 
  var section = document.querySelector('.creative-section');
  if (!section) return;
 
  /* ── 1. CURSOR GLOW ──────────────────────────────── */
  var cursorGlow = document.getElementById('csCursorGlow');
  if (cursorGlow) {
    section.addEventListener('mousemove', function (e) {
      var r = section.getBoundingClientRect();
      cursorGlow.style.left = (e.clientX - r.left) + 'px';
      cursorGlow.style.top  = (e.clientY - r.top)  + 'px';
    });
  }
 
  /* ── 2. PARALLAX ORBS ────────────────────────────── */
  var orbs = section.querySelectorAll('.cs-orb');
  section.addEventListener('mousemove', function (e) {
    var r  = section.getBoundingClientRect();
    var mx = (e.clientX - r.left) / r.width  - 0.5;
    var my = (e.clientY - r.top)  / r.height - 0.5;
    orbs.forEach(function (orb, i) {
      var depth = (i + 1) * 14;
      orb.style.transform = 'translate(' + (mx * depth) + 'px, ' + (my * depth) + 'px)';
    });
  });
 
  /* ── 3. DRAGGABLE FLOATING OBJECTS ──────────────── */
  var floats = section.querySelectorAll('.cs-float');
 
  floats.forEach(function (el) {
    var dragging = false;
    var ox = 0, oy = 0;
 
    function getPos(e) {
      return e.touches
        ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
        : { x: e.clientX,            y: e.clientY };
    }
 
    el.addEventListener('mousedown',  startDrag);
    el.addEventListener('touchstart', startDrag, { passive: true });
 
    function startDrag(e) {
      dragging = true;
      el.style.animation  = 'none';
      el.style.zIndex     = '100';
      el.style.transition = 'box-shadow .25s';
      var p  = getPos(e);
      var er = el.getBoundingClientRect();
      var sr = section.getBoundingClientRect();
      ox = p.x - er.left;
      oy = p.y - er.top;
    }
 
    document.addEventListener('mousemove',  onMove);
    document.addEventListener('touchmove',  onMove, { passive: true });
 
    function onMove(e) {
      if (!dragging) return;
      var p  = getPos(e);
      var sr = section.getBoundingClientRect();
      el.style.left = (p.x - sr.left - ox) + 'px';
      el.style.top  = (p.y - sr.top  - oy) + 'px';
      /* clear bottom/right so left/top take over */
      el.style.bottom = 'auto';
      el.style.right  = 'auto';
      /* clear centering transform for filmstrip */
      if (el.classList.contains('cs-filmstrip')) {
        el.style.transform = 'none';
      }
    }
 
    document.addEventListener('mouseup',  stopDrag);
    document.addEventListener('touchend', stopDrag);
 
    function stopDrag() {
      if (!dragging) return;
      dragging = false;
      el.style.zIndex    = '8';
      el.style.animation = 'csFloat 5s ease-in-out infinite';
    }
  });
 
  /* ── 4. CARD 3D TILT ─────────────────────────────── */
  var cards = section.querySelectorAll('.cs-card[data-tilt]');
 
  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width  - 0.5;
      var y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform =
        'translateY(-8px) scale(1.02) rotateY(' + (x * 10) + 'deg) rotateX(' + (-y * 10) + 'deg)';
    });
 
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
 
  /* ── 5. GSAP ENTRANCE ANIMATIONS ─────────────────── */
  if (window.gsap && window.ScrollTrigger) {
 
    gsap.from('.cs-hero-tag', {
      opacity: 0, y: 20, duration: .8,
      scrollTrigger: { trigger: '.creative-section', scroller: '.main', start: 'top 75%' }
    });
 
    gsap.from('.cs-hero-name', {
      opacity: 0, y: 40, duration: 1, delay: .15,
      scrollTrigger: { trigger: '.creative-section', scroller: '.main', start: 'top 75%' }
    });
 
    gsap.from('.cs-hero-sub, .cs-chips', {
      opacity: 0, y: 20, duration: .8, delay: .3, stagger: .12,
      scrollTrigger: { trigger: '.creative-section', scroller: '.main', start: 'top 70%' }
    });
 
    gsap.from('.cs-card', {
      opacity: 0, y: 50, duration: .9, stagger: .15, delay: .1,
      scrollTrigger: { trigger: '.cs-bento', scroller: '.main', start: 'top 80%' }
    });
 
    gsap.from('.cs-float', {
      opacity: 0, scale: .85, duration: .8, stagger: .1,
      scrollTrigger: { trigger: '.creative-section', scroller: '.main', start: 'top 70%' }
    });
  }
 
})();
