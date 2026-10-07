import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import radianceLogo from "../assets/radiance-logo.jpg";

const fallbackServiceImages = [
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80",
];

const Services: React.FC = () => {
  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement>,
    fallback: string
  ) => {
    const target = event.currentTarget;
    target.onerror = null;
    target.src = fallback;
  };

  return (
  <div className="services-page">

  <section className="services-title">
    <h1>SERVICES</h1>
  </section>

 

      <section className="services-welcome">
        <div className="welcome-image">
          <img
            src="/images/services welcome.jpg"
            alt="Radiance Beauty Bar"
            onError={(event) =>
              handleImageError(
                event,
                "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80"
              )
            }
          />
        </div>

        <div className="welcome-content">
          <p className="section-script">Welcome to</p>
          <h2>
      
            Radiance Beauty Bar
          </h2>

          <p>
            At Radiance Beauty Bar, we offer professional beauty services
            designed to bring out your natural beauty and boost your
            confidence. From flawless makeup to stunning braids, lashes and
            wig installations, our skilled team is here to give you a
            premium beauty experience.
          </p>

          <button className="gold-button">
            BOOK A SERVICE <span>→</span>
          </button>
        </div>
      </section>

      <section className="services-main">
        <div className="services-list">
          <div className="section-heading">
            <h2>Featured Services</h2>
            <div className="gold-line" />
          </div>

          <div className="service-cards">
            <div className="service-card">
              <div className="service-card-image">
                <img
                  src="/images/makeup.jpg"
                  alt="Makeup"
                  onError={(event) =>
                    handleImageError(event, fallbackServiceImages[0])
                  }
                />
              </div>

              <div className="service-card-content">
                <h3>MAKEUP</h3>

                <p>
                  Professional makeup for every occasion, including weddings,
                  parties, photoshoots and more.
                </p>

                <button className="outline-gold-button">
                  LEARN MORE <span>→</span>
                </button>
              </div>
            </div>

            <div className="service-card">
              <div className="service-card-image">
                <img
                  src="/images/braiding.png"
                  alt="Braiding"
                  onError={(event) =>
                    handleImageError(event, fallbackServiceImages[1])
                  }
                />
              </div>

              <div className="service-card-content">
                <h3>BRAIDING</h3>

                <p>
                  Beautiful and neat braids in various styles to suit your look.
                </p>

                <button className="outline-gold-button">
                  LEARN MORE <span>→</span>
                </button>
              </div>
            </div>

            <div className="service-card">
              <div className="service-card-image">
                <img
                  src="/images/Lash installation.png"
                  alt="Lash installation"
                  onError={(event) =>
                    handleImageError(event, fallbackServiceImages[2])
                  }
                />
              </div>

              <div className="service-card-content">
                <h3>LASH INSTALLATION</h3>

                <p>
                  Enhance your natural beauty with high-quality lash installation.
                </p>

                <button className="outline-gold-button">
                  LEARN MORE <span>→</span>
                </button>
              </div>
            </div>

            <div className="service-card">
              <div className="service-card-image">
                <img
                  src="/images/wig installation.jpg"
                  alt="Wig Installation"
                  onError={(event) =>
                    handleImageError(event, fallbackServiceImages[3])
                  }
                />
              </div>

              <div className="service-card-content">
                <h3>WIG INSTALLATION</h3>

                <p>
                  Professional wig installation for a flawless and natural finish.
                </p>

                <button className="outline-gold-button">
                  LEARN MORE <span>→</span>
                </button>
              </div>
            </div>

            <div className="service-card">
              <div className="service-card-image">
                <img
                  src="/images/nails.png"
                  alt="Nail Services"
                  onError={(event) =>
                    handleImageError(event, fallbackServiceImages[4])
                  }
                />
              </div>

              <div className="service-card-content">
                <h3>NAIL SERVICES</h3>

                <p>
                  Beautiful nail care and stylish nail designs to complete your
                  look.
                </p>

                <button className="outline-gold-button">
                  LEARN MORE <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <aside className="services-sidebar">
          <div className="sidebar-offer">
            <div>
              <p>SPECIAL</p>
              <h3>OFFERS</h3>
              <span>ON SELECTED SERVICES</span>
            </div>

            <button className="gold-button">BOOK NOW →</button>
          </div>

          <div className="sidebar-box testimonial-box">
            <p className="sidebar-script">Testimonials</p>
            <div className="quote-mark">“</div>

            <p>
              Radiance Beauty Bar never disappoints! The makeup was flawless and
              lasted all day. Highly recommend!
            </p>

            <strong>– Tash, Harare</strong>
          </div>
        </aside>
      </section>

      <footer className="footer">
        <div className="footer-logo-container">
          <img
            src={radianceLogo}
            alt="Radiance Beauty Bar"
            className="footer-logo-image"
          />
        </div>

        <div className="footer-about">
          <p>
            Radiance Beauty Bar is dedicated to helping you look beautiful, feel
            confident and radiate your unique beauty through professional beauty
            services and quality skincare and haircare products.
          </p>
        </div>

        <div className="footer-contact">
          <strong>Contact us:</strong>
          <a href="mailto:radiancebeauty@gmail.com">radiancebeauty@gmail.com</a>
        </div>

        <div className="footer-socials">
          <a href="#" aria-label="Facebook" className="social-icon">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Instagram" className="social-icon">
            <FaInstagram />
          </a>
          <a href="#" aria-label="YouTube" className="social-icon">
            <FaYoutube />
          </a>
          <a href="#" aria-label="TikTok" className="social-icon">
            <FaTiktok />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Services;