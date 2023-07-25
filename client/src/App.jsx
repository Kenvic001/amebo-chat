/* eslint-disable no-unused-vars */
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import './App.css';
import 'stream-chat-react/dist/css/index.css';

import { ChannelContainer, ChannelListContainer, Auth } from './components';
import { useState } from 'react';
const cookies = new Cookies();
const apiKey = 'qhdncswaj5fx';
const authToken = cookies.get('token');
const client = StreamChat.getInstance(apiKey);

if (authToken) {
  client.connectUser(
    {
      name: cookies.get('username'),
      fullName: cookies.get('fullName'),
      id: cookies.get('userId'),
      image: cookies.get('avatarURL'),
      phoneNumber: cookies.get('phoneNumber'),
      hashedPassword: cookies.get('hashedPassword'),
    },
    authToken
  );
}

function App() {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  if (!authToken) return <Auth />;
  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light'>
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />

        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
}

export default App;
