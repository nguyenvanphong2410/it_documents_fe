import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./tabs.scss";
import useSWR from "swr";
import TabsSkeleton from "./tabsSkeleton/TabsSkeleton";
import cx from "classnames";
import { domainApi } from "../../requestMethods";
import { dayjsFormat } from "../../utils/dayjsFormat";
import { dayjsFormatFromNow } from "../../utils/dayjsFormat";
import styles from './style.module.scss'
import { EyeOutlined, FieldTimeOutlined, FileTextOutlined, FolderOpenFilled, FolderOpenOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { requestGetAllDocument } from "../../api/documents";
import { setDataFilter } from "../../states/modules/document";
const Tabs = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.document.dataFilter)

  const listDocuments = useSelector(state => state.document.listDocuments);
  const isLoading = useSelector(state => state.document.isLoadingGetAll);

  // console.log('listDocuments', listDocuments)
  const documents = listDocuments.documents
  useEffect(() => {
    dispatch(setDataFilter({ ...filter, sort_by: 'view', sort_order: 'desc' }))
    dispatch(requestGetAllDocument())
  }, [])

  const [active, setActive] = useState("tab1");
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(`${domainApi}/post/all?newest=true`, fetcher);
  if (error) return <div className="error">Failed to load</div>;


  return (
    <>
      {data ? (
        <div className="tabs">
          <div className="tabs__wrapper">
            <div className="tabs__heading">
              <div className="tabs__button">
                <h3 onClick={() => setActive("tab1")} className={cx("tabs__mainTitle", { active: active === "tab1" })}><span>Gần đây nhất</span></h3>
                <h3 onClick={() => setActive("tab2")} className={cx("tabs__mainTitle", { active: active === "tab2" })}><span>Đọc nhiều</span></h3>
              </div>
            </div>
            <div className={cx("tabs__list", { show: active === "tab1" })}>
              {data.posts.slice(0, 6).map((post) => (
                <div className="tabs__listItem" key={post._id}>
                  
                  <Link to={`/post/${post._id}`}>
                    <FolderOpenFilled className={styles.iconRecentDocuments}/> 
                    <span className={styles.nameRecentDocuments}>{post.name}</span>
                  </Link>
                  <p className={styles.timeRecentDocuments}>
                    <FieldTimeOutlined /> {dayjsFormatFromNow(post.createdAt)}
                  </p>
                </div>
              ))}
            </div>
            <div className={cx("tabs__list", { show: active === "tab2" })}>
              {documents.slice(0, 6).map((post) => (
                <div className="tabs__listItem" key={post._id}>
                  <Link to={`/post/${post._id}`}>
                  <FolderOpenFilled className={styles.iconRecentDocuments}/> 
                    <span className={styles.nameRecentDocuments}>{post.name}</span>
                  </Link>
                  <p className={styles.timeRecentDocuments}>
                    <EyeOutlined /> {post.view} lượt xem
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="tabs">
          <div className="tabs__wrapper">
            <div className="tabs__heading">
              <div className="tabs__button">
                <h3 className="tabs__mainTitle active"><span>Gần đây nhất</span></h3>
                <h3 className="tabs__mainTitle"><span>Đọc nhiều</span></h3>
              </div>
            </div>
            <div className="tabs__list show">
              <TabsSkeleton />
              <TabsSkeleton />
              <TabsSkeleton />
              <TabsSkeleton />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tabs;
