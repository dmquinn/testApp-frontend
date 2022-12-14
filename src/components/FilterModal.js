import { useState, useEffect } from "react";

const FilterModal = (props) => {
  const colors = ["red", "green", "blue", "yellow"];
  const [filterData, setFilterData] = useState({
    brand: null,
    category: null,
    iseBike: null,
    dataColors: [],
    maxPrice: null,
    minPrice: null,
  });
  let colorsArr = [];

  function handleSubmit(event) {
    event.preventDefault();

    // console.log(filterData);
    setFilterData({});
    colorsArr = [];
  }

  const handleColors = (e) => {
    e.target.checked
      ? setFilterData({
          ...filterData,
          dataColors: [...filterData.dataColors, e.target.value],
        })
      : setFilterData({
          ...filterData,
          dataColors: filterData.dataColors.filter(
            (color) => color !== e.target.value
          ),
        });
  };

  useEffect(() => {
    console.log(filterData.dataColors);
  }, [filterData]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>Colors:</p>
        {colors.map((color) => (
          <div className="form-check-inline" key={color}>
            <input
              style={
                color === "white"
                  ? { backgroundColor: "whitesmoke" }
                  : { backgroundColor: color }
              }
              name={color}
              type="checkbox"
              value={color}
              id="inline-checkbox-1"
              className="form-check-input"
              aria-label={color}
              onChange={(e) => handleColors(e)}
            />
          </div>
        ))}
      </div>
    </form>
  );
};

export default FilterModal;
