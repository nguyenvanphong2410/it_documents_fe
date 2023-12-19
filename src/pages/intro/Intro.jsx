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
              Far far away, behind the world mountains
            </h3>
          </div>
          <div className="wot__text">
            
            <h2 className="wot__title">Tài liệu</h2>
            <h3 className="wot__subtitle noSpacingBottom">
              Far far away, behind the world mountains
            </h3>
          </div>
        </div>
      </section>
    </>
  )
}

export default Intro