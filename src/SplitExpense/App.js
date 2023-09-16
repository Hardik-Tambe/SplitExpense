import React, { useState } from 'react';
import AddFriend from './AddFriend';
import SplitExpense from './SplitExpense';
import FriendList from './FriendList';

function App() {
  const [friends, setFriends] = useState([]);
  const [myWallet, setMyWallet] = useState(5000);
  const [addFriendClick, setAddFriendClick] = useState(false);
  const [splitClick, setSplitClick] = useState(false);

  const handleAddFriendClick = () => {
    setSplitClick(false);
    setAddFriendClick(true);
  };

  const handleSplitClick = () => {
    setSplitClick(true);
    setAddFriendClick(false);
  };

  const addFriend = (name) => {
    setFriends([...friends, name]);
    setAddFriendClick(false)
    // setError('');
  };

  const splitExpense = (selectedFriend, myContro, friendContro, totalExpense) => {
    const updatedFriends = friends.map((friend) => {
      if (friend.name === selectedFriend.name) {
        // Calculate the new debt for the selected friend
        const newDebt = friend.debt + (friendContro - myContro);
        return { ...friend, debt: newDebt };
      }
      return friend;
    });

    // Update myWallet and friends state
    setMyWallet(myWallet - myContro);
    setFriends(updatedFriends);
    setSplitClick(false);
  };


  return (
    <>
      <h1 className='text-center text-primary bg-dark mb-3 p-3'>SPLIT EXPENSE WITH FRIENDS</h1>
      <div className='container-fluid d-flex'>
        <div>
          <div className='me-5 border border-dark rounded p-3 mt-2 bg-info-subtle text-emphasis-info'>
            <h1 className='mb-5'>My Wallet : {myWallet}</h1>
            <FriendList friends={friends} />
          </div>
        </div>
        <div className='ms-5'>
          <div className='ms-5 my-5'>
            <button className='btn btn-primary mx-5' onClick={handleAddFriendClick}>Add a Friend</button>
            <button className='btn btn-primary' onClick={handleSplitClick}>Split Expense</button>
          </div>
          <div>
            <AddFriend
              onAddFriend={addFriend}
              addFriendClick={addFriendClick}
              setAddFriendClick={setAddFriendClick}
            />
            <SplitExpense
              splitClick={splitClick}
              setSplitClick={setSplitClick}
              friends={friends}
              onSplit={splitExpense}
              myWallet={myWallet}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;