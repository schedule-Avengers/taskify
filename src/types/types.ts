// 카드목록 조회, 카드 상세조회
export interface AssigneeProps {
  profileImageUrl: null | string;
  nickname: string;
  id: number;
}

export interface CardProps {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: AssigneeProps;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CardsListProps {
  cursorId: number;
  totalCount: number;
  cards: CardProps[];
}

//컬럼 목록 조회
export interface ColumnProps {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ColumnsListProps {
  result: string;
  data: ColumnProps[];
}

// 댓글 목록 조회
export interface AuthorProps {
  profileImageUrl: null | string;
  nickname: string;
  id: number;
}

export interface CommentProps {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: AuthorProps;
}

export interface CommentsListProps {
  cursorId: number;
  comments: CommentProps[];
}

// 대시보드 목록 조회, 대시보드 상세 조회
export interface DashboardProps {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export interface DashboardsListProps {
  cursorId: number;
  totalCount: number;
  dashboards: DashboardProps[];
}

// 대시보드 초대 불러오기
export interface UserProps {
  nickname: string;
  email: string;
  id: number;
}

export interface DashboardBriefProps {
  title: string;
  id: number;
}

export interface DashboardInvitationProps {
  id: number;
  inviter: UserProps;
  teamId: string;
  dashboard: DashboardBriefProps;
  invitee: UserProps;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardInvitationsListProps {
  totalCount: number;
  invitations: DashboardInvitationProps[];
}

// 내가 받은 초대 목록 조회
export interface ReceivedInvitationProps {
  id: number;
  inviter: UserProps;
  teamId: string;
  dashboard: DashboardBriefProps;
  invitee: UserProps;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReceivedInvitationsListProps {
  cursorId: number;
  invitations: ReceivedInvitationProps[];
}

// 대시보드 멤버 목록 조회
export interface DashboardMemberProps {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: null | string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

export interface DashboardMembersListProps {
  members: DashboardMemberProps[];
  totalCount: number;
}

// 내 정보 조회
export interface PersonalInfoProps {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: null | string;
  createdAt: string;
  updatedAt: string;
}
