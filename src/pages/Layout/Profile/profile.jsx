import React from 'react';

function Profile(props) {
  return (
    <div>
      <h2 className="flex justify-center mb-3">ID Student:</h2>
      <img
        className="rounded-full"
        src="https://picsum.photos/200/300"
        alt="avatar"
      />
      {/* some icon here */}
      <p>icon 1</p>
      <p>icon 2</p>
      <p>icon 3</p>

      <div>About</div>
      <div>Age</div>
      <div>Gender</div>
      <div></div>
    </div>
  );
}

export default Profile;
