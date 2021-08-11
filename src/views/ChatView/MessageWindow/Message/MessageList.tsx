import { findIndex } from "lodash";
import { useEffect, useState, useRef } from "react";
// @types
import { Conversation } from "../../../../types/chat";
//
// import Scrollbar from '../../Scrollbar';
// import LightboxModal from '../../LightboxModal';
import MessageItem from "./MessageItem";

// ----------------------------------------------------------------------

type ChatMessageListProps = {
  conversation: Conversation;
};

export default function ChatMessageList({
  conversation
}: ChatMessageListProps) {
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
    .filter((messages) => messages.contentType === "image")
    .map((messages) => messages.body);


  const handleOpenLightbox = (url: string) => {
    const selectedImage = findIndex(images, (index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <>
      {conversation.messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          conversation={conversation}
          onOpenLightbox={handleOpenLightbox}
        />
      ))}

      {/* <LightboxModal
        images={images}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onClose={() => setOpenLightbox(false)}
      /> */}
    </>
  );
}
