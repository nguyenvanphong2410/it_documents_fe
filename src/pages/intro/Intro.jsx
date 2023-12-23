import './intro.scss';
import React, { useEffect } from 'react';
import PeopleGrid from '../../components/peopleGrid/PeopleGrid';

const Intro = () => {
  useEffect(() => {
    document.title = "Giới thiệu - IT Documents.";
  }, []);
  
  return (
    <>
      <PeopleGrid />
      <section className="wot neu-01 noSpacingTop">
        <div className="wot__wrapper">
          <div className="wot__heading">
            <h2 className="wot__title">Tài liệu</h2>
            <h3 className="wot__subtitle">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
            </h3>
          </div>
          <div className="wot__text">
            
            <h2 className="wot__title">Tài liệu</h2>
            <h3 className="wot__subtitle noSpacingBottom">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
            </h3>
          </div>
        </div>
      </section>
    </>
  )
}

export default Intro