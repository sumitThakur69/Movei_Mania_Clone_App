import React, { useEffect, useState } from 'react';

const CardD = [
    {title : "The Lion king"},
    {title : "Sikandae"},
    {title : "GOT"},
]

const Card = () => {
const [hasLiked , setHasLiked] = useState(Array(CardD.length).fill(false))
const [count , setCount] = useState(Array(CardD.length).fill(0))

const toggleLike = (index) => {
    const newhasLiked = [...hasLiked]
    newhasLiked[index] = !newhasLiked[index]
    setHasLiked(newhasLiked)
}

const addCount = (index) => {
    const newCount = [...count];
    newCount[index] += 1;
    setCount(newCount);
}
    return (
        
        <div className='grid grid-cols-3 gap-3 '>
            {CardD.map((item , i)=>(
                <div
                onClick={()=>addCount(i)} 
                className='p-4 bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition'
                key={i} > 
                <h2 className='text-xl font-semibold'>{item.title} <br />
                {count[i]} </h2>

                <div className="flex justify-start">
                <button 

                onClick={(e)=>{
                    e.stopPropagation();
                    toggleLike(i);
                }}
                className="mt-3 px-3 py-1 bg-blue-500 text-white rounded">
                { hasLiked[i] ? 'Liked' : 'Like' }
                </button>
                </div>
                </div>
            ))}
        </div>
    )
}

const Practice = () => {
  return (
    <div className="m-4">
      <h1 className="text-3xl mb-6 text-center">Movies</h1>
      <Card />
    </div>
  );
};


export default Practice;