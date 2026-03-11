// src/componentes/footer.tsx
import { useDarkMode } from "../context/DarkModeContext";

const footerSections = [
  {
    title: "Explora",
    links: [
      { label: "Inicio", href: "#inicio" },
      { label: "Coleccion", href: "#coleccion" },
      { label: "Proceso", href: "#proceso" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Guia de tallas", href: "#" },
      { label: "Envios", href: "#" },
      { label: "Cambios y devoluciones", href: "#" },
      { label: "Preguntas frecuentes", href: "#" },
    ],
  },
];

const Footer = () => {
  const { darkMode } = useDarkMode();
  const year = new Date().getFullYear();

  return (
    <footer
      className={`relative border-t ${
        darkMode ? "border-white/10 bg-slate-950 text-slate-300" : "border-slate-200 bg-white text-slate-700"
      }`}
    >
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <img src="/imagenes/logo2.png" alt="OSO" className="h-11 w-11 rounded-xl object-cover" />
            <div>
              <p className={`text-lg font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>O.S.O Studio</p>
              <p className="text-sm">disenos que se sienten tuyos</p>
            </div>
          </div>
          <p className={`max-w-md text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
            Camisetas personalizadas para regalar, emprender o romperla con tu propio estilo. Produccion local, estampado premium y atencion rapida por WhatsApp.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Algodon premium",
              "Pago seguro",
              "Envios nacionales",
              "Garantia de estampado",
            ].map((tag) => (
              <span
                key={tag}
                className={`rounded-full border px-3 py-1 text-xs ${
                  darkMode ? "border-white/15 bg-white/5" : "border-slate-200 bg-slate-50"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {footerSections.map((section) => (
          <div key={section.title}>
            <h3 className={`mb-3 text-sm font-semibold uppercase tracking-[0.16em] ${darkMode ? "text-white" : "text-slate-900"}`}>
              {section.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {section.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={`transition ${darkMode ? "hover:text-white" : "hover:text-slate-950"}`}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={`border-t px-4 py-5 text-center text-xs ${darkMode ? "border-white/10 text-slate-500" : "border-slate-200 text-slate-500"}`}>
        <p>© {year} O.S.O Studio. Hecho en Bogota para todo Colombia.</p>
      </div>
    </footer>
  );
};

export default Footer;
