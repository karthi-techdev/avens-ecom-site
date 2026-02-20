import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h4>Hot promotions</h4>
            <h1>Fashion Trending <span>Great Collection</span></h1>
            <p>Save more with coupons & up to 20% off</p>
            <button className={styles.btn}>Discover Now</button>
          </div>
          <div className={styles.heroImage}>
            {/* Mocking the image area */}
            <div className={styles.imagePlaceholder}>
              <div className={styles.badge}>
                Big Offer <span>50% OFF</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
