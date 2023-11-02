import moment from 'moment';
import { Link } from 'react-router-dom';
import '../../assets/foodlist.css';

const FoodList = ({ heading, foodEntries, foodData, deleteFood }) => {
  return (
    <>
      <div className='main-content'>
        <div className='container-fluid mt-2 mb-2'>
          <div className='row'>
            <div className='col'>
              <div className='card shadow'>
                <div className='card-header border-0'>
                  <h3 className='mb-0'>{heading}</h3>
                </div>
                <div className='table-responsive'>
                  <table className='table align-items-center table-flush'>
                    <thead className='thead-light'>
                      <tr>
                        <th scope='col'>Food Name</th>
                        <th scope='col'>Calories</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Meal Name</th>
                        <th scope='col'>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foodEntries &&
                        foodData.map((food) => (
                          <tr key={food.id}>
                            <th scope='row'>
                              <div className='media align-items-center'>
                                <div className='media-body'>
                                  <span className='mb-0 text-sm'>
                                    {food.name}
                                  </span>
                                </div>
                              </div>
                            </th>
                            <td>{food.calorie_value}</td>
                            <td>
                              <span className='badge badge-dot mr-4'>
                                <i className='bg-warning'></i>{' '}
                                {moment(food.entry_time).format(
                                  'ddd, DD MMM YYYY'
                                )}
                              </span>
                            </td>
                            <td>{food.meal.name}</td>
                            <td>
                              <Link
                                to={`/edit-food/${food.id}`}
                                className='btn btn-outline-dark'
                              >
                                <i className='far fa-pen-to-square'></i>
                                <span>Edit Food</span>
                              </Link>
                              <button
                                onClick={() => deleteFood(food.id)}
                                className='btn btn-outline-danger'
                              >
                                <i className='fas fa-times'></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className='card-footer py-4'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodList;
