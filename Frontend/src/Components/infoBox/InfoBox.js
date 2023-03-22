import PropTypes from 'prop-types';
import React from "react";
import "./InfoBox.scss";

const InfoBox = ({ bgColor, title, count, icon }) => {
  return (
    <div className={`info-box ${bgColor}`}>
      <span className="info-icon --color-black">{icon}</span>
      <span className="info-text">
        <h2>{title}</h2>
        <span className="info-count">{count}</span>
      </span>
    </div>
  );
};

InfoBox.propTypes = {
  bgColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  icon: PropTypes.node.isRequired,
};

export default InfoBox;
