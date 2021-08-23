// material
import { Card, Container } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ChatSidebar from "../../components/_dashboard/chat/ChatSidebar";
import ChatWindow from "../../components/_dashboard/chat/ChatMessage";
import { getContacts, getConversations } from "../../store/actions/chat";

// redux
const StyledCard = styled(Card)`
  height: 80vh;
  display: flex;
  background: none;
  background: transparent;
  box-shadow: none;
  margin-bottom: 40px;
`;

const Chat: React.FC<{}> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  return (
    <>
      <Container maxWidth="xl">
        <StyledCard>
          <ChatSidebar />
          <ChatWindow />
        </StyledCard>
      </Container>
    </>
  );
};

export default Chat;
