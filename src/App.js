import React, { useState, useEffect } from "react";

const AutocompleteInput = ({ onSelectItem }) => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      const response = await fetch(`https://example.com/api/items?q=${query}`);
      const data = await response.json();
      setItems(data);
      setLoading(false);
    };

    const timeoutId = setTimeout(() => {
      if (query) {
        fetchItems();
      } else {
        setItems([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="wrapper">
      <div className={`control ${loading ? "is-loading" : ""}`}>
        <input
          className="input"
          type="text"
          placeholder="Type to search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {items.length > 0 && (
        <div className="list">
          {items.map((item) => (
            <a
              key={item}
              className="list-item"
              onClick={() => onSelectItem(item)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
