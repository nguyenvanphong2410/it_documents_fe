import React, { useEffect } from 'react';
import styles from './style.module.scss'
import './styles.scss'
import { Card, Col, Row } from "antd";
// import { publicRequest } from "../../requestMethods";
import useSWR from "swr";
import { useLocation } from "react-router-dom";
import { domainApi } from "../../requestMethods";
import { useDispatch, useSelector } from 'react-redux';
// import { requestGetAllDocument } from '../../api/documents';
import { requestGetAllCategory } from '../../api/category';
import { requestGetAllUser } from '../../api/user';
import { setDataPendingFilter } from '../../states/modules/document';
import { requestGetAllDocument, requestGetAllPendingDocument } from '../../api/documents';
const OverView = () => {

    const dispatch = useDispatch();

    const listUser = useSelector(state => state.user.listUsers);
    const listCategory = useSelector(state => state.category.listCategories);
    // const listDocumentPending = useSelector(state => state.document.listDocumentsPending);
    const listDocumentChecked = useSelector(state => state.document.listDocuments);



    useEffect(() => {
        dispatch(requestGetAllUser())
    }, [])

    useEffect(() => {
        dispatch(requestGetAllCategory())
    }, [])
    useEffect(() => {
        dispatch(requestGetAllDocument())
      }, [])
    

    // console.log('listtjbkvj', listDocumentPending)

    // useEffect(() => {
    //     dispatch(setDataPendingFilter({ status_document: false }))
    //     dispatch(requestGetAllPendingDocument())
    // }, [])
    useEffect(() => {
        document.title = "Tổng quan";
    }, []);


    return (
        <>
            <div className={styles.totalWrap}>
                <Row gutter={{
                    xs: [10, 10],
                    sm: 10,
                    md: 16,
                    lg: 20,
                }}>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8} >
                        <Card className={`card-total ${styles.widgetFlat} ${styles.bgInfo}`}>
                            <div className="card-body">
                                <div className={`${styles.widgetIcon}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 500 512">
                                        <g fill="currentColor">
                                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                                        </g>
                                    </svg>
                                </div>
                                <h6 className={styles.title}>Tổng người dùng</h6>
                                <h2 className={styles.subTitle}>{listUser?.total}</h2>

                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                        <Card className={`card-total ${styles.widgetFlat} ${styles.bgPrimary}`}>
                            <div className="card-body">
                                <div className={`${styles.widgetIcon}`}>
                                    <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512">
                                        <g fill="currentColor">
                                            <path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z" />
                                        </g>
                                    </svg>
                                </div>
                                <h6 className={styles.title}>Tổng thể loại</h6>
                                <h2 className={styles.subTitle}>{listCategory.total}</h2>

                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                        <Card className={`card-total ${styles.widgetFlat} ${styles.bgPink}`}>
                            <div className="card-body">
                                <div className={`${styles.widgetIcon}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512">
                                        <g fill="currentColor">
                                            <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm54.2 253.8c-6.1 20.3-24.8 34.2-46 34.2H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h8.2c7.1 0 13.3-4.6 15.3-11.4l14.9-49.5c3.4-11.3 13.8-19.1 25.6-19.1s22.2 7.7 25.6 19.1l11.6 38.6c7.4-6.2 16.8-9.7 26.8-9.7c15.9 0 30.4 9 37.5 23.2l4.4 8.8H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-6.1 0-11.6-3.4-14.3-8.8l-8.8-17.7c-1.7-3.4-5.1-5.5-8.8-5.5s-7.2 2.1-8.8 5.5l-8.8 17.7c-2.9 5.9-9.2 9.4-15.7 8.8s-12.1-5.1-13.9-11.3L144 349l-9.8 32.8z" />
                                        </g>
                                    </svg>
                                </div>
                                <h6 className={styles.title}>Tổng tài liệu</h6>
                                <h2 className={styles.subTitle}>{listDocumentChecked.total}</h2>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default OverView;
