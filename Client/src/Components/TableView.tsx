import React, { useEffect, useState } from 'react';
import { categoriesState } from '../slices/categoriesSlice';
import { useAppSelector } from '../slices/hooks';
import { productsState } from '../slices/productsSlice';
import '../Styles/TableView.css'

const TableView = () => {
  // Render a table view with the data
  const { entities } = useAppSelector(productsState)
  const [entitiesArr, setEntitiesArr] = useState<any[]>([])
  const { selectedCategory } = useAppSelector(categoriesState)

  useEffect(() => {
    // Extract the months and values from the data
    if(entities){
      const entitiesArr = Object.values(entities)
      const filteredEntities = selectedCategory
      ? entitiesArr.filter((item) => item?.category_name === selectedCategory)
      : entitiesArr
      const ditinctDateArr = sumPropByCategory(filteredEntities)
      setEntitiesArr(ditinctDateArr)
    }
  }, [entities, selectedCategory])

  const sumPropByCategory = (data: any[]) => {
    const result: any = {};

    // Iterate through the data array
    data.forEach((item) => {
      const { category_name, units_sold, product_views, revenue } = item;

      // Check if the category is already in the result object
      if (!result[category_name]) {
        // If not, initialize it with zeros for each property
        result[category_name] = {
          category_name,
          units_sold: 0,
          product_views: 0,
          revenue: 0,
        };
      }

      // Add the values to the corresponding category
      result[category_name].units_sold += units_sold;
      result[category_name].product_views += product_views;
      result[category_name].revenue += revenue;
    });

    // Convert the result object into an array
    const resultArray = Object.values(result);
    return resultArray
  }

  const calcCVR = (item: any) => {
    const cvr = (item.units_sold / item.product_views) * 100;
    return `${Math.round(cvr * 100) / 100}%`;
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Product Views</th>
            <th>Revenue</th>
            <th>Units Sold</th>
            <th>CVR</th>
          </tr>
        </thead>
        <tbody>
          {entitiesArr.map((item, index) => (
            <tr key={index}>
              <td>{item.category_name}</td>
              <td>{item.product_views.toLocaleString()}</td>
              <td>{item.revenue.toLocaleString()}</td>
              <td>{item.units_sold.toLocaleString()}</td>
              <td>{calcCVR(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;