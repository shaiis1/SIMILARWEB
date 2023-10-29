import { useEffect, useState } from "react";
import { categoriesState, setSelectedCategory } from "../slices/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../slices/hooks";
import '../Styles/dropDownSelect.css'

interface dropDownProps {
    label: string
    options: any[]
    dispatchFn?: any
    ddType: string
}

const DropdownSelect: React.FC<dropDownProps> = ({ label, options, dispatchFn, ddType }) => {
    const dispatch = useAppDispatch()
    //const { categories } = useAppSelector(categoriesState)
    //const [selectedCategory, setSelectedCategory] = useState<string>('')
    const { selectedCategory } = useAppSelector(categoriesState)
    const [selectedValue, setSelectedValue] = useState('')

    useEffect(() => {
        if(ddType !== 'Category'){
            setSelectedValue('')
        }
    }, [selectedCategory])
    
    return (
        <div style={{
            fontSize: '16px',
            padding: '5px',
            borderRadius: '4px',
            borderColor: 'lightgray',
            display: 'flex',
            alignItems: 'center'
          }}>
        <label style={{
            fontWeight: 'bold',
            marginRight: '5px'
        }}>{label}:</label>
        <select onChange={(e) => {
            if(dispatchFn){
                //if(ddType === 'Category'){
                    dispatch(dispatchFn(e.target.value))
                //}
                //else{
                //    dispatchFn(e.target.value)
                //}   
            }
            setSelectedValue(e.target.value)
        }} value={selectedValue}>
        ({ddType !== 'Ratio' && <option value="">All</option>})
          {options.map((optionn) => (
            <option key={optionn} value={optionn}>
              {optionn}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default DropdownSelect;