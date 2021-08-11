import { findIndex } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Conversation } from '../../../../models/chat';
import LightboxModal from '../../../LightboxModal';
import Scrollbar from '../../../Scrollbar';
import ChatMessageItem from './ChatMessageItem';


// ----------------------------------------------------------------------

type ChatMessageListProps = {
  conversation: Conversation;
};

const ChatMessageList: React.FC<ChatMessageListProps> = (props) => {
  const {conversation } = props
  const scrollRef = useRef<HTMLDivElement>(null);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation.messages]);

  const images = conversation.messages
    .filter((messages) => messages.contentType === 'image')
    .map((messages) => messages.body);

  const handleOpenLightbox = (url: string) => {
    const selectedImage = findIndex(images, (index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <Scrollbar scrollableNodeProps={{ ref: scrollRef }}>
      {conversation.messages.map((message) => (
        
        <ChatMessageItem
          key={message.id}
          message={message}
          conversation={conversation}
          onOpenLightbox={handleOpenLightbox}
        />
      ))}

      <LightboxModal
        images={images}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onClose={() => setOpenLightbox(false)}
      />
    </Scrollbar>
  );
}

export default ChatMessageList
