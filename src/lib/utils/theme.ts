export function initTheme() {
    const root = document.documentElement;
    const saved = localStorage.getItem('theme');
    if (saved === 'light') root.classList.remove('dark');
    else root.classList.add('dark');
}

export function setupThemeToggle(
    onThemeChange: (isDark: boolean) => void
) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    const root = document.documentElement;
    const sun = document.getElementById('icon-sun');
    const moon = document.getElementById('icon-moon');

    function syncUI() {
        const isDark = root.classList.contains('dark');
        btn.setAttribute('aria-pressed', String(isDark));
        moon?.classList.toggle('hidden', !isDark);
        sun?.classList.toggle('hidden', isDark);
        onThemeChange(isDark);
    }

    btn.addEventListener('click', () => {
        const isDark = root.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        syncUI();
    });

    syncUI();
}
