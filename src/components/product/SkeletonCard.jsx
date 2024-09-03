import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import styles from './SkeletonCard.module.css';

function SkeletonCard({ columns }) {
  const skeletons = Array.from({ length: columns });

  return (
    <>
      {skeletons.map((_, index) => (
        <Card key={index} className={`overflow-hidden group ${styles.skeletonCard}`}>
          <div className={`relative overflow-hidden aspect-square ${styles.skeletonImage}`}></div>
          <CardContent className="p-4 space-y-4 xl:group-hover:bg-muted/40 transition-all duration-300">
            <div className={`${styles.skeletonTitle} ${styles.skeletonText}`}/>
            <div className="flex items-center gap-2 mt-3">
              <div className={styles.skeletonBadge}/>
              <div className={styles.skeletonBadge}/>
              <div className={styles.skeletonBadge}/>
            </div>
            <div className="flex items-center gap-4 justify-between">
              <div className={styles.skeletonPrice}/>
              <div className={styles.skeletonButton}/>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default SkeletonCard;
