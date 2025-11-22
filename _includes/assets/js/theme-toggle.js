// Theme toggle functionality
(function() {
  const initTheme = () => {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const htmlElement = document.documentElement;
    
    // Get saved theme from localStorage or use system preference
    const getSavedTheme = () => {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      return 'light';
    };
    
    // Set theme
    const setTheme = (theme) => {
      htmlElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      themeToggle.setAttribute('aria-pressed', theme === 'dark');
    };
    
    // Initialize theme on page load
    const currentTheme = getSavedTheme();
    setTheme(currentTheme);

    const toggleTheme = () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    };
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', toggleTheme);

    // Toggle on "d" keypress (skip if typing in inputs/textareas)
    window.addEventListener('keydown', (e) => {
      const targetTag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
      if (targetTag === 'input' || targetTag === 'textarea') return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === 'd' || e.key === 'D') {
        toggleTheme();
      }
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  };
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
