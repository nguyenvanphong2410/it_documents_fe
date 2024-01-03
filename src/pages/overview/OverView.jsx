import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss'
import './styles.scss'
import { Card, Col, Row, Skeleton } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { requestGetAllCategory } from '../../api/category';
import { requestGetAllUser } from '../../api/user';
import { requestGetAllDocument, requestGetAllPendingDocumentOver } from '../../api/documents';
import { CheckCircleOutlined, FieldTimeOutlined, PieChartFilled, ProfileOutlined, UserOutlined } from '@ant-design/icons';
import SpinComponent from '../../components/spin';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, ResponsiveContainer } from 'recharts';

const OverView = () => {

    const dispatch = useDispatch();
    const listUser = useSelector(state => state.user.listUsers);
    const isLoading = useSelector(state => state.category.isLoadingGetAllCategory);
    const listCategory = useSelector(state => state.category.listCategories);
    const listDocumentChecked = useSelector(state => state.document.listDocuments);
    const listDocumentPending = useSelector(state => state.document.listDocumentsPendingOver);
    const [showSpin, setShowSpin] = useState(true);

    const SpinComponentDelayed = () => (
        <div className="spin-container">
            <SpinComponent />
        </div>
    );
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowSpin(false);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, []);

    const colors = ['#8433e0', '#3bc0c3', '#23c023', '#eb906f'];

    const data = [
        {
            name: 'Tổng số người dùng',
            'Số lượng': listUser.total,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Tổng số thể loại',
            'Số lượng': listCategory.total,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Tổng số tài liệu duyệt',
            'Số lượng': listDocumentChecked.total,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Tổng số tài liệu chờ',
            'Số lượng': listDocumentPending.total,
            pv: 3908,
            amt: 2000,
        },

    ];


    //Tron

    const dataPie = [
        { name: 'Tài liệu đã duyệt', value: listDocumentChecked.total },
        { name: 'Tài liệu chờ duyệt', value: listDocumentPending.total },

    ];

    const COLORS = ['#23c023', '#eb906f'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };


    console.log('listDocumentPending', listDocumentPending)
    useEffect(() => {
        dispatch(requestGetAllUser())
    }, [])

    useEffect(() => {
        dispatch(requestGetAllCategory())
    }, [])

    useEffect(() => {
        dispatch(requestGetAllDocument())
    }, [])

    useEffect(() => {
        dispatch(requestGetAllPendingDocumentOver())
    }, [])


    useEffect(() => {
        document.title = "Tổng quan";
    }, []);


    return (
        <>
            {showSpin && <SpinComponentDelayed />}
            {!isLoading && !showSpin && (
                <>
                    <div className={styles.totalWrap}>
                        <Row gutter={{
                            xs: [10, 10],
                            sm: 10,
                            md: 16,
                            lg: 20,
                        }}>
                            <Col xs={24} sm={6} md={6} lg={6} xl={6} >
                                <Card className={`card-total ${styles.widgetFlat} ${styles.bgInfo}`}>
                                    <div className="card-body">
                                        <div className={`${styles.widgetIcon}`}>
                                            <UserOutlined />
                                        </div>
                                        <h6 className={styles.title}>Tổng người dùng</h6>
                                        <h2 className={styles.subTitle}>{listUser?.total}</h2>

                                    </div>
                                </Card>
                            </Col>
                            <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                                <Card className={`card-total ${styles.widgetFlat} ${styles.bgPrimary}`}>
                                    <div className="card-body">
                                        <div className={`${styles.widgetIcon}`}>
                                            <ProfileOutlined />
                                        </div>
                                        <h6 className={styles.title}>Tổng số thể loại</h6>
                                        <h2 className={styles.subTitle}>{listCategory.total}</h2>

                                    </div>
                                </Card>
                            </Col>
                            <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                                <Card className={`card-total ${styles.widgetFlat} ${styles.bgSuccess}`}>
                                    <div className="card-body">
                                        <div className={`${styles.widgetIcon}`}>
                                            <CheckCircleOutlined />
                                        </div>
                                        <h6 className={styles.title}>Tổng tài liệu duyệt</h6>
                                        <h2 className={styles.subTitle}>{listDocumentChecked.total}</h2>
                                    </div>
                                </Card>
                            </Col>
                            <Col xs={24} sm={6} md={6} lg={6} xl={6}>
                                <Card className={`card-total ${styles.widgetFlat} ${styles.bgPink}`}>
                                    <div className="card-body">
                                        <div className={`${styles.widgetIcon}`}>
                                            <FieldTimeOutlined />
                                        </div>
                                        <h6 className={styles.title}>Tổng tài liệu chờ</h6>
                                        <h2 className={styles.subTitle}>{listDocumentPending.total}</h2>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>

                    <div className={styles.charWrap}>

                        <Row>
                            <Col span={18}>
                                <div className={styles.barChartWrap}>
                                    <ResponsiveContainer width="95%" height={400}>
                                        <BarChart
                                            className={styles.barChart}
                                            data={data}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="Số lượng" fill="#8884d8" label={{ position: 'top' }}>
                                                {data.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <div className={styles.textName}>
                                        <span> Biều đồ thống kê tổng quan</span>
                                    </div>
                                </div>

                            </Col>
                            <Col span={1}></Col>
                            <Col span={5}>
                                <div className={styles.barChartPieWrap}>
                                    <div className={styles.pieChartCenter}>
                                        <PieChart width={400} height={400} >
                                            <Tooltip />
                                            <Pie
                                                data={dataPie}
                                                labelLine={false}
                                                label={renderCustomizedLabel}
                                                outerRadius={90}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {dataPie.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </div>
                                    <div className={styles.namePie}>
                                        <span><PieChartFilled /></span>
                                        <span className={styles.textName}> Biều đồ thống kế tài liệu</span>
                                        <div className={styles.itemNote}>
                                            <span className={styles.circlePending}></span>
                                            <span className={styles.textPending}>Tài liệu chờ duyệt</span>
                                        </div>
                                        <div className={styles.itemNote}>
                                            <span className={styles.circleChecked}></span>
                                            <span className={styles.textChecked}>Tài liệu đã duyệt</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </>
            )}
        </>
    );
};

export default OverView;
