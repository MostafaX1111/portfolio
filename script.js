// Particle network background (like nodes on a CAN bus)
(function(){
  var c=document.getElementById('bg'),x=c.getContext('2d'),P=[],W,H;
  function size(){W=c.width=innerWidth;H=c.height=innerHeight;P=[];var n=Math.min(70,Math.floor(W*H/22000));
    for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4});}
  function draw(){x.clearRect(0,0,W,H);
    P.forEach(function(p,i){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      x.fillStyle='rgba(34,230,255,.7)';x.beginPath();x.arc(p.x,p.y,1.6,0,6.3);x.fill();
      for(var j=i+1;j<P.length;j++){var q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);
        if(d<130){x.strokeStyle='rgba(123,92,255,'+(1-d/130)*.35+')';x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke();}}});
    requestAnimationFrame(draw);}
  size();addEventListener('resize',size);
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches)draw();
})();

// Cursor glow
var glow=document.getElementById('glow');
addEventListener('pointermove',function(e){glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';});

// Typing effect
(function(){
  var words=['Embedded Software Engineer','Automotive Test Engineer','CAN & AUTOSAR Developer'],w=0,i=0,del=false,el=document.getElementById('typed');
  function tick(){var s=words[w];el.textContent=s.slice(0,i);
    if(!del&&i===s.length){del=true;return setTimeout(tick,1500);}
    if(del&&i===0){del=false;w=(w+1)%words.length;}
    i+=del?-1:1;setTimeout(tick,del?40:80);}
  tick();
})();

// Reveal on scroll, counters, skill bars
var io=new IntersectionObserver(function(es){es.forEach(function(e){
  if(!e.isIntersecting)return;var t=e.target;t.classList.add('in');io.unobserve(t);
  t.querySelectorAll('[data-n]').forEach(function(b){var n=+b.dataset.n,d=+(b.dataset.d||0),s=performance.now();
    (function f(now){var p=Math.min((now-s)/1400,1);b.textContent=(n*p).toFixed(d);if(p<1)requestAnimationFrame(f);})(s);});
  t.querySelectorAll('[data-w]').forEach(function(b){b.style.setProperty('--w',b.dataset.w+'%');b.style.width=b.dataset.w+'%';});
});},{threshold:.2});
document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});

// 3D tilt + spotlight on project cards
document.querySelectorAll('.tilt').forEach(function(c){
  c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
    c.style.transform='perspective(800px) rotateY('+(px-.5)*8+'deg) rotateX('+(.5-py)*8+'deg)';
    c.style.setProperty('--mx',px*100+'%');c.style.setProperty('--my',py*100+'%');});
  c.addEventListener('pointerleave',function(){c.style.transform='';});
});

// Mobile menu + year
var btn=document.getElementById('menuBtn'),menu=document.getElementById('menu');
btn.addEventListener('click',function(){btn.setAttribute('aria-expanded',menu.classList.toggle('open'));});
menu.addEventListener('click',function(e){if(e.target.tagName==='A')menu.classList.remove('open');});
document.getElementById('year').textContent=new Date().getFullYear();
