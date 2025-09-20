import type { Issue, UserProfile } from './types';

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Deep Pothole on Main St',
    description: 'A large and dangerous pothole has formed on Main St near the intersection with 1st Ave. It has already caused a flat tire.',
    imageUrl: 'https://picsum.photos/seed/pothole/600/400',
    imageHint: 'pothole road',
    location: { lat: 34.08, lng: -118.28 },
    status: 'Reported',
    upvotes: 12,
    comments: [
      { id: 'c1', author: 'Jane D.', text: 'I saw this yesterday! It\'s huge.', timestamp: '2024-05-20T10:00:00Z' }
    ],
    reportedAt: '2024-05-19T08:30:00Z',
  },
  {
    id: '2',
    title: 'Broken Streetlight',
    description: 'The streetlight at the corner of Oak & Park is completely out. It\'s very dark and feels unsafe at night.',
    imageUrl: 'https://picsum.photos/seed/streetlight/600/400',
    imageHint: 'street light',
    location: { lat: 34.02, lng: -118.22 },
    status: 'Acknowledged',
    upvotes: 5,
    comments: [],
    reportedAt: '2024-05-18T22:15:00Z',
  },
  {
    id: '3',
    title: 'Overflowing Dumpster',
    description: 'The public dumpster at City Park has been overflowing for days. It\'s attracting pests and smells terrible.',
    imageUrl: 'https://picsum.photos/seed/trash/600/400',
    imageHint: 'overflowing trash',
    location: { lat: 34.03, lng: -118.29 },
    status: 'In-Progress',
    upvotes: 25,
    comments: [
      { id: 'c2', author: 'City Works', text: 'A sanitation crew has been dispatched and is en route.', timestamp: '2024-05-21T09:00:00Z' }
    ],
    reportedAt: '2024-05-17T14:00:00Z',
  },
    {
    id: '4',
    title: 'Graffiti on Public Library',
    description: 'There is extensive graffiti on the east wall of the downtown public library.',
    imageUrl: 'https://picsum.photos/seed/graffiti/600/400',
    imageHint: 'graffiti wall',
    location: { lat: 34.07, lng: -118.22 },
    status: 'Resolved',
    upvotes: 2,
    comments: [
      { id: 'c3', author: 'City Works', text: 'Clean-up crew removed the graffiti this morning.', timestamp: '2024-05-20T11:00:00Z' }
    ],
    reportedAt: '2024-05-19T11:45:00Z',
  },
];


export const mockUser: UserProfile = {
    id: 'u1',
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    reputationScore: 1250,
    issuesReported: 15,
    issuesResolved: 5,
    upvotesReceived: 82,
    badges: [
        { id: 'b1', name: 'Top Reporter - May 2024', description: 'Reported the most issues in a single month.', icon: 'Trophy' },
        { id: 'b2', name: 'Community Helper', description: 'Received over 50 upvotes on reported issues.', icon: 'Heart' },
        { id: 'b3', name: 'Eagle Eye', description: 'First to report 5 critical issues.', icon: 'Eye' },
    ]
};

export const mockLeaderboard: Omit<UserProfile, 'email' | 'badges'>[] = [
    { id: 'u2', name: 'Jane Smith', reputationScore: 1580, issuesReported: 22, issuesResolved: 8, upvotesReceived: 110 },
    { id: 'u1', name: 'Alex Doe', reputationScore: 1250, issuesReported: 15, issuesResolved: 5, upvotesReceived: 82 },
    { id: 'u3', name: 'Sam Wilson', reputationScore: 980, issuesReported: 10, issuesResolved: 3, upvotesReceived: 60 },
    { id: 'u4', name: 'Maria Garcia', reputationScore: 750, issuesReported: 8, issuesResolved: 2, upvotesReceived: 45 },
    { id: 'u5', name: 'Chen Wei', reputationScore: 620, issuesReported: 5, issuesResolved: 1, upvotesReceived: 30 },
];
