
function ThemeToggle() {
  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
  };

  return (
    <button className="btn" onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
}

export default ThemeToggle;
