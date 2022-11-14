import React, { useState } from "react";
import "../Quotes/Quotes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import HSLToRGB from "../../HSL to RGB/HslToRgb";

export default function Quote({
  id,
  author,
  content,
  upvotesCount,
  downvotesCount,
  givenVote,
  addedQouteFuncTrigger,
  alreadyVotedMessagefunc,
  spinnerFunc,
}) {
  const [votedAnime, setVotedAnime] = useState(false);
  function startVoteAnitamtion() {
    setVotedAnime(true);
    const timer = setTimeout(() => {
      setVotedAnime(false);
    }, 3500);
    return () => clearTimeout(timer);
  }
  const gradesPercentage = (upVotes, downVotes) => {
    if (upVotes > 0 && downVotes > 0) {
      const up = (upVotes / (upVotes + downVotes)) * 100;
      return Math.round(up);
    } else if (upVotes === 0 && downVotes === 0) {
      return 0;
    } else if (upVotes > 0 && downVotes === 0) {
      return 100;
    } else if (upVotes === 0 && downVotes > 0) {
      return 100;
    }
  };

  function clrByPercentage(percentage, upVote, downVote) {
    if (percentage === 0) {
      return "rgb(245, 246, 248)";
    } else if (upVote === 0 && downVote > 0) {
      return HSLToRGB(
        100 - gradesPercentage(upvotesCount, downvotesCount),
        98,
        50
      );
    } else {
      return HSLToRGB(gradesPercentage(upvotesCount, downvotesCount), 98, 50);
    }
  }
  function upVoteForPost(id, action, method) {
    const token = localStorage.getItem("token");

    axios({
      method: method,
      url: `http://localhost:8000/quotes/${id}/${action}`,
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        addedQouteFuncTrigger((prev) => !prev);
        spinnerFunc();
      })
      .catch((err) => {
        alreadyVotedMessagefunc({
          type: "warning",
          text: "Can't provide your action! Please try again later.",
        });
      });
  }

  // upvote or delete downvoted
  function upvoteOrDeleteDownvote() {
    if (givenVote === "none") {
      upVoteForPost(id, "upvote", "post");

      startVoteAnitamtion();
    } else if (givenVote === "downvote") {
      upVoteForPost(id, "downvote", "delete");
    } else {
      alreadyVotedMessagefunc({
        type: "info",
        text: "Already Upvoted",
      });
    }
  }

  // downvote or delete upvote
  function downvoteOrDeleteUpvote() {
    if (givenVote === "none") {
      upVoteForPost(id, "downvote", "post");

      startVoteAnitamtion();
    } else if (givenVote === "upvote") {
      upVoteForPost(id, "upvote", "delete");
    } else {
      alreadyVotedMessagefunc({
        type: "info",
        text: "Already Downvoted",
      });
    }
  }
  return (
    <div className="container-qoute">
      <div className="vote">
        <FontAwesomeIcon
          icon={faCaretUp}
          size={"xl"}
          beatFade={givenVote === "upvote" && votedAnime}
          color={givenVote !== "upvote" ? "rgb(55, 47, 63)" : ""}
          onClick={() => {
            upvoteOrDeleteDownvote();
          }}
        />

        <div
          className="procentOfGrades"
          style={{
            color: clrByPercentage(
              gradesPercentage(upvotesCount, downvotesCount),
              upvotesCount,
              downvotesCount
            ),
          }}
        >
          {gradesPercentage(upvotesCount, downvotesCount)}%
        </div>
        <div className="numberOfVotes">
          {upvotesCount}/{downvotesCount}
        </div>
        <FontAwesomeIcon
          icon={faCaretDown}
          size={"xl"}
          beatFade={givenVote === "downvote" && votedAnime}
          color={givenVote !== "downvote" ? "rgb(55, 47, 63)" : ""}
          onClick={() => {
            downvoteOrDeleteUpvote();
          }}
        />
      </div>
      <div className="textOfQuote">
        <div>{content}</div>
        <span className="author">-{author}</span>
      </div>
    </div>
  );
}
