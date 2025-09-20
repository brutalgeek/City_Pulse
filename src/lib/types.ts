export type IssueStatus = 'Reported' | 'Acknowledged' | 'In-Progress' | 'Resolved';

export interface Comment {
  id: string;
  author: string;
  text: string;
  timestamp: string;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageHint?: string;
  location: {
    lat: number;
    lng: number;
  };
  status: IssueStatus;
  upvotes: number;
  comments: Comment[];
  reportedAt: string;
}

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    reputationScore: number;
    issuesReported: number;
    issuesResolved: number;
    upvotesReceived: number;
    badges: Badge[];
}
