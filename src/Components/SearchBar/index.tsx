import { AutoComplete, Input } from 'antd'
import React from 'react'
import './SearchBar.scss'
import { Liste } from '../../Types/Type'
import { useNavigate } from 'react-router-dom'

interface Props{
  setInputValue:React.Dispatch<React.SetStateAction<string>>,
  searchedList:Liste[]
}


const SearchBar: React.FC<Props>=({setInputValue,searchedList})=> {    

  const navigate = useNavigate()  

  const options = searchedList.map(( item ) => ({
    value: item.title,
    key: item.id,
    label: (
      <div onClick={()=>{
        navigate(`/moviedetail/${item.id}`) // window.location.replace(`/moviedetail/${item.id}`);          
      }} style={{ display: 'flex', textAlign: 'right' }}>
        {item.title}
      </div>
    )
  }))

  const handleSearch = (value: string) => {
    setInputValue(value);        
  };

  return (
    <div className='input-area'>
      {/* <Search className='input' size='large' placeholder="search a movie..." onSearch={onSearch} /> */}
      <AutoComplete
        style={{ width: 500 }}
        options={options}
        onSearch={handleSearch}>
        <Input.Search size="large" placeholder="search a movie" enterButton />
      </AutoComplete>
    </div>
  )
}

export default SearchBar
