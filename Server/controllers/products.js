const { getProductsBL } = require('../BL/productsBL')
const asyncHandler = require('../middleware/asyncHandler')
const ErrorResponse = require('../utils/errorResponse')

exports.getProducts = asyncHandler(async (req, res, next) => {
    try{
        console.log('start getProducts')
        const data = await getProductsBL()
        console.log('done getProducts')
        res.status(200).json({
            success: true,
            message: 'getProducts fetched successfully',
            data: data
        })
    }
    catch(err){
        console.log(err)
        return next(new ErrorResponse('getProducts failed', 404))
    }
})