/* EaglePips Money Management — shared logic */

const MM = (function(){

  const KEY_INCOME = 'eaglepips_mm_income';
  const KEY_SPENDING = 'eaglepips_mm_spending';

  const INCOME_CATEGORIES = [
    'Salariu KRKA',
    'TheFlowerStation',
    'Payout prop firm',
    'Profit trading',
    'Alt venit'
  ];

  const SPENDING_CATEGORIES = [
    'Chirie / Utilități',
    'Stoc & marketing FlowerStation',
    'Costuri trading (date, VPS, abonamente)',
    'Personal',
    'Transport',
    'Altele'
  ];

  function load(key){
    try{
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    }catch(e){ return []; }
  }
  function save(key, list){
    localStorage.setItem(key, JSON.stringify(list));
  }

  function loadIncome(){ return load(KEY_INCOME); }
  function saveIncome(list){ save(KEY_INCOME, list); }
  function loadSpending(){ return load(KEY_SPENDING); }
  function saveSpending(list){ save(KEY_SPENDING, list); }

  function fmtMoney(n){
    const num = Number(n) || 0;
    return num.toLocaleString('ro-RO', {maximumFractionDigits: 0}) + ' lei';
  }

  function fmtDate(iso){
    if(!iso) return '';
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('ro-RO', {day: '2-digit', month: 'short', year: 'numeric'});
  }

  function monthKey(iso){
    return iso ? iso.slice(0,7) : '';
  }

  const MONTH_NAMES = ['ianuarie','februarie','martie','aprilie','mai','iunie','iulie','august','septembrie','octombrie','noiembrie','decembrie'];

  function monthLabel(key){
    const [y,m] = key.split('-').map(Number);
    return MONTH_NAMES[m-1] + ' ' + y;
  }

  function currentMonthKey(){
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
  }

  function shiftMonthKey(key, delta){
    let [y,m] = key.split('-').map(Number);
    m += delta;
    while(m > 12){ m -= 12; y += 1; }
    while(m < 1){ m += 12; y -= 1; }
    return y + '-' + String(m).padStart(2,'0');
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  function uid(){
    return (crypto.randomUUID ? crypto.randomUUID() : 'id-' + Date.now() + '-' + Math.random().toString(16).slice(2));
  }

  function highlightNav(activePage){
    document.querySelectorAll('.navlinks a').forEach(a => {
      if(a.dataset.page === activePage) a.classList.add('active');
      else a.classList.remove('active');
    });
  }

  return {
    INCOME_CATEGORIES, SPENDING_CATEGORIES,
    loadIncome, saveIncome, loadSpending, saveSpending,
    fmtMoney, fmtDate, monthKey, monthLabel, currentMonthKey, shiftMonthKey,
    escapeHtml, uid, highlightNav
  };
})();
