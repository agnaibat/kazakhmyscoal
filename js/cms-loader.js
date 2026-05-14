/* ==================================================
   CMS LOADER — читает JSON и подставляет в HTML
================================================== */

// ===== ВАКАНСИИ =====
async function loadVacancies() {
    const grid = document.querySelector('.vacancies-grid');
    if (!grid) return;

    try {
        const res = await fetch('/_data/vacancies.json');
        const data = await res.json();
        const vacancies = data.items.filter(v => v.active);

        if (vacancies.length === 0) {
            grid.innerHTML = '<p class="no-vacancies">Открытых вакансий нет. Отправьте резюме — мы свяжемся при появлении подходящей позиции.</p>';
            return;
        }

        grid.innerHTML = vacancies.map(v => `
            <div class="vacancy-card">
                <div class="vacancy-header">
                    <div>
                        <span class="vacancy-dept">${v.department}</span>
                        <h3>${v.title}</h3>
                    </div>
                    <span class="vacancy-type">${v.schedule}</span>
                </div>
                <ul class="vacancy-requirements">
                    ${v.requirements.map(r => `<li>${r.item || r}</li>`).join('')}
                </ul>
                <div class="vacancy-footer">
                    <span class="vacancy-salary">${v.salary}</span>
                    <a href="#apply" class="vacancy-btn">Откликнуться</a>
                </div>
            </div>
        `).join('');

    } catch (e) {
        console.error('Ошибка загрузки вакансий:', e);
    }
}

// ===== КОМАНДА =====
async function loadTeam() {
    const managementGrid = document.querySelector('.employee-grid:not(.corporate-grid)');
    const corporateGrid = document.querySelector('.corporate-grid');
    if (!managementGrid && !corporateGrid) return;

    try {
        const res = await fetch('/_data/team.json');
        const data = await res.json();

        const management = data.items
            .filter(m => m.department === 'management')
            .sort((a, b) => a.order - b.order);

        const corporate = data.items
            .filter(m => m.department === 'corporate')
            .sort((a, b) => a.order - b.order);

        if (managementGrid) {
            managementGrid.innerHTML = management.map(m => `
                <div class="employee-card">
                    <img src="${m.photo || '../img/team/member1.jpeg'}" alt="${m.name}">
                    <h4>${m.name}</h4>
                    <p>${m.position}</p>
                </div>
            `).join('');
        }

        if (corporateGrid) {
            corporateGrid.innerHTML = corporate.map(m => `
                <div class="employee-card">
                    <img src="${m.photo || '../img/team/member1.jpeg'}" alt="${m.name}">
                    <h4>${m.name}</h4>
                    <p>${m.position}</p>
                </div>
            `).join('');
        }

    } catch (e) {
        console.error('Ошибка загрузки команды:', e);
    }
}

// ===== КОНТАКТЫ =====
async function loadContacts() {
    try {
        const res = await fetch('/_data/contacts.json');
        const data = await res.json();

        // Телефон
        document.querySelectorAll('[data-cms="phone"]').forEach(el => {
            el.textContent = data.phone;
            if (el.tagName === 'A') el.href = `tel:${data.phone.replace(/\s/g, '')}`;
        });

        // Email
        document.querySelectorAll('[data-cms="email"]').forEach(el => {
            el.textContent = data.email;
            if (el.tagName === 'A') el.href = `mailto:${data.email}`;
        });

        // Адрес
        document.querySelectorAll('[data-cms="address"]').forEach(el => {
            el.textContent = data.address;
        });

        // WhatsApp
        document.querySelectorAll('[data-cms="whatsapp"]').forEach(el => {
            if (el.tagName === 'A') el.href = `https://wa.me/${data.whatsapp.replace(/\D/g, '')}`;
        });

    } catch (e) {
        console.error('Ошибка загрузки контактов:', e);
    }
}

// ===== ЗАПУСК =====
document.addEventListener('DOMContentLoaded', () => {
    loadVacancies();
    loadTeam();
    loadContacts();
});