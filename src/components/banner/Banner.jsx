import "./Banner.css";

const Banner = (props) => {
  // Hàm giới hạn ký tự hiển tại mô tả ở Banner
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + " ..." : str;
  }

  return (
    <div className="banner">
      {props.backdrop_path && (
        <img
          className="bannerImg"
          src={`https://image.tmdb.org/t/p/w500${props.backdrop_path}`}
          alt={props.title}
        />
      )}

      <div className="info">
        <div className="title">{props.title}</div>
        <div className="bannerButtons">
          <button className="play">Play</button>
          <button className="more">My List</button>
        </div>
        <span className="desc">{truncate(props.overview, 150)}</span>
      </div>
    </div>
  );
};

export default Banner;
