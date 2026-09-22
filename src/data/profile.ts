/**
 * Authoritative Profile Information & Centralized Identity Configuration
 * All GitHub, LinkedIn, LeetCode, and contact links are strictly consolidated here.
 */

export interface GitHubConfig {
  profileUrl: string;
  username: string;
  avatarUrl: string;
  repositories: {
    respiratoryScreening: string;
    mentalHealthQA: string;
    pizzaOrdering: string;
    foodHealthApp: string;
    upscOS: string;
    miniProject: string;
  };
}

export interface AuthoritativeProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  github: GitHubConfig;
  linkedin: {
    profileUrl: string;
    username: string;
  };
  leetcode: {
    profileUrl: string;
    username: string;
  };
}

export const authoritativeProfile: AuthoritativeProfile = {
  name: 'Jhansi Bhukya',
  email: 'jhansibhukya17@gmail.com',
  phone: '+91 7207653560',
  location: 'Hyderabad, Telangana, India',
  github: {
    profileUrl: 'https://github.com/Jhansi1717',
    username: 'Jhansi1717',
    avatarUrl: 'https://avatars.githubusercontent.com/u/193582333?v=4',
    repositories: {
      respiratoryScreening: 'https://github.com/Jhansi1717/AI_Powered_Respiratory_Screening',
      mentalHealthQA: 'https://github.com/Jhansi1717/Mental_Health_QA_System',
      pizzaOrdering: 'https://github.com/Jhansi1717/Pizza_ordering_system',
      foodHealthApp: 'https://github.com/Jhansi1717/Food-Health_App',
      upscOS: 'https://github.com/Jhansi1717/UPSC-OS',
      miniProject: 'https://github.com/Jhansi1717/MiniProject',
    },
  },
  linkedin: {
    profileUrl: 'https://www.linkedin.com/in/jhansibhukya/',
    username: 'jhansibhukya',
  },
  leetcode: {
    profileUrl: 'https://leetcode.com/u/Jhansi_gopal/',
    username: 'Jhansi_gopal',
  },
};
