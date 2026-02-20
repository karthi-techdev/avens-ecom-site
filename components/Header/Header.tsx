import React from 'react';
import {
  Search,
  Heart,
  ShoppingCart,
  PhoneCall,
  ChevronDown,
  LayoutGrid,
  MapPin,
  Smartphone
} from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      {/* Top Bar — matches image: phone | location | promo with view details */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          <div className={styles.topBarLeft}>
            <span className={styles.contactItem}>
              <Smartphone size={14} strokeWidth={1.5} />
              (+01) – 2345 – 6789
            </span>
            <span className={styles.divider}>|</span>
            <span className={styles.contactItem}>
              <MapPin size={14} strokeWidth={1.5} />
              Our location
            </span>
          </div>
          <div className={styles.topBarCenter}>
            Get great devices <strong>up to 50% off</strong> <a href="#">View details</a>
          </div>
          <div className={styles.topBarRight}>
            {/* right side empty in original image, but we keep minimal to not break design */}
            <div className={styles.topBarLink}>
              English <ChevronDown size={14} />
            </div>
            <span className={styles.divider}>|</span>
            <div className={styles.topBarLink}>
              Log In / Sign Up
            </div>
          </div>
        </div>
      </div>

      {/* Main Header — Evaria® | All Categories + search | hotline (exact as image) */}
      <div className={styles.mainHeader}>
        <div className={styles.container}>
          {/* Logo: Evaria® with leaf icon (exact match to image description) */}
          <div className={styles.logoWrapper}>
            <span className={styles.logoText}>Evaria®</span>
            <svg className={styles.leafIcon} width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C12 2 12 10 2 10C2 10 2 22 12 22C12 22 22 10 22 10C22 10 12 10 12 2Z" stroke="#3BB77E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Search bar — exactly "All Categories | Search for items..." */}
          <div className={styles.searchBar}>
            <div className={styles.searchContainer}>
              <button className={styles.categorySelect}>
                All Categories <ChevronDown size={14} />
              </button>
              <div className={styles.searchDivider}>|</div>
              <input type="text" placeholder="Search for items..." />
              <Search size={20} className={styles.searchIcon} />
            </div>
          </div>

          <div className={styles.headerActions}>
            <div className={styles.actionItem}>
              <div className={styles.iconBadge}>
                <Heart size={28} strokeWidth={1.5} />
                <span className={styles.badge}>4</span>
              </div>
            </div>
            <div className={styles.actionItem}>
              <div className={styles.iconBadge}>
                <ShoppingCart size={28} strokeWidth={1.5} />
                <span className={styles.badge}>2</span>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* Nav Bar — Browse Categories + menu items (with ▼) + Hotline (duplicate?) but exactly as image */}
      <div className={styles.navBar}>
        <div className={styles.container}>
          <div className={styles.browseCategories}>
            <LayoutGrid size={20} />
            <span>Browse Categories</span>
          </div>

          <nav className={styles.mainNav}>
            <ul>
              <li className={styles.active}>Home <ChevronDown size={12} /></li>
              <li>About <ChevronDown size={12} /></li>
              <li>Shop <ChevronDown size={12} /></li>
              <li>Mega menu <ChevronDown size={12} /></li>
              <li>Blog <ChevronDown size={12} /></li>
              <li>Pages <ChevronDown size={12} /></li>
              <li>Contact</li>
            </ul>
          </nav>

          <div className={styles.hotline}>
            <PhoneCall size={20} strokeWidth={1.5} color="#3BB77E" />
            <div className={styles.hotlineText}>
              <span>Hotline</span>
              <strong>1900 – 888</strong>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;