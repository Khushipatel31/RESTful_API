import React from 'react'

const User = ({user}) => {
    return (
      <>
    <div className='text-white p-3 py-4 bg-[#34aae0] cursor-pointer m-2 rounded-xl justify-center self-center flex  gap-5 items-center flex-col '>
        <img src={user && user.image} className='w-[8rem] self-center justify-center align-middle flex items-center ' />
        <div className=''>
        <div>{`Name: ${user.firstName} ${user.lastName}`}</div>
        <div>{`Age: ${user.age}`}</div>
        <div>{`Gender: ${user.gender}`}</div>

        </div>
    </div>
    </>
  )
}

export default User