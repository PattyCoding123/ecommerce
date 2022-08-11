import React from 'react'
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai'

import styles from '../styles/Footer.module.scss'
const Footer = () => {

  /* 
    The Footer component will be a div that only contains two
    <p> elements:
    1. A <p> element that has a line describing the intent of the website
    2. A <p> element with 2 social media icons.

    This will always appear at the bottom of the page.
  */
  return (
    <div className={styles["footer__container"]}>
      <p>This is a personal project for educational purposes.</p>
      <p className={styles["footer__container-icons"]}>
        <AiFillLinkedin />
        <AiFillGithub />
      </p>
    </div>
  )
}

export default Footer