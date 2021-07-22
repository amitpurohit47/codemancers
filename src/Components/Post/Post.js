import React from "react";
import "./Post.css";

function Post({ textData, gifs, name }) {
  const dateobj = new Date();
  let date = dateobj.getDate();
  let month = dateobj.getMonth() + 1;
  let year = dateobj.getFullYear();
  let hours = dateobj.getHours();
  let minutes = dateobj.getMinutes();
  let seconds = dateobj.getSeconds();

  if (Math.floor(date / 10) === 0) {
    date = "0" + date;
  }
  if (Math.floor(month / 10) === 0) {
    month = "0" + month;
  }
  if (Math.floor(hours / 10) === 0) {
    hours = "0" + hours;
  }
  if (Math.floor(minutes / 10) === 0) {
    minutes = "0" + minutes;
  }
  if (Math.floor(seconds / 10) === 0) {
    seconds = "0" + seconds;
  }

  return (
    <div className="post">
      <div className="post-top">
        <div className="post-avatar"></div>
        <div className="post-name">
          <p>{name}</p>
          <p>{`${date}/${month}/${year} at ${hours}:${minutes}:${seconds}`}</p>
        </div>
        <div className="post-dots">
          <i></i>
        </div>
      </div>
      <div className="post-main">
        <div className="post-text">{textData}</div>
        <div className="post-gif">
          {gifs.map((gif, i) => (
            <img src={gif} alt="gif" key={`gif${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
