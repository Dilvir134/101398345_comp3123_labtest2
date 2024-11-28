import React from "react";

const SearchBar = ({search, setSearch}) => {

    const [city, setCity] = React.useState("");

    const sendSearch = () => {
        setSearch(city);
    }

    const handleChange = (e) => {
        setCity(e.target.value);
    }

    return (
        <div className="row mb-4">
            <div className="col-12">
                <div className="input-group">
                    <input
                        type="text"
                        id="citySearch"
                        className="form-control"
                        placeholder="Search for a city..."
                        aria-label="Search for a city"
                        onChange={handleChange}
                    />
                    <button className="btn btn-primary" id="searchBtn" onClick={sendSearch}>Search</button>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;