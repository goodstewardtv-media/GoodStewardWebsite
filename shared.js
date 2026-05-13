
// ═══════════════════════════════════════════════════
//  SHARED DATA STORE — single source of truth
//  Business, Jobs, and Dashboard all read/write here
// ═══════════════════════════════════════════════════

const CATS = [
  {id:'tech',name:'Technology & IT',icon:'💻'},
  {id:'finance',name:'Finance & Accounting',icon:'💰'},
  {id:'education',name:'Education & Coaching',icon:'📚'},
  {id:'health',name:'Healthcare & Wellness',icon:'🏥'},
  {id:'construction',name:'Construction & Engineering',icon:'🏗️'},
  {id:'food',name:'Food & Hospitality',icon:'🍽️'},
  {id:'retail',name:'Retail & E-commerce',icon:'🛍️'},
  {id:'legal',name:'Legal & Consulting',icon:'⚖️'},
  {id:'media',name:'Media & Creative',icon:'🎨'},
  {id:'agri',name:'Agriculture & Food',icon:'🌿'},
];
const CMAP = {'Technology & IT':'tech','Finance & Accounting':'finance','Education & Coaching':'education','Healthcare & Wellness':'health','Construction & Engineering':'construction','Food & Hospitality':'food','Retail & E-commerce':'retail','Legal & Consulting':'legal','Media & Creative':'media','Agriculture & Food':'agri'};

// APPROVED businesses (visible in directory)
let BIZ_APPROVED = [
  {id:'b1',name:'Lighthouse Digital Agency',cat:'Technology & IT',loc:'Singapore',country:'Singapore',desc:'Full-stack web development and digital marketing for Christian businesses and churches.',emoji:'💻',rating:'4.8',verified:true,phone:'+65 9123 4567',email:'hello@lighthouse.sg',web:'lighthouse.sg'},
  {id:'b2',name:'Grace Financial Consulting',cat:'Finance & Accounting',loc:'Kuala Lumpur',country:'Malaysia',desc:'Biblical financial planning, tax advisory and bookkeeping for businesses of all sizes.',emoji:'💰',rating:'4.9',verified:true,phone:'+60 12 345 6789',email:'grace@gracefinance.my',web:'gracefinance.my'},
  {id:'b3',name:'Cornerstone Learning Hub',cat:'Education & Coaching',loc:'Johor Bahru',country:'Malaysia',desc:'Faith-integrated tutoring, mentoring and leadership coaching for students and professionals.',emoji:'📚',rating:'4.9',verified:true,phone:'+60 7 234 5678',email:'info@cornerstone.edu.my'},
  {id:'b4',name:'Shalom Wellness Clinic',cat:'Healthcare & Wellness',loc:'Penang',country:'Malaysia',desc:'Holistic healthcare rooted in compassion — GP, counselling and nutritional guidance.',emoji:'🏥',rating:'4.7',phone:'+60 4 567 8901'},
  {id:'b5',name:'Grace Construction Sdn Bhd',cat:'Construction & Engineering',loc:'Kuala Lumpur',country:'Malaysia',desc:'Quality construction, renovation and project management anchored in integrity.',emoji:'🏗️',rating:'4.9',verified:true,phone:'+60 3 789 0123',email:'grace@graceconstruct.my'},
  {id:'b6',name:'Bread of Life Bakery',cat:'Food & Hospitality',loc:'Georgetown',country:'Malaysia',desc:'Artisan breads and pastries baked with love and faith. Wholesale and retail available.',emoji:'🍞',rating:'4.8',verified:true,phone:'+60 11 234 5678',web:'breadoflife.my'},
  {id:'b7',name:'Kingdom Threads',cat:'Retail & E-commerce',loc:'Singapore',country:'Singapore',desc:'Christian lifestyle apparel and accessories. Every purchase funds local mission outreach.',emoji:'👕',rating:'4.6',isNew:true,web:'kingdomthreads.sg'},
  {id:'b8',name:'Just Law Chambers',cat:'Legal & Consulting',loc:'Kuala Lumpur',country:'Malaysia',desc:'Christian lawyers providing ethical, transparent legal services for individuals and businesses.',emoji:'⚖️',rating:'4.8',verified:true,phone:'+60 3 234 5678',email:'enquiry@justlaw.my'},
  {id:'b9',name:'Arise Media Studio',cat:'Media & Creative',loc:'Singapore',country:'Singapore',desc:'Video production, graphic design and brand strategy for churches and Christian businesses.',emoji:'🎨',rating:'4.7',email:'hello@arisemedia.sg'},
  {id:'b10',name:'Harvest Organic Farm',cat:'Agriculture & Food',loc:'Penang',country:'Malaysia',desc:'Certified organic vegetables and herbs. Farm-to-table delivery across Peninsular Malaysia.',emoji:'🌿',rating:'4.7',verified:true,phone:'+60 4 678 9012',web:'harvestfarm.my'},
  {id:'b11',name:'Saltlight Tech Solutions',cat:'Technology & IT',loc:'Jakarta',country:'Indonesia',desc:'IT consulting, cloud infrastructure and cybersecurity for SMEs across Southeast Asia.',emoji:'🔒',rating:'4.6',isNew:true,email:'info@saltlight.id'},
  {id:'b12',name:'FaithFirst Insurance',cat:'Finance & Accounting',loc:'Singapore',country:'Singapore',desc:'Insurance and financial planning advisors who put your family and business first.',emoji:'🛡️',rating:'4.5',phone:'+65 6789 0123'},
];

// PENDING businesses (submitted, awaiting approval)
let BIZ_PENDING = [];

// APPROVED jobs (visible in directory)
let JOBS_APPROVED = [
  {id:'j1',title:'Senior Software Developer',company:'Lighthouse Digital Agency',logo:'💻',loc:'Singapore',type:'Full-time',salary:'SGD 6,000–9,000/mo',desc:'Join our Christ-centered digital agency. Building meaningful products for churches and Christian businesses. Must be a committed Christian.',tags:['React','Node.js','AWS'],featured:true},
  {id:'j2',title:'Financial Planner',company:'Grace Financial Consulting',logo:'💰',loc:'Kuala Lumpur',type:'Full-time',salary:'RM 5,000–8,000/mo',desc:'Help Christian families and businesses steward their finances according to biblical principles. CFP preferred.',tags:['Finance','CFP','Advisory']},
  {id:'j3',title:'Primary School Teacher',company:'Cornerstone Learning Hub',logo:'📚',loc:'Johor Bahru',type:'Full-time',salary:'RM 3,500–5,000/mo',desc:'Faith-integrated education. Seeking passionate Christian educators for our growing learning centre.',tags:['Teaching','Education','Primary']},
  {id:'j4',title:'Marketing Manager',company:'Kingdom Threads',logo:'👕',loc:'Remote',type:'Full-time',salary:'RM 6,000–10,000/mo',desc:'Lead marketing for our Christian lifestyle brand. Creative, data-driven and faith-motivated individual needed.',tags:['Marketing','E-commerce','Social Media']},
  {id:'j5',title:'Church Administrator',company:'Calvary Life Church',logo:'⛪',loc:'Kuala Lumpur',type:'Full-time',salary:'RM 3,000–4,500/mo',desc:'Manage day-to-day church operations, communications and events. Heart for ministry and administration.',tags:['Ministry','Admin','Church']},
  {id:'j6',title:'Graphic Designer',company:'Arise Media Studio',logo:'🎨',loc:'Remote',type:'Contract',salary:'RM 80–120/hr',desc:'Freelance designer to produce beautiful content for churches and Christian businesses. Portfolio required.',tags:['Design','Branding','Video']},
  {id:'j7',title:'Community Coordinator',company:'Good Steward Network',logo:'✦',loc:'Malaysia / Singapore',type:'Volunteer',salary:'Volunteer (expenses)',desc:'Help grow the Good Steward community. Coordinate events, onboard members and support the mission.',tags:['Community','Events','Leadership']},
];

// PENDING jobs (submitted, awaiting approval)
let JOBS_PENDING = [];

// EVENTS & NEWS data
const EVENTS_DATA = [
  {title:'Biblical Leadership Workshop',date:'12 May 2026',day:'12',mon:'May',desc:'Discover how biblical principles apply to modern leadership. Featuring CEOs, pastors and thought leaders.',type:'Hybrid',loc:'Kuala Lumpur',seats:'80 spots left',color:'linear-gradient(135deg,#1A2744,#2C3E66)',emoji:'👑'},
  {title:'Singapore Faith & Business Forum',date:'20 May 2026',day:'20',mon:'May',desc:'Annual gathering of Christian entrepreneurs. Panel discussions, networking dinner and worship.',type:'Physical',loc:'Singapore',seats:'50 spots left',color:'linear-gradient(135deg,#0d2818,#1a4a2e)',emoji:'🤝'},
  {title:'Biblical Finance Masterclass',date:'1 Jun 2026',day:'1',mon:'Jun',desc:"Practical workshop on managing money God's way — budgeting, investing and generosity.",type:'Online',loc:'Zoom',seats:'Unlimited',color:'linear-gradient(135deg,#7a4a00,#b87a00)',emoji:'💰'},
  {title:'Asia Prayer Breakfast 2026',date:'3 Jun 2026',day:'3',mon:'Jun',desc:'International gathering of faith leaders. Annual highlight of the Good Steward calendar.',type:'Physical',loc:'Bangkok',seats:'30 spots left',color:'linear-gradient(135deg,#3d0000,#7a0000)',emoji:'🙏'},
  {title:'Christian Entrepreneurs Summit',date:'15 Jul 2026',day:'15',mon:'Jul',desc:'The premier conference for Christian business leaders in Asia. Keynotes, workshops and worship.',type:'Hybrid',loc:'Kuala Lumpur',seats:'120 spots left',color:'linear-gradient(135deg,#00122a,#001e3c)',emoji:'🚀'},
  {title:'Women in Faith & Business',date:'22 Aug 2026',day:'22',mon:'Aug',desc:'Empowering Christian women in leadership and entrepreneurship. Stories, strategies and sisterhood.',type:'Online',loc:'Zoom',seats:'Unlimited',color:'linear-gradient(135deg,#2d0040,#4a0060)',emoji:'👩‍💼'},
];

const NEWS_DATA = [
  {title:'Christian Businesses Report 40% Growth in Cross-Border Partnerships',cat:'Business',date:'2 May 2026',bg:'linear-gradient(135deg,#1A2744,#2C3E66)',emoji:'📊'},
  {title:'Faith and Finance: How Biblical Principles Are Reshaping Asian Business',cat:'Faith & Work',date:'28 Apr 2026',bg:'linear-gradient(135deg,#7a4a00,#b87a00)',emoji:'📖'},
  {title:'New Mentorship Programme for Young Christian Entrepreneurs Launches',cat:'Community',date:'25 Apr 2026',bg:'linear-gradient(135deg,#0d2818,#1a4a2e)',emoji:'🌱'},
  {title:'How Pastor Kevin Built a 500-Member Church Through Business Connections',cat:'Testimony',date:'20 Apr 2026',bg:'linear-gradient(135deg,#3d0000,#7a0000)',emoji:'🎤'},
  {title:'Good Steward Expands to Indonesia, Philippines and Thailand',cat:'Network News',date:'15 Apr 2026',bg:'linear-gradient(135deg,#001828,#002d3d)',emoji:'🌏'},
  {title:'Biblical Finance Conference 2026: Early Bird Registration Now Open',cat:'Events',date:'10 Apr 2026',bg:'linear-gradient(135deg,#1a1a2e,#2d2d5e)',emoji:'📅'},
];

const POST_DATA = [
  {author:'Sarah Chen',role:'Business Owner · KL',initials:'SC',time:'2h ago',tag:'Testimony',content:'Just closed my biggest contract yet — through a referral from a fellow Good Steward member! When we support each other, God multiplies it. 🙏 #ChristianBusiness',bg:'linear-gradient(135deg,#C9973A,#E8C97A)',likes:34,comments:12},
  {author:'Mark Lim',role:'IT Consultant · Singapore',initials:'ML',time:'4h ago',tag:'BusinessTip',content:'Integrity is your greatest competitive advantage. In 12 years of consulting, my most trusted clients came because someone said "Mark is the honest one." Your reputation is built in private moments. #BiblicalLeadership',bg:'linear-gradient(135deg,#1A2744,#2C3E66)',likes:67,comments:18},
  {author:'Esther Tan',role:'HR Manager · Penang',initials:'ET',time:'6h ago',tag:'PrayerRequest',content:'Friends, please pray for our hiring process. We\'ve been searching for a great Operations Manager for 2 months. Trusting God to send the right person at the right time. ❤️',bg:'linear-gradient(135deg,#9B3A3A,#6e2020)',likes:52,comments:24},
  {author:'Pastor Raymond',role:'Hope City Church · Penang',initials:'PR',time:'1d ago',tag:'Encouragement',content:'To all Christian entrepreneurs feeling the pressure today: you are not just building a business, you are building a testimony. Every ethical decision you make is a sermon. Keep going. ✦',bg:'linear-gradient(135deg,#4A5E3A,#6B8A52)',likes:112,comments:38},
];

let postData = [...POST_DATA];
let eventFilter = 'all';

// ═══════════════════════════════════════════════════
//  APPROVAL WORKFLOW ENGINE
// ═══════════════════════════════════════════════════

function approveBiz(id) {
  const idx = BIZ_PENDING.findIndex(b => b.id === id);
  if (idx === -1) return;
  const biz = {...BIZ_PENDING[idx], status:'approved', isNew:true};
  BIZ_PENDING.splice(idx, 1);
  BIZ_APPROVED.push(biz);
  applyBizFilters();
  updateHomeCounts();
  renderDashboard();
  showToast(`✅ "${biz.name}" is now LIVE in the Business Directory!`);
}

function rejectBiz(id) {
  const idx = BIZ_PENDING.findIndex(b => b.id === id);
  if (idx === -1) return;
  const name = BIZ_PENDING[idx].name;
  BIZ_PENDING.splice(idx, 1);
  renderDashboard();
  showToast(`❌ "${name}" listing rejected.`);
}

function approveJob(id) {
  const idx = JOBS_PENDING.findIndex(j => j.id === id);
  if (idx === -1) return;
  const job = {...JOBS_PENDING[idx], status:'approved'};
  JOBS_PENDING.splice(idx, 1);
  JOBS_APPROVED.push(job);
  renderJobs();
  updateHomeCounts();
  renderDashboard();
  showToast(`✅ "${job.title}" is now LIVE in the Jobs Board!`);
}

function rejectJob(id) {
  const idx = JOBS_PENDING.findIndex(j => j.id === id);
  if (idx === -1) return;
  const title = JOBS_PENDING[idx].title;
  JOBS_PENDING.splice(idx, 1);
  renderDashboard();
  showToast(`❌ "${title}" job rejected.`);
}

function updateHomeCounts() {
  const bc = document.getElementById('home-biz-count');
  if (bc) bc.textContent = BIZ_APPROVED.length + '+';
  const tb = document.getElementById('totalBiz');
  if (tb) tb.textContent = BIZ_APPROVED.length + '+';
  const jc = document.getElementById('home-jobs-count');
  if (jc) jc.textContent = JOBS_APPROVED.length + '+';
  const tj = document.getElementById('totalJobs');
  if (tj) tj.textContent = JOBS_APPROVED.length + '+';
}

// ═══════════════════════════════════════════════════
//  NAV & THEME
// ═══════════════════════════════════════════════════

function showPage(id) {
  var pages = {home:'index.html',business:'business.html',church:'church.html',jobs:'jobs.html',socials:'socials.html',community:'community.html',events:'events.html',news:'news.html',register:'register.html',dashboard:'dashboard.html'};
  if (pages[id]) window.location.href = pages[id];
}

function toggleMobileNav() {
  const nav = document.getElementById('mobNav');
  nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}

function toggleTheme() {
  const t = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = t === 'light' ? '🌙' : '☀️';
  const btn = document.getElementById('theme-btn');
  if (btn) btn.title = t === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
  try { localStorage.setItem('gs-theme', t); } catch(e) {}
}

