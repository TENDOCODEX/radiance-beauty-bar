import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import "../App.css";

interface Hairstyle {
  hairstyle_id: number;
  service_id: number;
  hairstyle_name: string;
  description: string | null;
  estimated_price: string;
  estimated_duration_minutes: number;
  image_url: string | null;
  is_available: number;
}

interface Product {
  product_id: number;
  product_name: string;
  description: string | null;
  price: string;
  stock_quantity: number;
  image_url: string | null;
  category: string;
  is_available: number;
}

type Category =
  | "Braiding"
  | "Nails"
  | "Lashes"
  | "Wig Install"
  | "Products";

type DetailTab =
  | "Details"
  | "Reviews"
  | "Similar Styles";

interface GalleryItem {
  id: number;
  name: string;
  image: string | null;
  description: string | null;
  price?: string;
  duration?: string;
  type: "hairstyle" | "product";
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

const categories: Category[] = [
  "Braiding",
  "Nails",
  "Lashes",
  "Wig Install",
  "Products",
];

const GALLERY_BACKGROUND =
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=2200&q=85";

const fallbackImages = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
];

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} min`;
  }

  if (remainingMinutes === 0) {
    return `${hours} hr${hours > 1 ? "s" : ""}`;
  }

  return `${hours} hr ${remainingMinutes} min`;
}

function Gallery() {
  const [hairstyles, setHairstyles] = useState<Hairstyle[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [activeCategory, setActiveCategory] =
    useState<Category>("Braiding");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* Scroll reveal */
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  /* Selected item */
  const [selectedItem, setSelectedItem] =
    useState<GalleryItem | null>(null);

  /* Detail view */
  const [zoom, setZoom] = useState(1);
  const [liked, setLiked] = useState(false);

  const [detailTab, setDetailTab] =
    useState<DetailTab>("Details");

  const previousGalleryScrollRef = useRef(0);

  useEffect(() => {
    if (!selectedItem) {
      document.body.style.overflow = "";
      return;
    }

    previousGalleryScrollRef.current = window.scrollY;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  /*
    Load gallery data
  */
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const [hairstylesResponse, productsResponse] =
          await Promise.all([
            fetch(`${API_BASE_URL}/hairstyles`),
            fetch(`${API_BASE_URL}/products`),
          ]);

        if (!hairstylesResponse.ok) {
          throw new Error("Failed to load hairstyles");
        }

        if (!productsResponse.ok) {
          throw new Error("Failed to load products");
        }

        const hairstylesData =
          await hairstylesResponse.json();

        const productsData =
          await productsResponse.json();

        setHairstyles(hairstylesData);
        setProducts(productsData);
      } catch (err) {
        console.error("Gallery loading error:", err);
        setError("Unable to load the gallery at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  /*
    Convert database data into gallery items
  */
  const galleryItems = useMemo<GalleryItem[]>(() => {
    if (activeCategory === "Braiding") {
      return hairstyles
        .filter(
          (hairstyle) =>
            hairstyle.service_id === 2 &&
            hairstyle.is_available === 1
        )
        .map((hairstyle, index) => ({
          id: hairstyle.hairstyle_id,
          name: hairstyle.hairstyle_name,
          image:
            hairstyle.image_url ||
            fallbackImages[index % fallbackImages.length],
          description: hairstyle.description,
          price: `$${hairstyle.estimated_price}`,
          duration: formatDuration(
            hairstyle.estimated_duration_minutes
          ),
          type: "hairstyle",
        }));
    }

    if (activeCategory === "Products") {
      return products
        .filter((product) => product.is_available === 1)
        .map((product, index) => ({
          id: product.product_id,
          name: product.product_name,
          image:
            product.image_url ||
            fallbackImages[index % fallbackImages.length],
          description: product.description,
          price: `$${product.price}`,
          duration: product.category,
          type: "product",
        }));
    }

    return [];
  }, [activeCategory, hairstyles, products]);

  /*
    Preload first few images
  */
  useEffect(() => {
    galleryItems.slice(0, 4).forEach((item) => {
      if (!item.image) return;

      const image = new Image();
      image.src = item.image;
    });
  }, [galleryItems]);

  /*
    Scroll reveal
  */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(
              (entry.target as HTMLElement).dataset.index
            );

            setVisibleItems((prev) =>
              prev.includes(index)
                ? prev
                : [...prev, index]
            );
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    const elements = document.querySelectorAll(
      ".gallery-image-item"
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [galleryItems, activeCategory]);

  /*
    Open detail view
  */
  const openItem = (item: GalleryItem) => {
    previousGalleryScrollRef.current = window.scrollY;
    setSelectedItem(item);
    setZoom(1);
    setLiked(false);
    setDetailTab("Details");
  };

  /*
    Close detail view
  */
  const closeItem = () => {
    const savedScrollPosition = previousGalleryScrollRef.current;
    setSelectedItem(null);
    setZoom(1);
    setLiked(false);
    setDetailTab("Details");

    requestAnimationFrame(() => {
      window.scrollTo({
        top: savedScrollPosition,
        behavior: "auto",
      });
    });
  };

  /*
    Zoom
  */
  const zoomIn = () => {
    setZoom((current) =>
      Math.min(current + 0.25, 3)
    );
  };

  const zoomOut = () => {
    setZoom((current) =>
      Math.max(current - 0.25, 1)
    );
  };

  const resetZoom = () => {
    setZoom(1);
  };

  /*
    Recommended items
  */
  const recommendedItems = useMemo(() => {
    if (!selectedItem) return [];

    return galleryItems
      .filter((item) => item.id !== selectedItem.id)
      .slice(0, 6);
  }, [galleryItems, selectedItem]);

  /*
    Loading
  */
  if (loading) {
    return (
      <div className="gallery-page">
        <div className="gallery-loading">
          <h2>Loading our gallery...</h2>
          <p>Please wait.</p>
        </div>
      </div>
    );
  }

  /*
    Error
  */
  if (error) {
    return (
      <div className="gallery-page">
        <div className="gallery-error">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ==================================================
          CURRENT GALLERY
      ================================================== */}

      <div className="gallery-page">

        {/* GALLERY TITLE */}

        <section className="gallery-title">
          <h1>GALLERY</h1>
        </section>


        {/* LARGE BACKGROUND */}

        <section
          className="gallery-showcase"
          style={{
            backgroundImage:
              `url(${GALLERY_BACKGROUND})`,
          }}
        >
          <div className="gallery-showcase-overlay"></div>

          <div className="gallery-panel">

            {/* CATEGORY SELECTOR */}

            <div className="gallery-categories">

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    activeCategory === category
                      ? "gallery-category active"
                      : "gallery-category"
                  }
                  onClick={() => {
                    setActiveCategory(category);
                    setVisibleItems([]);
                  }}
                >
                  {category}
                </button>
              ))}

            </div>


            {/* GALLERY */}

            {galleryItems.length > 0 ? (

              <div className="gallery-images">

                {galleryItems.map((item, index) => (

                  <div
                    className={`gallery-image-item ${
                      visibleItems.includes(index)
                        ? "visible"
                        : ""
                    }`}
                    data-index={index}
                    key={item.id}
                    onClick={() => openItem(item)}
                  >

                    <div className="gallery-image-wrapper">

                      <img
                        src={item.image || ""}
                        alt={item.name}
                        loading={
                          index < 3
                            ? "eager"
                            : "lazy"
                        }
                        fetchPriority={
                          index < 3
                            ? "high"
                            : "auto"
                        }
                      />

                      <div className="gallery-image-overlay">
                        <span>VIEW</span>
                      </div>

                    </div>

                    <div className="gallery-image-info">

                      <h3>{item.name}</h3>

                      {item.price && (
                        <span>{item.price}</span>
                      )}

                    </div>

                  </div>

                ))}

              </div>

            ) : (

              <div className="gallery-empty">

                <div className="gallery-empty-symbol">
                  ✦
                </div>

                <h3>
                  {activeCategory.toUpperCase()}
                </h3>

                <p>
                  Beautiful{" "}
                  {activeCategory.toLowerCase()} styles
                  are coming soon.
                </p>

              </div>

            )}

          </div>
        </section>


        {/* BOOKING CTA */}

        <section className="gallery-cta">

          <p>
            YOUR BEAUTY. YOUR MOMENT.
          </p>

          <h2>
            READY TO <span>RADIATE?</span>
          </h2>

          <a href="/booking">
            BOOK YOUR APPOINTMENT
          </a>

        </section>

      </div>


      {/* ==================================================
          SHEIN-STYLE DETAIL VIEW
          ONLY APPEARS WHEN IMAGE IS CLICKED
      ================================================== */}

      {selectedItem &&
        createPortal(
          <div className="gallery-detail-overlay">
            <div className="gallery-detail-page">
              {/* TOP BAR */}

            <div className="gallery-detail-topbar">

              <button
                type="button"
                className="gallery-detail-back"
                onClick={closeItem}
              >
                ←
              </button>

              <div className="gallery-detail-search">
                {selectedItem.name}
              </div>

              <div className="gallery-detail-actions">

                <button
                  type="button"
                  className={
                    liked
                      ? "detail-icon liked"
                      : "detail-icon"
                  }
                  onClick={() =>
                    setLiked((current) => !current)
                  }
                  aria-label="Like"
                >
                  {liked ? "♥" : "♡"}
                </button>

                <button
                  type="button"
                  className="detail-icon"
                  onClick={closeItem}
                  aria-label="Close"
                >
                  ×
                </button>

              </div>

            </div>


            {/* MAIN AREA */}

            <div className="gallery-detail-main">

              {/* IMAGE */}

              <div className="gallery-detail-image-section">

                <div className="gallery-detail-image-container">

                  <img
                    src={selectedItem.image || ""}
                    alt={selectedItem.name}
                    className="gallery-detail-image"
                    style={{
                      transform:
                        `scale(${zoom})`,
                    }}
                    onWheel={(event) => {
                      event.preventDefault();

                      if (event.deltaY < 0) {
                        zoomIn();
                      } else {
                        zoomOut();
                      }
                    }}
                  />

                  {/* ZOOM CONTROLS */}

                  <div className="gallery-zoom-controls">

                    <button
                      type="button"
                      onClick={zoomIn}
                      aria-label="Zoom in"
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={zoomOut}
                      aria-label="Zoom out"
                    >
                      −
                    </button>

                    <button
                      type="button"
                      onClick={resetZoom}
                      aria-label="Reset zoom"
                    >
                      ↻
                    </button>

                  </div>

                </div>

              </div>


              {/* INFORMATION */}

              <div className="gallery-detail-info">

                <p className="detail-category">

                  {selectedItem.type ===
                  "hairstyle"
                    ? "BRAIDING"
                    : selectedItem.duration}

                </p>


                <h1>
                  {selectedItem.name}
                </h1>


                <div className="detail-price">
                  {selectedItem.price}
                </div>


                {/* DURATION */}

                {selectedItem.type ===
                  "hairstyle" &&
                  selectedItem.duration && (

                    <div className="detail-meta">

                      <span>◷</span>

                      <span>
                        Estimated Time:{" "}
                        {selectedItem.duration}
                      </span>

                    </div>

                  )}


                {/* LIKE */}

                <button
                  type="button"
                  className={
                    liked
                      ? "detail-favourite active"
                      : "detail-favourite"
                  }
                  onClick={() =>
                    setLiked((current) => !current)
                  }
                >

                  <span>
                    {liked ? "♥" : "♡"}
                  </span>

                  <span>
                    {liked
                      ? "Added to Favourites"
                      : "Add to Favourites"}
                  </span>

                </button>


                {/* DESCRIPTION */}

                <p className="detail-description">

                  {selectedItem.description ||
                    `Explore the ${selectedItem.name} at Radiance Beauty Bar. Our beauty specialists are ready to create a beautiful look for you.`}

                </p>


                {/* BOOK APPOINTMENT */}

                <a
                  href={
                    selectedItem.type ===
                    "hairstyle"
                      ? `/booking?hairstyleId=${selectedItem.id}`
                      : "/booking"
                  }
                  className="detail-book-button"
                >
                  <span>▣</span>
                  BOOK APPOINTMENT
                </a>


                {/* BENEFITS */}

                <div className="detail-benefits">

                  <div>
                    <strong>◇</strong>

                    <span>
                      Professional
                      <br />
                      Stylists
                    </span>
                  </div>

                  <div>
                    <strong>✓</strong>

                    <span>
                      Safe &amp; Hygienic
                      <br />
                      Environment
                    </span>
                  </div>

                  <div>
                    <strong>♧</strong>

                    <span>
                      Flexible
                      <br />
                      Booking
                    </span>
                  </div>

                </div>

              </div>

            </div>


            {/* TABS */}

            <div className="gallery-detail-tabs">

              {(
                [
                  "Details",
                  "Reviews",
                  "Similar Styles",
                ] as DetailTab[]
              ).map((tab) => (

                <button
                  key={tab}
                  type="button"
                  className={
                    detailTab === tab
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setDetailTab(tab)
                  }
                >
                  {tab}
                </button>

              ))}

            </div>


            {/* DETAILS */}

            {detailTab === "Details" && (

              <div className="gallery-detail-content">

                <h2>Details</h2>

                <div className="detail-information-grid">

                  <span>Style Type</span>

                  <strong>
                    {selectedItem.type ===
                    "hairstyle"
                      ? "Braids"
                      : "Beauty Product"}
                  </strong>


                  <span>
                    {selectedItem.type ===
                    "hairstyle"
                      ? "Duration"
                      : "Category"}
                  </span>

                  <strong>
                    {selectedItem.duration ||
                      "Radiance Beauty"}
                  </strong>


                  <span>Price</span>

                  <strong>
                    {selectedItem.price}
                  </strong>


                  <span>Description</span>

                  <strong>
                    {selectedItem.description ||
                      "Beautifully selected by Radiance Beauty Bar."}
                  </strong>

                </div>

              </div>

            )}


            {/* REVIEWS */}

            {detailTab === "Reviews" && (

              <div className="gallery-detail-content">

                <div className="reviews-summary">

                  <div className="review-number">
                    —
                  </div>

                  <div>

                    <div className="review-stars">
                      ☆☆☆☆☆
                    </div>

                    <p>
                      Customer reviews
                    </p>

                  </div>

                </div>

                <div className="review-empty">

                  <h3>
                    Reviews coming soon
                  </h3>

                  <p>
                    Customer reviews will appear
                    here after completed
                    appointments.
                  </p>

                </div>

              </div>

            )}


            {/* SIMILAR STYLES */}

            {detailTab === "Similar Styles" && (

              <div className="gallery-detail-content">

                <h2>
                  Similar Styles
                </h2>

                <div className="detail-recommendations">

                  {recommendedItems.map(
                    (item) => (

                      <button
                        type="button"
                        className="recommended-card"
                        key={item.id}
                        onClick={() =>
                          openItem(item)
                        }
                      >

                        <img
                          src={item.image || ""}
                          alt={item.name}
                        />

                        <div>

                          <h3>
                            {item.name}
                          </h3>

                          <span>
                            {item.price}
                          </span>

                        </div>

                      </button>

                    )
                  )}

                </div>

              </div>

            )}


            {/* YOU MAY ALSO LIKE */}

            {recommendedItems.length > 0 && (

              <section className="you-may-like">

                <div className="you-may-like-heading">

                  <h2>
                    You May Also Like
                  </h2>

                  <button
                    type="button"
                    onClick={() =>
                      setDetailTab(
                        "Similar Styles"
                      )
                    }
                  >
                    View All →
                  </button>

                </div>


                <div className="you-may-like-grid">

                  {recommendedItems.map(
                    (item) => (

                      <button
                        type="button"
                        className="you-may-like-card"
                        key={item.id}
                        onClick={() =>
                          openItem(item)
                        }
                      >

                        <div className="recommend-image">

                          <img
                            src={item.image || ""}
                            alt={item.name}
                          />

                        </div>

                        <div className="recommend-info">

                          <h3>
                            {item.name}
                          </h3>

                          <span>
                            {item.price}
                          </span>

                        </div>

                      </button>

                    )
                  )}

                </div>

              </section>

            )}

            </div>
          </div>,
          document.body
        )}

    </>
  );
}

export default Gallery;