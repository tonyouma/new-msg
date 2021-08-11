import { useEffect } from 'react';
import styled from 'styled-components'
// material
import { Card, Container } from '@material-ui/core';
// redux
import { useDispatch } from '../../store/store';
import { getConversations, getContacts } from '../../store/slices/chat';
// routes
// components
import { ChatSidebar, ChatWindow } from '../../components/_dashboard/chat';

// ----------------------------------------------------------------------
const StyledCard = styled(Card)`
  height: 80vh;
  display: flex;
  background: none;
  background: transparent;
  box-shadow: none;
  margin-bottom: 40px;
`;

export default function Chat() {
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
}
