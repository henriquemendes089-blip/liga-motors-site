// =============================
// LIGA MOTORS — Site script
// =============================

const fmtBRL = (n) => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 0 });
const slugSilhouette = (nome) => nome.split(" ").join("\n");

function whatsappLink(message) {
  return `https://wa.me/${window.WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function bikeCardHTML(b) {
  const tagFeatured = b.destaque ? '<span class="tag featured">Destaque</span>' : '';
  const tagNew = b.novo ? '<span class="tag new">Novo</span>' : '';
  return `
    <a href="modelo.html?id=${b.id}" class="bike-card reveal">
      <div class="bike-image">
        <div class="bg" style="background:${b.imagem}"></div>
        <div class="bike-tags">
          <span class="tag">${b.categoria}</span>
          ${tagNew || tagFeatured || '<span></span>'}
        </div>
        <div class="silhouette">${slugSilhouette(b.nome)}</div>
      </div>
      <div class="bike-body">
        <div class="bike-marca">${b.marca}</div>
        <h3 class="bike-name">${b.nome}</h3>
        <p class="bike-tagline">${b.tagline}</p>
        <div class="bike-specs">
          <div class="bike-spec">
            <div class="v">${b.autonomia}<span>km</span></div>
            <div class="l">Autonomia</div>
          </div>
          <div class="bike-spec">
            <div class="v">${b.velocidade}<span>km/h</span></div>
            <div class="l">Vel. máx</div>
          </div>
          <div class="bike-spec">
            <div class="v">${(b.potencia / 1000).toString().replace('.', ',')}<span>kW</span></div>
            <div class="l">Motor</div>
          </div>
        </div>
      </div>
      <div class="bike-footer">
        <div class="bike-price">
          <small>A partir de</small>
          ${fmtBRL(b.preco)}
        </div>
        <span class="bike-cta">Ver modelo</span>
      </div>
    </a>
  `;
}

// ==========================
// HOME — preview de scooters
// ==========================
function renderHomePreview() {
  const grid = document.querySelector('[data-bikes-preview]');
  if (!grid) return;
  const featured = SCOOTERS.filter(b => b.destaque || b.novo).slice(0, 3);
  const list = featured.length === 3 ? featured : SCOOTERS.slice(0, 3);
  grid.innerHTML = list.map(bikeCardHTML).join('');
}

// ==========================
// CATALOG page
// ==========================
const STATE = {
  marcas: new Set(),
  categorias: new Set(),
  preco: [10000, 35000],
  km: [60, 150],
  ordem: 'destaque'
};

function buildFilters() {
  const filters = document.querySelector('[data-filters]');
  if (!filters) return;

  const marcas = [...new Set(SCOOTERS.map(b => b.marca))].sort();
  const categorias = [...new Set(SCOOTERS.map(b => b.categoria))].sort();
  const minPreco = Math.floor(Math.min(...SCOOTERS.map(b => b.preco)) / 1000) * 1000;
  const maxPreco = Math.ceil(Math.max(...SCOOTERS.map(b => b.preco)) / 1000) * 1000;
  const minKm = Math.min(...SCOOTERS.map(b => b.autonomia));
  const maxKm = Math.max(...SCOOTERS.map(b => b.autonomia));

  STATE.preco = [minPreco, maxPreco];
  STATE.km = [minKm, maxKm];

  filters.innerHTML = `
    <div class="filter-group">
      <h3>Marca</h3>
      ${marcas.map(m => `
        <label class="filter-opt">
          <input type="checkbox" data-marca="${m}">
          <span>${m}</span>
          <span class="count">${SCOOTERS.filter(b => b.marca === m).length}</span>
        </label>
      `).join('')}
    </div>
    <div class="filter-group">
      <h3>Categoria</h3>
      ${categorias.map(c => `
        <label class="filter-opt">
          <input type="checkbox" data-cat="${c}">
          <span>${c}</span>
          <span class="count">${SCOOTERS.filter(b => b.categoria === c).length}</span>
        </label>
      `).join('')}
    </div>
    <div class="filter-group">
      <h3>Preço máximo</h3>
      <div class="filter-range">
        <div class="vals">
          <span>${fmtBRL(minPreco)}</span>
          <span data-preco-out>${fmtBRL(maxPreco)}</span>
        </div>
        <input type="range" min="${minPreco}" max="${maxPreco}" step="500" value="${maxPreco}" data-preco-range>
      </div>
    </div>
    <div class="filter-group">
      <h3>Autonomia mínima</h3>
      <div class="filter-range">
        <div class="vals">
          <span data-km-out>${minKm} km</span>
          <span>${maxKm} km</span>
        </div>
        <input type="range" min="${minKm}" max="${maxKm}" step="5" value="${minKm}" data-km-range>
      </div>
    </div>
    <button class="filter-clear" data-clear>Limpar filtros</button>
  `;

  // listeners
  filters.querySelectorAll('input[type="checkbox"]').forEach(input => {
    input.addEventListener('change', () => {
      if (input.dataset.marca) {
        input.checked ? STATE.marcas.add(input.dataset.marca) : STATE.marcas.delete(input.dataset.marca);
      } else if (input.dataset.cat) {
        input.checked ? STATE.categorias.add(input.dataset.cat) : STATE.categorias.delete(input.dataset.cat);
      }
      renderCatalog();
    });
  });

  const precoRange = filters.querySelector('[data-preco-range]');
  const precoOut = filters.querySelector('[data-preco-out]');
  precoRange.addEventListener('input', e => {
    STATE.preco[1] = +e.target.value;
    precoOut.textContent = fmtBRL(STATE.preco[1]);
    renderCatalog();
  });

  const kmRange = filters.querySelector('[data-km-range]');
  const kmOut = filters.querySelector('[data-km-out]');
  kmRange.addEventListener('input', e => {
    STATE.km[0] = +e.target.value;
    kmOut.textContent = STATE.km[0] + ' km';
    renderCatalog();
  });

  filters.querySelector('[data-clear]').addEventListener('click', () => {
    STATE.marcas.clear();
    STATE.categorias.clear();
    STATE.preco = [minPreco, maxPreco];
    STATE.km = [minKm, maxKm];
    buildFilters();
    renderCatalog();
  });
}

function renderCatalog() {
  const out = document.querySelector('[data-bikes-grid]');
  const counter = document.querySelector('[data-count]');
  if (!out) return;

  let list = SCOOTERS.filter(b => {
    if (STATE.marcas.size && !STATE.marcas.has(b.marca)) return false;
    if (STATE.categorias.size && !STATE.categorias.has(b.categoria)) return false;
    if (b.preco > STATE.preco[1]) return false;
    if (b.autonomia < STATE.km[0]) return false;
    return true;
  });

  switch (STATE.ordem) {
    case 'preco-asc': list.sort((a, b) => a.preco - b.preco); break;
    case 'preco-desc': list.sort((a, b) => b.preco - a.preco); break;
    case 'km-desc': list.sort((a, b) => b.autonomia - a.autonomia); break;
    case 'vel-desc': list.sort((a, b) => b.velocidade - a.velocidade); break;
    default:
      list.sort((a, b) => (b.destaque ? 1 : 0) + (b.novo ? 0.5 : 0) - ((a.destaque ? 1 : 0) + (a.novo ? 0.5 : 0)));
  }

  if (counter) {
    counter.innerHTML = `Mostrando <strong>${list.length}</strong> de ${SCOOTERS.length} modelos`;
  }

  if (list.length === 0) {
    out.innerHTML = `
      <div class="no-results">
        <h3>Nada por aqui.</h3>
        <p>Ajuste os filtros — ou chame no WhatsApp que a gente acha o modelo certo pra você.</p>
      </div>`;
  } else {
    out.innerHTML = list.map(bikeCardHTML).join('');
  }
  observeReveals();
}

function initCatalog() {
  if (!document.querySelector('[data-filters]')) return;
  buildFilters();
  renderCatalog();

  const sort = document.querySelector('[data-sort]');
  if (sort) sort.addEventListener('change', e => {
    STATE.ordem = e.target.value;
    renderCatalog();
  });

  const toggle = document.querySelector('[data-mobile-filter]');
  if (toggle) toggle.addEventListener('click', () => {
    document.querySelector('[data-filters]').classList.toggle('open');
  });
}

// ==========================
// PRODUCT page
// ==========================
function renderProduct() {
  const root = document.querySelector('[data-product]');
  if (!root) return;
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const bike = SCOOTERS.find(b => b.id === id) || SCOOTERS[0];

  document.title = `${bike.nome} · Liga Motors`;

  const msg = `Olá Liga Motors! Quero saber mais sobre a ${bike.nome} (${fmtBRL(bike.preco)}). Pode me passar mais informações?`;
  const waLink = whatsappLink(msg);
  const testLink = whatsappLink(`Olá Liga Motors! Gostaria de agendar um test ride na ${bike.nome}.`);

  root.innerHTML = `
    <section class="product-hero">
      <div class="container">
        <div class="crumb reveal">
          <a href="index.html">Início</a>
          <span class="sep">/</span>
          <a href="catalogo.html">Catálogo</a>
          <span class="sep">/</span>
          ${bike.nome}
        </div>
        <div class="product-grid">
          <div class="product-image reveal">
            <div class="bg" style="background:${bike.imagem}"></div>
            <div class="silhouette">${slugSilhouette(bike.nome)}</div>
          </div>
          <div>
            <div class="product-cat reveal">${bike.marca} · ${bike.categoria}</div>
            <h1 class="product-title reveal" data-delay="1">${bike.nome}</h1>
            <p class="product-tagline reveal" data-delay="2">${bike.tagline}</p>
            <div class="product-quick reveal" data-delay="3">
              <div class="item">
                <div class="v">${bike.autonomia}<span>km</span></div>
                <div class="l">Autonomia</div>
              </div>
              <div class="item">
                <div class="v">${bike.velocidade}<span>km/h</span></div>
                <div class="l">Velocidade</div>
              </div>
              <div class="item">
                <div class="v">${(bike.potencia/1000).toString().replace('.',',')}<span>kW</span></div>
                <div class="l">Potência</div>
              </div>
            </div>
            <div class="product-price reveal" data-delay="3">
              <span class="from">A partir de</span>
              <span class="val">${fmtBRL(bike.preco)}</span>
            </div>
            <div class="product-actions reveal" data-delay="4">
              <a href="${waLink}" target="_blank" rel="noopener" class="btn btn-primary">
                Falar no WhatsApp <span class="arrow"></span>
              </a>
              <a href="${testLink}" target="_blank" rel="noopener" class="btn btn-ghost">
                Agendar test ride
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="product-section">
      <div class="container">
        <h2 class="reveal">Sobre a <i>${bike.nome}</i></h2>
        <p class="lead reveal" data-delay="1">${bike.descricao}</p>
        <div class="feat-grid">
          ${bike.destaques.map((d, i) => `
            <div class="feat-cell reveal" data-delay="${(i % 4) + 1}">
              <div class="ico">0${i+1}</div>
              <h4>${d}</h4>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <section class="product-section">
      <div class="container">
        <h2 class="reveal">Ficha <i>técnica</i></h2>
        <div class="specs-grid">
          <div>
            ${specRow('Motor', `${bike.potencia} W (${(bike.potencia/1000).toString().replace('.', ',')} kW)`)}
            ${specRow('Velocidade máxima', `${bike.velocidade} km/h`)}
            ${specRow('Autonomia', `Até ${bike.autonomia} km por carga`)}
            ${specRow('Bateria', bike.bateria)}
            ${specRow('Tempo de carga', bike.carga)}
          </div>
          <div>
            ${specRow('Peso', `${bike.peso} kg`)}
            ${specRow('Suspensão', bike.suspensao)}
            ${specRow('Freios', bike.freios)}
            ${specRow('Documentação', bike.licenciamento)}
            ${specRow('Cores disponíveis', bike.cor)}
            ${specRow('Garantia', bike.garantia)}
          </div>
        </div>
      </div>
    </section>

    <section class="model-cta-section">
      <div class="model-cta-inner">
        <div class="model-cta-bg-text">LIGA</div>
        <div class="model-cta-content">
          <p class="model-cta-sub">Frete grátis · Financiamento em até 24x · Test ride gratuito</p>
          <h2 class="model-cta-title">Quer essa <i>moto</i> ?</h2>
          <div class="model-cta-actions">
            <a href="${waLink}" target="_blank" rel="noopener" class="model-cta-btn-primary">
              <svg viewBox="0 0 32 32" width="20" height="20"><path d="M16 0C7.16 0 0 7.16 0 16c0 2.82.74 5.58 2.14 8L0 32l8.18-2.14C10.58 31.26 13.27 32 16 32c8.84 0 16-7.16 16-16S24.84 0 16 0zm7.74 21.79c-.42-.21-2.5-1.23-2.89-1.37-.39-.14-.67-.21-.96.21-.28.42-1.1 1.37-1.34 1.65-.25.28-.49.31-.91.1-.42-.21-1.78-.66-3.39-2.09-1.25-1.12-2.1-2.5-2.34-2.92-.25-.42-.03-.65.18-.86.19-.19.42-.49.63-.74.21-.25.28-.42.42-.7.14-.28.07-.53-.04-.74-.1-.21-.96-2.32-1.31-3.17-.34-.83-.7-.72-.96-.73h-.81c-.28 0-.74.1-1.13.53-.39.42-1.48 1.44-1.48 3.52 0 2.08 1.52 4.09 1.73 4.37.21.28 2.99 4.55 7.24 6.39 1.01.44 1.8.7 2.41.9.96.31 1.84.27 2.53.16.77-.12 2.5-1.02 2.85-2 .35-.99.35-1.83.25-2-.1-.18-.39-.28-.81-.49z" fill="currentColor"/></svg>
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="related-bar">
      <div class="container">
        <div class="section-head" style="margin-bottom:40px">
          <div class="num">→ TAMBÉM</div>
          <h2>Outros <i>modelos</i></h2>
          <div class="head-meta">explore o catálogo completo</div>
        </div>
        <div class="bikes-grid" data-related></div>
      </div>
    </section>
  `;

  // related
  const related = SCOOTERS.filter(b => b.id !== bike.id).slice(0, 3);
  document.querySelector('[data-related]').innerHTML = related.map(bikeCardHTML).join('');

  observeReveals();
}

function specRow(k, v) {
  return `<div class="spec-row"><div class="k">${k}</div><div class="v">${v}</div></div>`;
}

// ==========================
// SHARED
// ==========================
function observeReveals() {
  // Mobile: converte bike-cards para slide esquerda/direita alternado
  if (window.innerWidth <= 540) {
    const cards = document.querySelectorAll('.bike-card:not(.mob-ready)');
    cards.forEach((card, i) => {
      card.classList.add('mob-ready');
      card.classList.remove('reveal', 'in');
      card.classList.add(i % 2 === 0 ? 'mob-slide-left' : 'mob-slide-right');
    });
  }

  const els = document.querySelectorAll(
    '.reveal:not(.in), .mob-slide-left:not(.in), .mob-slide-right:not(.in)'
  );
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

function initMenu() {
  const toggle = document.querySelector('[data-menu]');
  const links = document.querySelector('[data-nav-links]');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
  }
}

function initWhatsAppFloat() {
  document.querySelectorAll('[data-wa-general]').forEach(el => {
    el.href = whatsappLink('Olá Liga Motors! Quero saber mais sobre as scooters elétricas.');
  });
}

// ==========================
// HERO STATS — count-up
// ==========================
function initCountUp() {
  const stats = document.querySelectorAll('.hero-stat-num');
  if (!stats.length) return;

  function animateCount(el, target, prefix, suffix, duration) {
    const start = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOut(progress) * target);
      el.innerHTML = prefix + value + '<span>' + suffix + '</span>';
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function animateCountDown(el, from, to, prefix, suffix, duration) {
    const start = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(from - easeOut(progress) * (from - to));
      el.innerHTML = prefix + value + '<span>' + suffix + '</span>';
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);

      const el = e.target;
      const span = el.querySelector('span');
      const suffix = span ? span.textContent : '';
      const raw = el.childNodes[0]?.textContent?.trim() || '0';
      const prefix = raw.startsWith('R$') ? 'R$' : '';
      const num = parseInt(raw.replace('R$', '').replace(/\D/g, '')) || 0;

      if (prefix === 'R$' && num === 0) {
        animateCountDown(el, 100, 0, 'R$', suffix, 1800);
      } else {
        animateCount(el, num, prefix, suffix, 1800);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => io.observe(el));
}

// ==========================
// BRANDS — drag to scroll
// ==========================
function initBrandsMarquee() {
  const track = document.querySelector('.brands-track');
  if (!track) return;

  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let animOffset = 0;

  // Pausa animação CSS e captura posição atual
  function pauseAnim() {
    const style = getComputedStyle(track);
    const matrix = new DOMMatrix(style.transform);
    animOffset = matrix.m41;
    track.style.animation = 'none';
    track.style.transform = `translateX(${animOffset}px)`;
    track.classList.add('is-dragging');
  }

  // Retoma animação CSS a partir do offset atual
  function resumeAnim() {
    const half = track.scrollWidth / 2;
    let norm = ((animOffset % -half) - half) % -half;
    if (norm > 0) norm -= half;
    const pct = Math.abs(norm / half) * 100;
    track.style.transform = '';
    track.style.animation = `brands-scroll 22s linear infinite`;
    track.style.animationDelay = `-${(pct / 100) * 22}s`;
    track.classList.remove('is-dragging');
  }

  // Mouse
  track.addEventListener('mousedown', e => {
    isDragging = true; startX = e.clientX;
    pauseAnim();
  });
  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    animOffset += e.clientX - startX;
    startX = e.clientX;
    track.style.transform = `translateX(${animOffset}px)`;
  });
  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    resumeAnim();
  });

  // Touch
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    pauseAnim();
  }, { passive: true });
  track.addEventListener('touchmove', e => {
    animOffset += e.touches[0].clientX - startX;
    startX = e.touches[0].clientX;
    track.style.transform = `translateX(${animOffset}px)`;
  }, { passive: true });
  track.addEventListener('touchend', () => resumeAnim());
}

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initWhatsAppFloat();
  renderHomePreview();
  initCatalog();
  renderProduct();
  observeReveals();
  initCountUp();
  initBrandsMarquee();
});
