// src/paginas/homePage.tsx
import { useEffect, useMemo, useState } from "react";
import Header from "../componentes/header";
import Footer from "../componentes/footer";
import { useDarkMode } from "../context/DarkModeContext";

type Product = {
  id: number;
  title: string;
  category: string;
  price: string;
  badge: string;
  image: string;
  description: string;
};

const categories = ["Todo", "Anime", "Romance", "Autos", "Ghibli", "Religioso"];

const products: Product[] = [
  {
    id: 1,
    title: "Love Drop #01",
    category: "Romance",
    price: "$59.900",
    badge: "Top ventas",
    image: "/imagenes/Mockups camisetas/Amor y amistad/Amor1.jpg",
    description: "Diseño clean con vibra romantica para regalo o date night.",
  },
  {
    id: 2,
    title: "Shonen Energy",
    category: "Anime",
    price: "$64.900",
    badge: "Nuevo",
    image: "/imagenes/Mockups camisetas/Amor y amistad/Amor2.jpg",
    description: "Estilo grafico intenso y contraste alto para streetwear.",
  },
  {
    id: 3,
    title: "Turbo Classic",
    category: "Autos",
    price: "$62.900",
    badge: "Edicion limitada",
    image: "/imagenes/Mockups camisetas/Amor y amistad/Amor3.jpg",
    description: "Acentos vintage para fan de motores y cultura racing.",
  },
  {
    id: 4,
    title: "Spirit Forest",
    category: "Ghibli",
    price: "$61.900",
    badge: "Fan favorite",
    image: "/imagenes/Mockups camisetas/Amor y amistad/Amor4.jpg",
    description: "Paleta suave con toque magico inspirada en fantasia.",
  },
  {
    id: 5,
    title: "Fe Minimal",
    category: "Religioso",
    price: "$57.900",
    badge: "Popular",
    image: "/imagenes/Mockups camisetas/Amor y amistad/Amor5.jpg",
    description: "Mensaje inspiracional con una composicion elegante.",
  },
  {
    id: 6,
    title: "Tokyo Pulse",
    category: "Anime",
    price: "$66.900",
    badge: "Premium",
    image: "/imagenes/Mockups camisetas/Amor y amistad/Amor6.jpg",
    description: "Diseño vibrante para quienes quieren destacar de una.",
  },
  {
    id: 7,
    title: "Heartline",
    category: "Romance",
    price: "$58.900",
    badge: "Especial",
    image: "/imagenes/Mockups camisetas/Amor y amistad/Amor7.jpg",
    description: "Minimal pero expresiva, ideal para regalo personalizado.",
  },
  {
    id: 8,
    title: "Track Day",
    category: "Autos",
    price: "$60.900",
    badge: "Nuevo",
    image: "/imagenes/Mockups camisetas/Amor y amistad/Amor8.jpg",
    description: "Tipografia agresiva y energia de pista en cada detalle.",
  },
  {
    id: 9,
    title: "Cloud Walker",
    category: "Ghibli",
    price: "$63.900",
    badge: "Top ventas",
    image: "/imagenes/Mockups camisetas/Amor y amistad/Amor9.jpg",
    description: "Acabado artistico con composicion soñadora y suave.",
  },
  {
    id: 10,
    title: "Grace Edition",
    category: "Religioso",
    price: "$59.900",
    badge: "Recomendado",
    image: "/imagenes/Mockups camisetas/Amor y amistad/Amor10.jpg",
    description: "Visual pulido para un look sobrio con mensaje potente.",
  },
];

const heroSlides = [
  {
    title: "Tu camiseta no es ropa. Es identidad.",
    subtitle: "Drops con disenos unicos para que te miren dos veces.",
  },
  {
    title: "Personalizamos tu idea en menos de 48h.",
    subtitle: "Nos mandas referencia, nosotros la convertimos en pieza top.",
  },
  {
    title: "Calidad premium que aguanta lavadas reales.",
    subtitle: "Algodon suave, estampado durable y colores vivos.",
  },
];

