import React from 'react'
import './Categories.css';

export default function Categories ({ categories = [] }) {
  return (
    <div className='categoriesContainer'>
      <h3 className='categoriesHeader'>Categories</h3>
        <ul className='categoryNames'>
        {categories.map((category) => (
            <li className='categoryName' key={category.path}>{category.name}</li>
        ))}
        </ul>
    </div>
  )
}