// Apply saved theme on load
(function() {
  try {
    const saved = localStorage.getItem('gs-theme');
    if (saved) {
      document.documentElement.setAttribute('data-theme', saved);
      const icon = document.getElementById('theme-icon');
      if (icon) icon.textContent = saved === 'light' ? '🌙' : '☀️';
    }
  } catch(e) {}
})();

function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.addEventListener('click', e => { if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open'); });

function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3800);
}

// ═══════════════════════════════════════════════════
//  HOME — news + events panels
// ═══════════════════════════════════════════════════

function renderHomeNews() {
  const el = document.getElementById('homeNewsList');
  if (!el) return;
  el.innerHTML = NEWS_DATA.slice(0,4).map(n => `
    <div onclick="window.location.href='news.html'" style="display:flex;gap:13px;padding:13px;border-radius:12px;border:1px solid var(--border);cursor:pointer;background:var(--card-bg);transition:all .22s ease" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
      <div style="width:46px;height:46px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0;background:${n.bg}">${n.emoji}</div>
      <div>
        <div style="font-size:.68rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:var(--gold);margin-bottom:2px">${n.cat}</div>
        <div style="font-size:.86rem;font-weight:700;line-height:1.35;margin-bottom:2px">${n.title}</div>
        <div style="font-size:.72rem;color:var(--text-muted)">${n.date}</div>
      </div>
    </div>`).join('');
}

function renderHomeEvents() {
  const el = document.getElementById('homeEventsList');
  if (!el) return;
  el.innerHTML = EVENTS_DATA.slice(0,4).map(e => `
    <div onclick="window.location.href='events.html'" style="display:flex;gap:13px;padding:13px;border-radius:12px;border:1px solid var(--border);cursor:pointer;background:var(--card-bg);transition:all .22s ease;align-items:center" onmouseover="this.style.borderColor='#4ECDC4'" onmouseout="this.style.borderColor='var(--border)'">
      <div style="text-align:center;min-width:44px;flex-shrink:0">
        <div style="font-family:'Outfit',sans-serif;font-size:1.5rem;font-weight:800;color:var(--gold);line-height:1">${e.day}</div>
        <div style="font-size:.64rem;text-transform:uppercase;color:var(--text-muted);letter-spacing:.05em">${e.mon}</div>
      </div>
      <div style="flex:1">
        <div style="font-size:.87rem;font-weight:700;margin-bottom:2px">${e.title}</div>
        <div style="font-size:.74rem;color:var(--text-muted)">📍 ${e.loc} · ${e.type}</div>
      </div>
      <span style="padding:3px 9px;border-radius:100px;font-size:.68rem;font-weight:800;background:${e.type==='Online'?'#eef0ff':e.type==='Hybrid'?'#eafbeb':'#fffbeb'};color:${e.type==='Online'?'var(--indigo)':e.type==='Hybrid'?'#3d8a47':'#b8860b'}">${e.type}</span>
    </div>`).join('');
}

// ═══════════════════════════════════════════════════
//  BUSINESS DIRECTORY — Clutch.co style
// ═══════════════════════════════════════════════════

function applyBizFilters() {
  const q = (document.getElementById('bizSearch')?.value || '').toLowerCase();
  const cat = document.getElementById('bizCatFilter')?.value || '';
  const country = document.getElementById('bizCountryFilter')?.value || '';
  const vf = document.getElementById('bizVerifiedFilter')?.value || '';

  let filtered = BIZ_APPROVED.filter(b => {
    const mQ = !q || b.name.toLowerCase().includes(q) || b.desc.toLowerCase().includes(q) || (b.loc||'').toLowerCase().includes(q);
    const mC = !cat || b.cat === cat;
    const mCo = !country || b.country === country;
    const mV = !vf || (vf==='verified' && b.verified) || (vf==='new' && b.isNew);
    return mQ && mC && mCo && mV;
  });

  renderBizGrid(filtered);
  renderBizCatPills(filtered);
  const rc = document.getElementById('bizResultCount');
  if (rc) rc.textContent = `${filtered.length} business${filtered.length!==1?'es':''}`;
  updateHomeCounts();
}

function renderBizCatPills(filtered) {
  const bar = document.getElementById('bizCatPills');
  if (!bar) return;
  bar.innerHTML = CATS.map(c => {
    const cnt = filtered.filter(b => CMAP[b.cat] === c.id).length;
    return `<button onclick="scrollToBizSec('bsec-${c.id}')" style="padding:6px 14px;border-radius:100px;font-size:.78rem;font-weight:700;white-space:nowrap;background:var(--page-bg);border:1.5px solid var(--border);color:var(--text-secondary);cursor:pointer;transition:all .22s ease;display:flex;align-items:center;gap:5px" onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-secondary)'">
      ${c.icon} ${c.name.split(' &')[0]} <span style="background:var(--gold-pale);color:var(--gold);font-size:.62rem;font-weight:800;padding:1px 6px;border-radius:100px">${cnt}</span>
    </button>`;
  }).join('');
}

function scrollToBizSec(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
}

function renderBizGrid(filtered) {
  const main = document.getElementById('bizMainContent');
  if (!main) return;
  let html = '';
  let total = 0;

  CATS.forEach(c => {
    const bizzes = filtered.filter(b => CMAP[b.cat] === c.id);
    if (!bizzes.length) return;
    total += bizzes.length;

    html += `
    <div id="bsec-${c.id}" style="margin-bottom:48px;scroll-margin-top:185px">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;padding-bottom:13px;border-bottom:2px solid var(--border)">
        <div style="width:44px;height:44px;border-radius:12px;background:var(--gold-pale);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0">${c.icon}</div>
        <div>
          <div style="font-size:1.1rem;font-weight:800;font-family:'Outfit',sans-serif">${c.name}</div>
          <div style="font-size:.75rem;color:var(--text-muted);margin-top:1px">${bizzes.length} business${bizzes.length!==1?'es':''}</div>
        </div>
        <span style="margin-left:auto;padding:4px 12px;border-radius:100px;background:var(--gold-pale);color:var(--gold);font-size:.72rem;font-weight:800">${c.icon} ${c.name}</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(272px,1fr));gap:16px">
        ${bizzes.map(b => `
          <div onclick="openBizModal('${b.id}')" style="background:var(--card-bg);border-radius:20px;border:1px solid var(--border);overflow:hidden;cursor:pointer;transition:all .25s ease" onmouseover="this.style.boxShadow='0 12px 40px rgba(0,0,0,0.13)';this.style.transform='translateY(-4px)';this.style.borderColor='var(--gold)'" onmouseout="this.style.boxShadow='none';this.style.transform='translateY(0)';this.style.borderColor='var(--border)'">
            <div style="height:128px;position:relative;display:flex;align-items:center;justify-content:center;font-size:2.8rem;background:linear-gradient(135deg,var(--gold-pale),rgba(201,151,58,.06))">
              ${b.emoji}
              ${b.verified ? '<div style="position:absolute;top:8px;right:8px;background:#22c55e;color:#fff;font-size:.62rem;padding:2px 8px;border-radius:100px;font-weight:800">✓ Verified</div>' : ''}
              ${b.isNew ? '<div style="position:absolute;top:8px;left:8px;background:var(--coral);color:#fff;font-size:.62rem;padding:2px 8px;border-radius:100px;font-weight:800">NEW</div>' : ''}
            </div>
            <div style="padding:15px">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:6px;margin-bottom:4px">
                <div style="font-size:.96rem;font-weight:800;line-height:1.3;font-family:'Outfit',sans-serif">${b.name}</div>
                <span style="padding:2px 8px;border-radius:100px;background:var(--gold-pale);color:var(--gold);font-size:.62rem;font-weight:800;white-space:nowrap;flex-shrink:0">${b.cat.split(' &')[0]}</span>
              </div>
              <div style="font-size:.82rem;color:var(--text-secondary);line-height:1.55;margin-bottom:10px">${b.desc}</div>
              <div style="display:flex;gap:8px;font-size:.74rem;color:var(--text-muted);flex-wrap:wrap;margin-bottom:12px">
                <span>📍 ${b.loc}</span><span>🌏 ${b.country}</span>
                <span>${b.rating ? '⭐ '+b.rating : '⭐ New'}</span>
              </div>
              <div style="display:flex;gap:8px">
                <button onclick="event.stopPropagation();openBizModal('${b.id}')" style="padding:6px 13px;border-radius:8px;font-size:.78rem;font-weight:800;background:var(--gold);color:#000;border:none;cursor:pointer;transition:all .2s ease" onmouseover="this.style.background='var(--gold-dark)';this.style.color='#fff'" onmouseout="this.style.background='var(--gold)';this.style.color='#000'">View Details</button>
                <button onclick="event.stopPropagation();showToast('Enquiry sent to ${b.name.replace(/'/g,'')}! 📧')" style="padding:6px 13px;border-radius:8px;font-size:.78rem;font-weight:700;background:var(--page-bg);color:var(--text-secondary);border:1px solid var(--border);cursor:pointer;transition:all .2s ease" onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-secondary)'">📧 Enquire</button>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
  });

  if (!total) {
    html = `<div style="text-align:center;padding:80px 20px;color:var(--text-muted)">
      <div style="font-size:3rem;margin-bottom:14px">🔍</div>
      <div style="font-size:1.05rem;font-weight:700;margin-bottom:8px">No businesses match your search.</div>
      <p style="font-size:.88rem">Try different filters or <span onclick="document.getElementById('bizRegSection').scrollIntoView({behavior:'smooth'})" style="color:var(--gold);cursor:pointer;font-weight:700">list your business above</span>.</p>
    </div>`;
  }
  main.innerHTML = html;
}

