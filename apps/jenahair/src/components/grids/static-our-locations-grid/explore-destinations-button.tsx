"use client";

import { OPEN_DESTINATIONS_POPOVER_EVENT } from "@/constants";
import { UnstyledButton } from "@mantine/core";
import styles from "./explore-destinations-button.module.scss";

export default function ExploreDestinationsButton({ className }: { className?: string }) {
  return (
    <UnstyledButton
      className={`${styles.exploreButton} ${className || ""}`}
      onClick={() => {
        window.dispatchEvent(new CustomEvent(OPEN_DESTINATIONS_POPOVER_EVENT));
      }}
    >
      <span className={styles.text}>Explore Destinations </span>
      <span className={styles.arrow}>→</span>
    </UnstyledButton>
  );
}


