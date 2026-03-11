// src/componentes/header.tsx
import { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

const navItems = [
  { href: "#inicio", label: "Inicio" },
  { href: "#coleccion", label: "Coleccion" },
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
];

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        darkMode
          ? isScrolled
            ? "border-white/10 bg-slate-950/80 backdrop-blur-xl"
            : "border-transparent bg-slate-950/40"
          : isScrolled
          ? "border-slate-200 bg-white/80 backdrop-blur-xl"
          : "border-transparent bg-white/40"
      }`}
    >
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#inicio" className="group flex items-center gap-3">
          <img
            src="/imagenes/logo1.png"
            alt="OSO"
            className="h-10 w-10 rounded-xl object-cover"
          />
          <div className="leading-tight">
            <p
              className={`text-sm font-semibold ${
                darkMode ? "text-fuchsia-300" : "text-fuchsia-700"
              }`}
            >
              O.S.O Studio
            </p>
            <p
              className={`text-xs ${
                darkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              camisetas con personalidad
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                darkMode
                  ? "text-slate-200 hover:bg-white/10 hover:text-white"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            aria-label={
              darkMode ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
            }
            className={`rounded-full p-2.5 transition ${
              darkMode
                ? "bg-white/10 text-white hover:bg-white/20"
                : "bg-slate-100 text-slate-800 hover:bg-slate-200"
            }`}
          >
            {darkMode ? "☀" : "☾"}
          </button>

          <a
            href="#coleccion"
            className="hidden rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:scale-[1.02] md:inline-block"
          >
            Explorar drops
          </a>

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`rounded-full p-2.5 md:hidden ${
              darkMode ? "bg-white/10 text-white" : "bg-slate-100 text-slate-800"
            }`}
            aria-label="Abrir menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={`border-t px-4 pb-5 pt-3 md:hidden ${
            darkMode ? "border-white/10 bg-slate-950/95" : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm font-medium ${
                  darkMode
                    ? "text-slate-200 hover:bg-white/10"
                    : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#coleccion"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Ver camisetas
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
