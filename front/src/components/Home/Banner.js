import React from 'react';

const Banner = ({appName}) => {
  return (
    <div className="banner" style={{backgroundColor:'#595959'}}>
        <h1 className="logo-font">
          {appName.toLowerCase()}
        </h1>
        <p>A place to find all your movies and musics</p>
    </div>
  );
};

export default Banner;
