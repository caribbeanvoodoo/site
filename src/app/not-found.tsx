import Link from "next/link";
import styles from "./not-found.module.css";

/**
 * Branded 404. Deliberately bilingual-neutral: this renders outside the
 * LocaleProvider tree's usual flow and a lost visitor may arrive in either
 * language, so it shows both lines rather than guessing.
 */
export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.glyphs} aria-hidden="true">
          ✷ &nbsp;☾&nbsp; ⛧ &nbsp;☾&nbsp; ✷
        </div>
        <div className={styles.script}>Te perdiste en la selva</div>
        <h1 className={styles.headline}>404</h1>
        <p className={styles.copy}>
          Esta página no existe. <span className={styles.en}>This page doesn&apos;t exist.</span>
        </p>
        <Link href="/" className={styles.cta}>
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