function openBizModal(id) {
  const b = BIZ_APPROVED.find(x => x.id === id);
  if (!b) return;
  const c = CATS.find(ct => CMAP[b.cat] === ct.id) || {icon:'⭐'};
  document.getElementById('mCat').innerHTML = `<span style="padding:3px 10px;border-radius:100px;background:var(--gold-pale);color:var(--gold);font-size:.72rem;font-weight:800">${c.icon} ${b.cat}</span>`;
  document.getElementById('mName').textContent = b.name;
  document.getElementById('mCountry').textContent = `📍 ${b.loc} · 🌏 ${b.country}`;
  document.getElementById('mBody').innerHTML = `
    <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)"><span style="font-size:1rem;width:26px;flex-shrink:0">📝</span><div><span style="font-size:.67rem;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);font-weight:800;margin-bottom:2px;display:block">About</span><span style="font-size:.87rem">${b.desc}</span></div></div>
    <div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)"><span style="font-size:1rem;width:26px;flex-shrink:0">📍</span><div><span style="font-size:.67rem;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);font-weight:800;margin-bottom:2px;display:block">Location</span><span style="font-size:.87rem">${b.loc}, ${b.country}</span></div></div>
    ${b.phone ? `<div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)"><span style="font-size:1rem;width:26px;flex-shrink:0">📞</span><div><span style="font-size:.67rem;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);font-weight:800;margin-bottom:2px;display:block">Phone</span><span style="font-size:.87rem">${b.phone}</span></div></div>` : ''}
    ${b.email ? `<div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)"><span style="font-size:1rem;width:26px;flex-shrink:0">📧</span><div><span style="font-size:.67rem;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);font-weight:800;margin-bottom:2px;display:block">Email</span><a href="mailto:${b.email}" style="color:var(--gold);font-size:.87rem">${b.email}</a></div></div>` : ''}
    ${b.web ? `<div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)"><span style="font-size:1rem;width:26px;flex-shrink:0">🌐</span><div><span style="font-size:.67rem;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);font-weight:800;margin-bottom:2px;display:block">Website</span><a href="https://${b.web}" target="_blank" style="color:var(--gold);font-size:.87rem">${b.web}</a></div></div>` : ''}
    ${b.rating ? `<div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)"><span style="font-size:1rem;width:26px;flex-shrink:0">⭐</span><div><span style="font-size:.67rem;text-transform:uppercase;letter-spacing:.05em;color:var(--text-muted);font-weight:800;margin-bottom:2px;display:block">Rating</span><span style="font-size:.87rem">${b.rating} / 5.0</span></div></div>` : ''}
    ${b.verified ? `<div style="display:inline-flex;align-items:center;gap:6px;background:var(--sage-pale);color:#3d8a47;padding:6px 14px;border-radius:100px;font-size:.78rem;font-weight:800;margin:12px 0 4px">✅ Verified Christian Business</div>` : ''}
    <div style="display:flex;gap:10px;margin-top:16px">
      <button onclick="showToast('Enquiry sent to ${b.name.replace(/'/g,'')}! 📧')" style="flex:1;padding:10px;border-radius:10px;background:var(--gold);color:#000;font-size:.86rem;font-weight:800;border:none;cursor:pointer">📧 Send Enquiry</button>
      <button onclick="showToast('Link copied! 🔗')" style="flex:1;padding:10px;border-radius:10px;background:var(--page-bg);color:var(--text-secondary);border:1.5px solid var(--border);font-size:.86rem;font-weight:700;cursor:pointer">🔗 Share</button>
    </div>`;
  document.getElementById('bizModal').classList.add('open');
}

// Business Registration → goes to Pending
function submitBizReg() {
  const name = document.getElementById('b_name').value.trim();
  const cat  = document.getElementById('b_cat').value;
  const country = document.getElementById('b_country').value;
  const email = document.getElementById('b_email').value.trim();
  const desc = document.getElementById('b_desc').value.trim();
  const confirm = document.getElementById('b_confirm').checked;
  if (!name) return showToast('Please enter your business name.');
  if (!cat)  return showToast('Please select a category.');
  if (!country) return showToast('Please select a country.');
  if (!email) return showToast('Please enter your email.');
  if (!desc) return showToast('Please enter a description.');
  if (!confirm) return showToast('Please confirm your Christian business.');

  const id = 'bp_' + Date.now();
  BIZ_PENDING.push({
    id, name, cat, country,
    loc: document.getElementById('b_addr').value || country,
    email, phone: document.getElementById('b_phone').value,
    web: document.getElementById('b_web').value, desc,
    emoji:'✦', rating:null, isNew:true, status:'pending',
    submittedBy:'John Tan', submittedAt: new Date().toLocaleString()
  });
  document.getElementById('bizRegForm').style.display = 'none';
  document.getElementById('bizRegSuccess').style.display = 'block';
  showToast('Listing submitted for review! Check your Dashboard. 📋');
}

function resetBizForm() {
  document.getElementById('bizRegForm').style.display = 'block';
  document.getElementById('bizRegSuccess').style.display = 'none';
  ['b_name','b_addr','b_email','b_phone','b_desc','b_web'].forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  document.getElementById('b_cat').value = '';
  document.getElementById('b_country').value = '';
  document.getElementById('b_confirm').checked = false;
}

// ═══════════════════════════════════════════════════
//  JOBS DIRECTORY — LinkedIn/Indeed style
// ═══════════════════════════════════════════════════

function renderJobs() {
  const q  = (document.getElementById('jobSearch')?.value || '').toLowerCase();
  const loc = document.getElementById('jobLocation')?.value || '';
  const type = document.getElementById('jobType')?.value || '';
  const ind  = document.getElementById('jobIndustry')?.value || '';

  const filtered = JOBS_APPROVED.filter(j => {
    const mQ = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q);
    const mL = !loc || j.loc.toLowerCase().includes(loc.toLowerCase());
    const mT = !type || j.type === type;
    return mQ && mL && mT;
  });

  const cnt = document.getElementById('jobCount');
  if (cnt) cnt.textContent = `${filtered.length} role${filtered.length!==1?'s':''}`;
  updateHomeCounts();

  const el = document.getElementById('jobListings');
  if (!el) return;

  if (!filtered.length) {
    el.innerHTML = `<div style="text-align:center;padding:60px 20px;color:var(--text-muted)"><div style="font-size:3rem;margin-bottom:14px">💼</div><div style="font-size:1rem;font-weight:700">No jobs match your filters.</div></div>`;
    return;
  }

  el.innerHTML = filtered.map(j => `
    <div style="background:var(--card-bg);border-radius:20px;border:1px solid ${j.featured?'var(--gold)':'var(--border)'};padding:22px;margin-bottom:14px;transition:all .25s ease;${j.featured?'background:linear-gradient(135deg,var(--card-bg) 80%,rgba(201,151,58,.04))':''}" onmouseover="this.style.boxShadow='0 8px 32px rgba(0,0,0,0.12)';this.style.borderColor='#4ECDC4'" onmouseout="this.style.boxShadow='none';this.style.borderColor='${j.featured?'var(--gold)':'var(--border)'}'">
      ${j.featured ? `<div style="display:inline-flex;align-items:center;gap:4px;font-size:.68rem;font-weight:800;color:var(--gold);text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px">⭐ Featured Role</div>` : ''}
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px">
        <div style="display:flex;gap:13px;align-items:flex-start">
          <div style="width:48px;height:48px;border-radius:12px;background:var(--gold-pale);display:flex;align-items:center;justify-content:center;font-size:1.25rem;flex-shrink:0">${j.logo}</div>
          <div>
            <div style="font-size:1rem;font-weight:800;margin-bottom:3px;font-family:'Outfit',sans-serif">${j.title}</div>
            <div style="font-size:.83rem;color:var(--text-secondary)">${j.company}</div>
          </div>
        </div>
        <div style="font-size:.93rem;font-weight:800;color:var(--sage);white-space:nowrap">${j.salary}</div>
      </div>
      <div style="font-size:.83rem;color:var(--text-secondary);line-height:1.6;margin-bottom:11px">${j.desc}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:11px">
        ${(j.tags||[]).map(t=>`<span style="padding:3px 10px;border-radius:100px;background:var(--indigo-pale,#eef0ff);color:var(--indigo,#4361EE);font-size:.72rem;font-weight:800">${t}</span>`).join('')}
      </div>
      <div style="display:flex;gap:14px;font-size:.76rem;color:var(--text-muted);margin-bottom:13px">
        <span>📍 ${j.loc}</span><span>⏱ ${j.type}</span>
      </div>
      <div style="display:flex;gap:10px">
        <button onclick="showToast('Application submitted! God bless you 🎉')" style="padding:8px 18px;border-radius:100px;background:var(--gold);color:#000;font-size:.82rem;font-weight:800;border:none;cursor:pointer">Apply Now</button>
        <button onclick="showToast('Job saved! ♡')" style="padding:8px 18px;border-radius:100px;background:var(--page-bg);color:var(--text-secondary);border:1.5px solid var(--border);font-size:.82rem;font-weight:700;cursor:pointer">♡ Save</button>
        <button onclick="showToast('Shared!')" style="padding:8px 14px;border-radius:100px;background:var(--page-bg);color:var(--text-secondary);border:1.5px solid var(--border);font-size:.82rem;font-weight:700;cursor:pointer">🔗</button>
      </div>
    </div>`).join('');
}

function openPostJobModal() { document.getElementById('postJobModal').classList.add('open'); }

function submitJobPost() {
  const title   = document.getElementById('pj_title').value.trim();
  const company = document.getElementById('pj_company').value.trim();
  const loc     = document.getElementById('pj_loc').value.trim();
  const type    = document.getElementById('pj_type').value;
  const desc    = document.getElementById('pj_desc').value.trim();
  if (!title || !company || !loc || !desc) return showToast('Please fill all required fields.');

  const id = 'jp_' + Date.now();
  JOBS_PENDING.push({
    id, title, company, loc, type, desc,
    salary: document.getElementById('pj_salary').value || 'Negotiable',
    logo: '💼', tags: [], featured: false, status:'pending',
    submittedBy:'John Tan', submittedAt: new Date().toLocaleString()
  });
  closeModal('postJobModal');
  ['pj_title','pj_company','pj_loc','pj_salary','pj_desc'].forEach(i => { const el=document.getElementById(i); if(el) el.value=''; });
  showToast('Job submitted for review! Check your Dashboard. 📋');
  renderDashboard();
}

// ═══════════════════════════════════════════════════
//  DASHBOARD — with pending queue + admin approve
// ═══════════════════════════════════════════════════

function dashPostJob() {
  const title = document.getElementById('dash_job_title')?.value.trim();
  const loc   = document.getElementById('dash_job_loc')?.value.trim();
  const type  = document.getElementById('dash_job_type')?.value;
  const desc  = document.getElementById('dash_job_desc')?.value.trim();
  if (!title) return showToast('Please enter a job title.');
  const id = 'jp_' + Date.now();
  JOBS_PENDING.push({id, title, company:'Grace & Co. Consulting', loc:loc||'Kuala Lumpur', type, desc:desc||'No description provided.', salary:'Negotiable', logo:'💼', tags:[], featured:false, status:'pending', submittedBy:'John Tan', submittedAt:new Date().toLocaleString()});
  ['dash_job_title','dash_job_loc','dash_job_desc'].forEach(i=>{const el=document.getElementById(i);if(el)el.value='';});
  showToast('Job submitted for review! Check Pending Review tab. 📋');
  renderDashboard();
  switchDashTab('pending');
}

function renderDashboard() {
  // MY BIZ panel
  const myBiz = document.getElementById('dash-my-biz');
  if (myBiz) {
    const mine = BIZ_APPROVED.filter(b => b.submittedBy === 'John Tan');
    myBiz.innerHTML = mine.length ? mine.map(b => `
      <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border)">
        <div style="font-size:1.8rem">${b.emoji}</div>
        <div style="flex:1">
          <div style="font-weight:800;font-size:.92rem">${b.name}</div>
          <div style="font-size:.76rem;color:var(--text-muted)">${b.cat} · ${b.loc}</div>
        </div>
        <span style="padding:3px 10px;border-radius:100px;background:#eafbeb;color:#3d8a47;font-size:.7rem;font-weight:800">✓ Live</span>
        <button onclick="window.location.href='business.html'" style="padding:5px 14px;border-radius:100px;background:var(--page-bg);color:var(--text-secondary);border:1px solid var(--border);font-size:.75rem;font-weight:700;cursor:pointer">View →</button>
      </div>`).join('')
    : `<p style="font-size:.84rem;color:var(--text-muted);padding:12px 0">No live listings yet. <span onclick="document.getElementById('bizRegSection').scrollIntoView({behavior:'smooth'});window.location.href='business.html'" style="color:var(--gold);cursor:pointer;font-weight:700">Submit your first listing →</span></p>`;
  }

  // PENDING REVIEW panels (user view)
  const pendBiz = document.getElementById('dash-pending-biz');
  if (pendBiz) {
    pendBiz.innerHTML = !BIZ_PENDING.length
      ? `<p style="font-size:.84rem;color:var(--text-muted);padding:12px 0">No pending business listings.</p>`
      : BIZ_PENDING.map(b => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border);gap:12px;flex-wrap:wrap">
          <div><div style="font-weight:800;font-size:.9rem">${b.emoji} ${b.name}</div><div style="font-size:.75rem;color:var(--text-muted)">${b.cat} · ${b.loc} · Submitted ${b.submittedAt}</div></div>
          <span style="padding:3px 10px;border-radius:100px;background:#fffbeb;color:#b8860b;font-size:.7rem;font-weight:800;flex-shrink:0">⏳ Awaiting Review</span>
        </div>`).join('');
  }
  const pendJob = document.getElementById('dash-pending-jobs');
  if (pendJob) {
    pendJob.innerHTML = !JOBS_PENDING.length
      ? `<p style="font-size:.84rem;color:var(--text-muted);padding:12px 0">No pending job postings.</p>`
      : JOBS_PENDING.map(j => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border);gap:12px;flex-wrap:wrap">
          <div><div style="font-weight:800;font-size:.9rem">${j.logo} ${j.title}</div><div style="font-size:.75rem;color:var(--text-muted)">${j.company} · ${j.loc} · Submitted ${j.submittedAt}</div></div>
          <span style="padding:3px 10px;border-radius:100px;background:#fffbeb;color:#b8860b;font-size:.7rem;font-weight:800;flex-shrink:0">⏳ Awaiting Review</span>
        </div>`).join('');
  }

  // ADMIN PANEL — approve/reject controls
  const adminBiz = document.getElementById('dash-pending-biz-admin');
  if (adminBiz) {
    adminBiz.innerHTML = !BIZ_PENDING.length
      ? `<p style="font-size:.84rem;color:var(--text-muted)">No pending business listings right now.<br><span onclick="document.getElementById('bizRegSection').scrollIntoView({behavior:'smooth'});window.location.href='business.html'" style="color:var(--gold);cursor:pointer;font-weight:700">Submit a listing to test the workflow →</span></p>`
      : BIZ_PENDING.map(b => `
        <div style="background:var(--page-bg);border-radius:14px;border:1px solid var(--border);padding:16px;margin-bottom:12px">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap">
            <div style="flex:1">
              <div style="font-weight:800;font-size:.95rem;margin-bottom:3px">${b.emoji} ${b.name}</div>
              <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:2px">${b.cat} · ${b.loc}, ${b.country}</div>
              <div style="font-size:.78rem;color:var(--text-secondary);margin-bottom:2px">${b.desc}</div>
              <div style="font-size:.74rem;color:var(--text-muted)">📧 ${b.email} · Submitted by ${b.submittedBy} · ${b.submittedAt}</div>
            </div>
            <div style="display:flex;flex-direction:column;gap:7px;flex-shrink:0">
              <button onclick="approveBiz('${b.id}')" style="padding:7px 18px;border-radius:100px;background:#22c55e;color:#fff;font-size:.8rem;font-weight:800;border:none;cursor:pointer;display:flex;align-items:center;gap:5px">✓ Approve &amp; Publish</button>
              <button onclick="rejectBiz('${b.id}')" style="padding:7px 18px;border-radius:100px;background:var(--coral);color:#fff;font-size:.8rem;font-weight:800;border:none;cursor:pointer">✕ Reject</button>
            </div>
          </div>
        </div>`).join('');
  }

  const adminJob = document.getElementById('dash-pending-jobs-admin');
  if (adminJob) {
    adminJob.innerHTML = !JOBS_PENDING.length
      ? `<p style="font-size:.84rem;color:var(--text-muted)">No pending job postings right now. <span onclick="switchDashTab('jobs')" style="color:var(--gold);cursor:pointer;font-weight:700">Post a job →</span></p>`
      : JOBS_PENDING.map(j => `
        <div style="background:var(--page-bg);border-radius:14px;border:1px solid var(--border);padding:16px;margin-bottom:12px">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap">
            <div style="flex:1">
              <div style="font-weight:800;font-size:.95rem;margin-bottom:3px">${j.logo} ${j.title}</div>
              <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:2px">${j.company} · ${j.loc} · ${j.type} · ${j.salary}</div>
              <div style="font-size:.78rem;color:var(--text-secondary);margin-bottom:2px">${j.desc}</div>
              <div style="font-size:.74rem;color:var(--text-muted)">Submitted by ${j.submittedBy} · ${j.submittedAt}</div>
            </div>
            <div style="display:flex;flex-direction:column;gap:7px;flex-shrink:0">
              <button onclick="approveJob('${j.id}')" style="padding:7px 18px;border-radius:100px;background:#22c55e;color:#fff;font-size:.8rem;font-weight:800;border:none;cursor:pointer">✓ Approve &amp; Publish</button>
              <button onclick="rejectJob('${j.id}')" style="padding:7px 18px;border-radius:100px;background:var(--coral);color:#fff;font-size:.8rem;font-weight:800;border:none;cursor:pointer">✕ Reject</button>
            </div>
          </div>
        </div>`).join('');
  }
}

function switchDashTab(tab) {
  document.querySelectorAll('.dash-tab-btn').forEach(b => { b.style.borderBottomColor='transparent'; b.style.color='var(--text-secondary)'; });
  document.querySelectorAll('.dash-tab-panel').forEach(p => p.style.display='none');
  const btn = document.getElementById('dtab-' + tab);
  const panel = document.getElementById('dpanel-' + tab);
  if (btn) { btn.style.borderBottomColor='var(--gold)'; btn.style.color='var(--gold)'; }
  if (panel) panel.style.display='block';
}

// ═══════════════════════════════════════════════════
//  POINT 7 — SOCIALS (Facebook-style)
// ═══════════════════════════════════════════════════

const TRENDING_TAGS = [
  {tag:'#FaithInBusiness', cnt:'1.2k posts'},
  {tag:'#Testimony',       cnt:'842 posts'},
  {tag:'#BiblicalLeadership', cnt:'634 posts'},
  {tag:'#ChristianBiz',   cnt:'512 posts'},
  {tag:'#GoodSteward',    cnt:'398 posts'},
  {tag:'#AsiaMarketplace',cnt:'286 posts'},
];
const SUGGESTED_USERS = [
  {ini:'GL', name:'Grace Lee',     role:'Designer · SG',     bg:'linear-gradient(135deg,var(--gold),var(--gold-light))'},
  {ini:'JL', name:'James Lim',     role:'Tech Founder · MY', bg:'linear-gradient(135deg,#4ECDC4,#22a8a0)'},
  {ini:'ES', name:'Esther Sim',    role:'HR Lead · MY',      bg:'linear-gradient(135deg,#7C5CBF,#5a3d9a)'},
  {ini:'PR', name:'Pastor Raymond',role:'Church · Penang',   bg:'linear-gradient(135deg,#6BCB77,#3d8a47)'},
];
const FORUM_THREADS_DATA = [
  {id:'t1',flair:'testimony',title:'How I rebuilt my business after bankruptcy — God is faithful',author:'Sarah Chen',authorIni:'SC',authorBg:'linear-gradient(135deg,var(--gold),var(--gold-light))',time:'2h ago',excerpt:"Three years ago I was bankrupt. Today I run a team of 12. Not because of my talent — because of grace. I want to share the full story with this community…",votes:142,cmts:38,pinned:true,replies:[{author:'David Lim',ini:'DL',bg:'linear-gradient(135deg,#4ECDC4,#22a8a0)',time:'1h ago',text:'Praise God! What was the turning point for you?',likes:14,replies:[{author:'Sarah Chen',ini:'SC',bg:'linear-gradient(135deg,var(--gold),var(--gold-light))',time:'45m ago',text:'The day I fully surrendered the business to God. Proverbs 16:3!',likes:22}]},{author:'Pastor Raymond',ini:'PR',bg:'linear-gradient(135deg,#6BCB77,#3d8a47)',time:'30m ago',text:'"The LORD makes firm the steps of the one who delights in him." Your story is a living testimony. Thank you Sister Sarah.',likes:31,replies:[]}]},
  {id:'t2',flair:'advice',title:'Should a Christian business owner tithe on gross or net profit?',author:'David Lim',authorIni:'DL',authorBg:'linear-gradient(135deg,#4ECDC4,#22a8a0)',time:'4h ago',excerpt:"This has been on my heart for months. What does Scripture say and how do you apply it in your business?",votes:89,cmts:52,replies:[{author:'Pastor Raymond',ini:'PR',bg:'linear-gradient(135deg,#6BCB77,#3d8a47)',time:'3h ago',text:"2 Corinthians 9:7 — give as you purpose in your heart. The spirit matters more than the calculation.",likes:27,replies:[]},{author:'Grace Lee',ini:'GL',bg:'linear-gradient(135deg,var(--gold),var(--gold-light))',time:'2h ago',text:"My accountant (also a believer) says gross is the biblical principle. Most important is to give cheerfully!",likes:18,replies:[]}]},
  {id:'t3',flair:'biz',title:'Looking for a Christian digital marketing agency in KL — recommendations?',author:'James Wong',authorIni:'JW',authorBg:'linear-gradient(135deg,#7C5CBF,#5a3d9a)',time:'6h ago',excerpt:"Starting a new business and want someone who shares my values. Honest reviews welcome.",votes:67,cmts:24,replies:[{author:'John Tan',ini:'JT',bg:'linear-gradient(135deg,var(--gold),var(--gold-light))',time:'5h ago',text:'Check Lighthouse Digital Agency on the Good Steward Business Directory — truly faith-driven!',likes:9,replies:[]}]},
  {id:'t4',flair:'scripture',title:"Meditating on Proverbs 16:3 — 'Commit your work to the LORD'",author:'Pastor Raymond',authorIni:'PR',authorBg:'linear-gradient(135deg,#6BCB77,#3d8a47)',time:'1d ago',excerpt:"What does committing your work to the LORD look like day-to-day in a modern business? Let's discuss together.",votes:203,cmts:67,pinned:true,replies:[{author:'Esther Sim',ini:'ES',bg:'linear-gradient(135deg,#7C5CBF,#5a3d9a)',time:'20h ago',text:'For me, it starts every morning with a 10-minute prayer over my schedule before opening my laptop.',likes:44,replies:[]}]},
  {id:'t5',flair:'prayer',title:'Prayer needed: launching my cafe next month — nervous and excited',author:'Angela Teh',authorIni:'AT',authorBg:'linear-gradient(135deg,#FF8FAB,#d4527a)',time:'2d ago',excerpt:"After 3 years of planning, my Christian cafe in Ipoh opens next month. Please join me in prayer!",votes:145,cmts:43,replies:[{author:'Sarah Chen',ini:'SC',bg:'linear-gradient(135deg,var(--gold),var(--gold-light))',time:'2d ago',text:"Praying for you now! 'The LORD will perfect that which concerns you.' Psalm 138:8 🙏",likes:38,replies:[]}]},
  {id:'t6',flair:'qa',title:'How do you handle unethical requests from clients without losing the account?',author:'Michael Tan',authorIni:'MT',authorBg:'linear-gradient(135deg,#FF6B6B,#b84444)',time:'3d ago',excerpt:"A major client asked me to adjust figures in a report. I said no, but now the relationship is strained.",votes:78,cmts:31,replies:[{author:'David Lim',ini:'DL',bg:'linear-gradient(135deg,#4ECDC4,#22a8a0)',time:'3d ago',text:"You did the right thing. Clients who respect your integrity become your most loyal long-term clients.",likes:22,replies:[]}]},
];
let forumThreads = [...FORUM_THREADS_DATA];
let currentForumCat = 'all';
let currentSocImgData = '';
let followedUsers = new Set();

function initSocials() {
  const tr = document.getElementById('socTrending');
  if (tr) tr.innerHTML = TRENDING_TAGS.map((t,i) => `
    <div style="display:flex;align-items:center;gap:9px;padding:6px 0;border-bottom:1px solid var(--border)">
      <div style="font-family:'Outfit',sans-serif;font-size:.97rem;font-weight:800;color:var(--gold);min-width:18px">${i+1}</div>
      <div style="flex:1"><div onclick="socAddTag(this.textContent.replace('#',''))" style="font-size:.84rem;font-weight:700;cursor:pointer">${t.tag}</div><div style="font-size:.7rem;color:var(--text-muted)">${t.cnt}</div></div>
    </div>`).join('');
  const sg = document.getElementById('socSuggested');
  if (sg) sg.innerHTML = SUGGESTED_USERS.map(u => `
    <div style="display:flex;align-items:center;gap:9px;margin-bottom:10px">
      <div style="width:34px;height:34px;border-radius:50%;background:${u.bg};display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:800;color:#000;flex-shrink:0">${u.ini}</div>
      <div style="flex:1"><div style="font-size:.83rem;font-weight:800">${u.name}</div><div style="font-size:.7rem;color:var(--text-muted)">${u.role}</div></div>
      <button id="followbtn-${u.ini}" onclick="toggleSocFollowSidebar('${u.ini}','${u.name}',this)" style="padding:4px 12px;border-radius:100px;background:var(--page-bg);color:var(--text-secondary);border:1.5px solid var(--border);font-size:.74rem;font-weight:700;cursor:pointer">Follow</button>
    </div>`).join('');
  renderFeed();
}

function toggleSocFollowSidebar(ini,name,btn) {
  if(followedUsers.has(ini)){followedUsers.delete(ini);btn.textContent='Follow';btn.style.background='var(--page-bg)';btn.style.color='var(--text-secondary)';btn.style.borderColor='var(--border)';const fc=document.getElementById('soc-following-count');if(fc)fc.textContent=Math.max(0,parseInt(fc.textContent)-1);showToast('Unfollowed '+name);}
  else{followedUsers.add(ini);btn.textContent='Following ✓';btn.style.background='#a882ff';btn.style.color='#000';btn.style.borderColor='#a882ff';const fc=document.getElementById('soc-following-count');if(fc)fc.textContent=parseInt(fc.textContent)+1;showToast('Following '+name+'! 🎉');}
}
function socPreviewImg(input){
  if(!input.files||!input.files[0])return;
  const r=new FileReader();r.onload=e=>{currentSocImgData=e.target.result;document.getElementById('socImgEl').src=e.target.result;document.getElementById('socImgPreview').style.display='block';};r.readAsDataURL(input.files[0]);
}
function removeSocImg(){currentSocImgData='';document.getElementById('socImgPreview').style.display='none';document.getElementById('socImgEl').src='';}
function socAddTag(tag){const ta=document.getElementById('socPostTa');if(ta){ta.value+=(ta.value?' ':')+'#'+tag;ta.focus();}}
function socPublishPost(){
  const ta=document.getElementById('socPostTa');const txt=ta?.value.trim();if(!txt)return showToast('Please write something first.');
  postData.unshift({author:'John Tan',role:'Business Owner · KL',initials:'JT',time:'Just now',tag:'Post',content:txt,bg:'linear-gradient(135deg,var(--gold),var(--gold-light))',likes:0,comments:0,img:currentSocImgData,_liked:false});
  ta.value='';removeSocImg();renderFeed();
  const pc=document.getElementById('soc-posts-count');if(pc)pc.textContent=parseInt(pc.textContent)+1;
  showToast('Post published! The community can see it now. ✦');
}
function renderFeed(){
  const feed=document.getElementById('socialFeed');if(!feed)return;
  feed.innerHTML=postData.map((p,i)=>`
    <div style="background:var(--card-bg);border-radius:20px;border:1px solid var(--border);margin-bottom:14px;overflow:hidden;transition:border .2s ease">
      <div style="display:flex;align-items:center;gap:10px;padding:14px 16px 0">
        <div style="width:38px;height:38px;border-radius:50%;background:${p.bg};display:flex;align-items:center;justify-content:center;font-weight:800;font-size:.78rem;flex-shrink:0;color:#000">${p.initials}</div>
        <div><div style="font-size:.9rem;font-weight:800;font-family:'Outfit',sans-serif">${p.author}</div><div style="font-size:.73rem;color:var(--text-muted)">${p.role} · ${p.time}</div></div>
        <div style="margin-left:auto;display:flex;align-items:center;gap:8px">
          <button onclick="toggleSocFollow_${i}(this)" style="padding:4px 12px;border-radius:100px;background:var(--page-bg);color:var(--text-secondary);border:1.5px solid var(--border);font-size:.74rem;font-weight:700;cursor:pointer" id="fol-${i}">Follow</button>
        </div>
      </div>
      <div style="padding:11px 16px">
        <span style="display:inline-block;padding:2px 9px;border-radius:100px;background:rgba(124,92,191,.08);color:#a882ff;font-size:.72rem;font-weight:800;margin-bottom:7px">#${p.tag}</span>
        <div style="font-size:.9rem;color:var(--text-primary);line-height:1.72">${p.content}</div>
      </div>
      ${p.img?`<img src="${p.img}" style="width:100%;max-height:320px;object-fit:cover;display:block;border-top:1px solid var(--border)">`:''}
      <div style="display:flex;align-items:center;padding:2px 8px;border-top:1px solid var(--border)">
        <button id="slike-${i}" onclick="socLike(${i})" style="display:flex;align-items:center;gap:5px;padding:9px 12px;font-size:.82rem;font-weight:600;color:${p._liked?'#FF6B6B':'var(--text-muted)'};background:none;border:none;cursor:pointer;border-radius:8px">❤️ <span id="slc-${i}">${p.likes}</span></button>
        <button onclick="toggleSocComments(${i})" style="display:flex;align-items:center;gap:5px;padding:9px 12px;font-size:.82rem;font-weight:600;color:var(--text-muted);background:none;border:none;cursor:pointer;border-radius:8px">💬 <span id="scc-${i}">${p.comments}</span></button>
        <button onclick="showToast('Link copied! 🔗')" style="display:flex;align-items:center;gap:5px;padding:9px 12px;font-size:.82rem;font-weight:600;color:var(--text-muted);background:none;border:none;cursor:pointer;border-radius:8px">🔗 Share</button>
      </div>
      <div id="scmt-${i}" style="display:none;border-top:1px solid var(--border);padding:12px 16px">
        <div style="display:flex;gap:8px;margin-bottom:12px">
          <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-light));display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:800;flex-shrink:0;color:#000">JT</div>
          <div style="flex:1;display:flex;gap:7px">
            <input id="sci-${i}" placeholder="Write a comment…" style="flex:1;padding:8px 14px;border-radius:100px;border:1px solid var(--border);background:var(--page-bg);font-size:.84rem;color:var(--text-primary);font-family:inherit;outline:none" onkeydown="if(event.key==='Enter'){socAddComment(${i});event.preventDefault()}">
            <button onclick="socAddComment(${i})" style="padding:8px 14px;border-radius:100px;background:#a882ff;color:#000;border:none;font-size:.8rem;font-weight:800;cursor:pointer">Post</button>
          </div>
        </div>
        <div id="scl-${i}">
          <div style="display:flex;gap:8px;margin-bottom:10px">
            <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#4ECDC4,#22a8a0);display:flex;align-items:center;justify-content:center;font-size:.6rem;font-weight:800;flex-shrink:0;color:#fff">GL</div>
            <div style="background:var(--page-bg);border-radius:0 12px 12px 12px;padding:8px 12px;flex:1">
              <div style="font-size:.78rem;font-weight:800;margin-bottom:2px">Grace Lee</div>
              <div style="font-size:.82rem;color:var(--text-secondary);line-height:1.55">Amen! God is so faithful 🙌</div>
              <div style="display:flex;gap:12px;margin-top:5px;font-size:.7rem;color:var(--text-muted)"><span>2h ago</span><span style="cursor:pointer;color:#a882ff" onclick="socReply(${i},'Grace Lee')">Reply</span><span>❤️ 3</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>`).join('');
}
function socLike(i){if(!postData[i]._liked){postData[i].likes++;postData[i]._liked=true;}const lc=document.getElementById('slc-'+i);if(lc)lc.textContent=postData[i].likes;const btn=document.getElementById('slike-'+i);if(btn)btn.style.color='#FF6B6B';}
function toggleSocComments(i){const el=document.getElementById('scmt-'+i);if(el){el.style.display=el.style.display==='block'?'none':'block';if(el.style.display==='block')document.getElementById('sci-'+i)?.focus();}}
function socAddComment(i){const inp=document.getElementById('sci-'+i);const txt=inp?.value.trim();if(!txt)return;const list=document.getElementById('scl-'+i);list.insertAdjacentHTML('beforeend',`<div style="display:flex;gap:8px;margin-bottom:10px"><div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-light));display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:800;flex-shrink:0;color:#000">JT</div><div style="background:var(--page-bg);border-radius:0 12px 12px 12px;padding:8px 12px;flex:1"><div style="font-size:.78rem;font-weight:800;margin-bottom:2px">John Tan</div><div style="font-size:.82rem;color:var(--text-secondary);line-height:1.55">${txt}</div></div></div>`);inp.value='';postData[i].comments++;const sc=document.getElementById('scc-'+i);if(sc)sc.textContent=postData[i].comments;}
function socReply(i,name){const inp=document.getElementById('sci-'+i);if(inp){inp.value=`@${name} `;inp.focus();}toggleSocComments(i);}

