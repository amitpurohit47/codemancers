import React, { useState, useEffect } from "react";
import "./Create.css";

function Create({ name, modalHandler, postHandler, allgifs, setAllgifs }) {
  const [inputlength, setInputlength] = useState(0);

  const handleInputChange = (e) => {
    setInputlength(e.target.value.length);
  };

  const API_KEY = "NPesMpuG1sQYci8wGDLynbbXJtnloYvZ";
  let trend_url = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=10`;
  let search_url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=10&q=`;

  const [trend, setTrend] = useState([]);
  const [searchgifs, setSearchgifs] = useState([]);

  useEffect(() => {
    const fetchgif = async () => {
      await fetch(trend_url)
        .then((res) => res.json())
        .then((data) => {
          setTrend(data.data);
        })
        .catch((e) => console.log(e));
    };
    fetchgif();
  }, [trend_url]);

  const searchgif = async (e) => {
    search_url = search_url.concat(e.target.value.trim());
    await fetch(search_url)
      .then((res) => res.json())
      .then((data) => setSearchgifs(data.data))
      .catch((err) => console.log(err));
  };

  const openGif = () => {
    document.querySelector(".add-gif").classList.add("add-gif-open");
  };

  const closeGif = () => {
    document.querySelector(".add-gif").classList.remove("add-gif-open");
  };

  const addGif = (e) => {
    const gifurls = [...allgifs];
    gifurls.push(e.target.src);
    gifurls.reverse();
    setAllgifs(gifurls);
    closeGif();
  };

  const removegif = (e) => {
    const urls = [...allgifs];
    const str = e.target.id;
    const ind = parseInt(str[str.length - 1]);
    urls.splice(ind, 1);
    setAllgifs(urls);
  };

  return (
    <div className="create">
      <div className="create-box">
        <div className="add-gif">
          <div className="add-gif-heading">
            <div onClick={closeGif}>&larr;</div>
            <h1>Choose a GIF</h1>
          </div>
          <div className="add-gif-search">
            <i></i>
            <input type="text" onChange={searchgif} placeholder="Search" />
          </div>
          <div className="add-gif-options">
            {searchgifs.length
              ? searchgifs.map((gif, i) => (
                  <img
                    src={gif.images.downsized.url}
                    onClick={addGif}
                    alt="gif"
                    key={`g${i}`}
                  />
                ))
              : trend.map((gif, i) => (
                  <img
                    src={gif.images.downsized.url}
                    onClick={addGif}
                    alt="gif"
                    key={`g${i}`}
                  />
                ))}
          </div>
        </div>
        <div className="create-heading">
          <h1>Create Post</h1>
          <div onClick={() => modalHandler(false)}>&#x2715;</div>
        </div>
        <div className="create-main">
          <div className="create-avatar">
            <div className="create-avatar-inner"></div>
            <h4>{name}</h4>
          </div>
          <textarea
            onChange={handleInputChange}
            placeholder="What's on your mind?"
          ></textarea>
          <div className="input-gifs">
            {allgifs.map((gif, i) => (
              <div className="input-gif">
                <div
                  className="gif-cross"
                  onClick={removegif}
                  id={`g${i}`}
                  key={`g${i}`}
                >
                  &#x2715;
                </div>
                <img src={gif} alt="gif" />
              </div>
            ))}
          </div>
          <div className="addtopost">
            <h5>Add to Post</h5>
            <i onClick={openGif}></i>
            <h5 onClick={openGif}>GIF</h5>
          </div>
          <div
            className={`${
              inputlength === 0 && allgifs.length === 0
                ? "post-btn-disabled"
                : ""
            } post-btn`}
            onClick={postHandler}
          >
            Post
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
