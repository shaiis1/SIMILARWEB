import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import '../Styles/ChartView.css'
import { useAppDispatch, useAppSelector } from '../slices/hooks';
import { productsSelectors, productsState } from '../slices/productsSlice';
import { categoriesState } from '../slices/categoriesSlice';
import DropdownSelect from './dropDownSelect';
import { chartState, setSelectedYAxisRatioType, setYAxisRatioTypes } from '../slices/chartSlice';

// Create a linear gradient background manually with even brighter colors
const linearGradientBackground: Highcharts.GradientColorObject = {
  linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, // Define the gradient direction
  stops: [
      [0, 'rgba(255, 150, 150, 0.8)'],   // Start color stop (0%) - Bright Red
      [1, 'rgba(150, 150, 255, 0.8)']    // End color stop (100%) - Bright Blue
  ]
};

const ChartView = () => {
  const dispatch = useAppDispatch()
  const chartContainerRef = useRef(null);
  const chartRef = useRef<Highcharts.Chart | null>(null);
  const entities = useAppSelector(productsSelectors.selectAll)
  const [filteredEntities, setFilteredEntities] = useState<any[]>([])
  const { selectedCategory } = useAppSelector(categoriesState)
  //const [yAxisType, setYAxisType] = useState('units_sold') //default property
  //const [yAxisRatioTypes, setYAxisRatioTypes] = useState<any[]>([])
  const { selectedYAxisRatioType, yAxisRatioTypes, addedTrendLine } = useAppSelector(chartState)

  useEffect(() => {
    // Extract the months and values from the data
    if(entities){
      const entitiesArr = Object.values(entities)
      const filteredEntities = selectedCategory
      ? entitiesArr.filter((item) => item?.category_name === selectedCategory)
      : entitiesArr
      setFilteredEntities(filteredEntities)
      const timeLine = getTimeline(filteredEntities)
      const values = selectedCategory === "" ? sumValueForAllCat(filteredEntities, '') : filteredEntities.map((item: any) => {
        return item[selectedYAxisRatioType]});
      const chart = initializeChart(timeLine, values);
      setYProperties(filteredEntities)
      // Store the chart instance in a ref
      chartRef.current = chart;
    }
  }, [entities, selectedCategory, selectedYAxisRatioType]);

  const sumValueForAllCat = (data: any[], newTrendLineVal: string) => {
    const dateSums: any = {};
    data.forEach(item => {
      const { date, units_sold, product_views, revenue } = item;
    
      if (!dateSums[date]) {
        dateSums[date] = {
          date,
          units_sold: 0,
          product_views: 0,
          revenue: 0
        };
      }
    
      dateSums[date].units_sold += units_sold;
      dateSums[date].product_views += product_views;
      dateSums[date].revenue += revenue;
    })
    const dateSumsArr = Object.values(dateSums)
    const valuesArr = dateSumsArr.map((item: any) => {
      return item[newTrendLineVal !== '' ? newTrendLineVal : selectedYAxisRatioType]})
    
    return valuesArr
  }

  const getTimeline = (entities: any[]) => {
    const uniqueDates = new Set();
    // Loop through the array and add each date to the Set
    entities.forEach(item => {
      uniqueDates.add(item.date);
    });
    console.log(uniqueDates)
    // Convert the Set back to an array if needed
    const distinctDateValues = Array.from(uniqueDates);
    return distinctDateValues
  }

  const setYProperties = (array: any[]) => {
    const propertiesSet = new Set();
  
    array.forEach((item) => {
      for (const property in item) {
        if(typeof item[property] === 'number')
        propertiesSet.add(property);
      }
    });
    
    const propertiesArray = Array.from(propertiesSet);
    dispatch(setYAxisRatioTypes(propertiesArray))
  }

  const setSelectedYType = (value: string) => {
    dispatch(setSelectedYAxisRatioType(value))
  }

  const initializeChart = (timeLine: any, values: any) => {
    return new Highcharts.Chart({
      chart: {
        type: 'line',
        renderTo: chartContainerRef.current || '',
        //marginTop: 80
        backgroundColor: linearGradientBackground
      },
      plotOptions: {
        series: {
            lineWidth: 3, // Adjust the line width to make it bolder
        }
    },
      title: {
        text: `${selectedCategory === "" ? 'All' : selectedCategory} ${selectedCategory === "" ? 'Products Data' :  'Data'} Chart`,
        style: {
          color: 'purple',
          fontSize: '25px'
        }
      },
      xAxis: {
        categories: timeLine,
        labels: {
          style: {
            fontWeight: 'bold'
          }
        }
      },
      yAxis: [{
        // title: {
        //   text: selectedYAxisRatioType,
        //   align: 'high',
        //   rotation: 0,
        //   offset: 0,
        //   style: {
        //     color: '#1F4172',
        //     fontWeight: 'bold'
        //   }
        // },
        labels: {
          formatter: function(): string {
            // Check if the axis is numeric
              const numericValue: number = Number(this.value);
              // Check if the numericValue is a valid number
              if (!isNaN(numericValue)) {
                // Format numeric labels
                if (numericValue >= 1000000) {
                  return (numericValue / 1000000).toString() + 'M';
                } else if (numericValue >= 1000) {
                  return (numericValue / 1000).toString() + 'k';
                } else {
                  return numericValue.toString();
                }
              }
            // Handle other cases (e.g., category, datetime)
            return this.axis.defaultLabelFormatter.call(this);
          },
          style: {
            fontWeight: 'bold'
          },
        },
        startOnTick: true, // Ensure that the yAxis starts on a tick
        endOnTick: false,  // Allow the yAxis to extend beyond the highest data value
        margin: 10,
        min: 0,
      }],
      legend: {
        itemStyle: {
          fontWeight: 'bold'
        }
      },
      series: [
        {
          name: `${selectedYAxisRatioType} per month`,
          type: 'line', // Add the type property here
          data: values,
          marker: {
              enabled: false // Remove tick marks
          }
        },
      ],
    });
  };

  const handleAddTrendLine = (value: string) => {
    const values = selectedCategory === "" ? sumValueForAllCat(filteredEntities, value) : filteredEntities.map((item: any) => {
      return item[value]});
    chartRef.current?.addSeries({
      name: `${value} per month`,
      data: values,
      type: 'line',
      marker: {
        enabled: false // Remove tick marks
    }
    })
  }

  useEffect(() => {
    const values = selectedCategory === "" ? sumValueForAllCat(filteredEntities, addedTrendLine) : filteredEntities.map((item: any) => {
      return item[addedTrendLine]});
    chartRef.current?.addSeries({
      name: `${addedTrendLine} per month`,
      data: values,
      type: 'line'
    })
  }, [addedTrendLine])

  return (
    <div>
      <div ref={chartContainerRef} id="chart-container"></div>
    </div>
  )
};

export default ChartView;
