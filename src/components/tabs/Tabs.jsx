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
import { requestGetAllDocument, requestGetAllDocumentNew } from "../../api/documents";
import { setDataFilter } from "../../states/modules/document";
const Tabs = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState("tab1");
  
  const filter = useSelector(state => state.document.dataFilter)

  const listDocumentsNew = useSelector(state => state.document.listDocumentsNew);
  const listDocuments = useSelector(state => state.document.listDocuments);

  const documentsNew = listDocumentsNew.documents
  const documents = listDocuments.documents

  useEffect(() => {
    dispatch(requestGetAllDocumentNew())
  }, [])

  useEffect(() => {
    dispatch(setDataFilter({ ...filter, sort_by: 'view', sort_order: 'desc' }))
    dispatch(requestGetAllDocument())
  }, [])


  return (
    <>
      {listDocuments ? (
        <div className="tabs">
          <div className="tabs__wrapper">
            <div className="tabs__heading">
              <div className="tabs__button">
                <h3 onClick={() => setActive("tab1")} className={cx("tabs__mainTitle", { active: active === "tab1" })}><span>Gần đây nhất</span></h3>
                <h3 onClick={() => setActive("tab2")} className={cx("tabs__mainTitle", { active: active === "tab2" })}><span>Xem nhiều</span></h3>
              </div>
            </div>
            <div className={cx("tabs__list", { show: active === "tab1" })}>
              {documentsNew.slice(0, 6).map((post) => (
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
                <h3 className="tabs__mainTitle"><span>Xem nhiều</span></h3>
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
