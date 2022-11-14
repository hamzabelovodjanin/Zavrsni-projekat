import React, { useState, useEffect } from "react";
import "./AddNewPost.css";
import axios from "axios";
import Tag from "../Tag/Tag";

export default function AddNewPost({
  display,
  addNewQouteFunc,
  closeFunc,
  addNewQouteTagFunc,
  showMessage,
}) {
  const [newPost, setNewPost] = useState({
    content: "",
    author: "",
    tags: [],
  });
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const [sendPost, setSendPost] = useState({
    content: "",
    author: "",
    tags: [],
  });

  const content = `modal ${display}`; //ading none, and display css Class
  const tok1 = localStorage.getItem("token"); //getting token

  useEffect(() => {
    setNewPost((prev) => {
      return { ...prev, tags: [...tags] };
    });
  }, [tags]);
  function removeTag(index, arrayOfTags) {
    const newArr = [...arrayOfTags];

    const newArrOfTags = newArr.filter((el, i) => i !== index);
    return newArrOfTags;
  }
  //sending request for adding a new post

  useEffect(() => {
    function addPostRequest(newQuoteForAdd) {
      axios
        .post("http://localhost:8000/quotes", newQuoteForAdd, {
          headers: {
            Authorization: "Bearer " + tok1,
          },
        })
        .then((response) => {
          setSendPost({
            content: "",
            author: "",
            tags: [],
          });
          setNewPost({
            content: "",
            author: "",
            tags: [],
          });
          setTags([]);
          setTag("");
          addNewQouteFunc((prev) => {
            return [...prev, response.data];
          });
          addNewQouteTagFunc((prev) => {
            return [...prev, response.data.tags];
          });

          showMessage({
            type: "success",
            text: "Qoute is " + response.statusText,
          });
        })
        .catch((e) => {
          setSendPost({
            content: "",
            author: "",
            tags: [],
          });
          setNewPost({
            content: "",
            author: "",
            tags: [],
          });
          setTag("");
          setTags([]);

          showMessage({ type: "warning", text: e.response.data.author });
          alert(e);
        });
    }
    if (sendPost.content) {
      addPostRequest(sendPost);
      setSendPost({
        content: "",
        author: "",
        tags: [],
      });
      setNewPost({
        content: "",
        author: "",
        tags: [],
      });
      setTags([]);
    }
    // eslint-disable-next-line
  }, [sendPost]);

  return (
    <div id="myModal" className={content}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={closeFunc}>
            &times;
          </span>
          <h2>Add New Quote</h2>
        </div>
        <div className="modal-body">
          <div className="form">
            <div className="qoute-container">
              <textarea
                className="textarea-post"
                value={newPost.content}
                onFocus={(e) => (e.target.value = "")}
                type={"textarea"}
                placeholder="Quote..."
                id="content"
                onChange={(e) =>
                  setNewPost((prev) => {
                    return { ...prev, content: e.target.value };
                  })
                }
                autoFocus
                required
              />

              <label htmlFor="author" className="authorLabel">
                <input
                  className="input-author"
                  value={newPost.author}
                  onFocus={(e) => (e.target.value = "")}
                  placeholder="Author"
                  id="author"
                  onChange={(e) =>
                    setNewPost((prev) => {
                      return { ...prev, author: e.target.value };
                    })
                  }
                  required
                />
              </label>
            </div>
          </div>
          <div>
            <div>
              <input
                className="input-tags"
                value={tag}
                onFocus={(e) => (e.target.value = "")}
                type={"text"}
                id="tags"
                placeholder="Tag..."
                onChange={(e) => {
                  setTag(e.target.value);
                }}
                required
              />
              {tag ? (
                <input
                  className="submit-tags"
                  type={"submit"}
                  value={"add"}
                  onClick={(e) => {
                    setTags((prev) => {
                      return [...prev, tag];
                    });
                    setTag("");
                    e.preventDefault();
                  }}
                />
              ) : (
                <input
                  className="submit-tags"
                  type="submit"
                  value="add"
                  onClick={(e) => {
                    setTags((prev) => {
                      return [...prev, tag];
                    });
                    setTag("");
                    e.preventDefault();
                  }}
                  disabled
                />
              )}

              {newPost.tags.map((el, i) => (
                <Tag
                  key={el + i}
                  name={el}
                  removeFunc={() => setTags(removeTag(i, tags))}
                />
              ))}
            </div>
            {newPost.author && newPost.content && newPost.tags.length ? (
              <input
                className="addNewQuoteSubmit"
                type="submit"
                onClick={(e) => {
                  setSendPost(newPost);

                  closeFunc();
                }}
              />
            ) : (
              <input
                className="addNewQuoteSubmit"
                type="submit"
                onClick={(e) => {
                  setSendPost(newPost);

                  closeFunc();
                }}
                disabled
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
