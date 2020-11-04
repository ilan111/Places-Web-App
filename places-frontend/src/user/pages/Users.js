import React from 'react'
import UsersList from '../components/UsersList'


function Users() {
    const USERS=[
        {
        id:'u1',
        image:'https://i.insider.com/5ebdbc8c3ad8612a1c7aa143?width=856&format=jpeg',
        name:'Ilan Y',
        places:4},
    ]

    return (
        <div>
           <UsersList items={USERS}/>
        </div>
    )
}

export default Users