const HomePage = () => {
  const { darkMode } = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState("Todo");
  const [query, setQuery] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Todo" || product.category === selectedCategory;
      const normalizedQuery = query.toLowerCase().trim();
      const matchesQuery =
        normalizedQuery.length === 0 ||
        product.title.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  const toggleLike = (id: number) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"}`}>
      <Header />

      <section id="inicio" className="relative isolate overflow-hidden px-4 pb-20 pt-32 sm:px-6">
        <div className="hero-mesh absolute inset-0 -z-20" />
        <div className="absolute -left-24 top-20 -z-10 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="absolute -right-16 bottom-10 -z-10 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className={`mb-4 inline-flex rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
              darkMode
                ? "border-fuchsia-400/40 bg-fuchsia-500/10 text-fuchsia-200"
                : "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-700"
            }`}>
              nueva temporada 2026
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              {heroSlides[activeSlide].title}
            </h1>
            <p className={`mt-5 max-w-xl text-lg ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
              {heroSlides[activeSlide].subtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#coleccion"
                className="rounded-2xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:scale-[1.02]"
              >
                Ver coleccion
              </a>
              <a
                href="https://wa.me/573219064790"
                target="_blank"
                rel="noreferrer"
                className={`rounded-2xl border px-6 py-3 font-semibold transition ${
                  darkMode
                    ? "border-white/20 bg-white/5 hover:bg-white/10"
                    : "border-slate-300 bg-white hover:bg-slate-100"
                }`}
              >
                Cotizar por WhatsApp
              </a>
            </div>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-3 text-center text-sm">
              {[
                { value: "+1.4k", label: "clientes felices" },
                { value: "48h", label: "produccion express" },
                { value: "4.9/5", label: "calificacion" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className={`rounded-2xl border p-3 ${
                    darkMode ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
                  }`}
                >
                  <p className="text-lg font-extrabold">{metric.value}</p>
                  <p className={darkMode ? "text-slate-400" : "text-slate-500"}>{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className={`absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-fuchsia-500/40 to-indigo-500/40 blur-2xl`} />
            <div
              className={`relative overflow-hidden rounded-[2rem] border p-4 ${
                darkMode ? "border-white/10 bg-slate-900/80" : "border-slate-200 bg-white/95"
              }`}
            >
              <img
                src="/imagenes/Mockups camisetas/Amor y amistad/Amor11.jpg"
                alt="Camiseta destacada"
                className="h-[28rem] w-full rounded-[1.5rem] object-cover"
              />
              <div className="absolute inset-x-7 bottom-7 rounded-2xl bg-black/45 p-4 text-white backdrop-blur-md">
                <p className="text-xs uppercase tracking-[0.16em] text-fuchsia-200">Drop destacado</p>
                <p className="text-lg font-semibold">Glow Series 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="coleccion" className="px-4 pb-20 sm:px-6">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${darkMode ? "text-fuchsia-300" : "text-fuchsia-700"}`}>
                coleccion curada
              </p>
              <h2 className="mt-1 text-3xl font-black sm:text-4xl">Encuentra tu estilo en segundos</h2>
            </div>
            <p className={`max-w-md text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              Filtra por categoria o busca por palabra clave. Diseno pensado para comprar rapido y decidir sin ruido.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white"
                    : darkMode
                    ? "bg-white/5 text-slate-300 hover:bg-white/10"
                    : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={`mb-8 flex items-center gap-3 rounded-2xl border p-3 ${darkMode ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"}`}>
            <span className={darkMode ? "text-slate-400" : "text-slate-500"}>🔍</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar: anime, minimal, regalo, racing..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className={`group overflow-hidden rounded-3xl border transition hover:-translate-y-1 hover:shadow-2xl ${
                  darkMode
                    ? "border-white/10 bg-slate-900/85 hover:shadow-fuchsia-500/15"
                    : "border-slate-200 bg-white hover:shadow-slate-300/60"
                }`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    {product.badge}
                  </span>
                  <button
                    onClick={() => toggleLike(product.id)}
                    className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-2 text-sm text-white backdrop-blur-md"
                    aria-label="Marcar favorito"
                  >
                    {liked[product.id] ? "♥" : "♡"}
                  </button>
                </div>

                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-base font-bold">{product.title}</p>
                    <p className={`text-sm font-semibold ${darkMode ? "text-fuchsia-300" : "text-fuchsia-700"}`}>
                      {product.price}
                    </p>
                  </div>
                  <p className={`mb-4 text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {product.description}
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-3 py-2 text-sm font-semibold text-white">
                      Agregar
                    </button>
                    <button
                      className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                        darkMode ? "bg-white/10 text-slate-100" : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      Ver
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className={`mt-6 rounded-2xl border p-5 text-sm ${darkMode ? "border-white/10 bg-white/5 text-slate-300" : "border-slate-200 bg-white text-slate-600"}`}>
              No encontramos camisetas con ese criterio. Prueba otra categoria o palabra clave.
            </div>
          )}
        </div>
      </section>

      <section id="proceso" className={`px-4 pb-20 sm:px-6`}>
        <div className={`mx-auto grid w-full max-w-7xl gap-6 rounded-[2rem] border p-6 md:grid-cols-3 ${
          darkMode ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
        }`}>
          {[
            {
              step: "01",
              title: "Cuéntanos tu idea",
              text: "Nos envias referencias por WhatsApp o Instagram y te proponemos direccion visual.",
            },
            {
              step: "02",
              title: "Diseñamos y validamos",
              text: "Te mostramos preview del diseño para aprobar antes de imprimir.",
            },
            {
              step: "03",
              title: "Producimos y enviamos",
              text: "Estampado premium, control de calidad y envio seguro en todo Colombia.",
            },
          ].map((item) => (
            <article
              key={item.step}
              className={`rounded-2xl border p-5 ${darkMode ? "border-white/10 bg-slate-900/70" : "border-slate-200 bg-slate-50"}`}
            >
              <p className={`text-xs font-semibold tracking-[0.2em] ${darkMode ? "text-fuchsia-300" : "text-fuchsia-700"}`}>
                PASO {item.step}
              </p>
              <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
              <p className={`mt-2 text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contacto" className="px-4 pb-16 sm:px-6">
        <div className={`mx-auto grid w-full max-w-7xl gap-8 rounded-[2rem] border p-6 lg:grid-cols-2 ${
          darkMode ? "border-white/10 bg-slate-900/80" : "border-slate-200 bg-white"
        }`}>
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${darkMode ? "text-fuchsia-300" : "text-fuchsia-700"}`}>
              contacto directo
            </p>
            <h2 className="mt-2 text-3xl font-black">Listo para tu proximo drop</h2>
            <p className={`mt-3 max-w-lg text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              Si quieres vender con tu marca o hacer camisetas para evento, te respondemos rapido y te guiamos en todo el proceso.
            </p>

            <div className="mt-6 space-y-3 text-sm">
              <p>📱 +57 321 9064790</p>
              <p>✉ camisetasydisenososo@gmail.com</p>
              <p>📍 Bogota, Colombia</p>
            </div>
          </div>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Nombre"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                darkMode
                  ? "border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                  : "border-slate-200 bg-slate-50 placeholder:text-slate-500"
              }`}
            />
            <input
              type="email"
              placeholder="Correo"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                darkMode
                  ? "border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                  : "border-slate-200 bg-slate-50 placeholder:text-slate-500"
              }`}
            />
            <textarea
              rows={4}
              placeholder="Que tipo de camiseta o diseño necesitas?"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                darkMode
                  ? "border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                  : "border-slate-200 bg-slate-50 placeholder:text-slate-500"
              }`}
            />
            <button
              type="button"
              className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white"
            >
              Quiero mi propuesta
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