// ═══════════════════════════════════════════════════
//  POINT 8 — FORUM (Reddit-style)
// ═══════════════════════════════════════════════════

function initForum(){
  const contribs=document.getElementById('forumContribs');
  if(contribs)contribs.innerHTML=[{ini:'PR',name:'Pastor Raymond',stats:'328 posts · ⭐ Elder',bg:'linear-gradient(135deg,#6BCB77,#3d8a47)'},{ini:'SC',name:'Sarah Chen',stats:'214 posts · ✓ Verified',bg:'linear-gradient(135deg,var(--gold),var(--gold-light))'},{ini:'DL',name:'David Lim',stats:'187 posts · 💼 Biz',bg:'linear-gradient(135deg,#4ECDC4,#22a8a0)'}].map(u=>`<div style="display:flex;align-items:center;gap:9px;margin-bottom:10px"><div style="width:34px;height:34px;border-radius:50%;background:${u.bg};display:flex;align-items:center;justify-content:center;font-size:.7rem;font-weight:800;color:#000;flex-shrink:0">${u.ini}</div><div><div style="font-size:.84rem;font-weight:800">${u.name}</div><div style="font-size:.71rem;color:var(--text-muted)">${u.stats}</div></div></div>`).join('');
  renderForum();
}
const FLAIR_CFG={prayer:{label:'🙏 Prayer',bg:'rgba(255,143,171,.12)',color:'#FF8FAB'},biz:{label:'💼 Business',bg:'rgba(201,151,58,.1)',color:'var(--gold)'},advice:{label:'💡 Advice',bg:'rgba(78,205,196,.1)',color:'#4ECDC4'},testimony:{label:'✨ Testimony',bg:'rgba(107,203,119,.1)',color:'#6BCB77'},scripture:{label:'📖 Scripture',bg:'rgba(124,92,191,.1)',color:'#a882ff'},qa:{label:'❓ Q&A',bg:'rgba(67,97,238,.1)',color:'#4361EE'}};
function setForumCat(btn,cat){currentForumCat=cat;document.querySelectorAll('.fcbtn').forEach(b=>{b.style.background='var(--card-bg)';b.style.color='var(--text-secondary)';b.style.borderColor='var(--border)';});btn.style.background='#6BCB77';btn.style.color='#000';btn.style.borderColor='#6BCB77';renderForum();}
function setSocSort(btn,type){document.querySelectorAll('#sort-hot,#sort-top,#sort-new').forEach(b=>{b.style.background='var(--page-bg)';b.style.color='var(--text-secondary)';});btn.style.background='var(--black)';btn.style.color='#fff';if(type==='top')forumThreads.sort((a,b)=>b.votes-a.votes);else if(type==='new')forumThreads.sort((a,b)=>a.id>b.id?-1:1);else forumThreads.sort((a,b)=>b.votes+b.cmts-(a.votes+a.cmts));renderForum();}
function renderForum(){
  const feed=document.getElementById('forumFeed');if(!feed)return;
  const threads=currentForumCat==='all'?forumThreads:forumThreads.filter(t=>t.flair===currentForumCat);
  if(!threads.length){feed.innerHTML=`<div style="text-align:center;padding:48px;color:var(--text-muted)"><div style="font-size:2.5rem;margin-bottom:12px">💬</div><div style="font-weight:700">No discussions yet.</div><p style="margin-top:8px;font-size:.88rem"><span onclick="openNewThread()" style="color:#6BCB77;cursor:pointer;font-weight:700">Start the first one →</span></p></div>`;return;}
  feed.innerHTML=threads.map(t=>{const fc=FLAIR_CFG[t.flair]||FLAIR_CFG.biz;return`<div style="background:var(--card-bg);border-radius:18px;border:1px solid var(--border);display:flex;margin-bottom:11px;overflow:hidden;transition:all .22s ease;cursor:pointer" onmouseover="this.style.borderColor='#6BCB77'" onmouseout="this.style.borderColor='var(--border)'" onclick="openThreadDetail('${t.id}')"><div style="width:52px;background:var(--page-bg);display:flex;flex-direction:column;align-items:center;padding:14px 0;gap:4px;flex-shrink:0"><button onclick="event.stopPropagation();forumUpvote('${t.id}',this)" style="width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:1rem;cursor:pointer;color:var(--text-muted);background:none;border:none">▲</button><div style="font-family:'Outfit',sans-serif;font-size:.9rem;font-weight:800" id="fvc-${t.id}">${t.votes}</div><button onclick="event.stopPropagation()" style="width:28px;height:28px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:1rem;cursor:pointer;color:var(--text-muted);background:none;border:none">▼</button></div><div style="flex:1;padding:15px"><div style="display:flex;align-items:center;gap:6px;margin-bottom:7px;flex-wrap:wrap">${t.pinned?'<span style="padding:2px 8px;border-radius:100px;background:var(--gold-pale);color:var(--gold);font-size:.65rem;font-weight:800">📌 Pinned</span>':''}<span style="padding:2px 8px;border-radius:100px;font-size:.65rem;font-weight:800;text-transform:uppercase;background:${fc.bg};color:${fc.color}">${fc.label}</span><span style="font-size:.73rem;color:var(--text-muted)">by <strong style="color:var(--text-secondary)">${t.author}</strong> · ${t.time}</span></div><div style="font-size:.97rem;font-weight:800;margin-bottom:5px;line-height:1.35;font-family:'Outfit',sans-serif">${t.title}</div><div style="font-size:.82rem;color:var(--text-secondary);line-height:1.55;margin-bottom:9px">${t.excerpt}</div><div style="display:flex;align-items:center;gap:11px;font-size:.76rem;color:var(--text-muted)"><div style="cursor:pointer;padding:3px 7px;border-radius:6px">💬 ${t.cmts} Comments</div><div onclick="event.stopPropagation();showToast('Saved! 🔖')" style="cursor:pointer;padding:3px 7px;border-radius:6px">🔖 Save</div><div onclick="event.stopPropagation();showToast('Link copied! 🔗')" style="cursor:pointer;padding:3px 7px;border-radius:6px">🔗 Share</div></div></div></div>`;}).join('');
}
function forumUpvote(id,btn){const t=forumThreads.find(x=>x.id===id);if(!t||t._voted)return;t.votes++;t._voted=true;const vc=document.getElementById('fvc-'+id);if(vc)vc.textContent=t.votes;btn.style.color='#6BCB77';}
function openNewThread(){document.getElementById('newThreadModal').classList.add('open');}
function submitNewThread(){
  const title=document.getElementById('threadTitle').value.trim();const body=document.getElementById('threadBody').value.trim();const flair=document.getElementById('threadFlair').value;
  if(!title)return showToast('Please enter a topic title.');
  forumThreads.unshift({id:'tu_'+Date.now(),flair,title,author:'John Tan',authorIni:'JT',authorBg:'linear-gradient(135deg,var(--gold),var(--gold-light))',time:'Just now',excerpt:body||'Click to read and join the discussion.',votes:1,cmts:0,replies:[]});
  closeModal('newThreadModal');document.getElementById('threadTitle').value='';document.getElementById('threadBody').value='';
  renderForum();const fp=document.getElementById('forum-posts');if(fp)fp.textContent=(parseInt(fp.textContent)||840)+1+'+';showToast('Thread posted! The community can see it now. 🎉');
}
function openThreadDetail(id){
  const t=forumThreads.find(x=>x.id===id);if(!t)return;
  const fc=FLAIR_CFG[t.flair]||FLAIR_CFG.biz;
  const renderReplies=(replies,depth=0)=>replies.map(r=>`<div style="display:flex;gap:9px;margin-bottom:12px;${depth>0?'padding-left:28px':''};"><div style="width:30px;height:30px;border-radius:50%;background:${r.bg};display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:800;color:#000;flex-shrink:0">${r.ini}</div><div style="flex:1;background:var(--page-bg);border-radius:0 14px 14px 14px;padding:10px 13px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:5px;flex-wrap:wrap"><span style="font-size:.82rem;font-weight:800">${r.author}</span><span style="font-size:.72rem;color:var(--text-muted)">${r.time}</span><span style="margin-left:auto;font-size:.74rem;color:var(--text-muted)">❤️ ${r.likes}</span></div><div style="font-size:.86rem;color:var(--text-primary);line-height:1.65">${r.text}</div><div style="display:flex;gap:10px;margin-top:8px;font-size:.73rem;color:var(--text-muted)"><span style="cursor:pointer;color:#6BCB77" onclick="showToast('Reply coming soon!')">Reply</span><span style="cursor:pointer" onclick="showToast('Liked!')">Like</span></div>${r.replies&&r.replies.length?renderReplies(r.replies,depth+1):''}</div></div>`).join('');
  document.getElementById('threadDetailContent').innerHTML=`<div style="margin-bottom:16px"><div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;flex-wrap:wrap"><span style="padding:2px 9px;border-radius:100px;font-size:.65rem;font-weight:800;background:${fc.bg};color:${fc.color}">${fc.label}</span><span style="font-size:.74rem;color:var(--text-muted)">by <strong>${t.author}</strong> · ${t.time}</span><span style="font-family:'Outfit',sans-serif;font-size:.8rem;font-weight:800;color:#6BCB77;margin-left:auto">▲ ${t.votes}</span></div><h3 style="font-size:1.15rem;font-family:'Outfit',sans-serif;font-weight:800;margin-bottom:10px;line-height:1.3">${t.title}</h3><p style="font-size:.9rem;color:var(--text-secondary);line-height:1.7;margin-bottom:16px">${t.excerpt}</p></div><div style="border-top:2px solid var(--border);padding-top:16px;margin-bottom:16px"><div style="font-size:.85rem;font-weight:800;margin-bottom:14px;font-family:'Outfit',sans-serif">💬 ${t.cmts} Comments</div><div style="display:flex;gap:9px;margin-bottom:16px"><div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-light));display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:800;flex-shrink:0;color:#000">JT</div><div style="flex:1;display:flex;gap:8px"><input id="threadReplyInput" placeholder="Add a comment…" style="flex:1;padding:8px 14px;border-radius:100px;border:1.5px solid var(--border);background:var(--page-bg);font-size:.85rem;color:var(--text-primary);font-family:inherit;outline:none"><button onclick="addThreadReply('${t.id}')" style="padding:8px 16px;border-radius:100px;background:#6BCB77;color:#000;border:none;font-size:.82rem;font-weight:800;cursor:pointer">Post</button></div></div><div id="threadRepliesContainer">${renderReplies(t.replies||[])}</div></div>`;
  document.getElementById('threadDetailModal').classList.add('open');
}
function addThreadReply(id){
  const inp=document.getElementById('threadReplyInput');const txt=inp?.value.trim();if(!txt)return;
  const t=forumThreads.find(x=>x.id===id);if(!t)return;if(!t.replies)t.replies=[];
  t.replies.push({author:'John Tan',ini:'JT',bg:'linear-gradient(135deg,var(--gold),var(--gold-light))',time:'Just now',text:txt,likes:0,replies:[]});t.cmts=(t.cmts||0)+1;inp.value='';
  const rc=document.getElementById('threadRepliesContainer');if(rc)rc.insertAdjacentHTML('beforeend',`<div style="display:flex;gap:9px;margin-bottom:12px"><div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-light));display:flex;align-items:center;justify-content:center;font-size:.65rem;font-weight:800;color:#000;flex-shrink:0">JT</div><div style="flex:1;background:var(--page-bg);border-radius:0 14px 14px 14px;padding:10px 13px"><div style="font-size:.82rem;font-weight:800;margin-bottom:4px">John Tan</div><div style="font-size:.86rem;line-height:1.65">${txt}</div></div></div>`);
  showToast('Comment posted! 🎉');renderForum();
}



