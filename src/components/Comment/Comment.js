import React, { useState } from 'react';
// import Axios from 'axios';
// import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';

function Comment(props) {
//   const videoId = props.postId;
//   const [commentValue, setcommentValue] = useState('');
//   const user = useSelector((state) => state.user);

//   const handleChange = (event) => {
//     setcommentValue(event.currentTarget.value);
//   };

//   const onsubmit = (event) => {
//     event.preventDefault();
//     const variables = {
//       content: commentValue,
//       writer: user.userData._id,
//       postId: videoId,
//     };
//     Axios.post('/api/comment/saveComment', variables).then((response) => {
//       if (response.data.success) {
//         console.log(response.data.result);
//       } else {
//         alert('커멘트를 저장하지 못했습니다.');
//       }
//     });
//   };
  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />

      {/* Comment Lists */}

      {/* Root Comment Form */}
      <form style={{ display: 'flex' }}>
        <Avatar>M</Avatar>
        <textarea
          style={{ width: '80%', borderRadius: '5px' }}
        //   onChange={handleChange}
        //   value={commentValue}
          placeholder="코멘트를 작성해 주세요"
        />
        <br />
        <button style={{ width: '15%', height: '52px', borderRadius: '5px' }} >
          Submit
        </button>
      </form>  
    </div>
  );
}

export default Comment;