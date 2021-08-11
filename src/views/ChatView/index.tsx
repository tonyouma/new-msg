import { Card, Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import styled from 'styled-components';
// import { DashboardHeader } from '../../../../shared/Components';
import MessageWindow from './MessageWindow';
import MessageSidebar from './Sidebar';
import { useDispatch } from '../../store/store';
import { getConversations, getContacts } from '../../store/slices/chat';

const StyledCard = styled(Card)`
  height: 90vh;
  display: flex;
  background: none;
  background: transparent;
  box-shadow: none;
  margin-bottom: 40px;
`;

const MessageView: React.FC<{}> = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);
  return (
    <Container disableGutters>
      {/* <DashboardHeader>Messages</DashboardHeader> */}
      <StyledCard>
        <MessageSidebar />

        <MessageWindow />
      </StyledCard>
    </Container>
  );
};

export default MessageView;