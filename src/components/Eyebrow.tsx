import styles from "./ui.module.css";

/** Red Kaushan Script section eyebrow, slightly rotated. */
export function Eyebrow({
  children,
  rotate = 3,
  color,
}: {
  children: React.ReactNode;
  rotate?: 2 | 3;
  color?: string;
}) {
  return (
    <div
      className={`${styles.eyebrow} ${rotate === 2 ? styles.rot2 : ""}`}
      style={color ? { color } : undefined}
    >
      {children}
    </div>
  );
}
