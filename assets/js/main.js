(function(){
  'use strict';
  var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.getElementById('yr').textContent = new Date().getFullYear();

  /* sticky nav */
  var nav = document.getElementById('nav');
  var onScroll = function(){ nav.classList.toggle('is-stuck', window.scrollY > 40); };
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  /* reveal on scroll */
  var els = document.querySelectorAll('.reveal');
  if(rm || !('IntersectionObserver' in window)){
    els.forEach(function(e){ e.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          var sibs = Array.prototype.slice.call(en.target.parentNode.children).filter(function(n){return n.classList.contains('reveal')});
          en.target.style.transitionDelay = Math.min(sibs.indexOf(en.target), 5) * 70 + 'ms';
          en.target.classList.add('in'); io.unobserve(en.target);
        }
      });
    }, {rootMargin:'0px 0px -8% 0px', threshold:0.08});
    els.forEach(function(e){ io.observe(e); });
  }

  /* mobile menu */
  var burger = document.getElementById('burger');
  if(burger){
    var setMenu = function(open){
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('menu-open', open);
    };
    burger.addEventListener('click', function(){
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    document.querySelectorAll('#menu a').forEach(function(a){
      a.addEventListener('click', function(){ setMenu(false); });
    });
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') setMenu(false); });
  }

  /* rotating words */
  var rot = document.querySelector('.rot');
  if(rot){
    var words = rot.getAttribute('data-words').split('|'), i = 0;
    if(!rm) setInterval(function(){
      i = (i+1) % words.length;
      rot.style.transition = 'opacity .3s'; rot.style.opacity = 0;
      setTimeout(function(){ rot.textContent = words[i]; rot.style.opacity = 1; }, 300);
    }, 2800);
  }

  /* count up */
  var stats = document.querySelectorAll('[data-count]');
  if(stats.length && 'IntersectionObserver' in window && !rm){
    var so = new IntersectionObserver(function(en){
      en.forEach(function(e){
        if(!e.isIntersecting) return;
        var el = e.target, target = +el.getAttribute('data-count'),
            sfx = el.getAttribute('data-suffix') || '', t0 = null;
        var step = function(ts){
          if(!t0) t0 = ts;
          var p = Math.min((ts - t0)/900, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1-p, 3))) + sfx;
          if(p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step); so.unobserve(el);
      });
    }, {threshold:0.6});
    stats.forEach(function(s){ so.observe(s); });
  }

  /* active nav link */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var secs = links.map(function(a){ return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if(secs.length && 'IntersectionObserver' in window){
    var ao = new IntersectionObserver(function(en){
      en.forEach(function(e){
        if(!e.isIntersecting) return;
        links.forEach(function(a){ a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, {rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(function(s){ ao.observe(s); });
  }
})();
