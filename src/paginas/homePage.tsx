// src/paginas/homePage.tsx
import { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import Header from "../componentes/header";
import Footer from "../componentes/footer";

const HomePage = () => {
  const { darkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState("designs");
  const [activeSlide, setActiveSlide] = useState(0);

  // Datos de ejemplo para diseños y camisetas
  const designs = [
    {
      id: 1,
      title: "Diseño Abstracto",
      description: "Patrones modernos y abstractos",
    },
    {
      id: 2,
      title: "Diseño Geométrico",
      description: "Formas geométricas con colores vibrantes",
    },
    {
      id: 3,
      title: "Diseño Minimalista",
      description: "Simplicidad y elegancia en cada trazo",
    },
  ];

  const shirts = [
    {
      id: 1,
      title: "Camiseta Clásica",
      description: "Algodón 100% para máxima comodidad",
    },
    {
      id: 2,
      title: "Camiseta Premium",
      description: "Calidad superior con acabados perfectos",
    },
    {
      id: 3,
      title: "Camiseta Estampada",
      description: "Diseños únicos que destacan tu estilo",
    },
  ];

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
        className={`py-20 ${
          darkMode ? "bg-gray-800" : "bg-blue-600"
        } transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className={`text-4xl md:text-6xl font-bold ${
              darkMode ? "text-white" : "text-white"
            }`}
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
              className={`px-8 py-3 rounded-full font-bold text-lg ${
                darkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-white hover:bg-blue-50 text-blue-600"
              } transition-all duration-300`}
            >
              Ver Colección
            </button>
          </div>
        </div>
      </section>

      {/* Carrusel de Diseños y Camisetas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Nuestros Productos
            </h2>
            <p
              className={`mt-2 max-w-2xl mx-auto ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Explora nuestra colección de diseños exclusivos y camisetas de
              alta calidad
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div
              className={`flex rounded-lg p-1 ${
                darkMode ? "bg-gray-800" : "bg-gray-200"
              }`}
            >
              <button
                onClick={() => setActiveTab("designs")}
                className={`px-6 py-2 rounded-lg text-lg font-medium transition-colors ${
                  activeTab === "designs"
                    ? darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 shadow"
                    : darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Diseños
              </button>
              <button
                onClick={() => setActiveTab("shirts")}
                className={`px-6 py-2 rounded-lg text-lg font-medium transition-colors ${
                  activeTab === "shirts"
                    ? darkMode
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 shadow"
                    : darkMode
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Camisetas
              </button>
            </div>
          </div>

          {/* Carrusel */}
          <div
            className={`rounded-2xl overflow-hidden shadow-xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="p-8">
              <div className="relative h-80 md:h-96 overflow-hidden">
                {(activeTab === "designs" ? designs : shirts).map(
                  (item, index) => (
                    <div
                      key={item.id}
                      className={`absolute inset-0 transition-opacity duration-500 flex flex-col items-center justify-center p-8 ${
                        activeSlide === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div
                        className={`w-64 h-64 rounded-full ${
                          darkMode ? "bg-gray-700" : "bg-blue-100"
                        } flex items-center justify-center mb-6`}
                      >
                        <span className="text-6xl">
                          {activeTab === "designs" ? "🎨" : "👕"}
                        </span>
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
                  )
                )}
              </div>

              <div className="flex justify-center mt-6 space-x-2">
                {(activeTab === "designs" ? designs : shirts).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`w-3 h-3 rounded-full ${
                        activeSlide === index
                          ? darkMode
                            ? "bg-blue-500"
                            : "bg-blue-600"
                          : darkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Ir a slide ${index + 1}`}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center gap-12">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div
                className={`rounded-2xl overflow-hidden ${
                  darkMode ? "bg-gray-700" : "bg-white"
                } shadow-xl p-8 h-96 flex items-center justify-center`}
              >
                <div className="text-6xl">👥</div>
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
                cuenten historias. Con más de 10 años de experiencia en el
                mercado, hemos perfeccionado el arte de crear camisetas que no
                solo vistes, sino que llevas con orgullo.
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
                className={`px-6 py-3 rounded-lg font-medium ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                } transition-colors`}
              >
                Conoce Nuestra Historia
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-16">
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
                className={`rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-white hover:bg-blue-50"
                }`}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className={`py-16 ${darkMode ? "bg-gray-800" : "bg-blue-50"}`}>
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
                    }`}
                  >
                    <span className="text-xl">📱</span>
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
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      darkMode ? "bg-blue-600" : "bg-blue-100"
                    }`}
                  >
                    <span className="text-xl">✉️</span>
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
                      info@oso-disenos.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                      darkMode ? "bg-blue-600" : "bg-blue-100"
                    }`}
                  >
                    <span className="text-xl">📍</span>
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
                      Calle Creatividad 123, Ciudad Innovación
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <div
                className={`rounded-2xl p-8 shadow-xl ${
                  darkMode ? "bg-gray-700" : "bg-white"
                }`}
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
                          ? "bg-gray-600 border-gray-500 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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
                          ? "bg-gray-600 border-gray-500 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
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
                          ? "bg-gray-600 border-gray-500 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      placeholder="Cuéntanos sobre tu proyecto"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-lg font-bold ${
                      darkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    } transition-colors`}
                  >
                    Enviar Mensaje
                  </button>
                </form>
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
