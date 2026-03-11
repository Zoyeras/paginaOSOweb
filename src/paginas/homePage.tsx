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

type CartItem = {
  id: number;
  title: string;
  price: string;
  quantity: number;
};

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

const categories = ["Todo", "Anime", "Romance", "Autos", "Ghibli", "Religioso"];

const heroSlides = [
  {
    title: "Tu camiseta no es ropa.\nEs identidad.",
    subtitle: "Drops con diseños unicos para que te miren dos veces.",
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

const parsePrice = (price: string) => Number(price.replace(/[^\d]/g, ""));
const formatPrice = (value: number) =>
  `$${new Intl.NumberFormat("es-CO").format(value)}`;

const HomePage = () => {
  const { darkMode } = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState("Todo");
  const [activeSlide, setActiveSlide] = useState(0);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [notice, setNotice] = useState<{
    kind: "error" | "success";
    message: string;
  } | null>(null);
  const [contactForm, setContactForm] = useState({
    nombre: "",
    ubicacion: "",
    tipoDiseno: "",
    cantidad: "",
    detalles: "",
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutForm, setCheckoutForm] = useState({
    nombre: "",
    ubicacion: "",
    notas: "",
  });

  const whatsappNumber = "573219064790";

  const showNotice = (message: string, kind: "error" | "success" = "error") => {
    setNotice({ message, kind });
  };

  const handleContactChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !contactForm.nombre.trim() ||
      !contactForm.ubicacion.trim() ||
      !contactForm.tipoDiseno.trim()
    ) {
      showNotice("Completa nombre, ubicacion y tipo de diseno para continuar.");
      return;
    }

    const message = [
      "Hola O.S.O Studio, quiero mi propuesta.",
      "",
      `Nombre: ${contactForm.nombre.trim()}`,
      `Ubicacion: ${contactForm.ubicacion.trim()}`,
      `Tipo de camisa/diseno: ${contactForm.tipoDiseno.trim()}`,
      `Cantidad aproximada: ${contactForm.cantidad.trim() || "Por definir"}`,
      `Detalles: ${contactForm.detalles.trim() || "Sin detalles adicionales"}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    showNotice("Abriendo WhatsApp con tu propuesta.", "success");
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!notice) return;
    const timeout = setTimeout(() => setNotice(null), 3500);
    return () => clearTimeout(timeout);
  }, [notice]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Todo" || product.category === selectedCategory;

      return matchesCategory;
    });
  }, [selectedCategory]);

  useEffect(() => {
    const rawCart = localStorage.getItem("oso_cart");
    if (rawCart) {
      try {
        const parsed = JSON.parse(rawCart) as CartItem[];
        setCart(parsed);
      } catch {
        setCart([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("oso_cart", JSON.stringify(cart));
  }, [cart]);

  const toggleLike = (id: number) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
        },
      ];
    });
  };

  const changeQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartItemsCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((acc, item) => acc + parsePrice(item.price) * item.quantity, 0),
    [cart]
  );

  const handleCheckoutChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setCheckoutForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCartSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cart.length === 0) {
      showNotice("Tu carrito esta vacio.");
      return;
    }

    if (!checkoutForm.nombre.trim() || !checkoutForm.ubicacion.trim()) {
      showNotice("Completa nombre y ubicacion para finalizar la compra.");
      return;
    }

    const itemsLines = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.title} x${item.quantity} - ${item.price}`
      )
      .join("\n");

    const message = [
      "Hola O.S.O Studio, quiero comprar estas camisetas:",
      "",
      itemsLines,
      "",
      `Total estimado: ${formatPrice(cartTotal)}`,
      "",
      "Datos del comprador:",
      `Nombre: ${checkoutForm.nombre.trim()}`,
      `Ubicacion: ${checkoutForm.ubicacion.trim()}`,
      `Notas: ${checkoutForm.notas.trim() || "Sin notas adicionales"}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    showNotice("Abriendo WhatsApp con tu pedido.", "success");
  };

  const clearCart = () => setCart([]);

  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"}`}>
      {notice && (
        <div className="fixed right-4 top-24 z-[60] max-w-sm animate-[fadeIn_.2s_ease-out]">
          <div
            className={`flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur ${
              notice.kind === "error"
                ? darkMode
                  ? "border-red-400/40 bg-red-500/15 text-red-100"
                  : "border-red-200 bg-red-50 text-red-700"
                : darkMode
                ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-100"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            <span className="pt-0.5 text-base">{notice.kind === "error" ? "⚠" : "✓"}</span>
            <p className="text-sm font-medium">{notice.message}</p>
            <button
              onClick={() => setNotice(null)}
              className="ml-2 text-xs opacity-80 transition hover:opacity-100"
              aria-label="Cerrar notificacion"
            >
              ✕
            </button>
          </div>
        </div>
      )}

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
            <h1 className="whitespace-pre-line text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
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

          <div className="mb-4 flex items-center justify-end">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                darkMode ? "bg-white/10 text-slate-200" : "bg-slate-100 text-slate-700"
              }`}
            >
              Carrito: {cartItemsCount} item{cartItemsCount === 1 ? "" : "s"}
            </span>
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
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-3 py-2 text-sm font-semibold text-white"
                    >
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

          <div
            className={`mt-8 rounded-3xl border p-5 ${
              darkMode ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
            }`}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 className="text-xl font-bold">Carrito de compra</h3>
              <button
                onClick={clearCart}
                className={`rounded-lg px-3 py-1 text-xs font-semibold ${
                  darkMode ? "bg-white/10 text-slate-200" : "bg-slate-100 text-slate-700"
                }`}
              >
                Vaciar carrito
              </button>
            </div>

            {cart.length === 0 ? (
              <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                Aun no agregas productos. Pulsa "Agregar" en cualquier camiseta.
              </p>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between rounded-2xl border px-3 py-2 ${
                      darkMode ? "border-white/10 bg-slate-900/50" : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className={`text-xs ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                        {item.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQuantity(item.id, -1)}
                        className={`h-7 w-7 rounded-full ${
                          darkMode ? "bg-white/10" : "bg-slate-200"
                        }`}
                      >
                        -
                      </button>
                      <span className="min-w-6 text-center text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => changeQuantity(item.id, 1)}
                        className={`h-7 w-7 rounded-full ${
                          darkMode ? "bg-white/10" : "bg-slate-200"
                        }`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-4 text-sm font-semibold">
              Total estimado: {formatPrice(cartTotal)}
            </p>

            <form className="mt-4 space-y-3" onSubmit={handleCartSubmit}>
              <input
                type="text"
                name="nombre"
                value={checkoutForm.nombre}
                onChange={handleCheckoutChange}
                placeholder="Tu nombre"
                className={`w-full rounded-xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                  darkMode
                    ? "border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                    : "border-slate-200 bg-slate-50 placeholder:text-slate-500"
                }`}
              />
              <input
                type="text"
                name="ubicacion"
                value={checkoutForm.ubicacion}
                onChange={handleCheckoutChange}
                placeholder="Ubicacion de entrega"
                className={`w-full rounded-xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                  darkMode
                    ? "border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                    : "border-slate-200 bg-slate-50 placeholder:text-slate-500"
                }`}
              />
              <textarea
                rows={3}
                name="notas"
                value={checkoutForm.notas}
                onChange={handleCheckoutChange}
                placeholder="Notas (talla, color, fecha, etc)"
                className={`w-full rounded-xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                  darkMode
                    ? "border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                    : "border-slate-200 bg-slate-50 placeholder:text-slate-500"
                }`}
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white"
              >
                Comprar por WhatsApp
              </button>
            </form>
          </div>
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

          <form className="space-y-4" onSubmit={handleContactSubmit}>
            <input
              type="text"
              name="nombre"
              value={contactForm.nombre}
              onChange={handleContactChange}
              placeholder="Nombre"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                darkMode
                  ? "border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                  : "border-slate-200 bg-slate-50 placeholder:text-slate-500"
              }`}
            />
            <input
              type="text"
              name="ubicacion"
              value={contactForm.ubicacion}
              onChange={handleContactChange}
              placeholder="Ubicacion (ciudad o barrio)"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                darkMode
                  ? "border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                  : "border-slate-200 bg-slate-50 placeholder:text-slate-500"
              }`}
            />
            <input
              type="text"
              name="tipoDiseno"
              value={contactForm.tipoDiseno}
              onChange={handleContactChange}
              placeholder="Tipo de camisa o diseno"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                darkMode
                  ? "border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                  : "border-slate-200 bg-slate-50 placeholder:text-slate-500"
              }`}
            />
            <input
              type="text"
              name="cantidad"
              value={contactForm.cantidad}
              onChange={handleContactChange}
              placeholder="Cantidad aproximada"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                darkMode
                  ? "border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                  : "border-slate-200 bg-slate-50 placeholder:text-slate-500"
              }`}
            />
            <textarea
              rows={4}
              name="detalles"
              value={contactForm.detalles}
              onChange={handleContactChange}
              placeholder="Cuentanos idea, colores, referencias o fecha limite"
              className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-fuchsia-500 ${
                darkMode
                  ? "border-white/10 bg-white/5 text-white placeholder:text-slate-400"
                  : "border-slate-200 bg-slate-50 placeholder:text-slate-500"
              }`}
            />
            <button
              type="submit"
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
