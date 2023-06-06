"use client";

import styles from "./nav.module.css";
import { Icons } from "@/components/Icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);

  const classNav = open ? styles.open : "";
  const classButton = open ? styles.close : "";
  return (
    <>
      <nav className={cn(styles.menu, classNav)}>
        <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
          <div
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
            })}
          >
            <Icons.gitHub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </div>
        </Link>
        <Link href={siteConfig.links.personal} target="_blank" rel="noreferrer">
          <div
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
            })}
          >
            <Icons.personal className="h-5 w-5" />
            <span className="sr-only">Mi web</span>
          </div>
        </Link>
        <ThemeToggle />
      </nav>
      <button
        className={cn(styles.nav_mobile_btn, classButton)}
        onClick={() => setOpen(!open)}
        aria-label="Abrir menú"
      >
        <span className="mt-2 duration-200 sm:mt-1"></span>
        <span className="mt-1 duration-200"></span>
        <span className="mt-1 duration-100"></span>
      </button>
    </>
  );
}
