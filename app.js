const data = window.REPORT_DATA;

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const Header = () => `
  <header class="site-header">
    <div class="shell header-inner">
      <a class="brand" href="#top" aria-label="Торгтехніка — на початок сторінки">
        <img class="brand-mark" src="public/torgtechnika-mark.png" alt="" width="52" height="52" />
        <span>Торгтехніка</span>
      </a>
      <span class="report-label">Управлінський звіт</span>
    </div>
  </header>`;

const Hero = () => `
  <section class="hero" id="top" aria-labelledby="report-title">
    <div class="shell hero-grid">
      <div class="hero-copy">
        <span class="eyebrow">Виробничі процеси · системний розвиток</span>
        <h1 id="report-title">Звіт про виконану роботу</h1>
        <p class="hero-subtitle">Розвиток, стандартизація та автоматизація виробничих процесів</p>
        <p class="hero-intro">${escapeHtml(data.introduction)}</p>
      </div>
      <aside class="scope-card" aria-label="Охоплення звіту">
        <span class="scope-kicker">Охоплення</span>
        <strong>3 напрями</strong>
        <span>10 практичних ініціатив</span>
        <span>єдиний виробничий контур</span>
      </aside>
    </div>
  </section>`;

const ReportOverview = () => `
  <section class="section report-overview" aria-labelledby="overview-title">
    <div class="section-heading compact-heading">
      <span class="section-index">00</span>
      <div>
        <p class="kicker">Повний зміст звіту</p>
        <h2 id="overview-title">Основні напрями роботи</h2>
      </div>
    </div>
    <p class="overview-lead">${escapeHtml(data.introduction)}</p>
    <p class="overview-caption">Робота виконувалася за такими основними напрямами:</p>
    <ul class="overview-list">
      ${data.directions.map((direction) => `<li>${escapeHtml(direction)}</li>`).join('')}
    </ul>
  </section>`;

const ExecutiveSummary = () => `
  <section class="section executive" aria-labelledby="executive-title">
    <div class="section-heading compact-heading">
      <span class="section-index">01</span>
      <div>
        <p class="kicker">Суть за хвилину</p>
        <h2 id="executive-title">Коротко для керівника</h2>
      </div>
    </div>
    <div class="summary-grid">
      ${data.executive.map((item, index) => `
        <a class="summary-card" href="#${escapeHtml(item.target)}" aria-label="${escapeHtml(item.title)} — перейти до відповідного розділу">
          <span class="summary-number">0${index + 1}</span>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.text)}</p>
          <span class="summary-link">До розділу <span aria-hidden="true">↓</span></span>
        </a>`).join('')}
    </div>
  </section>`;

const ResultMetric = () => `
  <aside class="result-metric" aria-label="Підтверджений результат автоматизації">
    <div class="metric-label"><span class="metric-dot"></span> Підтверджений ефект</div>
    <div class="metric-main">
      <p>Розміщення технологічних хрестів і рамок</p>
      <div class="metric-flow" aria-label="Понад 10 хвилин раніше, декілька секунд після автоматизації">
        <div><span>Раніше</span><strong>понад 10 хв</strong></div>
        <span class="metric-arrow" aria-hidden="true">→</span>
        <div><span>Після автоматизації</span><strong>декілька секунд</strong></div>
      </div>
    </div>
  </aside>`;

const StatusBadge = (status) => {
  const slug = {
    'Впроваджено': 'implemented',
    'Організовано': 'organized',
    'Виконано': 'completed',
    'Триває': 'ongoing',
    'Заплановано': 'planned',
  }[status];
  return `<span class="status status-${slug}"><span aria-hidden="true"></span>${escapeHtml(status)}</span>`;
};

