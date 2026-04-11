'use client';

import { useState, useEffect } from "react";
import { ActionIcon } from "@mantine/core";
import { FaChevronUp } from "react-icons/fa6";
import classes from "./scroll-to-top.module.scss";

export function ScrollToTop() {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <ActionIcon
            variant="outline"
            radius="xl"
            size="xl"
            className={`${classes.floatingTopBtn} ${showTopBtn ? classes.visible : ""}`}
            onClick={scrollToTop}
        >
            <FaChevronUp size={18} />
        </ActionIcon>
    );
}