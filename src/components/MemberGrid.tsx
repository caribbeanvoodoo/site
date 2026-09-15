import Image from "next/image";
import { members } from "@/data/members";
import { dictionaries, type Locale } from "@/i18n/dictionaries";
import styles from "./MemberGrid.module.css";

/** The owner-approved lineup and portraits, sourced from press kit page 8. */
export function MemberGrid({ locale }: { locale: Locale }) {
  return (
    <div className={styles.wrap}>
      <ul className={styles.grid}>
        {members.map((member) => (
          <li className={styles.member} key={member.name}>
            <Image
              src={member.portrait}
              alt={member.name}
              width={700}
              height={1030}
              sizes="(max-width: 600px) 42vw, 280px"
              className={styles.portrait}
            />
            <div className={styles.name}>{member.name}</div>
            <div className={styles.role}>
              {dictionaries[locale].nosotros.roles[member.roleKey]}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
