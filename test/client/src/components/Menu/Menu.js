import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeftAlt,
  faQuoteRightAlt,
} from "@fortawesome/free-solid-svg-icons";
import AscDesc from "../AscDesc/AscDesc";
import TagsMui from "../TagsList/TagsMui";

export default function Menu({
  setParamsForGetQoute,
  tags,
  setDisplayAddPost,
  logedFunc,
}) {
  const [resetAllState, setResetAllState] = useState(false);
  function LogOut() {
    localStorage.removeItem("token");
    logedFunc(false);
  }

  return (
    <div className="menu">
      <div
        className="logo"
        onClick={() => {
          setParamsForGetQoute({
            pageSize: "5",
            page: "1",
            sortBy: "createdAt",
            sortDirection: "asc",
            tags: "",
          });
          setResetAllState(true);
        }}
      >
        <sup>
          <FontAwesomeIcon icon={faQuoteLeftAlt} size={"sm"} />
        </sup>
        <span className="headingQoute">Quotes</span>
        <sub>
          <FontAwesomeIcon icon={faQuoteRightAlt} size={"sm"} />
        </sub>
      </div>
      <AscDesc
        label={"Direction"}
        defaulValue={[
          { text: "ASC", value: "asc" },
          { text: "DESC", value: "desc" },
        ]}
        changeDirectionFunc={(val) =>
          setParamsForGetQoute((prev) => {
            return { ...prev, sortDirection: val, page: "1" };
          })
        }
        resetFunc={(val) => setResetAllState(val)}
        reset={resetAllState}
      />

      <AscDesc
        label={"Sorted By"}
        defaulValue={[
          { text: "Created At", value: "createdAt" },
          { text: "Author", value: "author" },
          { text: "UpvotesCount", value: "upvotesCount" },
        ]}
        changeDirectionFunc={(val) => {
          setParamsForGetQoute((prev) => {
            return { ...prev, sortBy: val, page: "1" };
          });
        }}
        resetFunc={(val) => setResetAllState(val)}
        reset={resetAllState}
      />

      <TagsMui
        tags={tags}
        selectTagsFunc={(e) => setParamsForGetQoute(e)}
        resetFunc={(val) => setResetAllState(val)}
        reset={resetAllState}
      />
      <button
        className="linkButton"
        onClick={() => setDisplayAddPost("showContent")}
      >
        New Quote
      </button>

      <button className="linkButton" onClick={() => LogOut()}>
        LogOut
      </button>
    </div>
  );
}
