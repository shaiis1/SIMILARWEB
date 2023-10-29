const { getProductsDAL } = require("../DAL/productsDAL")
const { formatDate } = require("../utils/dates")

exports.getProductsBL = async() => {
    try{
        console.log('start getProductsBL')
        const data = await getProductsDAL()
        const aggregatedData = this.aggregateData(data)
        if(aggregatedData && aggregatedData.length > 0){
            for(const obj of aggregatedData){
                obj.date = formatDate(obj.date)
            }
        }
        console.log('done getProductsBL')
        return aggregatedData
    }
    catch(err){
        console.log(err)
        return null
    }
}

exports.aggregateData = (data) => {
    const aggregatedData = {}

    data.forEach((item) => {
        const category = item.category_name;
        //const date = new Date(item.date);
        const monthKey = item.date;
      
        // Create the category-month key if it doesn't exist
        if (!aggregatedData[category]) {
          aggregatedData[category] = {};
        }
      
        // Create the month in the category if it doesn't exist
        if (!aggregatedData[category][monthKey]) {
          aggregatedData[category][monthKey] = {
            units_sold: 0,
            product_views: 0,
            revenue: 0,
            id: 0
          };
        }
      
        // Sum the properties for the category-month
        aggregatedData[category][monthKey].units_sold += item.units_sold;
        aggregatedData[category][monthKey].product_views += item.product_views;
        aggregatedData[category][monthKey].revenue += parseInt(item.revenue);
        aggregatedData[category][monthKey].id += item.id;
    })

    // Calculate the total sum for each category-month
    // for (const category in aggregatedData) {
    //     for (const monthKey in aggregatedData[category]) {
    //     const monthData = aggregatedData[category][monthKey];
    //     monthData.totalSum = monthData.value1 + monthData.value2;
    //     }
    // }
    
    // Convert the aggregatedData object into an array with the same property names
    const resultArray = [];
    for (const category in aggregatedData) {
        for (const monthKey in aggregatedData[category]) {
        const monthData = aggregatedData[category][monthKey];
        resultArray.push({
            category_name: category,
            date: monthKey,
            units_sold: monthData.units_sold,
            product_views: monthData.product_views,
            revenue: monthData.revenue,
            id: monthData.id
        });
        }
    }

    return resultArray
}