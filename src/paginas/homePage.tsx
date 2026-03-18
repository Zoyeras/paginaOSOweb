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

// Configuración de categorías local (fallback)
const categoryConfig = [
  { label: "Amor y amistad", folder: "Amor y amistad", price: "COTIZA YA" },
  { label: "Anime", folder: "Anime", price: "COTIZA YA" },
  { label: "Autos", folder: "Autos", price: "COTIZA YA" },
  { label: "Estudio Ghibli", folder: "Estudio Ghibli", price: "COTIZA YA" },
  { label: "Religioso", folder: "Religioso", price: "COTIZA YA" },
] as const;

const categories = ["Todo", ...categoryConfig.map((c) => c.label)];

const productImages = import.meta.glob(
    "../../public/imagenes/Mockups camisetas/**/*.{jpg,jpeg,png,webp}",
    { eager: true, import: "default" }
) as Record<string, string>;

const toTitle = (filePath: string) => {
  const fileName = filePath.split("/").pop() || "Diseno";
  return fileName
      .replace(/\.(jpg|jpeg|png|webp)$/i, "")
      .replace(/^´MOCKUP EDITABLE[-_]?/i, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
};

const localProducts: Product[] = categoryConfig.flatMap((category, i) => {
  const folderSegment = `/Mockups camisetas/${category.folder}/`;
  const folderImages = Object.entries(productImages)
      .filter(([path]) => path.includes(folderSegment))
      .sort(([a], [b]) => a.localeCompare(b, "es"));

  return folderImages.map(([path, url], j) => ({
    id: i * 1000 + j + 1,
    title: toTitle(path),
    category: category.label,
    price: category.price,
    badge: j < 3 ? "Top ventas" : "Disponible",
    image: url,
    description: `Diseño de la colección ${category.label}.`,
  }));
});

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

const ROWS_PER_BATCH = 3;
const MAX_CARDS_PER_ROW = 4;
const PRODUCTS_BATCH_SIZE = ROWS_PER_BATCH * MAX_CARDS_PER_ROW;
const MOBILE_PRODUCTS_BATCH_SIZE = 8;

const HomePage = () => {
  const { darkMode } = useDarkMode();
  const [selectedCategory, setSelectedCategory] = useState("Todo");
  const [visibleProductsCount, setVisibleProductsCount] = useState(PRODUCTS_BATCH_SIZE);
  const [notice, setNotice] = useState<{ kind: "error" | "success"; message: string } | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [contactForm, setContactForm] = useState({ nombre: "", ubicacion: "", tipoDiseno: "", cantidad: "", detalles: "" });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutForm, setCheckoutForm] = useState({ nombre: "", ubicacion: "", notas: "" });

  // Estados para productos de Drive
  const [driveProducts, setDriveProducts] = useState<Product[]>([]);
  const [driveCategories, setDriveCategories] = useState<string[]>(["Todo"]);

  // Detectar vista móvil
  const [isMobileView, setIsMobileView] = useState(false);
  const productsBatchSize = isMobileView ? MOBILE_PRODUCTS_BATCH_SIZE : PRODUCTS_BATCH_SIZE;

  const whatsappNumber = "573219064790";

  const showNotice = (message: string, kind: "error" | "success" = "error") => {
    setNotice({ message, kind });
  };

  useEffect(() => {
    const fetchDriveProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.products) {
          setDriveProducts(data.products);
          const cats = ['Todo', ...new Set(data.products.map((p: Product) => p.category) as string[])];
          setDriveCategories(cats as string[]);
        }
      } catch {
        showNotice('Error al cargar productos', 'error');
      }
    };
    fetchDriveProducts();
  }, []);

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determinar qué productos y categorías mostrar (prioridad a Drive)
  const currentProducts = driveProducts.length > 0 ? driveProducts : localProducts;
  const currentCategories = driveCategories.length > 1 ? driveCategories : categories;

  const filteredProducts = useMemo(() => {
    return currentProducts.filter((p) => selectedCategory === "Todo" || p.category === selectedCategory);
  }, [selectedCategory, currentProducts]);

  const visibleProducts = useMemo(
      () => filteredProducts.slice(0, visibleProductsCount),
      [filteredProducts, visibleProductsCount]
  );

  const hasMoreProducts = visibleProductsCount < filteredProducts.length;

  useEffect(() => {
    setVisibleProductsCount(productsBatchSize);
  }, [selectedCategory, productsBatchSize]);

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

  const handleContactChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
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

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!contactForm.nombre.trim() || !contactForm.ubicacion.trim()) {
      showNotice("Completa nombre y ubicacion para enviar tu propuesta.");
      return;
    }

    const message = [
      "Hola O.S.O Studio, tengo una propuesta para ustedes:",
      "",
      `Nombre: ${contactForm.nombre.trim()}`,
      `Ubicacion: ${contactForm.ubicacion.trim()}`,
      `Tipo de diseño: ${contactForm.tipoDiseno.trim() || "No especificado"}`,
      `Cantidad: ${contactForm.cantidad.trim() || "No especificada"}`,
      "",
      "Detalles:",
      contactForm.detalles.trim() || "Sin detalles adicionales",
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    showNotice("Abriendo WhatsApp con tu propuesta.", "success");
    setContactForm({ nombre: "", ubicacion: "", tipoDiseno: "", cantidad: "", detalles: "" });
  };

  const toggleLike = (productId: number) => {
    // Función para marcar favoritos (puede extenderse en futuro)
    console.log("Favorito toggled:", productId);
  };

  const clearCart = () => setCart([]);

  useEffect(() => {
    if (!previewProduct) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewProduct(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [previewProduct]);

  return (
      <div className={`min-h-screen ${darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"}`}>
        {/* Notificación */}
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

        {/* Preview de producto */}
        {previewProduct && (
            <div
                className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
                onClick={() => setPreviewProduct(null)}
                role="dialog"
                aria-modal="true"
                aria-label={`Vista previa de ${previewProduct.title}`}
            >
              <div
                  className={`relative w-full max-w-4xl overflow-hidden rounded-3xl border shadow-2xl ${
                      darkMode ? "border-white/10 bg-slate-900" : "border-slate-200 bg-white"
                  }`}
                  onClick={(event) => event.stopPropagation()}
              >
                <button
                    onClick={() => setPreviewProduct(null)}
                    className="absolute right-3 top-3 z-10 rounded-full bg-black/60 px-3 py-1 text-sm text-white"
                    aria-label="Cerrar vista previa"
                >
                  ✕
                </button>
                <img
                    src={previewProduct.image}
                    alt={previewProduct.title}
                    className="max-h-[80vh] w-full object-contain"
                />
                <div className={`flex items-center justify-between gap-3 px-5 py-4 ${darkMode ? "text-slate-200" : "text-slate-700"}`}>
                  <p className="text-sm font-semibold">{previewProduct.title}</p>
                  <p className="text-sm font-semibold">{previewProduct.price}</p>
                </div>
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
              {heroSlides[0].title}
            </h1>
            <p className={`mt-5 max-w-xl text-lg ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
              {heroSlides[0].subtitle}
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

            {/* Filtros de categoría dinámicos */}
            <div className="mb-6 flex flex-wrap gap-2">
              {currentCategories.map((category) => (
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

            {/* Grid de productos */}
            <div className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product) => (
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
                          className="h-44 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-64"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    {product.badge}
                  </span>
                      <button
                          onClick={() => toggleLike(product.id)}
                          className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-2 text-sm text-white backdrop-blur-md hover:scale-110 transition"
                          aria-label="Marcar favorito"
                      >
                        ♡
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
                            onClick={() => setPreviewProduct(product)}
                        >
                          Ver
                        </button>
                      </div>
                    </div>
                  </article>
              ))}
            </div>

            {hasMoreProducts && (
                <div className="mt-6 flex justify-center">
                  <button
                      onClick={() =>
                          setVisibleProductsCount(
                              (prev) => prev + productsBatchSize
                          )
                      }
                      className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white"
                  >
                    Ver mas
                  </button>
                </div>
            )}

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
