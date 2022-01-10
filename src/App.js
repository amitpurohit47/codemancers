import { useState } from "react";
import "./App.css";
import Create from "./Components/Create/Create";
import Post from "./Components/Post/Post";

function App() {
  const [posts, setPosts] = useState([]);
  const [modalopen, setModalopen] = useState(false);
  const [allgifs, setAllgifs] = useState([]);

  const name = "Rajat";

  const handlePost = () => {
    const createBox = document.querySelector(".create-box");
    const textData = createBox.querySelector("textarea").value;
    const newPost = {
      textData,
      allgifs,
    };
    const updatedPosts = [...posts];
    updatedPosts.reverse();
    updatedPosts.push(newPost);
    updatedPosts.reverse();
    setPosts(updatedPosts);
    setModalopen(false);
  };

  return (
    <div className="App">
      {modalopen ? (
        <Create
          name={name}
          allgifs={allgifs}
          setAllgifs={setAllgifs}
          postHandler={handlePost}
          modalHandler={setModalopen}
        />
      ) : null}
      <div className="container">
        <div className="top" onClick={() => setModalopen(true)}>
          <div className="avatar"></div>
          <div className="input-prompt">What's on your mind, {name}?</div>
        </div>
        <div className="posts">
          {posts.length === 0 ? (
            <h1>No posts yet. Click on above box to create post.</h1>
          ) : (
            posts.map((post) => (
              <Post
                textData={post.textData}
                name={name}
                gifs={post.allgifs}
                key={post.textData}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
