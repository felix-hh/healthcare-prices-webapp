import type { NextPage } from "next"
import Link from "next/link"
import styles from "../styles/Home.module.css"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.medical_sight}>
            Welcome to the Hippo project
          </span>
        </h1>
        <p className={styles.description}>
          Visit the <Link href="/HospitalProcedures">hospital procedures</Link>{" "}
          list{" "}
        </p>
        <div className={styles.longerDescription}>
          <p>
            We collect medical treatment prices from hospitals in San Francisco
            and make it available to the public.
          </p>
          <p>
            Our oath is to empower people to make the best healthcare decisions
          </p>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="http://felixhaba.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Felix Haba
        </a>
      </footer>
    </div>
  )
}

export default Home
