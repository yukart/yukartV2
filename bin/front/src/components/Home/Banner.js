import React from 'react';

const Banner = ({appName}) => {
  return (
    <div className="banner" style={{backgroundColor:'#595959'}}>
        <h1 className="logo-font">
          {appName.toLowerCase()}
        </h1>
        <p style={{color: '#f16e00'}}>Check out for movie shows, musics and cinema and TV shows, Yukart shows, the latest trailers, albums and more ...</p>
    </div>
  );
};

export default Banner;
