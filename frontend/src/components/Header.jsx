import React from 'react'
import styles from '@/styles/Home.module.scss'
import Link from 'next/link'

export default function Header() {
  return (
    
    <header className={styles.header}>
        <div className={styles.width}>
            <h1 className={styles.h1}>
                <Link className={styles.a} href="/">RichIN</Link>
                
            </h1>
        </div>
        </header>
  )
}