const DetailBlock = (detail) => `
  <div class="detail-block">
    <h4>${escapeHtml(detail.label)}</h4>
    ${(detail.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
    ${detail.bullets ? `<ul>${detail.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>` : ''}
  </div>`;

const ContactBlock = (item) => {
  if (!item.contacts?.length && !item.links?.length) return '';
  return `
    <aside class="contact-block" aria-label="Контакти та посилання">
      <h4>Контакти та посилання</h4>
      ${item.contacts?.map((contact) => `
        <div class="contact-row">
          <div><strong>${escapeHtml(contact.name)}</strong>${contact.role ? `<span>${escapeHtml(contact.role)}</span>` : ''}</div>
          <a href="tel:${contact.phone.replace(/[^+\d]/g, '')}">${escapeHtml(contact.phone)}</a>
        </div>`).join('') || ''}
      ${item.links?.length ? `<div class="external-links">${item.links.map((link) => `
        <a href="${escapeHtml(link.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}<span aria-hidden="true">↗</span></a>`).join('')}</div>` : ''}
    </aside>`;
};

const ReportAccordion = (item) => {
  const panelId = `panel-${item.id}`;
  const triggerId = `trigger-${item.id}`;
  return `
    <article class="report-card" data-accordion>
      <h3>
        <button class="accordion-trigger" id="${triggerId}" type="button" aria-expanded="false" aria-controls="${panelId}">
          <span class="item-number">${String(item.number).padStart(2, '0')}</span>
          <span class="item-title-wrap">
            <span class="item-title">${escapeHtml(item.title)}</span>
            <span class="item-summary">${escapeHtml(item.summary)}</span>
          </span>
          ${StatusBadge(item.status)}
          <span class="chevron" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="accordion-panel" id="${panelId}" role="region" aria-labelledby="${triggerId}" hidden>
        <div class="detail-grid">
          ${item.details.map(DetailBlock).join('')}
        </div>
        ${item.subcards ? `
          <div class="subcards" aria-label="Інструменти TorgTechnikaTools">
            ${item.subcards.map((card) => `
              <section class="subcard">
                <span class="subcard-label">Внутрішній інструмент</span>
                <h4>${escapeHtml(card.title)}</h4>
                ${card.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
                ${card.bullets ? `<h5>Результат</h5><ul>${card.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>` : ''}
              </section>`).join('')}
          </div>` : ''}
        ${ContactBlock(item)}
      </div>
    </article>`;
};

const ReportSection = (section) => `
  <section class="report-section" id="${section.id}" aria-labelledby="${section.id}-title">
    <header class="report-section-header">
      <span class="roman">${escapeHtml(section.roman)}</span>
      <div>
        <p class="kicker">Напрям ${escapeHtml(section.roman)}</p>
        <h2 id="${section.id}-title">${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.intro)}</p>
      </div>
    </header>
    <div class="accordion-list">
      ${section.items.map(ReportAccordion).join('')}
    </div>
  </section>`;

const SectionNavigation = () => `
  <nav class="section-nav" aria-label="Навігація за напрямами звіту">
    <div class="shell nav-inner">
      <div class="nav-main">
        <span class="nav-label">Напрями</span>
        <div class="nav-scroll-wrap">
          <div class="nav-scroll" data-nav-scroll>
            ${data.sections.map((section) => `<a href="#${section.id}" data-nav-link>${escapeHtml(section.navLabel)}</a>`).join('')}
          </div>
          <span class="scroll-cue" aria-hidden="true">Гортайте <b>→</b></span>
        </div>
      </div>
      <div class="nav-actions" aria-label="Керування звітом">
        <button type="button" data-expand-all>Відкрити всі</button>
        <button type="button" data-collapse-all>Згорнути всі</button>
      </div>
    </div>
  </nav>`;

const FinalSummary = () => `
  <section class="final-summary" aria-labelledby="final-title">
    <div class="final-grid">
      <div>
        <p class="kicker">Підсумок</p>
        <h2 id="final-title">Загальний результат</h2>
        <p class="final-lead">${escapeHtml(data.final.lead)}</p>
        <p class="final-sequence">${escapeHtml(data.final.sequence)}</p>
      </div>
      <div>
        <h3 class="achievement-title">Проведена робота дала змогу:</h3>
        <ul class="achievement-list">
          ${data.final.achievements.map((achievement) => `<li>${escapeHtml(achievement)}</li>`).join('')}
        </ul>
      </div>
    </div>
    <blockquote>${escapeHtml(data.final.conclusion)}</blockquote>
    <div class="print-actions">
      <button class="button button-primary" type="button" data-expand-all>Розгорнути весь звіт</button>
      <button class="button button-secondary" type="button" data-print>Друк / Зберегти PDF</button>
    </div>
  </section>`;

const App = () => `
  ${Header()}
  <main id="main">
    ${Hero()}
    <div class="shell main-content">
      ${ReportOverview()}
      ${ExecutiveSummary()}
      ${ResultMetric()}
    </div>
    ${SectionNavigation()}
    <div class="shell report-content">
      <div class="report-intro">
        <p class="kicker">Детальний звіт</p>
        <h2>Виконана робота за напрямами</h2>
        <p>Відкрийте потрібні картки або розгорніть увесь звіт одним натисканням.</p>
      </div>
      ${data.sections.map(ReportSection).join('')}
      ${FinalSummary()}
    </div>
  </main>
  <footer class="site-footer">
    <div class="shell"><span>Торгтехніка</span><span>Звіт про виконану роботу</span></div>
  </footer>`;

document.querySelector('#app').innerHTML = App();

const accordionButtons = [...document.querySelectorAll('.accordion-trigger')];

const setAccordion = (button, open) => {
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  button.setAttribute('aria-expanded', String(open));
  panel.hidden = !open;
};

accordionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setAccordion(button, button.getAttribute('aria-expanded') !== 'true');
  });
});

document.querySelectorAll('[data-expand-all]').forEach((button) => {
  button.addEventListener('click', () => accordionButtons.forEach((item) => setAccordion(item, true)));
});

document.querySelectorAll('[data-collapse-all]').forEach((button) => {
  button.addEventListener('click', () => accordionButtons.forEach((item) => setAccordion(item, false)));
});

document.querySelector('[data-print]').addEventListener('click', () => window.print());

const sections = data.sections.map((section) => document.getElementById(section.id));
const navLinks = [...document.querySelectorAll('[data-nav-link]')];
const navScroll = document.querySelector('[data-nav-scroll]');
const navScrollWrap = navScroll.closest('.nav-scroll-wrap');

const updateScrollCue = () => {
  const canScroll = navScroll.scrollWidth > navScroll.clientWidth + 4;
  const hasStartedScrolling = navScroll.scrollLeft > 4;
  navScrollWrap.classList.toggle('show-scroll-cue', canScroll && !hasStartedScrolling);
};

navScroll.addEventListener('scroll', updateScrollCue, { passive: true });
window.addEventListener('resize', updateScrollCue);
requestAnimationFrame(updateScrollCue);

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach((link) => link.classList.toggle('is-active', link.hash === `#${visible.target.id}`));
}, { rootMargin: '-30% 0px -60%', threshold: [0.01, 0.2, 0.5] });
sections.forEach((section) => observer.observe(section));
