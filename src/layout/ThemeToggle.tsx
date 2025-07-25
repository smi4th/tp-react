import { useTheme } from '@context/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                className="toggle border-indigo-600 bg-indigo-500 checked:border-orange-500 checked:bg-orange-400 checked:text-orange-800"
                checked={theme === 'dracula'}
                onChange={toggleTheme}
            />
            <span className="text-sm text-gray-700">
        {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
      </span>
        </label>
    );
}
