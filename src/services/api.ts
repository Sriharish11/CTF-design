
// Types for our API data
export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'crypto' | 'forensics' | 'reverse' | 'stego';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  hints: {
    id: string;
    text: string;
    cost: number;
  }[];
  flag: string;
  solvedBy: string[]; // User IDs who solved this challenge
}

export interface Team {
  id: string;
  name: string;
  members: string[]; // User IDs
  score: number;
  solvedChallenges: string[]; // Challenge IDs
}

export interface User {
  id: string;
  username: string;
  email: string;
  teamId?: string;
  score: number;
  solvedChallenges: string[]; // Challenge IDs
  achievements: string[]; // Achievement IDs
}

// Mock data for development
const mockChallenges: Challenge[] = [
  {
    id: "c1",
    title: "Hidden Treasure",
    description: "There's something valuable hidden in the robots.txt file. Can you find it?",
    category: "web",
    difficulty: "easy",
    points: 100,
    hints: [
      { id: "h1", text: "Check the robots.txt file for disallowed directories.", cost: 10 }
    ],
    flag: "CTF{r0b0ts_4r3_n0t_s3cur3}",
    solvedBy: []
  },
  {
    id: "c2",
    title: "Caesar's Secret",
    description: "Julius Caesar has sent a secret message. Can you decipher it?\n\nPGS{whyvhf_pnrfne_jnf_urer}",
    category: "crypto",
    difficulty: "easy",
    points: 100,
    hints: [
      { id: "h2", text: "Try shifting each letter by a certain number.", cost: 10 }
    ],
    flag: "CTF{julius_caesar_was_here}",
    solvedBy: []
  },
  {
    id: "c3",
    title: "Hidden in Plain Sight",
    description: "This image contains a hidden message. Can you extract it?",
    category: "stego",
    difficulty: "easy",
    points: 150,
    hints: [
      { id: "h3", text: "Look at the least significant bits of each pixel.", cost: 15 },
      { id: "h4", text: "Try using steghide with an empty passphrase.", cost: 25 }
    ],
    flag: "CTF{h1dd3n_1n_pl41n_s1ght}",
    solvedBy: []
  },
  {
    id: "c4",
    title: "Metadata Explorer",
    description: "This PDF file contains some unusual metadata. Can you find the hidden information?",
    category: "forensics",
    difficulty: "easy",
    points: 150,
    hints: [
      { id: "h5", text: "Use exiftool to examine the metadata of the file.", cost: 15 }
    ],
    flag: "CTF{m3t4d4t4_r3v34ls_s3cr3ts}",
    solvedBy: []
  },
  {
    id: "c5",
    title: "Simple Reverse",
    description: "Can you figure out what this simple program does and find the password?",
    category: "reverse",
    difficulty: "medium",
    points: 200,
    hints: [
      { id: "h6", text: "Try to understand the logic flow of the program.", cost: 20 },
      { id: "h7", text: "Look for string comparisons in the code.", cost: 30 }
    ],
    flag: "CTF{r3v3rs1ng_b4s1cs_m4st3r3d}",
    solvedBy: []
  },
  {
    id: "c6",
    title: "Web Injection",
    description: "This website has a simple login form. Can you bypass it?",
    category: "web",
    difficulty: "medium",
    points: 250,
    hints: [
      { id: "h8", text: "Try SQL injection techniques.", cost: 25 }
    ],
    flag: "CTF{sql_1nj3ct10n_succ3ss}",
    solvedBy: []
  },
  {
    id: "c7",
    title: "Base Layers",
    description: "This text has been encoded multiple times. Can you decode it?\n\nVjBkSVVGVlZTMFpPVlZKTFZUQTlQUT09",
    category: "crypto",
    difficulty: "medium",
    points: 200,
    hints: [
      { id: "h9", text: "It involves multiple layers of base64 encoding.", cost: 20 }
    ],
    flag: "CTF{mult1_l4y3r_3nc0d1ng}",
    solvedBy: []
  },
  {
    id: "c8",
    title: "Network Packet Analysis",
    description: "Analyze this packet capture file and find the suspicious activity.",
    category: "forensics",
    difficulty: "hard",
    points: 300,
    hints: [
      { id: "h10", text: "Look for unusual HTTP requests in the traffic.", cost: 30 },
      { id: "h11", text: "The flag is being exfiltrated in small chunks.", cost: 40 }
    ],
    flag: "CTF{p4ck3t_4n4lys1s_pr0}",
    solvedBy: []
  }
];

const mockTeams: Team[] = [
  {
    id: "t1",
    name: "Cyber Ninjas",
    members: ["u1", "u2"],
    score: 650,
    solvedChallenges: ["c1", "c2", "c3", "c6"]
  },
  {
    id: "t2",
    name: "Binary Bandits",
    members: ["u3", "u4"],
    score: 450,
    solvedChallenges: ["c1", "c2", "c4"]
  },
  {
    id: "t3",
    name: "Data Pirates",
    members: ["u5"],
    score: 300,
    solvedChallenges: ["c3", "c4"]
  },
  {
    id: "t4",
    name: "Code Breakers",
    members: ["u6", "u7", "u8"],
    score: 550,
    solvedChallenges: ["c1", "c5", "c7"]
  },
  {
    id: "t5",
    name: "Hacktivists",
    members: ["u9", "u10"],
    score: 700,
    solvedChallenges: ["c2", "c3", "c5", "c7"]
  }
];

// Mock API functions
export const apiService = {
  // Challenge APIs
  getChallenges: async (): Promise<Challenge[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockChallenges), 500);
    });
  },

  getChallenge: async (id: string): Promise<Challenge | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const challenge = mockChallenges.find(c => c.id === id) || null;
        resolve(challenge);
      }, 500);
    });
  },

  submitFlag: async (challengeId: string, flag: string, userId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const challenge = mockChallenges.find(c => c.id === challengeId);
        const isCorrect = challenge?.flag === flag;
        
        if (isCorrect && challenge && !challenge.solvedBy.includes(userId)) {
          challenge.solvedBy.push(userId);
        }
        
        resolve(isCorrect);
      }, 1000);
    });
  },

  // Team APIs
  getTeams: async (): Promise<Team[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Sort teams by score in descending order
        const sortedTeams = [...mockTeams].sort((a, b) => b.score - a.score);
        resolve(sortedTeams);
      }, 500);
    });
  },

  getTeam: async (id: string): Promise<Team | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const team = mockTeams.find(t => t.id === id) || null;
        resolve(team);
      }, 500);
    });
  },
};
