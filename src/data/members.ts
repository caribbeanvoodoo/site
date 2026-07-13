export type RoleKey = "vocals" | "guitar" | "bass" | "drums";

export interface Member {
  name: string;
  roleKey: RoleKey;
}

export const members: Member[] = [
  { name: "Dorian Remis", roleKey: "vocals" },
  { name: "Che", roleKey: "guitar" },
  { name: "JP", roleKey: "bass" },
  { name: "Detz conde", roleKey: "drums" },
];
