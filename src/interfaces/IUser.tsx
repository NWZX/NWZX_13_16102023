// Type definitions for User
export interface IUser {
    id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
}

// Type definitions for UserAdmin
export enum EUserAdminRole {
    ADMIN = 'admin',
    SUPPORT = 'support',
}
export interface IUserAdmin {
    id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role: EUserAdminRole;
}

// Type definitions for SupportChat
export enum ESupportChatMessageStatus {
    NEW = 'new',
    OPEN = 'open',
    CLOSE = 'close',
}
export interface ISupportChat {
    id: string;
    user_id: string;
    status: ESupportChatMessageStatus;
    created: string;
    updated: string;
}

// Type definitions for SupportChatMessage
export interface ISupportChatMessage {
  id: string;
  support_chat_id: string;
  user_id?: string;
  admin_user_id?: string;
  message: string;
  created: string;
  updated: string;
}