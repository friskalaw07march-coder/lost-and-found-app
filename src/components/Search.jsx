import React,{useState} from "react";

const Search = ({ value, onChange }) => {
    const [keyword, setKeyword] = useState("");

const handleSearch = (event) => {
  event.preventDefault();
  const value = event.target.search.value.trim();
  setKeyword(value);
};

const filteredData = data.filter((item) => {
  const description = item.description.toLowerCase();
  return description.includes(keyword.toLowerCase());
});
};

export default Search;