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
   
    /* ── OPEN ── */
    function openMenu() {
      if (isOpen) return;
      isOpen = true;
      trigger.classList.add('is-open');
      dropdown.style.pointerEvents = 'all';
      pills.forEach(p => p.classList.add('is-visible'));
    }
   
    /* ── CLOSE ── */
    function closeMenu() {
      if (!isOpen) return;
      isOpen = false;
      trigger.classList.remove('is-open');
      dropdown.style.pointerEvents = 'none';
      pills.forEach(p => p.classList.remove('is-visible'));
    }
   
    /* Hover (desktop) */
    wrap.addEventListener('mouseenter', openMenu);
    wrap.addEventListener('mouseleave', closeMenu);
   
    /* Click toggle (mobile + desktop) */
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      isOpen ? closeMenu() : openMenu();
    });
   
    /* Outside click closes */
    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) closeMenu();
    });
   
    /* Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
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
   
        if (window.locoScroll=locoScroll) {
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
