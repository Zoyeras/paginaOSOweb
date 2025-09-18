// src/paginas/homePage.tsx
import { useState, useEffect } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import Header from "../componentes/header";
import Footer from "../componentes/footer";

const HomePage = () => {
  const { darkMode } = useDarkMode();

  // Datos para los carruseles de camisetas por categoría
  const shirtCategories = [
    {
      name: "Amor y amistad",
      items: [
        {
          id: 1,
          title: "Diseño Romántico",
          description: "Expresa tu amor con nuestros diseños únicos",
          image: "Amor",
        },
        {
          id: 2,
          title: "Amistad Verdadera",
          description: "Celebra la amistad con estos diseños especiales",
          image: "Amor",
        },
        {
          id: 3,
          title: "Corazones Entrelazados",
          description: "Diseños con corazones para ocasiones especiales",
          image: "Amor",
        },
      ],
    },
    {
      name: "Anime",
      items: [
        {
          id: 1,
          title: "Personajes Populares",
          description: "Tus personajes favoritos de anime en camisetas",
          image: "Anime",
        },
        {
          id: 2,
          title: "Anime Clásico",
          description: "Diseños de series de anime icónicas",
          image: "Anime",
        },
        {
          id: 3,
          title: "Anime Moderno",
          description: "Los diseños más actuales del mundo del anime",
          image: "Anime",
        },
      ],
    },
    {
      name: "Autos",
      items: [
        {
          id: 1,
          title: "Deportivos",
          description: "Los autos más veloces y elegantes",
          image: "Auto",
        },
        {
          id: 2,
          title: "Clásicos",
          description: "Diseños vintage para amantes de los autos",
          image: "Auto",
        },
        {
          id: 3,
          title: "Conceptuales",
          description: "Diseños futuristas y abstractos de automóviles",
          image: "Auto",
        },
      ],
    },
    {
      name: "Estudio Ghibli",
      items: [
        {
          id: 1,
          title: "Mi Vecino Totoro",
          description: "El clásico personaje de Ghibli en tu camiseta",
          image: "Guibli",
        },
        {
          id: 2,
          title: "El Viaje de Chihiro",
          description: "Diseños mágicos de esta obra maestra",
          image: "Guibli",
        },
        {
          id: 3,
          title: "Castillo Ambulante",
          description: "Howl y Sophie en diseños únicos",
          image: "Guibli",
        },
      ],
    },
    {
      name: "Religioso",
      items: [
        {
          id: 1,
          title: "Inspiracional",
          description: "Mensajes de fe y esperanza",
          image: "Reli",
        },
        {
          id: 2,
          title: "Símbolos Sagrados",
          description: "Iconografía religiosa en diseños modernos",
          image: "Reli",
        },
        {
          id: 3,
          title: "Versículos",
          description: "Textos bíblicos con diseños elegantes",
          image: "Reli",
        },
      ],
    },
  ];

  // Estado para controlar el slide activo de cada categoría
  const [activeSlides, setActiveSlides] = useState<Record<string, number>>(
    shirtCategories.reduce((acc, category) => {
      acc[category.name] = 0;
      return acc;
    }, {} as Record<string, number>)
  );

  // Efecto para cambiar automáticamente los slides cada 3 segundos
  useEffect(() => {
    const intervals = shirtCategories.map((category) => {
      return setInterval(() => {
        setActiveSlides((prev) => {
          const currentSlide = prev[category.name];
          const itemsLength = category.items.length;
          return {
            ...prev,
            [category.name]: (currentSlide + 1) % itemsLength,
          };
        });
      }, 5000);
    });

    // Limpiar intervals al desmontar el componente
    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, []);

  const handlePrevSlide = (categoryName: string) => {
    setActiveSlides((prev) => {
      const currentSlide = prev[categoryName];
      const category = shirtCategories.find((cat) => cat.name === categoryName);
      const itemsLength = category?.items.length || 0;
      return {
        ...prev,
        [categoryName]: currentSlide === 0 ? itemsLength - 1 : currentSlide - 1,
      };
    });
  };

  const handleNextSlide = (categoryName: string) => {
    setActiveSlides((prev) => {
      const currentSlide = prev[categoryName];
      const category = shirtCategories.find((cat) => cat.name === categoryName);
      const itemsLength = category?.items.length || 0;
      return {
        ...prev,
        [categoryName]: currentSlide === itemsLength - 1 ? 0 : currentSlide + 1,
      };
    });
  };

  const services = [
    {
      title: "Diseño Personalizado",
      description: "Creamos diseños exclusivos según tus ideas y preferencias",
      icon: "🎨",
    },
    {
      title: "Estampado de Alta Calidad",
      description: "Técnicas avanzadas para un acabado duradero y profesional",
      icon: "👕",
    },
    {
      title: "Producción Rápida",
      description: "Entregas rápidas sin comprometer la calidad del producto",
      icon: "⚡",
    },
    {
      title: "Asesoramiento Creativo",
      description: "Nuestro equipo te ayuda a materializar tus ideas",
      icon: "💡",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <section
        id="inicio"
        className={`py-20 ${
          darkMode
            ? "bg-gray-800"
            : "bg-gradient-to-r from-blue-600 to-purple-600"
        } transition-colors duration-300 relative overflow-hidden`}
      >
        {/* Efecto de partículas */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/10 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 40 + 10}px`,
                height: `${Math.random() * 40 + 10}px`,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1
            className={`text-4xl md:text-6xl font-bold ${
              darkMode ? "text-white" : "text-white"
            } drop-shadow-lg`}
          >
            Diseños Exclusivos para Camisetas
          </h1>
          <p
            className={`mt-4 text-xl max-w-3xl mx-auto ${
              darkMode ? "text-blue-200" : "text-blue-100"
            }`}
          >
            Transformamos tus ideas en prendas únicas que reflejan tu
            personalidad
          </p>
          <div className="mt-10">
            <button
              className={`px-8 py-3 rounded-full font-bold text-lg relative overflow-hidden group ${
                darkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-white hover:bg-blue-50 text-blue-600"
              } transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
            >
              <span className="relative z-10">Ver Colección</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-white opacity-20 group-hover:opacity-0 transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </section>

      {/* Carruseles de Camisetas por Categoría */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Nuestras Camisetas
            </h2>
            <p
              className={`mt-2 max-w-2xl mx-auto ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Explora nuestra colección de camisetas de alta calidad por
              categorías
            </p>
          </div>

          {shirtCategories.map((category) => {
            const currentSlide = activeSlides[category.name];
            const item = category.items[currentSlide];
            // Generar número aleatorio entre 1 y 10 para la imagen
            const imageNumber = Math.floor(Math.random() * 10) + 1;
            const imagePath = `/src/assets/imagenes/Mockups camisetas/${category.name}/${item.image}${imageNumber}.jpg`;

            return (
              <div key={category.name} className="mb-16">
                <h3
                  className={`text-2xl font-bold text-center mb-8 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {category.name}
                </h3>

                <div
                  className={`rounded-2xl overflow-hidden shadow-xl relative ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } border-2 border-transparent hover:border-blue-400 transition-all duration-300 group`}
                >
                  <div className="p-8">
                    <div className="relative h-96 md:h-[32rem] overflow-hidden">
                      <div className="absolute inset-0 transition-opacity duration-500 ease-in-out flex flex-col items-center justify-center p-8 opacity-100">
                        <div
                          className={`w-80 h-80 md:w-96 md:h-96 rounded-full ${
                            darkMode ? "bg-gray-700" : "bg-blue-100"
                          } flex items-center justify-center mb-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}
                        >
                          <img
                            src={imagePath}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </div>
                        <h3
                          className={`text-2xl font-bold ${
                            darkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`mt-2 text-lg ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <button
                        onClick={() => handlePrevSlide(category.name)}
                        className={`px-4 py-2 rounded-lg ${
                          darkMode
                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        } transition-colors`}
                      >
                        Anterior
                      </button>

                      <div className="flex space-x-2">
                        {category.items.map((_, index) => (
                          <button
                            key={index}
                            onClick={() =>
                              setActiveSlides({
                                ...activeSlides,
                                [category.name]: index,
                              })
                            }
                            className={`w-3 h-3 rounded-full relative overflow-hidden group ${
                              currentSlide === index
                                ? darkMode
                                  ? "bg-blue-500"
                                  : "bg-blue-600"
                                : darkMode
                                ? "bg-gray-600"
                                : "bg-gray-300"
                            }`}
                            aria-label={`Ir a slide ${index + 1}`}
                          >
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity"></span>
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => handleNextSlide(category.name)}
                        className={`px-4 py-2 rounded-lg ${
                          darkMode
                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                        } transition-colors`}
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>

                  {/* Efecto de borde animado - Mejorado para no tapar contenido */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-0">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10 group-hover:opacity-30 transition-opacity duration-1000 animate-spin-slow"></div>
                    <div className="absolute inset-[2px] rounded-2xl bg-inherit z-10"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Resto del código se mantiene igual */}
      {/* Sobre Nosotros */}
      <section
        id="nosotros"
        className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div
                className={`rounded-2xl overflow-hidden ${
                  darkMode ? "bg-gray-700" : "bg-white"
                } shadow-xl p-8 h-96 flex items-center justify-center relative overflow-hidden group`}
              >
                <div className="text-6xl">
                  {" "}
                  <img src="/imagenes/logo2.png" alt="" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="md:w-1/2">
              <h2
                className={`text-3xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Sobre Nosotros
              </h2>
              <p
                className={`mb-4 text-lg ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                En O.S.O, nos apasiona transformar ideas en diseños únicos que
                cuenten historias.
              </p>
              <p
                className={`mb-6 text-lg ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Nuestro equipo de diseñadores y artesanos trabaja con dedicación
                para ofrecerte productos de la más alta calidad, utilizando
                materiales sostenibles y técnicas innovadoras que garantizan
                durabilidad y comodidad.
              </p>
              <button
                className={`px-6 py-3 rounded-lg font-medium relative overflow-hidden group ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } transition-colors shadow-lg hover:shadow-xl`}
              >
                <span className="relative z-10">Conoce Nuestra Historia</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Nuestros Servicios
            </h2>
            <p
              className={`mt-2 max-w-2xl mx-auto ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Ofrecemos soluciones creativas para todas tus necesidades de
              diseño textil
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl relative overflow-hidden group ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-blue-50"
                } border-2 border-transparent hover:border-blue-300`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3
                  className={`text-xl font-bold mb-2 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {service.title}
                </h3>
                <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                  {service.description}
                </p>

                {/* Efecto de brillo al pasar el mouse */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -inset-12 top-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-30 group-hover:animate-shine transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section
        id="contacto"
        className={`py-16 ${darkMode ? "bg-gray-800" : "bg-blue-50"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h2
                className={`text-3xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Ponte en Contacto
              </h2>
              <p
                className={`mb-6 text-lg ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                ¿Tienes una idea para un diseño personalizado? ¿Quieres saber
                más sobre nuestros servicios? ¡Estamos aquí para ayudarte!
                Completa el formulario y nos pondremos en contacto contigo.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      darkMode ? "bg-blue-600" : "bg-blue-100"
                    } relative overflow-hidden group`}
                  >
                    <span className="text-xl z-10">📱</span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                  </div>
                  <div>
                    <h4
                      className={`font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Teléfono
                    </h4>
                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                      +57 321 9064790
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      darkMode ? "bg-blue-600" : "bg-blue-100"
                    } relative overflow-hidden group`}
                  >
                    <span className="text-xl z-10">✉️</span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                  </div>
                  <div>
                    <h4
                      className={`font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Email
                    </h4>
                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                      camisetasydisenososo@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      darkMode ? "bg-blue-600" : "bg-blue-100"
                    } relative overflow-hidden group`}
                  >
                    <span className="text-xl z-10">📍</span>
                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                  </div>
                  <div>
                    <h4
                      className={`font-bold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Dirección
                    </h4>
                    <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                      Carrera 103 #73 - 51 sur, Bogotá, Colombia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <div
                className={`rounded-2xl p-8 shadow-xl ${
                  darkMode ? "bg-gray-700" : "bg-white"
                } relative overflow-hidden group border-2 border-transparent hover:border-blue-300 transition-all`}
              >
                <h3
                  className={`text-2xl font-bold mb-6 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Envíanos un Mensaje
                </h3>

                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block mb-2 font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      className={`w-full px-4 py-3 rounded-lg ${
                        darkMode
                          ? "bg-gray-600 border-gray-500 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      } border focus:ring-offset-2 transition-all duration-300 shadow-inner`}
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={`block mb-2 font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className={`w-full px-4 py-3 rounded-lg ${
                        darkMode
                          ? "bg-gray-600 border-gray-500 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      } border focus:ring-offset-2 transition-all duration-300 shadow-inner`}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className={`block mb-2 font-medium ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className={`w-full px-4 py-3 rounded-lg ${
                        darkMode
                          ? "bg-gray-600 border-gray-500 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          : "bg-white border-gray-300 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      } border focus:ring-offset-2 transition-all duration-300 shadow-inner`}
                      placeholder="Cuéntanos sobre tu proyecto"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-lg font-bold relative overflow-hidden group ${
                      darkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    } transition-colors shadow-lg hover:shadow-xl`}
                  >
                    <span className="relative z-10">Enviar Mensaje</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </form>

                {/* Efecto de borde animado - Mejorado */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-0">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-40 transition-opacity duration-1000 animate-spin-slow"></div>
                  <div className="absolute inset-[2px] rounded-2xl bg-inherit z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
