import React from 'react';

function FriendList({ friends }) {
  return (
    <div>
      {friends.length > 0 ? (
        <>
          <h2>Friends:</h2>
          <ul type='none'>
            {friends.map((friend, i) => (
              <li className='d-flex justify-content-around' key={i}>
                <h3>{friend.name} - </h3>
                <h3 className={friend.debt===0?"text-dark":friend.debt>0?"text-success":"text-danger"}>Debt : {friend.debt} </h3>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className='text-danger fw-bold'>No friends added yet.</p>
      )}
    </div>
  );
}

export default FriendList;
