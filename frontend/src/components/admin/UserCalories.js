const UserCalories = ({ caloriesList }) => {
  return (
    <div className='container mt-3'>
      <h3 className='bg-black p-2 border-top border-bottom'>
        Average Calories Per User Last 7 Days
      </h3>
      <ul className='list-group list-group-light'>
        {Object.entries(caloriesList).map(([username, calories]) => (
          <li className='list-group-item d-flex justify-content-between align-items-center'>
            <div>
              <div className='fw-bold'>
                <strong>{username}</strong>
              </div>
              <div className='text-muted'>
                {calories || 0} calories has been consumed.
              </div>
            </div>
            <span
              class={`badge ${
                calories > 2100 ? 'badge-danger' : ' badge-success'
              } rounded-pill`}
            >
              {calories > 2100 ? 'Over Limit' : 'Under Limit'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCalories;