// ═══════════════════════════════════════════════════
//  EVENTS
// ═══════════════════════════════════════════════════

// ═══════════════════════════════════════════════════
//  POINT 9 — EVENTS PAGE
//  Time-sequenced · Filter location/church/type/cat
//  RSVP modal · Submit event · Sidebar calendar
// ═══════════════════════════════════════════════════

// Extended events data — more entries, time-ordered, with church field
const FULL_EVENTS_DATA = [
  {id:'e1',title:'Biblical Leadership Workshop',date:'2026-05-12',dateLabel:'12 May 2026',day:'12',mon:'May',time:'9:00 AM – 5:00 PM',type:'Hybrid',cat:'workshop',loc:'Kuala Lumpur',org:'Good Steward',church:'Calvary Life Church',seats:80,seatsLeft:23,desc:'Discover how biblical principles apply to modern leadership. Featuring Christian CEOs, pastors and thought leaders from across Asia.',color:'linear-gradient(135deg,#1A2744,#2C3E66)',emoji:'👑',price:'RM 150',featured:true},
  {id:'e2',title:'Singapore Faith & Business Networking Night',date:'2026-05-20',dateLabel:'20 May 2026',day:'20',mon:'May',time:'7:00 PM – 10:00 PM',type:'Physical',cat:'networking',loc:'Singapore',org:'Good Steward',church:'',seats:80,seatsLeft:30,desc:'Annual gathering of Christian entrepreneurs in Singapore. Panel discussions, networking dinner and worship.',color:'linear-gradient(135deg,#0d2818,#1a4a2e)',emoji:'🤝',price:'SGD 50',featured:false},
  {id:'e3',title:'Biblical Finance Masterclass — Online',date:'2026-06-01',dateLabel:'1 Jun 2026',day:'1',mon:'Jun',time:'10:00 AM – 1:00 PM',type:'Online',cat:'training',loc:'Online',org:'Good Steward',church:'',seats:0,seatsLeft:0,desc:"Practical masterclass on managing money God's way. Budgeting, investing and generosity from a biblical worldview.",color:'linear-gradient(135deg,#7a4a00,#b87a00)',emoji:'💰',price:'Free',featured:false},
  {id:'e4',title:'Asia Prayer Breakfast 2026',date:'2026-06-03',dateLabel:'3 Jun 2026',day:'3',mon:'Jun',time:'7:30 AM – 9:30 AM',type:'Physical',cat:'prayer',loc:'Bangkok',org:'Churches',church:'Bangkok Christian Church',seats:200,seatsLeft:30,desc:'International gathering of faith leaders, pastors and Christian executives. Annual highlight of the Good Steward calendar.',color:'linear-gradient(135deg,#3d0000,#7a0000)',emoji:'🙏',price:'Free',featured:false},
  {id:'e5',title:'Digital Marketing for Christian Businesses',date:'2026-06-15',dateLabel:'15 Jun 2026',day:'15',mon:'Jun',time:'2:00 PM – 5:00 PM',type:'Hybrid',cat:'workshop',loc:'Kuala Lumpur',org:'Businesses',church:'',seats:60,seatsLeft:18,desc:'Learn proven digital marketing strategies tailored for faith-based businesses. Practical, ethical and effective.',color:'linear-gradient(135deg,#001828,#003050)',emoji:'📱',price:'RM 80',featured:false},
  {id:'e6',title:'Christian Entrepreneurs Summit 2026',date:'2026-07-15',dateLabel:'15 Jul 2026',day:'15',mon:'Jul',time:'9:00 AM – 6:00 PM',type:'Hybrid',cat:'summit',loc:'Kuala Lumpur',org:'Good Steward',church:'',seats:300,seatsLeft:120,desc:'The premier conference for Christian business leaders in Asia. Keynotes, workshops, networking and worship.',color:'linear-gradient(135deg,#00122a,#001e3c)',emoji:'🚀',price:'RM 350',featured:true},
  {id:'e7',title:'KL Church Business Connect Night',date:'2026-07-22',dateLabel:'22 Jul 2026',day:'22',mon:'Jul',time:'7:00 PM – 9:30 PM',type:'Physical',cat:'networking',loc:'Kuala Lumpur',org:'Churches',church:'Grace Anglican Church',seats:100,seatsLeft:55,desc:'A relaxed evening connecting church members who are business owners and professionals. Testimonies and prayer.',color:'linear-gradient(135deg,#2d1f00,#5a3d00)',emoji:'⛪',price:'Free',featured:false},
  {id:'e8',title:'Women in Faith & Business',date:'2026-08-22',dateLabel:'22 Aug 2026',day:'22',mon:'Aug',time:'10:00 AM – 4:00 PM',type:'Online',cat:'conference',loc:'Online',org:'Good Steward',church:'',seats:0,seatsLeft:0,desc:'Empowering Christian women in leadership and entrepreneurship. Stories, strategies and sisterhood.',color:'linear-gradient(135deg,#2d0040,#4a0060)',emoji:'👩‍💼',price:'Free',featured:false},
  {id:'e9',title:'Penang Christian Business Fair',date:'2026-09-05',dateLabel:'5 Sep 2026',day:'5',mon:'Sep',time:'10:00 AM – 6:00 PM',type:'Physical',cat:'conference',loc:'Penang',org:'Good Steward',church:'Hope City Church',seats:500,seatsLeft:280,desc:"Penang's largest Christian marketplace showcase — businesses, products, services and ministry all under one roof.",color:'linear-gradient(135deg,#003020,#006040)',emoji:'🏪',price:'Free entry',featured:false},
  {id:'e10',title:'Biblical Finance Conference 2026',date:'2026-10-10',dateLabel:'10 Oct 2026',day:'10',mon:'Oct',time:'9:00 AM – 5:00 PM',type:'Hybrid',cat:'conference',loc:'Singapore',org:'Good Steward',church:'',seats:250,seatsLeft:180,desc:'The most anticipated faith-and-finance event of the year. International speakers, workshops and a gala dinner.',color:'linear-gradient(135deg,#1a1a2e,#2d2d5e)',emoji:'📊',price:'SGD 280',featured:false},
];

let currentEvCat = 'all';
let rsvpList = new Set();

function setEvCat(btn, cat) {
  currentEvCat = cat;
  document.querySelectorAll('.evcbtn').forEach(b => {
    b.style.background = 'var(--page-bg)'; b.style.color = 'var(--text-secondary)'; b.style.borderColor = 'var(--border)';
  });
  btn.style.background = '#7c9cff'; btn.style.color = '#000'; btn.style.borderColor = '#7c9cff';
  renderEventsPage();
}

