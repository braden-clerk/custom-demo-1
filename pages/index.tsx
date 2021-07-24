import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import BasicModal from "../components/BasicModal";
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
// Footer component
const Footer = () => (
  <footer className={styles.footer}>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by{" "}
      <img src="/clerk.svg" alt="Clerk.dev" className={styles.logo} />
      +
      <img src="/nextjs.svg" alt="Next.js" className={styles.logo} />
    </a>
  </footer>
);

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>    
      <BasicModal>  
        <SignedIn>
          <WelcomeGreeting />
        </SignedIn>
        <SignedOut>
          <h3>Get started with a new auth experience</h3>
          <Link href="/log-in">
            <button>Get started</button>
          </Link>
          <Link href="/log-in">
            <button>Log in</button>
          </Link>        
        </SignedOut>
      </BasicModal>
      <Footer />
    </div>
  )
}

const WelcomeGreeting = () => {
  const u = useUser()
  
  return (
    <h3>Welcome {u.emailAddresses[0].emailAddress}</h3>
  )
}

export default Home;
