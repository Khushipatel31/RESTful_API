import React from 'react'

const User = ({user}) => {
    return (
      <>
    <div className='text-white bg-[#34aae0] cursor-pointer m-2 rounded-xl justify-center gap-5 items-center flex '>
        <img src={user && user.image} className='w-[8rem] object-contain' />
        <div className='flex-col'>
        <div>{`Name: ${user.firstName} ${user.lastName}`}</div>
        <div>{`Age: ${user.age}`}</div>
        <div>{`Gender: ${user.gender}`}</div>

        </div>
    </div>
    </>
  )
}

export default User