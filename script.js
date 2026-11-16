document.querySelectorAll('.toggle button').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('.toggle button').forEach(function(x){x.classList.remove('on')});
    b.classList.add('on');
    var y=b.dataset.m==='12';
    document.querySelectorAll('[data-p]').forEach(function(s){var p=+s.dataset.p;s.textContent=y?Math.round(p*0.8):p});
    document.querySelectorAll('.per').forEach(function(s){s.textContent=y?'شهر (سنويًا)':'شهر'});
    buildLinks();
    document.querySelectorAll('.price span').forEach(function(x){x.classList.remove('tick');void x.offsetWidth;x.classList.add('tick')});
  });
});

function buildLinks(){
  document.querySelectorAll('.plan:not(.soon)').forEach(function(card){
    var a=card.querySelector('.wa'); if(!a) return;
    var b=card.querySelectorAll('.spec b');
    var period=card.querySelector('.per').textContent;
    var yearly=period!=='شهر';
    var price=card.querySelector('[data-p]').textContent+' جنيه / '+(yearly?'شهرياً (يُدفع سنوياً)':'شهرياً');
    var msg='اسم الخطة: `'+card.querySelector('h3').textContent+' عبر Lyno Up`\n'
      +'تفاصيل الباقة:\n'
      +'• الرام: `'+b[0].textContent+'`\n'
      +'• التخزين: `'+b[1].textContent+'`\n'
      +'• المعالج: `'+b[2].textContent+'`\n'
      +'السعر الحصري: '+price+' فقط!';
    a.href='https://wa.me/@WND0?text='+encodeURIComponent(msg);
  });
}
buildLinks();

(function(){
  var sel=['.hero .badge','.hero h1','.hero p','.stats','h2','.lead','.toggle','.plan','.f','details','.band'];
  var els=document.querySelectorAll(sel.join(','));
  els.forEach(function(e){
    e.classList.add('rv');
    var sib=Array.prototype.filter.call(e.parentNode.children,function(x){return x.classList.contains('rv')||x===e});
    e.style.setProperty('--d',(Math.min(sib.indexOf(e),5)*0.1)+'s');
  });
  function show(e){e.classList.add('in');setTimeout(function(){e.classList.add('done')},1600)}
  if(!('IntersectionObserver' in window)){els.forEach(show);return}
  var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){show(x.target);io.unobserve(x.target)}})},{threshold:.12});
  els.forEach(function(e){io.observe(e)});
})();

(function(){
  var nav=document.querySelector('nav'),links=document.querySelectorAll('.links a[href^="#"]:not(.cta)');
  var secs=['plans','features','faq'].map(function(i){return document.getElementById(i)});
  function onScroll(){
    var y=window.scrollY,h=document.documentElement.scrollHeight-window.innerHeight;
    nav.classList.toggle('sc',y>10);
    nav.style.setProperty('--p',h>0?Math.min(y/h,1):0);
    var cur=-1;secs.forEach(function(e,i){if(e.getBoundingClientRect().top<140)cur=i});
    links.forEach(function(a,i){a.classList.toggle('act',i===cur)});
  }
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  document.querySelectorAll('.plan:not(.soon),.f').forEach(function(c){
    c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')});
  });
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  var st=document.querySelector('.stats');
  if(!rm&&st&&'IntersectionObserver' in window){
    var o=new IntersectionObserver(function(en){if(!en[0].isIntersecting)return;o.disconnect();
      st.querySelectorAll('[data-to]').forEach(function(b){
        var to=+b.dataset.to,d=+b.dataset.d,sfx=b.dataset.s,t0=null;
        function f(t){if(!t0)t0=t;var k=Math.min((t-t0)/1400,1),e=1-Math.pow(1-k,3);b.textContent=(to*e).toFixed(d)+sfx;if(k<1)requestAnimationFrame(f)}
        requestAnimationFrame(f);
      });
    },{threshold:.5});o.observe(st);
  }
})();