function renderEventsPage() {
  const q     = (document.getElementById('evSearch')?.value || '').toLowerCase();
  const loc   = document.getElementById('evLocFilter')?.value || '';
  const type  = document.getElementById('evTypeFilter')?.value || '';
  const church = document.getElementById('evChurchFilter')?.value || '';

  let filtered = FULL_EVENTS_DATA.filter(e => {
    const mQ  = !q    || e.title.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q) || e.loc.toLowerCase().includes(q);
    const mL  = !loc  || e.loc.toLowerCase().includes(loc.toLowerCase()) || (loc === 'Online' && e.type === 'Online');
    const mT  = !type || e.type === type;
    const mC  = !church || e.org === church || (church === 'Churches' && e.org === 'Churches');
    const mCat = currentEvCat === 'all' || e.cat === currentEvCat;
    return mQ && mL && mT && mC && mCat;
  });

  // Sort by date (time-sequenced ascending)
  filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

  const cnt = document.getElementById('evResultCount');
  if (cnt) cnt.textContent = `${filtered.length} event${filtered.length !== 1 ? 's' : ''}`;

  const el = document.getElementById('eventsMainList');
  if (!el) return;

  if (!filtered.length) {
    el.innerHTML = `<div style="text-align:center;padding:80px 20px;color:var(--text-muted)"><div style="font-size:3rem;margin-bottom:14px">📅</div><div style="font-weight:700;font-size:1rem">No events match your filters.</div><p style="margin-top:8px;font-size:.88rem"><span onclick="openSubmitEventModal()" style="color:#7c9cff;cursor:pointer;font-weight:700">Submit an event →</span></p></div>`;
    return;
  }

  // Group by month
  const byMonth = {};
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  filtered.forEach(e => {
    const d = new Date(e.date);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    const label = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    if (!byMonth[key]) byMonth[key] = {label, events:[]};
    byMonth[key].events.push(e);
  });

  const typeColors = {Online:'#eef0ff',Hybrid:'#eafbeb',Physical:'#fffbeb'};
  const typeText   = {Online:'#4361EE',Hybrid:'#3d8a47',Physical:'#b8860b'};
  const catEmoji   = {conference:'🎙',workshop:'🛠',networking:'🤝',prayer:'🙏',summit:'🏔',training:'📚'};

  el.innerHTML = Object.keys(byMonth).sort().map(key => {
    const {label, events} = byMonth[key];
    return `
    <div style="margin-bottom:40px">
      <!-- Month divider -->
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">
        <div style="font-family:'Outfit',sans-serif;font-size:1.1rem;font-weight:800;color:var(--text-primary)">${label}</div>
        <div style="flex:1;height:1px;background:var(--border)"></div>
        <span style="font-size:.75rem;color:var(--text-muted);font-weight:700">${events.length} event${events.length!==1?'s':''}</span>
      </div>
      <!-- Events in month -->
      <div style="display:flex;flex-direction:column;gap:14px">
        ${events.map(e => `
        <div style="background:var(--card-bg);border-radius:20px;border:1px solid ${e.featured?'var(--gold)':'var(--border)'};overflow:hidden;transition:all .25s ease;${e.featured?'background:linear-gradient(135deg,var(--card-bg) 85%,rgba(201,151,58,.04))':''}">
          <div style="display:flex;gap:0">
            <!-- Date column -->
            <div style="width:90px;flex-shrink:0;background:${e.color};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px 0;position:relative">
              <div style="font-family:'Outfit',sans-serif;font-size:2.2rem;font-weight:900;color:#fff;line-height:1">${e.day}</div>
              <div style="font-size:.72rem;text-transform:uppercase;color:rgba(255,255,255,.7);letter-spacing:.06em;font-weight:700">${e.mon}</div>
              <div style="font-size:1.5rem;margin-top:8px">${e.emoji}</div>
            </div>
            <!-- Content -->
            <div style="flex:1;padding:18px 20px">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:8px">
                <div>
                  ${e.featured ? '<div style="display:inline-flex;align-items:center;gap:4px;font-size:.68rem;font-weight:800;color:var(--gold);text-transform:uppercase;letter-spacing:.05em;margin-bottom:5px">⭐ Featured Event</div><br>' : ''}
                  <div style="font-size:1.05rem;font-weight:800;font-family:\'Outfit\',sans-serif;line-height:1.3;margin-bottom:4px">${e.title}</div>
                  <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
                    <span style="font-size:.76rem;color:var(--text-muted)">🕐 ${e.time}</span>
                    <span style="font-size:.76rem;color:var(--text-muted)">📍 ${e.loc}</span>
                    ${e.church ? `<span style="font-size:.76rem;color:var(--text-muted)">⛪ ${e.church}</span>` : ''}
                    <span style="font-size:.76rem;color:var(--text-muted)">🏢 ${e.org}</span>
                  </div>
                </div>
                <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;flex-shrink:0">
                  <span style="padding:4px 12px;border-radius:100px;font-size:.72rem;font-weight:800;background:${typeColors[e.type]};color:${typeText[e.type]}">${e.type}</span>
                  <span style="padding:4px 12px;border-radius:100px;font-size:.72rem;font-weight:800;background:var(--page-bg);color:var(--text-secondary);border:1px solid var(--border)">${catEmoji[e.cat]||'📅'} ${e.cat.charAt(0).toUpperCase()+e.cat.slice(1)}</span>
                </div>
              </div>
              <div style="font-size:.84rem;color:var(--text-secondary);line-height:1.65;margin-bottom:14px">${e.desc}</div>
              <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
                <div style="display:flex;align-items:center;gap:14px;font-size:.78rem;color:var(--text-muted)">
                  ${e.seats > 0 ? `<span>🎫 ${e.seatsLeft} of ${e.seats} seats left</span>` : '<span>🎫 Unlimited seats</span>'}
                  <span style="font-weight:800;color:${e.price==='Free'||e.price==='Free entry'?'#3d8a47':'var(--text-primary)'}">💳 ${e.price}</span>
                </div>
                <div style="display:flex;gap:8px">
                  ${rsvpList.has(e.id)
                    ? `<span style="padding:7px 20px;border-radius:100px;background:#eafbeb;color:#3d8a47;font-size:.83rem;font-weight:800;border:none">✓ RSVP'd</span>`
                    : `<button onclick="openRsvpModal('${e.id}')" style="padding:7px 20px;border-radius:100px;background:#7c9cff;color:#000;font-size:.83rem;font-weight:800;border:none;cursor:pointer;transition:all .2s ease">RSVP Now</button>`
                  }
                  <button onclick="showToast('Link copied! 🔗')" style="padding:7px 14px;border-radius:100px;background:var(--page-bg);color:var(--text-secondary);font-size:.83rem;font-weight:700;border:1.5px solid var(--border);cursor:pointer">🔗</button>
                  <button onclick="showToast('Saved to calendar! 📅')" style="padding:7px 14px;border-radius:100px;background:var(--page-bg);color:var(--text-secondary);font-size:.83rem;font-weight:700;border:1.5px solid var(--border);cursor:pointer">📅</button>
                </div>
              </div>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>`;
  }).join('');

  // Sidebar — May events
  const mayEl = document.getElementById('evSidebarMay');
  if (mayEl) {
    const mayEvs = FULL_EVENTS_DATA.filter(e => e.date.startsWith('2026-05'));
    mayEl.innerHTML = mayEvs.map(e => `
      <div style="display:flex;gap:10px;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.07)" class="${mayEvs.indexOf(e)===mayEvs.length-1?'':''}">
        <div style="text-align:center;min-width:36px;flex-shrink:0">
          <div style="font-family:'Outfit',sans-serif;font-size:1.3rem;font-weight:800;color:var(--gold);line-height:1">${e.day}</div>
          <div style="font-size:.6rem;text-transform:uppercase;color:rgba(255,255,255,.35);letter-spacing:.05em">${e.mon}</div>
        </div>
        <div>
          <div style="font-size:.82rem;font-weight:700;color:#fff;line-height:1.3;margin-bottom:2px">${e.title}</div>
          <div style="font-size:.72rem;color:rgba(255,255,255,.45)">📍 ${e.loc} · ${e.type}</div>
        </div>
      </div>`).join('');
  }

  const total = document.getElementById('ev-total-count');
  if (total) total.textContent = FULL_EVENTS_DATA.length;
}

function openRsvpModal(id) {
  const e = FULL_EVENTS_DATA.find(x => x.id === id);
  if (!e) return;
  document.getElementById('rsvpContent').innerHTML = `
    <div style="text-align:center;margin-bottom:20px">
      <div style="width:60px;height:60px;border-radius:16px;background:${e.color};display:flex;align-items:center;justify-content:center;font-size:2rem;margin:0 auto 12px">${e.emoji}</div>
      <h3 style="font-size:1.1rem;font-family:'Outfit',sans-serif;font-weight:800;margin-bottom:4px">${e.title}</h3>
      <p style="font-size:.82rem;color:var(--text-muted)">${e.dateLabel} · ${e.time} · ${e.loc}</p>
    </div>
    <div style="background:var(--page-bg);border-radius:14px;padding:14px;margin-bottom:18px">
      <div style="display:flex;justify-content:space-between;font-size:.82rem;padding:5px 0;border-bottom:1px solid var(--border)"><span style="color:var(--text-muted)">Format</span><span style="font-weight:700">${e.type}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:.82rem;padding:5px 0;border-bottom:1px solid var(--border)"><span style="color:var(--text-muted)">Price</span><span style="font-weight:700;color:${e.price==='Free'||e.price==='Free entry'?'#3d8a47':'var(--text-primary)'}">${e.price}</span></div>
      <div style="display:flex;justify-content:space-between;font-size:.82rem;padding:5px 0"><span style="color:var(--text-muted)">Seats Left</span><span style="font-weight:700">${e.seats>0?e.seatsLeft+' of '+e.seats:'Unlimited'}</span></div>
    </div>
    <div style="margin-bottom:12px"><label style="font-size:.72rem;font-weight:800;color:var(--text-secondary);display:block;margin-bottom:4px;text-transform:uppercase;letter-spacing:.04em">Your Name</label><input class="fi" id="rsvp_name" placeholder="John Tan" value="John Tan"></div>
    <div style="margin-bottom:16px"><label style="font-size:.72rem;font-weight:800;color:var(--text-secondary);display:block;margin-bottom:4px;text-transform:uppercase;letter-spacing:.04em">Email</label><input class="fi" id="rsvp_email" type="email" placeholder="john@email.com" value="john@goodsteward.com"></div>
    <div style="display:flex;gap:10px">
      <button onclick="confirmRsvp('${e.id}')" style="flex:1;padding:11px;border-radius:10px;background:#7c9cff;color:#000;font-size:.9rem;font-weight:800;border:none;cursor:pointer">✓ Confirm RSVP</button>
      <button onclick="closeModal('rsvpModal')" style="padding:11px 16px;border-radius:10px;background:var(--page-bg);color:var(--text-secondary);border:1.5px solid var(--border);font-size:.9rem;font-weight:700;cursor:pointer">Cancel</button>
    </div>
    <p style="font-size:.72rem;color:var(--text-muted);text-align:center;margin-top:10px">Confirmation email will be sent to you</p>`;
  document.getElementById('rsvpModal').classList.add('open');
}

function confirmRsvp(id) {
  rsvpList.add(id);
  closeModal('rsvpModal');
  renderEventsPage();
  showToast('RSVP confirmed! Check your email for details 📧');
}

function openSubmitEventModal() { document.getElementById('submitEventModal').classList.add('open'); }

function submitEvent() {
  const title = document.getElementById('ev_title')?.value.trim();
  const date  = document.getElementById('ev_date')?.value;
  const loc   = document.getElementById('ev_loc')?.value.trim();
  const desc  = document.getElementById('ev_desc')?.value.trim();
  if (!title || !date || !loc || !desc) return showToast('Please fill all required fields.');
  const d = new Date(date);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  FULL_EVENTS_DATA.push({
    id:'eu_'+Date.now(), title, date, dateLabel:`${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`,
    day:String(d.getDate()), mon:months[d.getMonth()],
    time: document.getElementById('ev_time')?.value || 'TBC',
    type: document.getElementById('ev_type')?.value || 'Physical',
    cat:  document.getElementById('ev_cat')?.value  || 'conference',
    loc, org: document.getElementById('ev_org')?.value || 'Good Steward',
    church:'', seats:0, seatsLeft:0,
    desc, color:'linear-gradient(135deg,#1a1a2e,#2d2d5e)',
    emoji:'📅', price:'TBC', featured:false
  });
  closeModal('submitEventModal');
  ['ev_title','ev_date','ev_time','ev_loc','ev_org','ev_desc'].forEach(i=>{const el=document.getElementById(i);if(el)el.value='';});
  renderEventsPage();
  showToast('Event submitted! It will appear after review. 🎉');
}

// ═══════════════════════════════════════════════════
//  POINT 10 — NEWS PAGE
//  Editorial layout · Categories · Featured hero article
// ═══════════════════════════════════════════════════

// Extended news data
const FULL_NEWS_DATA = [
  {id:'n1',title:'Christian Businesses Report 40% Growth in Cross-Border Partnerships',cat:'Business',date:'2 May 2026',author:'Good Steward Editorial',readTime:'4 min read',excerpt:'A new report from the Good Steward Network reveals that Christian businesses actively networking in the faith marketplace see significantly higher cross-border partnership rates compared to the broader SME market.',bg:'linear-gradient(135deg,#1A2744,#2C3E66)',emoji:'📊',featured:true,tags:['Business','Growth','Partnership']},
  {id:'n2',title:'Faith and Finance: How Biblical Principles Are Reshaping Asian Business',cat:'Faith & Work',date:'28 Apr 2026',author:'Sarah Chen',readTime:'6 min read',excerpt:'Christian entrepreneurs across Malaysia and Singapore are rediscovering ancient wisdom for modern marketplace challenges — and the results are measurable.',bg:'linear-gradient(135deg,#7a4a00,#b87a00)',emoji:'📖',featured:false,tags:['Finance','Faith','Asia']},
  {id:'n3',title:'New Mentorship Programme for Young Christian Entrepreneurs Launches in Singapore',cat:'Community',date:'25 Apr 2026',author:'Good Steward Editorial',readTime:'3 min read',excerpt:'Applications are now open for the inaugural Good Steward Mentorship Programme, pairing established Christian business leaders with young entrepreneurs across Asia.',bg:'linear-gradient(135deg,#0d2818,#1a4a2e)',emoji:'🌱',featured:false,tags:['Mentorship','Community','Singapore']},
  {id:'n4',title:'How Pastor Kevin Built a 500-Member Church Through Business Connections',cat:'Testimony',date:'20 Apr 2026',author:'David Lim',readTime:'5 min read',excerpt:"A candid conversation with Pastor Kevin of Hope City Church, Penang, on the surprising ways the Good Steward Network transformed his congregation's growth and outreach.",bg:'linear-gradient(135deg,#3d0000,#7a0000)',emoji:'🎤',featured:false,tags:['Testimony','Church','Leadership']},
  {id:'n5',title:'Good Steward Expands to Indonesia, Philippines and Thailand',cat:'Network News',date:'15 Apr 2026',author:'Good Steward Editorial',readTime:'2 min read',excerpt:'The Good Steward Network officially announces its expansion across Southeast Asia, with new community coordinators appointed in Jakarta, Manila and Bangkok.',bg:'linear-gradient(135deg,#001828,#002d3d)',emoji:'🌏',featured:false,tags:['Network','Expansion','SEA']},
  {id:'n6',title:'Biblical Finance Conference 2026: Early Bird Registration Now Open',cat:'Events',date:'10 Apr 2026',author:'Events Team',readTime:'2 min read',excerpt:'Secure your spot at the most anticipated faith-and-finance event of the year. International speakers, practical workshops, and a gala dinner for 250 delegates.',bg:'linear-gradient(135deg,#1a1a2e,#2d2d5e)',emoji:'📅',featured:false,tags:['Events','Finance','Conference']},
  {id:'n7',title:'The Secret to Hiring Right: Christian Employers Share Their Best Practices',cat:'Business',date:'5 Apr 2026',author:'James Wong',readTime:'5 min read',excerpt:"Hiring aligned to your values is not just possible — it's a competitive advantage. Five Christian business owners share how they find and retain talent who share their faith and work ethic.",bg:'linear-gradient(135deg,#1A2744,#3a4a70)',emoji:'💼',featured:false,tags:['HR','Hiring','Business']},
  {id:'n8',title:"'I Almost Quit' — Angela Teh's Journey from Bankruptcy to Bakery Owner",cat:'Testimony',date:'1 Apr 2026',author:'Good Steward Editorial',readTime:'7 min read',excerpt:"Three years ago Angela Teh was on the verge of closing everything. Today Bread of Life Bakery in Georgetown serves 300 customers a day. This is her story.",bg:'linear-gradient(135deg,#3d1200,#6a2000)',emoji:'🍞',featured:false,tags:['Testimony','Entrepreneur','Malaysia']},
  {id:'n9',title:'Prayer and Profit: Why Spiritually Grounded Leaders Outperform Their Peers',cat:'Faith & Work',date:'28 Mar 2026',author:'Dr. Michael Tan',readTime:'6 min read',excerpt:'New research from Singapore Management University suggests that leaders with strong spiritual practices demonstrate measurably higher resilience, decision quality and team trust.',bg:'linear-gradient(135deg,#0d2818,#2a5a38)',emoji:'🙏',featured:false,tags:['Research','Leadership','Prayer']},
  {id:'n10',title:'Community Spotlight: The Christian Tech Founders Redefining Business in KL',cat:'Community',date:'20 Mar 2026',author:'Rachel Ng',readTime:'4 min read',excerpt:'Meet five young Christian founders based in Kuala Lumpur who are building technology companies with an unusual commitment: to put faith, ethics and community ahead of pure profit.',bg:'linear-gradient(135deg,#001828,#003050)',emoji:'💻',featured:false,tags:['Tech','Community','KL']},
];

let currentNewsCat = 'all';

function setNewsCat(btn, cat) {
  currentNewsCat = cat;
  document.querySelectorAll('.nctab').forEach(b => {
    b.style.color = 'var(--text-muted)'; b.style.borderBottomColor = 'transparent';
  });
  if (btn) { btn.style.color = 'var(--gold)'; btn.style.borderBottomColor = 'var(--gold)'; }
  renderNewsPage();
}

function renderNewsPage() {
  const q = (document.getElementById('newsSearch')?.value || '').toLowerCase();
  let filtered = FULL_NEWS_DATA.filter(n => {
    const mQ   = !q || n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q);
    const mCat = currentNewsCat === 'all' || n.cat === currentNewsCat;
    return mQ && mCat;
  });

  const featEl = document.getElementById('newsFeatured');
  const gridEl = document.getElementById('newsGrid');
  const noRes  = document.getElementById('newsNoResults');
  if (!featEl || !gridEl) return;

  if (!filtered.length) {
    featEl.innerHTML = ''; gridEl.innerHTML = '';
    if (noRes) noRes.style.display = 'block'; return;
  }
  if (noRes) noRes.style.display = 'none';

  // Featured article — the first featured one or first in list
  const featuredItem = filtered.find(n => n.featured) || filtered[0];
  const rest = filtered.filter(n => n !== featuredItem);

  // FEATURED hero card
  featEl.innerHTML = `
    <div style="background:var(--card-bg);border-radius:24px;border:1px solid var(--border);overflow:hidden;display:grid;grid-template-columns:1fr 1.1fr;cursor:pointer;transition:all .25s ease" onmouseover="this.style.boxShadow='0 16px 48px rgba(0,0,0,0.13)'" onmouseout="this.style.boxShadow='none'" onclick="openNewsArticle('${featuredItem.id}')">
      <div style="height:100%;min-height:260px;background:${featuredItem.bg};display:flex;align-items:center;justify-content:center;font-size:5rem;position:relative">
        ${featuredItem.emoji}
        <div style="position:absolute;top:14px;left:14px;padding:4px 12px;border-radius:100px;background:var(--gold);color:#000;font-size:.72rem;font-weight:800">⭐ Featured</div>
      </div>
      <div style="padding:28px 28px 24px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
          <span style="padding:3px 10px;border-radius:100px;background:var(--gold-pale);color:var(--gold);font-size:.72rem;font-weight:800">${featuredItem.cat}</span>
          <span style="font-size:.75rem;color:var(--text-muted)">${featuredItem.date} · ${featuredItem.readTime}</span>
        </div>
        <h2 style="font-size:1.3rem;font-family:'Outfit',sans-serif;font-weight:800;line-height:1.3;margin-bottom:12px">${featuredItem.title}</h2>
        <p style="font-size:.87rem;color:var(--text-secondary);line-height:1.72;margin-bottom:18px">${featuredItem.excerpt}</p>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div style="display:flex;align-items:center;gap:8px">
            <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-light));display:flex;align-items:center;justify-content:center;font-size:.6rem;font-weight:800;color:#000">${featuredItem.author.split(' ').map(w=>w[0]).join('').slice(0,2)}</div>
            <span style="font-size:.8rem;color:var(--text-secondary);font-weight:600">${featuredItem.author}</span>
          </div>
          <button onclick="event.stopPropagation();openNewsArticle('${featuredItem.id}')" style="padding:8px 18px;border-radius:100px;background:var(--gold);color:#000;font-size:.82rem;font-weight:800;border:none;cursor:pointer">Read More →</button>
        </div>
        <div style="display:flex;gap:6px;margin-top:14px;flex-wrap:wrap">
          ${(featuredItem.tags||[]).map(t=>`<span style="padding:3px 9px;border-radius:100px;background:var(--page-bg);color:var(--text-muted);font-size:.72rem;font-weight:700;border:1px solid var(--border)">#${t}</span>`).join('')}
        </div>
      </div>
    </div>`;

  // REST of articles
  gridEl.innerHTML = rest.map(n => `
    <div style="background:var(--card-bg);border-radius:20px;border:1px solid var(--border);overflow:hidden;transition:all .25s ease;cursor:pointer" onmouseover="this.style.boxShadow='0 12px 40px rgba(0,0,0,0.12)';this.style.transform='translateY(-3px)';this.style.borderColor='var(--gold)'" onmouseout="this.style.boxShadow='none';this.style.transform='translateY(0)';this.style.borderColor='var(--border)'" onclick="openNewsArticle('${n.id}')">
      <div style="height:130px;background:${n.bg};display:flex;align-items:center;justify-content:center;font-size:2.8rem;position:relative">
        ${n.emoji}
      </div>
      <div style="padding:18px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span style="padding:2px 8px;border-radius:100px;background:var(--gold-pale);color:var(--gold);font-size:.68rem;font-weight:800">${n.cat}</span>
          <span style="font-size:.72rem;color:var(--text-muted)">${n.readTime}</span>
        </div>
        <div style="font-size:.97rem;font-weight:800;margin-bottom:7px;line-height:1.35;font-family:'Outfit',sans-serif">${n.title}</div>
        <div style="font-size:.82rem;color:var(--text-secondary);line-height:1.6;margin-bottom:12px">${n.excerpt.substring(0,120)}…</div>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:.74rem;color:var(--text-muted)">${n.date} · ${n.author}</span>
          <span style="font-size:.82rem;color:var(--gold);font-weight:700">Read →</span>
        </div>
      </div>
    </div>`).join('');
}

function openNewsArticle(id) {
  const n = FULL_NEWS_DATA.find(x => x.id === id);
  if (!n) return;
  showToast(`Opening: "${n.title.substring(0,40)}…"`);
}

// Legacy aliases so old function calls still work
function renderEvents() { renderEventsPage(); }
function renderNews()   { renderNewsPage(); }
function filterEvents(type) { renderEventsPage(); }

// ═══════════════════════════════════════════════════
//  POINT 11 — REGISTRATION + EMAIL NOTIFICATION
// ═══════════════════════════════════════════════════

let currentRegRole = 'Business Owner';
let currentRegRoleEmoji = '🏪';
let dashProducts = [];
let dashMyPostsList = [];

function selectRegRole(el, role, emoji) {
  currentRegRole = role; currentRegRoleEmoji = emoji;
  document.querySelectorAll('.reg-role-btn').forEach(b => {
    b.style.border = '2px solid var(--border)';
    b.style.background = 'var(--page-bg)';
    const lbl = b.querySelector('div:last-child'); if(lbl) lbl.style.color='var(--text-secondary)';
  });
  el.style.border = '2px solid var(--gold)';
  el.style.background = 'var(--gold-pale)';
  const lbl = el.querySelector('div:last-child'); if(lbl) lbl.style.color='var(--gold)';
}

function clearRegErr(id) {
  const el=document.getElementById(id); if(el) el.style.borderColor='var(--border)';
  const e=document.getElementById('regErrMsg'); if(e) e.style.display='none';
}

function showRegErr(msg, fieldId) {
  const e=document.getElementById('regErrMsg');
  if(e){e.textContent=msg;e.style.display='block';}
  if(fieldId){const el=document.getElementById(fieldId);if(el){el.style.borderColor='#c0392b';el.focus();}}
}

function checkPwStrength(pw) {
  const fill=document.getElementById('pwStrengthFill');
  const lbl=document.getElementById('pwStrengthLabel');
  if(!fill||!lbl)return;
  let s=0;
  if(pw.length>=8)s++;if(/[A-Z]/.test(pw))s++;if(/[0-9]/.test(pw))s++;if(/[^A-Za-z0-9]/.test(pw))s++;
  const cfg=[{p:'0%',c:'var(--border)',t:''},{p:'25%',c:'#FF6B6B',t:'Weak'},{p:'50%',c:'#FFD166',t:'Fair'},{p:'75%',c:'#4ECDC4',t:'Good'},{p:'100%',c:'#6BCB77',t:'Strong ✓'}];
  fill.style.width=cfg[s].p;fill.style.background=cfg[s].c;lbl.textContent=cfg[s].t;lbl.style.color=cfg[s].c;
}

function togglePwVis() {
  const pw=document.getElementById('reg_pw');if(!pw)return;
  pw.type=pw.type==='password'?'text':'password';
  const t=document.getElementById('pwToggle');if(t)t.textContent=pw.type==='password'?'👁':'🙈';
}

function submitReg() {
  const first  = document.getElementById('reg_first')?.value.trim();
  const last   = document.getElementById('reg_last')?.value.trim();
  const email  = document.getElementById('reg_email')?.value.trim();
  const country= document.getElementById('reg_country')?.value;
  const pw     = document.getElementById('reg_pw')?.value;
  const agree  = document.getElementById('reg_agree')?.checked;

  if(!first)   return showRegErr('Please enter your first name.','reg_first');
  if(!last)    return showRegErr('Please enter your last name.','reg_last');
  if(!email||!email.includes('@')) return showRegErr('Please enter a valid email address.','reg_email');
  if(!country) return showRegErr('Please select your country.','reg_country');
  if(!pw||pw.length<8) return showRegErr('Password must be at least 8 characters.','reg_pw');
  if(!agree)   return showRegErr('Please agree to the Terms of Service to continue.');

  // Update dashboard with new member info
  const city=document.getElementById('reg_city')?.value||'';
  const nameEl=document.getElementById('dash-name-display'); if(nameEl) nameEl.textContent=`${first} ${last}`;
  const roleEl=document.getElementById('dash-role-display'); if(roleEl) roleEl.textContent=`${currentRegRole} · ${city?city+', ':''}${country} · Member since ${new Date().toLocaleDateString('en-GB',{month:'short',year:'numeric'})}`;
  const avEl=document.getElementById('dash-avatar-display'); if(avEl) avEl.textContent=(first[0]+(last[0]||'')).toUpperCase();

  // Disable button
  const btn=document.getElementById('regSubmitBtn');
  if(btn){btn.textContent='⏳ Creating account…';btn.disabled=true;btn.style.opacity='.7';}

  // Set welcome names
  const wn=document.getElementById('regWelcomeName');if(wn)wn.textContent=first;
  const we=document.getElementById('regWelcomeEmail');if(we)we.textContent=email;

  // Populate email modal
  const hi=document.getElementById('emailHi');if(hi)hi.textContent=first;
  const to=document.getElementById('emailToField');if(to)to.textContent=email;
  const rl=document.getElementById('emailRole');if(rl)rl.textContent=`${currentRegRoleEmoji} ${currentRegRole}`;

  setTimeout(()=>{ document.getElementById('emailModal').classList.add('open'); }, 600);
}

function closeEmailModal() {
  document.getElementById('emailModal').classList.remove('open');
  document.getElementById('regFormWrap').style.display='none';
  document.getElementById('regSuccessWrap').style.display='block';
  showToast('Email verified! Welcome to Good Steward ✦');
}

// Legacy alias
function selectRole(el) {
  document.querySelectorAll('.role-btn').forEach(r=>{
    r.style.borderColor='var(--border)';r.style.background='var(--page-bg)';
    const l=r.querySelector('.role-btn-label,.role-label');if(l)l.style.color='var(--text-secondary)';
  });
  el.style.borderColor='var(--gold)';el.style.background='var(--gold-pale)';
  const l=el.querySelector('.role-btn-label,.role-label');if(l)l.style.color='var(--gold)';
}

// ═══════════════════════════════════════════════════
//  POINT 12 — FULL MEMBER DASHBOARD
// ═══════════════════════════════════════════════════

function switchDashTab(tab) {
  ['listing','jobs','posts','network','enquiries','events','pending','admin','settings'].forEach(t=>{
    const p=document.getElementById('dpanel-'+t);if(p)p.style.display='none';
    const n=document.getElementById('dnav-'+t);
    if(n){n.style.background='none';n.style.color='var(--text-secondary)';n.style.fontWeight='600';}
  });
  const p=document.getElementById('dpanel-'+tab);if(p)p.style.display='block';
  const n=document.getElementById('dnav-'+tab);
  if(n){n.style.background='var(--gold-pale)';n.style.color='var(--gold)';n.style.fontWeight='700';}
  if(tab==='listing')  renderDashboard();
  if(tab==='posts')    renderDashMyPosts();
  if(tab==='network')  renderDashNetwork();
  if(tab==='enquiries')renderDashEnquiries();
  if(tab==='events')   renderDashEvents();
  if(tab==='pending')  renderDashboard();
  if(tab==='admin')    renderDashboard();
}

function renderDashboard() {
  // MY LIVE LISTINGS
  const myBizEl=document.getElementById('dash-my-biz');
  if(myBizEl){
    const mine=BIZ_APPROVED.filter(b=>b.submittedBy==='John Tan');
    myBizEl.innerHTML=mine.length
      ?mine.map(b=>`
        <div style="display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--border)">
          <div style="font-size:1.8rem">${b.emoji}</div>
          <div style="flex:1">
            <div style="font-weight:800;font-size:.93rem">${b.name}</div>
            <div style="font-size:.76rem;color:var(--text-muted)">${b.cat} · ${b.loc}, ${b.country}</div>
            <div style="font-size:.76rem;color:var(--gold);margin-top:2px">⭐ ${b.rating||'New'} · 📧 32 enquiries · 👁 247 views</div>
          </div>
          <div style="display:flex;gap:8px;flex-shrink:0">
            <span style="padding:3px 10px;border-radius:100px;background:#eafbeb;color:#3d8a47;font-size:.7rem;font-weight:800">✓ Live</span>
            <button onclick="showToast('Editing ${b.name.replace(/'/g,'')} 🔧')" style="padding:5px 13px;border-radius:100px;background:var(--page-bg);color:var(--text-secondary);border:1px solid var(--border);font-size:.75rem;font-weight:700;cursor:pointer">Edit</button>
            <button onclick="window.location.href='business.html'" style="padding:5px 13px;border-radius:100px;background:var(--gold);color:#000;border:none;font-size:.75rem;font-weight:800;cursor:pointer">View →</button>
          </div>
        </div>`).join('')
      :`<p style="font-size:.84rem;color:var(--text-muted);padding:12px 0">No live listings yet. <span onclick="document.getElementById('bizRegSection').scrollIntoView({behavior:'smooth'});window.location.href='business.html'" style="color:var(--gold);cursor:pointer;font-weight:700">Submit your first listing →</span></p>`;
  }

  renderDashProducts();

  // PENDING BIZ (member view)
  const pBiz=document.getElementById('dash-pending-biz');
  if(pBiz) pBiz.innerHTML=!BIZ_PENDING.length
    ?`<p style="font-size:.84rem;color:var(--text-muted)">No pending listings.</p>`
    :BIZ_PENDING.map(b=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:11px 0;border-bottom:1px solid var(--border);gap:12px;flex-wrap:wrap"><div><div style="font-weight:800;font-size:.9rem">${b.emoji} ${b.name}</div><div style="font-size:.75rem;color:var(--text-muted)">${b.cat} · ${b.loc} · ${b.submittedAt}</div></div><span style="padding:3px 10px;border-radius:100px;background:#fffbeb;color:#b8860b;font-size:.7rem;font-weight:800;flex-shrink:0">⏳ Awaiting Review</span></div>`).join('');

  // PENDING JOBS (member view)
  const pJob=document.getElementById('dash-pending-jobs');
  if(pJob) pJob.innerHTML=!JOBS_PENDING.length
    ?`<p style="font-size:.84rem;color:var(--text-muted)">No pending job postings.</p>`
    :JOBS_PENDING.map(j=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:11px 0;border-bottom:1px solid var(--border);gap:12px;flex-wrap:wrap"><div><div style="font-weight:800;font-size:.9rem">${j.logo} ${j.title}</div><div style="font-size:.75rem;color:var(--text-muted)">${j.company} · ${j.loc} · ${j.submittedAt}</div></div><span style="padding:3px 10px;border-radius:100px;background:#fffbeb;color:#b8860b;font-size:.7rem;font-weight:800;flex-shrink:0">⏳ Awaiting Review</span></div>`).join('');

  // ADMIN BIZ panel
  const aBiz=document.getElementById('dash-pending-biz-admin');
  if(aBiz) aBiz.innerHTML=!BIZ_PENDING.length
    ?`<p style="font-size:.84rem;color:var(--text-muted)">No pending listings. <span onclick="document.getElementById('bizRegSection').scrollIntoView({behavior:'smooth'});window.location.href='business.html'" style="color:var(--gold);cursor:pointer;font-weight:700">Submit a listing to test →</span></p>`
    :BIZ_PENDING.map(b=>`
      <div style="background:var(--page-bg);border-radius:14px;border:1px solid var(--border);padding:16px;margin-bottom:12px">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <div style="flex:1">
            <div style="font-weight:800;font-size:.95rem;margin-bottom:3px">${b.emoji} ${b.name}</div>
            <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:2px">${b.cat} · ${b.loc}, ${b.country} · 📧 ${b.email}</div>
            <div style="font-size:.78rem;color:var(--text-secondary);margin-bottom:3px">${b.desc}</div>
            <div style="font-size:.74rem;color:var(--text-muted)">By ${b.submittedBy} · ${b.submittedAt}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:7px;flex-shrink:0">
            <button onclick="approveBiz('${b.id}')" style="padding:7px 18px;border-radius:100px;background:#22c55e;color:#fff;font-size:.8rem;font-weight:800;border:none;cursor:pointer">✓ Approve &amp; Publish</button>
            <button onclick="rejectBiz('${b.id}')" style="padding:7px 18px;border-radius:100px;background:#FF6B6B;color:#fff;font-size:.8rem;font-weight:800;border:none;cursor:pointer">✕ Reject</button>
          </div>
        </div>
      </div>`).join('');

  // ADMIN JOBS panel
  const aJob=document.getElementById('dash-pending-jobs-admin');
  if(aJob) aJob.innerHTML=!JOBS_PENDING.length
    ?`<p style="font-size:.84rem;color:var(--text-muted)">No pending jobs. <span onclick="switchDashTab('jobs')" style="color:var(--gold);cursor:pointer;font-weight:700">Post a job →</span></p>`
    :JOBS_PENDING.map(j=>`
      <div style="background:var(--page-bg);border-radius:14px;border:1px solid var(--border);padding:16px;margin-bottom:12px">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <div style="flex:1">
            <div style="font-weight:800;font-size:.95rem;margin-bottom:3px">${j.logo} ${j.title}</div>
            <div style="font-size:.78rem;color:var(--text-muted);margin-bottom:2px">${j.company} · ${j.loc} · ${j.type} · ${j.salary}</div>
            <div style="font-size:.78rem;color:var(--text-secondary);margin-bottom:3px">${j.desc}</div>
            <div style="font-size:.74rem;color:var(--text-muted)">By ${j.submittedBy} · ${j.submittedAt}</div>
          </div>
          <div style="display:flex;flex-direction:column;gap:7px;flex-shrink:0">
            <button onclick="approveJob('${j.id}')" style="padding:7px 18px;border-radius:100px;background:#22c55e;color:#fff;font-size:.8rem;font-weight:800;border:none;cursor:pointer">✓ Approve &amp; Publish</button>
            <button onclick="rejectJob('${j.id}')" style="padding:7px 18px;border-radius:100px;background:#FF6B6B;color:#fff;font-size:.8rem;font-weight:800;border:none;cursor:pointer">✕ Reject</button>
          </div>
        </div>
      </div>`).join('');

  // MY LIVE JOBS
  const myJobsEl=document.getElementById('dash-my-jobs');
  if(myJobsEl){
    const mine=JOBS_APPROVED.filter(j=>j.submittedBy==='John Tan');
    myJobsEl.innerHTML=mine.length
      ?mine.map(j=>`<div style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--border)"><div style="font-size:1.4rem">${j.logo}</div><div style="flex:1"><div style="font-weight:800;font-size:.9rem">${j.title}</div><div style="font-size:.76rem;color:var(--text-muted)">${j.company} · ${j.loc} · ${j.type}</div></div><span style="padding:3px 9px;border-radius:100px;background:#eafbeb;color:#3d8a47;font-size:.7rem;font-weight:800">✓ Live</span><button onclick="window.location.href='jobs.html'" style="padding:5px 12px;border-radius:100px;background:var(--gold);color:#000;border:none;font-size:.74rem;font-weight:800;cursor:pointer">View →</button></div>`).join('')
      :`<p style="font-size:.84rem;color:var(--text-muted)">No live job postings. Use the form above to post one.</p>`;
  }
}

