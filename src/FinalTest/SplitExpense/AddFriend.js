import React, { useState } from 'react';

function AddFriend({ onAddFriend, addFriendClick }) {
    const [friendName, setFriendName] = useState('');
    const [error, setError] = useState('');
  
    const handleAddFriend = () => {
      if (friendName === '') {
        setError('Friend name cannot be empty');
      } else {
        onAddFriend({name : friendName, debt : 0 });
        setFriendName('');
        setError('');
        // setAddFriendClick(false)
      }
    };

    return (
        addFriendClick ? (
            <div className='ms-5 rounded text-center p-5 bg-dark text-white'>
                <h3 className='mb-5'>ADD FRIEND </h3>
                <label className='fw-bold me-3'>Friend Name :</label>
                <input
                    type='text'
                    placeholder='Enter Friend Name...'
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}
                /><br/><br/>
                <button className="btn btn-primary" onClick={handleAddFriend}>ADD</button>
                {error && <p>{error}</p>}
            </div>
        ) : null
    );
}
export default AddFriend;