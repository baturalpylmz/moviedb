import React, { useContext } from 'react'
import { Context } from '../../Context/GlobalContext'
import MovieList from '../../Components/MovieList'

const FilterPage: React.FC = () => {
  const { filteredData } = useContext(Context)
  
  return (
    <div>
      <MovieList data={filteredData} baslik={'Filtrelenmiş Filmler'} />
    </div>
  )
}

export default FilterPage