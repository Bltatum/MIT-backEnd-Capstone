import React, { useRef } from "react";
import "../css/Search.css";

export const SearchBar = ({ setTerms }) => {
  const { terms } = useRef();

  return (
    <div className="searchBar">
      <input
        onKeyUp={(e) => setTerms(e.target.value)}
        type="text"
        id="searchTerms"
        ref={terms}
        required
        autoFocus
        placeholder="Search Incidents"
        className="form-control"
      />
    </div>
  );
};
