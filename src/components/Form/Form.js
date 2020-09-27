import React from 'react';

export const Form = ({ stateNames, getCities, cityNames, getLocation }) => {
  return stateNames ? (
    <div>
      <form>
        <div className="form-group">
          <label>
            <h4>State</h4>
          </label>
          <select className="form-control" onChange={getCities} name="states">
            {stateNames
              .filter((item, index) => {
                return stateNames.indexOf(item) >= index;
              })
              .map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>

        {cityNames ? (
          <div className="form-group">
            <label>
              <h4>City</h4>
            </label>
            <select className="form-control" onChange={getLocation}>
              {cityNames.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        ) : (
          ''
        )}
      </form>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};
