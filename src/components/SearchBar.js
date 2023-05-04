function SearchBar({ onInputChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit}>
            <label>
                <input type="text" onChange={onInputChange} className="search-box" placeholder="City name" />
            </label>
            <button type="submit" className="search-button">Search</button>
        </form>
    );
}

export default SearchBar;
