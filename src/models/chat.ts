export interface IChatContact {
  id: string;
  name: string;
  userName: string;
  avatar: string;
  address: string;
  phone: number;
  email: string;
  recentActivity: Date;
  status: string;
  position: string;
}

export interface IChatMessage {
  id: string;
  body: string;
  contentType: string;
  createdAt: Date;
  senderId: string;
}

export interface IChatConversation {
  id: string;
  unreadCount: number;
  type: 'ONE_TO_ONE' | 'GROUP';
  messages: Array<IChatMessage>;
  participants: Partial<IChatContact>[];
}