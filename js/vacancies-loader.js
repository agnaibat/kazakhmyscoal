async function loadVacancies() {
    try {
        // Загружаем список файлов вакансий
        const response = await fetch('/api/vacancies');
        const files = await response.json();

        const grid = document.querySelector('.vacancies-grid');
        if (!grid) return;

        grid.innerHTML = '';

        for (const file of files) {
            const res = await fetch(`/_data/vacancies/${file}`);
            const vacancy = await res.json();

            if (!vacancy.active) continue;

            grid.innerHTML += `
                <div class="vacancy-card">
                    <div class="vacancy-header">
                        <div>
                            <span class="vacancy-dept">${vacancy.department}</span>
                            <h3>${vacancy.title}</h3>
                        </div>
                        <span class="vacancy-type">${vacancy.schedule}</span>
                    </div>
                    <ul class="vacancy-requirements">
                        ${vacancy.requirements.map(r => `<li>${r.item}</li>`).join('')}
                    </ul>
                    <div class="vacancy-footer">
                        <span class="vacancy-salary">${vacancy.salary}</span>
                        <a href="#apply" class="vacancy-btn">Откликнуться</a>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Ошибка загрузки вакансий:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadVacancies);