export type RoleKey = "vocals" | "guitar" | "bass" | "drums";

export interface Member {
  name: string;
  roleKey: RoleKey;
  portrait: string;
}

// Four-member lineup and portraits approved by the owner, 2026-09-15.
export const members: Member[] = [
  { name: "Dorian Remis", roleKey: "vocals", portrait: "/assets/press-kit/dorian-remis.webp" },
  { name: "Che", roleKey: "guitar", portrait: "/assets/press-kit/che.webp" },
  { name: "Marcos Ceballos", roleKey: "drums", portrait: "/assets/press-kit/marcos-ceballos.webp" },
  { name: "JP Soria", roleKey: "bass", portrait: "/assets/press-kit/jp-soria.webp" },
];
