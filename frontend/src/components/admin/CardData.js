import React from 'react';
import '../../assets/stats-card.css';

const CardData = ({ title, value }) => {
  return (
    <div className='card card-stats mb-4 mb-xl-0'>
      <div className='card-body'>
        <div className='row'>
          <div className='col'>
            <h5 className='card-title text-uppercase text-muted mb-0'>
              {title}
            </h5>
            <span className='h2 font-weight-bold mb-0'>{value}</span>
          </div>
          <div className='col-auto'>
            <div className='icon icon-shape bg-danger text-white rounded-circle shadow'>
              <i className='fas fa-chart-bar'></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardData;
