import '../Styles/ChartSwitcher.css'
import DropdownSelect from './dropDownSelect';
import { categoriesState, setSelectedCategory } from '../slices/categoriesSlice';
import { useAppDispatch, useAppSelector } from '../slices/hooks';
import { setSelectedView, viewsState } from '../slices/viewSlice';

const ChartSwitcher= () => {
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector(categoriesState)
  const { selectedView } = useAppSelector(viewsState)

  const toggleView = () => {
    dispatch(setSelectedView(selectedView === 'chart' ? 'table' : 'chart'))
  };

  return (
    <div className='switcher-wrapper'>
      <div className='toggle-wrapper'>
        <div className="toggle-text">
          {selectedView === 'chart' ? 'Chart View' : 'Table View'}
        </div>
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={selectedView === 'table'}
            onChange={toggleView}
          />
          <span className="slider"></span>
        </label>
      </div>
      <div style={{'paddingLeft': '2.5rem'}}>
        <DropdownSelect label='Select a Category' options={categories} dispatchFn={setSelectedCategory} ddType = {'Category'}/>
      </div>
    </div>
  );
};

export default ChartSwitcher;
