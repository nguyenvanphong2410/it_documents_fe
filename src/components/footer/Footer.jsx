import React, { useContext } from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';
import { SvgFaceBook } from '../svgs/SvgFaceBook';
import { SvgYoutube } from '../svgs/SvgYoutube';
import { SvgInstagram } from '../svgs/SvgInstagram';
import { Context } from '../../context/Context';
import logo from "../../assets/images/logo/logormbg.png"
import styles from './style.module.scss';

const Footer = () => {
  const { user } = useContext(Context);
  return (
    <footer className="footer" style={{backgroundColor: user?.isAdmin ? "#333" : "#333"}}>
      <div className="footer__wrapper">
        <div className="footer__top">
          <div className="footer__links anime">
            <div className="footer__logo"><img className={styles.logo} src={logo} alt="" /></div>
            <div className="footer__icons anime">
              <Link to="/" className="footer__icon"><SvgFaceBook /></Link>
              <Link to="/" className="footer__icon"><SvgYoutube /></Link>
              <Link to="/" className="footer__icon"><SvgInstagram /></Link>
            </div>
          </div>
          <div className="footer__links anime">
            <p className="footer__desc anime">Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres</p>
            <p className="footer__desc anime">Email: Phong@gmail.com</p>
            <p className="footer__desc anime">Hotline: 0362800771</p>
          </div>
          <div className="footer__links anime">
            <Link to="/" className="footer__link anime">Câu hỏi thường gặp</Link>
            <Link to="/" className="footer__link anime">Tin tức</Link>
            <Link to="/" className="footer__link anime">Chính sách & bảo mật</Link>
          </div>
        </div>
        <div className="footer__bottom anime">
          <p className="footer__text">© Nguyễn Văn Phong - Học viện Nông nghiệp Việt Nam</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer