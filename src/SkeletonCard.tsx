import React from 'react';
import styles from './styles/SkeletonCard.module.css'

const SkeletonCard: React.FC = () => {
  return (
    <div className={styles.skeletonCard}>
      <div className={`${styles.shimmer} ${styles.skeletonImage}`}></div>
      <div className={`${styles.shimmer} ${styles.skeletonTitle}`}></div>
      <div className={styles.skeletonFooter}>
        <div className={`${styles.shimmer} ${styles.skeletonPrice}`}></div>
        <div className={`${styles.shimmer} ${styles.skeletonRating}`}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;