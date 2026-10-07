import faceCream from "./assets/products/face cream.png";
import faceWash from "./assets/products/face wash.png";
import bodyWash from "./assets/products/body wash.png";
import bodyLotion from "./assets/products/body lotion.png";
import bodyCream from "./assets/products/body cream.png";
import tissueOil from "./assets/products/tissue oil.png";
import shampooConditioner from "./assets/products/Shampoo and Conditioner Set.png";
import hairFood from "./assets/products/hair food.png";
import babyKit from "./assets/products/baby kit.png";
import faceMask from "./assets/products/face mask.png";
import hairMousse from "./assets/products/Hair Mousse.png";
import hairSpray from "./assets/products/hair spray.png";
import { useEffect,useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Navbar from "./Component/Navbar";

import "./App.css";

import {

  FaFacebookF,

  FaInstagram,

  FaYoutube,

  FaTiktok,

} from "react-icons/fa";

import radianceLogo from "./assets/radiance-logo.jpg";



interface Service {

  service_id: number;

  service_name: string;

  description: string;

  price: string;

  duration_minutes: number;

  is_available: number;

}



const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";



const fallbackServices: Service[] = [

  {

    service_id: 1,

    service_name: "Makeup",

    description: "Professional makeup for every special moment.",

    price: "0",

    duration_minutes: 60,

    is_available: 1,

  },

  {

    service_id: 2,

    service_name: "Braiding",

    description: "Beautiful styles designed to make you feel confident.",

    price: "0",

    duration_minutes: 120,

    is_available: 1,

  },

  {

    service_id: 3,

    service_name: "Lashes",

    description: "Complete your look with beautiful lashes.",

    price: "0",

    duration_minutes: 60,

    is_available: 1,

  },

  {

    service_id: 4,

    service_name: "Wig Styling",

    description: "Professional wig installation and styling.",

    price: "0",

    duration_minutes: 120,

    is_available: 1,

  },

];



/* =========================

   HERO CONTENT

\========================= */



const heroSlides = [

  {

    title: "ENHANCE YOUR BEAUTY",

    subtitle: "Professional makeup for every special moment.",

    button: "BOOK NOW",

    image:

      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=85",

  },

  {

    title: "BRAIDS THAT MAKE A STATEMENT",

    subtitle: "Beautiful styles designed to make you feel confident.",

    button: "BOOK NOW",

    image:

      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=1600&q=85",

  },

  {

    title: "LET YOUR EYES SPEAK",

    subtitle: "Complete your look with beautiful lashes.",

    button: "BOOK NOW",

    image:

      "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1600&q=85",

  },

  {

    title: "YOUR LOOK. YOUR CONFIDENCE.",

    subtitle: "Professional wig installation and styling.",

    button: "BOOK NOW",

    image:

      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=85",

  },

  {

    title: "BRING THE RADIANCE HOME",

    subtitle: "Discover our skincare and haircare collection.",

    button: "SHOP NOW",

    image:

      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=85",

  },

];



/* =========================

   SERVICE IMAGES

\========================= */



const serviceImages = [

  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=85",

  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=700&q=85",

  "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=700&q=85",

  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=85",

];



function Home() {

  const [services, setServices] = useState<Service[]>([]);

  const [loading, setLoading] = useState(true);



  const [currentHero, setCurrentHero] = useState(0);

  const [currentService, setCurrentService] = useState(0);

  const [currentReview, setCurrentReview] = useState(0);

  const [currentProduct, setCurrentProduct] = useState(0);
  const [visibleProducts, setVisibleProducts] = useState(4);

  const radianceProducts = [
    {
      name: "Radiance Face Cream",
      image: faceCream,
    },
    {
      name: "Radiance Face Wash",
      image: faceWash,
    },
    {
      name: "Radiance Body Wash",
      image: bodyWash,
    },
    {
      name: "Radiance Body Lotion",
      image: bodyLotion,
    },
    {
      name: "Radiance Body Cream",
      image: bodyCream,
    },
    {
      name: "Radiance Tissue Oil",
      image: tissueOil,
    },
    {
      name: "Radiance Shampoo & Conditioner",
      image: shampooConditioner,
    },
    {
      name: "Radiance Hair Food",
      image: hairFood,
    },
    {
      name: "Radiance Baby Kit",
      image: babyKit,
    },
    {
      name: "Radiance Face Mask",
      image: faceMask,
    },
    {
      name: "Radiance Hair Hold Mousse",
      image: hairMousse,
    },
    {
      name: "Radiance Hair Spray",
      image: hairSpray,
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState<
    (typeof radianceProducts)[number] | null
  >(null);
  const maxProductStart = radianceProducts.length - visibleProducts;
  const activeProduct = Math.min(currentProduct, maxProductStart);

  useEffect(() => {
    const updateVisibleProducts = () => {
      setVisibleProducts(
        window.innerWidth <= 700 ? 1 : window.innerWidth <= 1100 ? 2 : 4
      );
    };

    updateVisibleProducts();
    window.addEventListener("resize", updateVisibleProducts);

    return () => window.removeEventListener("resize", updateVisibleProducts);
  }, []);

  useEffect(() => {
    if (!selectedProduct) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProduct(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedProduct]);


  /* =========================

     HERO AUTOMATIC TRANSITION

  ========================= */



  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentHero((current) =>

        current === heroSlides.length - 1

          ? 0

          : current + 1

      );

    }, 5000);



    return () => clearInterval(interval);

  }, []);



  /* =========================

     LOAD DATA FROM API

  ========================= */



  useEffect(() => {

    const fetchData = async () => {

      try {

        const [servicesResult] = await Promise.allSettled([

          fetch(`${API_BASE_URL}/services`),

        ]);



        if (

          servicesResult.status === "fulfilled" &&

          servicesResult.value.ok

        ) {

          setServices(await servicesResult.value.json());

        } else {

          setServices(fallbackServices);

        }



        if (

          servicesResult.status === "rejected"

        ) {

          console.warn("Radiance API unavailable; showing default content.");

        }

      } finally {

        setLoading(false);

      }

    };



    fetchData();

  }, []);



  /* =========================

     SERVICES AUTOMATIC TRANSITION

  ========================= */



  useEffect(() => {

    if (services.length <= 1) return;



    const interval = setInterval(() => {

      setCurrentService((current) =>

        current === services.length - 1

          ? 0

          : current + 1

      );

    }, 5000);



    return () => clearInterval(interval);

  }, [services.length]);

  /* =========================

     LOADING SCREEN

  ========================= */



  if (loading) {

    return (

      <div className="loading-screen">

        <h1>RADIANCE</h1>

        <p>Beauty is loading...</p>

      </div>

    );

  }



  const hero = heroSlides[currentHero];



  return (

    <div className="website">



      {/* ==================================================

          HEADER

      ================================================== */}



      





      {/* ==================================================

          HERO

      ================================================== */}



      <section

        id="home"

        className="hero"

        style={{

          backgroundImage: `url(${hero.image})`,

        }}

      >



        <div className="hero-overlay"></div>



        <div className="hero-content" key={currentHero}>
          <p className="hero-small">RADIANCE BEAUTY BAR</p>

          <h1>{hero.title}</h1>

          <p className="hero-description">{hero.subtitle}</p>

          <a
            href={hero.button === "SHOP NOW" ? "/products" : "/booking"}
            className="hero-button"
          >
            {hero.button}
          </a>

        </div>



      </section>





      {/* ==================================================

          OUR SERVICES

      ================================================== */}



      <section

        id="services"

        className="services-showcase"

      >



        <div className="services-heading">



          <p>

            WHAT WE OFFER

          </p>



          <h2>

            OUR <span>SERVICES</span>

          </h2>



          <div className="services-tagline">

            BEAUTY&nbsp;&nbsp;·&nbsp;&nbsp;STYLE&nbsp;&nbsp;·&nbsp;&nbsp;CONFIDENCE

          </div>



        </div>





        <div className="services-carousel">



          <button

            className="carousel-arrow carousel-arrow-left"

            onClick={() =>

              setCurrentService(

                currentService === 0

                  ? services.length - 1

                  : currentService - 1

              )

            }

            aria-label="Previous service"

          >

            &#10094;

          </button>





          <div className="services-track">



            {services.map(

              (service, index) => {



                const position =

                  (index -

                    currentService +

                    services.length) %

                  services.length;



                return (

                  <div

                    className={`service-showcase-card ${

                      position === 0

                        ? "service-card-active"

                        : ""

                    }`}

                    key={service.service_id}

                  >



                    <img

                      src={

                        serviceImages[

                          index %

                            serviceImages.length

                        ]

                      }

                      alt={

                        service.service_name

                      }

                    />



                    <div className="service-card-overlay">



                      <div className="service-card-title">

                        {

                          service.service_name

                        }

                      </div>



                      <div className="service-card-line"></div>



                    </div>



                  </div>

                );

              }

            )}



          </div>





          <button

            className="carousel-arrow carousel-arrow-right"

            onClick={() =>

              setCurrentService(

                currentService ===

                  services.length - 1

                  ? 0

                  : currentService + 1

              )

            }

            aria-label="Next service"

          >

            &#10095;

          </button>



        </div>





        {/* SERVICE DOTS */}



        <div className="service-dots">



          {services.map(

            (service, index) => (



              <button

                key={

                  service.service_id

                }

                className={

                  index === currentService

                    ? "service-dot active"

                    : "service-dot"

                }

                onClick={() =>

                  setCurrentService(index)

                }

                aria-label={`Show ${service.service_name}`}

              ></button>



            )

          )}



        </div>





        {/* LEARN MORE */}



        <div className="services-learn-more">



          <a href="/services">

            LEARN MORE

            <span>→</span>

          </a>



        </div>



      </section>





      {/* ==================================================

          SHOP RADIANCE

      ================================================== */}



      <section

        id="products"

        className="products-showcase"

      >



        <div className="products-heading">

          <h2>OUR PRODUCTS</h2>

          <div className="products-heading-line"></div>

          <p>

            Premium beauty and hair care products for your natural glow and confidence.

          </p>

        </div>





        <div className="products-carousel">
          {/* LEFT ARROW */}
          <button
            className="product-carousel-arrow product-carousel-arrow-left"
            onClick={() =>
              setCurrentProduct(
                activeProduct === 0 ? maxProductStart : activeProduct - 1
              )
            }
            aria-label="Previous products"
          >
            &#10094;
          </button>

          {/* PRODUCT CARDS */}
          <div className="products-window">
            <div
              className="products-track"
              style={{
                width: `${(radianceProducts.length / visibleProducts) * 100}%`,
                transform: `translateX(-${activeProduct * (100 / radianceProducts.length)}%)`,
              }}
            >
              {radianceProducts.map((product, index) => (
                <div
                  className="radiance-product-card"
                  key={index}
                >
                  <button
                    type="button"
                    className="radiance-product-image"
                    onClick={() => setSelectedProduct(product)}
                    aria-label={`View ${product.name} full-size image`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  </button>

                  <div className="radiance-product-name">
                    {product.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT ARROW */}
          <button
            className="product-carousel-arrow product-carousel-arrow-right"
            onClick={() =>
              setCurrentProduct(
                activeProduct === maxProductStart ? 0 : activeProduct + 1
              )
            }
            aria-label="Next products"
          >
            &#10095;
          </button>
        </div>

        {/* PRODUCT DOTS */}
        <div className="product-carousel-dots">
          {Array.from({ length: radianceProducts.length - visibleProducts + 1 }, (_, index) => (
            <button
              key={index}
              className={
                index === activeProduct
                  ? "product-carousel-dot active"
                  : "product-carousel-dot"
              }
              onClick={() => setCurrentProduct(index)}
              aria-label={`Show products starting at ${index + 1}`}
            />
          ))}
        </div>

        {/* LEARN MORE */}
        <div className="products-learn-more">
          <a href="/products">
            LEARN MORE
            <span>→</span>
          </a>
        </div>

        {selectedProduct && (
          <div
            className="product-image-lightbox"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="product-image-lightbox-content"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedProduct.name} full-size image`}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="product-image-lightbox-close"
                onClick={() => setSelectedProduct(null)}
                aria-label="Close full-size image"
                autoFocus
              >
                ×
              </button>
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <p>{selectedProduct.name}</p>
            </div>
          </div>
        )}


      </section>





      {/* ==================================================

          READY TO RADIATE

      ================================================== */}



      <section className="booking-section" id="booking">
        <p>YOUR BEAUTY. YOUR MOMENT.</p>

        <h2>
          READY TO RADIATE?
        </h2>

        <p className="booking-description">
          From flawless makeup and beautiful braids to stunning lashes and wig
          installations, Radiance Beauty Bar is here to help you look and feel
          your best. Explore our beauty services and Radiance skincare and hair
          products, thoughtfully selected to help you express your style and
          confidence.
        </p>

        <a href="/booking">BOOK YOUR APPOINTMENT</a>
      </section>

{/* ==================================================

    CUSTOMER REVIEWS

\================================================== */}



<section className="testimonials-section">



  <div className="section-heading">



    <h2>

      THEY ALL LOVE <span>RADIANCE</span>

    </h2>



    <div className="review-divider">

      ✦ ───── ✦

    </div>



    <p>

      Discover what our clients have to say about their

      Radiance Beauty Bar experience.

    </p>



  </div>





  <div className="testimonials-carousel">



    <div

      className="testimonials-track"

      style={{

        transform: `translateX(-${currentReview * 380}px)`,

      }}

    >



      {/* TEMPORARY FRONTEND REVIEWS */}

      {/* These will later come from Google / database */}



      <div className="testimonial-card">



        <div className="review-top">



          <div className="review-avatar">

            A

          </div>



          <div className="review-details">



            <h4>AMANDA</h4>



            <div className="review-stars">

              ★★★★★

            </div>



            <small>

              12/06/2026 via Google

            </small>



          </div>



          <div className="google-logo">

            G

          </div>



        </div>



        <p>

          Amazing makeup service! I absolutely loved

          my look and the staff were so friendly and

          professional. I will definitely come back.

          <span> Read more</span>

        </p>



      </div>





      <div className="testimonial-card">



        <div className="review-top">



          <div className="review-avatar">

            L

          </div>



          <div className="review-details">



            <h4>LUCY</h4>



            <div className="review-stars">

              ★★★★★

            </div>



            <small>

              18/06/2026 via Google

            </small>



          </div>



          <div className="google-logo">

            G

          </div>



        </div>



        <p>

          I loved my braids! The service was excellent

          and my hair came out exactly how I wanted it.

          Highly recommended.

          <span> Read more</span>

        </p>



      </div>





      <div className="testimonial-card">



        <div className="review-top">



          <div className="review-avatar">

            M

          </div>



          <div className="review-details">



            <h4>MICHELLE</h4>



            <div className="review-stars">

              ★★★★★

            </div>



            <small>

              25/06/2026 via Google

            </small>



          </div>



          <div className="google-logo">

            G

          </div>



        </div>



        <p>

          My wig installation was beautiful and very

          neat. The team was professional from start

          to finish. I am very happy!

          <span> Read more</span>

        </p>



      </div>





      <div className="testimonial-card">



        <div className="review-top">



          <div className="review-avatar">

            P

          </div>



          <div className="review-details">



            <h4>PRISCILLA</h4>



            <div className="review-stars">

              ★★★★★

            </div>



            <small>

              02/07/2026 via Google

            </small>



          </div>



          <div className="google-logo">

            G

          </div>



        </div>



        <p>

          Such a lovely experience. My lashes looked

          amazing and the service was quick, friendly

          and professional.

          <span> Read more</span>

        </p>



      </div>





    </div>



  </div>





  {/* REVIEW DOTS */}



  <div className="testimonial-dots">



    <button

      className={

        currentReview === 0

          ? "testimonial-dot active"

          : "testimonial-dot"

      }

      onClick={() => setCurrentReview(0)}

      aria-label="Review 1"

    />



    <button

      className={

        currentReview === 1

          ? "testimonial-dot active"

          : "testimonial-dot"

      }

      onClick={() => setCurrentReview(1)}

      aria-label="Review 2"

    />



    <button

      className={

        currentReview === 2

          ? "testimonial-dot active"

          : "testimonial-dot"

      }

      onClick={() => setCurrentReview(2)}

      aria-label="Review 3"

    />



    <button

      className={

        currentReview === 3

          ? "testimonial-dot active"

          : "testimonial-dot"

      }

      onClick={() => setCurrentReview(3)}

      aria-label="Review 4"

    />



  </div>



</section>

      {/* ==================================================

          FOOTER

      ================================================== */}



      <footer className="footer">



        {/* RADIANCE LOGO */}



        <div className="footer-logo-container">



          <img

            src={radianceLogo}

            alt="Radiance Beauty Bar"

            className="footer-logo-image"

          />



        </div>





        {/* SHORT ABOUT US */}



        <div className="footer-about">



          <p>

            Radiance Beauty Bar is dedicated to helping you

            look beautiful, feel confident and radiate your

            unique beauty through professional beauty services

            and quality skincare and haircare products.

          </p>



        </div>





        {/* CONTACT */}



        <div className="footer-contact">



          <strong>Contact us:</strong>



          <a href="mailto:radiancebeauty@gmail.com">

            radiancebeauty@gmail.com

          </a>



        </div>









          <div className="footer-socials">



            <a

              href="#"

              aria-label="Facebook"

              className="social-icon"

            >

              <FaFacebookF />

            </a>



            <a

              href="#"

              aria-label="Instagram"

              className="social-icon"

            >

              <FaInstagram />

            </a>



            <a

              href="#"

              aria-label="YouTube"

              className="social-icon"

            >

              <FaYoutube />

            </a>



            <a

              href="#"

              aria-label="TikTok"

              className="social-icon"

            >

              <FaTiktok />

            </a>



          </div>



      </footer>





      {/* ==================================================

          COPYRIGHT

      ================================================== */}



      <div className="footer-bottom">



        <p>

          © 2026 Radiance Beauty Bar.

          All Rights Reserved.

        </p>



      </div>



    </div>

  );

}



function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />

      </Routes>

    </BrowserRouter>

  );

}



export default App;