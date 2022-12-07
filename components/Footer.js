import styles from './Footer.module.css'
import Image from "next/image";


export default function Footer() {
  return (
    <>
      <div className={styles.spacer}></div>
      <footer className={styles.footer}>
        Created by Wix Spartans <Image height={60} width={60} src="/spartans.svg" alt="Netlify Logo" /> for you
      </footer>
    </>
  )
}
