import data from '../../data/heliverse_mock_data.json'

export const fetchUsers=()=>{
    const usersData=data.slice(0,10);
    console.log(usersData);
}