function renderDashProducts() {
  const el=document.getElementById('dash-products');
  if(!el)return;
  if(!dashProducts.length){el.innerHTML='';return;}
  el.innerHTML=`<div style="background:var(--card-bg);border-radius:20px;border:1px solid var(--border);padding:22px;margin-top:18px">
    <div style="font-weight:800;font-size:.97rem;font-family:'Outfit',sans-serif;margin-bottom:14px">📦 My Products &amp; Services</div>
    ${dashProducts.map((p,i)=>`
      <div style="display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--border)">
        <div style="flex:1"><div style="font-weight:800;font-size:.9rem">${p.name}</div><div style="font-size:.76rem;color:var(--text-muted)">${p.desc||''}</div></div>
        <div style="font-size:.86rem;font-weight:800;color:#6BCB77">${p.price||'TBC'}</div>
        <button onclick="dashProducts.splice(${i},1);renderDashProducts()" style="padding:4px 10px;border-radius:8px;background:var(--page-bg);color:var(--text-muted);border:1px solid var(--border);font-size:.74rem;cursor:pointer">Remove</button>
      </div>`).join('')}
  </div>`;
}

function addProductListing() {
  const name=document.getElementById('prod_name')?.value.trim();
  const price=document.getElementById('prod_price')?.value.trim();
  const desc=document.getElementById('prod_desc')?.value.trim();
  if(!name)return showToast('Please enter a product/service name.');
  dashProducts.push({name,price,desc});
  ['prod_name','prod_price','prod_desc'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  renderDashProducts();
  showToast(`"${name}" added to your profile! ✦`);
}

function dashSocPublish() {
  const ta=document.getElementById('dashSocPost');const txt=ta?.value.trim();if(!txt)return showToast('Please write something first.');
  postData.unshift({author:'John Tan',role:'Business Owner · KL',initials:'JT',time:'Just now',tag:'Post',content:txt,bg:'linear-gradient(135deg,var(--gold),var(--gold-light))',likes:0,comments:0,img:'',_liked:false});
  dashMyPostsList.unshift({text:txt,time:'Just now',likes:0,type:'Social'});
  ta.value='';renderFeed();renderDashMyPosts();
  const pc=document.getElementById('dash-posts-count');if(pc)pc.textContent=parseInt(pc.textContent||'0')+1;
  showToast('Published to Socials feed! ✦');
}

function dashForumPost() {
  const title=document.getElementById('dashForumTitle')?.value.trim();
  const body=document.getElementById('dashForumBody')?.value.trim();
  const flair=document.getElementById('dashForumFlair')?.value||'biz';
  if(!title)return showToast('Please enter a topic title.');
  forumThreads.unshift({id:'td_'+Date.now(),flair,title,author:'John Tan',authorIni:'JT',authorBg:'linear-gradient(135deg,var(--gold),var(--gold-light))',time:'Just now',excerpt:body||'Click to join the discussion.',votes:1,cmts:0,replies:[]});
  dashMyPostsList.unshift({text:title,time:'Just now',likes:0,type:'Forum'});
  document.getElementById('dashForumTitle').value='';document.getElementById('dashForumBody').value='';
  renderForum();renderDashMyPosts();
  const pc=document.getElementById('dash-posts-count');if(pc)pc.textContent=parseInt(pc.textContent||'0')+1;
  const fp=document.getElementById('forum-posts');if(fp)fp.textContent=(parseInt(fp.textContent)||840)+1+'+';
  showToast('Forum thread posted! 🎉');
}

function renderDashMyPosts() {
  const el=document.getElementById('dashMyPosts');if(!el)return;
  const allPosts=[...dashMyPostsList,
    {text:"Just closed my biggest contract — through a referral from a fellow Good Steward member! 🙏",time:'2d ago',likes:34,type:'Social'},
    {text:"How I use Proverbs 16:3 every Monday morning to start my workweek",time:'5d ago',likes:12,type:'Forum'},
  ];
  el.innerHTML=allPosts.map((p,i)=>`
    <div style="display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--border)">
      <span style="padding:3px 9px;border-radius:100px;font-size:.68rem;font-weight:800;background:${p.type==='Forum'?'rgba(107,203,119,.1)':'rgba(124,92,191,.08)'};color:${p.type==='Forum'?'#6BCB77':'#a882ff'}">${p.type==='Forum'?'💬 Forum':'📱 Social'}</span>
      <div style="flex:1;font-size:.84rem;color:var(--text-primary);line-height:1.45">${p.text.substring(0,80)}${p.text.length>80?'…':''}</div>
      <div style="display:flex;align-items:center;gap:10px;flex-shrink:0;font-size:.75rem;color:var(--text-muted)">
        <span>❤️ ${p.likes}</span><span>${p.time}</span>
        <button onclick="${p.type==='Forum'?'showPage(\'community\')':'showPage(\'socials\')'}" style="padding:4px 10px;border-radius:8px;background:var(--page-bg);color:var(--text-muted);border:1px solid var(--border);font-size:.74rem;cursor:pointer">View →</button>
      </div>
    </div>`).join('');
}

function renderDashNetwork() {
  const connections=[
    {ini:'SC',name:'Sarah Chen',role:'Business Owner · KL',bg:'linear-gradient(135deg,var(--gold),var(--gold-light))'},
    {ini:'DL',name:'David Lim',role:'Consultant · Singapore',bg:'linear-gradient(135deg,#4ECDC4,#22a8a0)'},
    {ini:'PR',name:'Pastor Raymond',role:'Hope City Church · Penang',bg:'linear-gradient(135deg,#6BCB77,#3d8a47)'},
  ];
  const connEl=document.getElementById('dashNetwork');
  if(connEl) connEl.innerHTML=connections.map(c=>`
    <div style="display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--border)">
      <div style="width:40px;height:40px;border-radius:50%;background:${c.bg};display:flex;align-items:center;justify-content:center;font-size:.82rem;font-weight:800;color:#000;flex-shrink:0">${c.ini}</div>
      <div style="flex:1"><div style="font-weight:800;font-size:.9rem">${c.name}</div><div style="font-size:.75rem;color:var(--text-muted)">${c.role}</div></div>
      <button onclick="showToast('Message feature coming soon!')" style="padding:5px 12px;border-radius:100px;background:var(--page-bg);color:var(--text-secondary);border:1px solid var(--border);font-size:.76rem;font-weight:700;cursor:pointer">💬 Message</button>
    </div>`).join('');
  const sugEl=document.getElementById('dashSuggested');
  if(sugEl) sugEl.innerHTML=SUGGESTED_USERS.map(u=>`
    <div style="display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--border)">
      <div style="width:40px;height:40px;border-radius:50%;background:${u.bg};display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:800;color:#000;flex-shrink:0">${u.ini}</div>
      <div style="flex:1"><div style="font-weight:800;font-size:.9rem">${u.name}</div><div style="font-size:.75rem;color:var(--text-muted)">${u.role}</div></div>
      <button onclick="showToast('Following ${u.name}! 🎉')" style="padding:5px 12px;border-radius:100px;background:#a882ff;color:#000;border:none;font-size:.76rem;font-weight:800;cursor:pointer">Follow</button>
    </div>`).join('');
}

function renderDashEnquiries() {
  const el=document.getElementById('dashEnquiries');if(!el)return;
  const enquiries=[
    {from:'Rachel Ng',co:'HR Manager · Penang',msg:'Hi, I saw your financial consulting services. Can we schedule a call this week?',time:'2h ago',unread:true},
    {from:'James Wong',co:'Tech Founder · KL',msg:'Interested in your bookkeeping packages. What are your rates for a 10-person company?',time:'1d ago',unread:true},
    {from:'Angela Teh',co:'Bakery Owner · Ipoh',msg:'Thank you for the consultation last week! Really helpful.',time:'3d ago',unread:false},
    {from:'Michael Tan',co:'Retailer · SG',msg:'Do you handle cross-border tax advisory for Singapore-Malaysia businesses?',time:'5d ago',unread:false},
  ];
  el.innerHTML=enquiries.map(e=>`
    <div style="display:flex;gap:13px;padding:14px 0;border-bottom:1px solid var(--border)">
      <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-light));display:flex;align-items:center;justify-content:center;font-size:.78rem;font-weight:800;color:#000;flex-shrink:0;position:relative">
        ${e.from.split(' ').map(w=>w[0]).join('').slice(0,2)}
        ${e.unread?'<div style="position:absolute;top:0;right:0;width:10px;height:10px;border-radius:50%;background:#FF6B6B;border:2px solid var(--card-bg)"></div>':''}
      </div>
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between;margin-bottom:3px">
          <div style="font-weight:800;font-size:.88rem">${e.from} ${e.unread?'<span style="font-size:.65rem;background:#FF6B6B;color:#fff;padding:1px 6px;border-radius:100px;font-weight:800">New</span>':''}</div>
          <div style="font-size:.72rem;color:var(--text-muted)">${e.time}</div>
        </div>
        <div style="font-size:.76rem;color:var(--text-muted);margin-bottom:5px">${e.co}</div>
        <div style="font-size:.84rem;color:var(--text-secondary);line-height:1.55">${e.msg}</div>
        <div style="display:flex;gap:8px;margin-top:9px">
          <button onclick="showToast('Reply feature coming soon! 📧')" style="padding:5px 14px;border-radius:100px;background:var(--gold);color:#000;font-size:.76rem;font-weight:800;border:none;cursor:pointer">Reply</button>
          <button onclick="showToast('Marked as read')" style="padding:5px 14px;border-radius:100px;background:var(--page-bg);color:var(--text-secondary);font-size:.76rem;font-weight:700;border:1px solid var(--border);cursor:pointer">Mark Read</button>
        </div>
      </div>
    </div>`).join('');
}

function renderDashEvents() {
  const el=document.getElementById('dashEvents');if(!el)return;
  const myRsvps=FULL_EVENTS_DATA.filter(e=>rsvpList.has(e.id));
  const toShow=myRsvps.length?myRsvps:FULL_EVENTS_DATA.slice(0,3);
  el.innerHTML=toShow.map(e=>`
    <div style="display:flex;gap:14px;padding:13px 0;border-bottom:1px solid var(--border);align-items:center">
      <div style="width:44px;height:44px;border-radius:12px;background:${e.color};display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">${e.emoji}</div>
      <div style="flex:1">
        <div style="font-weight:800;font-size:.9rem">${e.title}</div>
        <div style="font-size:.76rem;color:var(--text-muted)">📍 ${e.loc} · ${e.dateLabel} · ${e.type}</div>
      </div>
      ${rsvpList.has(e.id)
        ?'<span style="padding:3px 10px;border-radius:100px;background:#eafbeb;color:#3d8a47;font-size:.7rem;font-weight:800;flex-shrink:0">✓ RSVP\'d</span>'
        :`<button onclick="openRsvpModal('${e.id}');window.location.href='events.html'" style="padding:5px 12px;border-radius:100px;background:#7c9cff;color:#000;font-size:.75rem;font-weight:800;border:none;cursor:pointer;flex-shrink:0">RSVP</button>`}
    </div>`).join('')
  +(myRsvps.length===0?`<p style="font-size:.82rem;color:var(--text-muted);margin-top:12px">RSVP to events to see them here. <span onclick="window.location.href='events.html'" style="color:#7c9cff;cursor:pointer;font-weight:700">Browse events →</span></p>`:'');
}

// ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════

window.addEventListener('load', () => {
  applyBizFilters();
  renderJobs();
  renderEventsPage();
  renderNewsPage();
  renderHomeNews();
  renderHomeEvents();
  renderFeed();
  renderDashboard();
  renderDashMyPosts();
  updateHomeCounts();
  initSocials();
  initForum();
});

function openEmployerModal() { document.getElementById('employerModal').classList.add('open'); }
function openTalentModal()   { document.getElementById('talentModal').classList.add('open'); }

function submitEmployerForm() {
  const company = document.getElementById('emp_company')?.value.trim();
  const title   = document.getElementById('emp_title')?.value.trim();
  const loc     = document.getElementById('emp_loc')?.value.trim();
  const email   = document.getElementById('emp_email')?.value.trim();
  const desc    = document.getElementById('emp_desc')?.value.trim();
  if (!company || !title || !loc || !email || !desc) return showToast('Please fill all required fields.');
  closeModal('employerModal');
  showToast('Your submission will be reviewed and listed once it\'s approved. ✅');
}

function submitTalentForm() {
  const name  = document.getElementById('tal_name')?.value.trim();
  const title = document.getElementById('tal_title')?.value.trim();
  const email = document.getElementById('tal_email')?.value.trim();
  if (!name || !title || !email) return showToast('Please fill all required fields.');
  closeModal('talentModal');
  showToast('Your submission will be reviewed and listed once it\'s approved. ✅');
}