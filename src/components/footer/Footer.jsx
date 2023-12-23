import React, { useContext } from 'react';
import './footer.scss';
import { Link } from 'react-router-dom';
import { SvgFaceBook } from '../svgs/SvgFaceBook';
import { SvgYoutube } from '../svgs/SvgYoutube';
import { SvgInstagram } from '../svgs/SvgInstagram';
import { Context } from '../../context/Context';
import logo from "../../assets/images/logo/logormbg.png"
import styles from './style.module.scss';
import { Col, Row } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

const Footer = () => {
  const { user } = useContext(Context);

  return (
    <div className={styles.footerWrap}>

      <Row gutter={[16, 16]} className={styles.rowFooterWrap}> {/* Điều chỉnh khoảng cách giữa các cột tùy theo thiết kế của bạn */}
        <Col xs={24} sm={12} md={8} lg={6} className={styles.colFooterWrap}>
          <div className={styles.oneFooter}>
            <div ><img className={styles.logo} src={logo} alt="" /></div>
            <div className="footer__icons anime">
              <Link to="/" className="footer__icon"><SvgFaceBook /></Link>
              <Link to="/" className="footer__icon"><SvgYoutube /></Link>
              <Link to="/" className="footer__icon"><SvgInstagram /></Link>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} className={styles.colFooterWrap}>
          <div className={styles.twoFooter}>
            <p className={styles.textTwoInfo}>Far far away, behind the world mountains, far from the countries Vokalia and Consonantia, theres nd Consonantia, nd Consonantia, nd Consonantia, nd Consonantia, nd Consonantia, nd Consonantia, nd Consonantia, nd Consonantia, </p>
            <p className={styles.textTwo}> <MailOutlined /> Email: Phong@gmail.com</p>
            <p className={styles.textTwo}> <PhoneOutlined  /> Hotline: 0362800771</p>
          </div>
        </Col>

        <Col xs={24} sm={12} md={8} lg={6} className={styles.colFooterWrap}>
          <div className={styles.threeFooter}>
            <ul>
              <li className={styles.textAsk}> Câu hỏi thường gặp</li>
              <li className={styles.textAsk}>Câu hỏi bảo mật? </li>
              <li className={styles.textAsk}>Câu hỏi thường gặp</li>
            </ul>

          </div>
        </Col>
      </Row>

      <div className="footer__bottom anime" style={{marginTop: '30px', paddingBottom: '20px'}}>
        <p className="footer__text">© Nguyễn Văn Phong - Học viện Nông nghiệp Việt Nam</p>
      </div>
    </div>

  )
}

export default Footer;
