import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>
          Hi👋
          <br />
          this is Julie&apos;s Pre-test work for Shoalter.
        </h1>
        <ul>
          <li>
            <Link href="/store">🔗 Click here to view the mock APP Store.</Link>
          </li>
          <li>
            <a href="https://pda.104.com.tw/profile/share/gw4uGJCBYQR0nfUVE0DaGuat0iMYZBLv">
              📜 Click here to view Julie&apos;s resume.
            </a>
          </li>
        </ul>
      </main>
    </div>
  )
}
