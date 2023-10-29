import { chartState, setAddedTrendLine, setSelectedYAxisRatioType } from '../slices/chartSlice'
import { useAppSelector } from '../slices/hooks'
import { viewsState } from '../slices/viewSlice'
import '../Styles/Navbar.css'
import ChartSwitcher from './ChartSwitcher'
import DropdownSelect from './dropDownSelect'

const Navbar = () => {
    const { selectedView } = useAppSelector(viewsState)
    const { yAxisRatioTypes } = useAppSelector(chartState)

    return (
        <div className='navbar'>
            <ChartSwitcher />
            {selectedView === 'chart' ? 
                (<><DropdownSelect label='Select 1st Metric' options={yAxisRatioTypes} dispatchFn={setSelectedYAxisRatioType} ddType={'Ratio'} />
                    <DropdownSelect label='Add Metric' options={yAxisRatioTypes} dispatchFn={setAddedTrendLine} ddType={'newTrendLine'} />
                </>) : null}
        </div>
    )
}

export default Navbar