import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./tabs.scss";
import useSWR from "swr";
import TabsSkeleton from "./tabsSkeleton/TabsSkeleton";
import cx from "classnames";
import { domainApi } from "../../requestMethods";
import { dayjsFormat } from "../../utils/dayjsFormat";
import { dayjsFormatFromNow } from "../../utils/dayjsFormat";

const Tabs = () => {
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
                <h3 onClick={() => setActive("tab1")} className={cx("tabs__mainTitle", {active: active === "tab1"})}><span>Gần đây nhất</span></h3>
                <h3 onClick={() => setActive("tab2")} className={cx("tabs__mainTitle", {active: active === "tab2"})}><span>Đọc nhiều</span></h3>
              </div>
            </div>
            <div className={cx("tabs__list", {show: active === "tab1"})}>
              {data.posts.slice(0, 4).map((post) => (
                <div className="tabs__listItem" key={post._id}>
                  <div>
                  {/* Xác định đường dẫn nếu có subCategory, dùng css để ẩn 1 item c */}
                    {post.categories.map((c, index) => {
                      let cat;
                      if (c === "innovation" || c === "tourism") {
                        cat = "economy";
                      } else if (c === "civil-protection" || c === "education" || c === "housing" || c === "urban-planning") {
                        cat = "society";
                      } else {
                        cat = null;
                      }
                      if (cat) {
                        return (
                          <Link key={index} to={`/articles/category/${cat}/${c}`} className="tabs__tag">
                            <span>
                              {[
                                c === "economy" ? "Kinh tế" :
                                  c === "innovation" ? "Sự đổi mới" :
                                  c === "tourism" ? "Du lịch" :
                                c === "culture" ? "Văn hoá" :
                                c === "politics" ? "Chính trị" :
                                c === "society" ? "Xã hội" :
                                  c === "civil-protection" ? "Bảo vệ công dân" :
                                  c === "education" ? "Giáo dục" :
                                  c === "housing" ? "Nhà ở" :
                                  c === "urban-planning" ? "Quy hoạch đô thị" :
                                c === "mobility" ? "Tính di động" :
                                c === "environment" ? "Môi trường" :
                                c === "sports" ? "Thể thao" : "",
                              ]}
                            </span>
                          </Link>
                        )
                      } else {
                        return (
                          <Link key={index} to={`/articles/category/${c}`} className="tabs__tag">
                            <span>
                              {[
                                c === "economy" ? "Kinh tế" :
                                c === "culture" ? "Văn hoá" :
                                c === "politics" ? "Chính trị" :
                                c === "society" ? "Xã hội" :
                                c === "mobility" ? "Tính di động" :
                                c === "environment" ? "Môi trường" :
                                c === "sports" ? "Thể thao" : "",
                              ]}
                            </span>
                          </Link>
                        )
                      }
                    })}
                  </div>
                  <Link to={`/post/${post._id}`}>
                    <h3 className="tabs__title">{post.name}</h3>
                  </Link>
                  <p className="tabs__date">
                    {dayjsFormatFromNow(post.createdAt)}
                  </p>
                </div>
              ))}
            </div>
            <div className={cx("tabs__list", {show: active === "tab2"})}>
              {data.posts.slice(0, 2).map((post) => (
                <div className="tabs__listItem" key={post._id}>
                  <div>
                  {/* Xác định đường dẫn nếu có subCategory */}
                  {/* Dùng css để ẩn 1 item c */}
                    {post.categories.map((c, index) => {
                      let cat;
                      if (c === "innovation" || c === "tourism") {
                        cat = "economy";
                      } else if (c === "civil-protection" || c === "education" || c === "housing" || c === "urban-planning") {
                        cat = "society";
                      } else {
                        cat = null;
                      }
                      if (cat) {
                        return (
                          <Link key={index} to={`/articles/category/${cat}/${c}`} className="tabs__tag">
                            <span>
                              {[
                                c === "economy" ? "Kinh tế" :
                                  c === "innovation" ? "Sự đổi mới" :
                                  c === "tourism" ? "Du lịch" :
                                c === "culture" ? "Văn hoá" :
                                c === "politics" ? "Chính trị" :
                                c === "society" ? "Xã hội" :
                                  c === "civil-protection" ? "Bảo vệ công dân" :
                                  c === "education" ? "Giáo dục" :
                                  c === "housing" ? "Nhà ở" :
                                  c === "urban-planning" ? "Quy hoạch đô thị" :
                                c === "mobility" ? "Tính di động" :
                                c === "environment" ? "Môi trường" :
                                c === "sports" ? "Thể thao" : "",
                              ]}
                            </span>
                          </Link>
                        )
                      } else {
                        return (
                          <Link key={index} to={`/articles/category/${c}`} className="tabs__tag">
                            <span>
                              {[
                                c === "economy" ? "Kinh tế" :
                                c === "culture" ? "Văn hoá" :
                                c === "politics" ? "Chính trị" :
                                c === "society" ? "Xã hội" :
                                c === "mobility" ? "Tính di động" :
                                c === "environment" ? "Môi trường" :
                                c === "sports" ? "Thể thao" : "",
                              ]}
                            </span>
                          </Link>
                        )
                      }
                    })}
                  </div>
                  <Link to={`/post/${post._id}`}>
                    <h3 className="tabs__title">{post.name}</h3>
                  </Link>
                  <p className="tabs__date">
                    {dayjsFormat(post.createdAt)}
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
