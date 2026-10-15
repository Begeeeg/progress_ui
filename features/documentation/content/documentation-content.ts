import type {
  DocumentationSection,
  UserGuide,
} from "../types/documentation.types";

export const documentationSections: DocumentationSection[] = [
  {
    id: "purpose",
    title: "What Progress is for",
    description:
      "Progress is a workspace for turning goals into projects, and projects into trackable next steps. It is designed for individual planning as well as small-team collaboration.",
    details: [
      {
        title: "Plan around a goal",
        description:
          "Create a project with a title, type, due date, description, and optional GitHub repository link.",
      },
      {
        title: "Move work forward",
        description:
          "Break a project into tasks with notes, deadlines, assignees, and clear to-do, in-progress, or completed states.",
      },
      {
        title: "Keep identity in context",
        description:
          "Search for Progress users and optionally link supported external profiles. Public-profile data is visible to signed-in users.",
      },
    ],
  },
  {
    id: "getting-started",
    title: "Create an account and get started",
    description:
      "A verified Progress account is required to use the workspace and protected features.",
    details: [
      {
        title: "1. Register",
        description:
          "Choose a unique username, enter your given name, surname, supported email address, and a password. Usernames and names must be 3–15 characters. Registration currently accepts Gmail, Yahoo, and Outlook addresses. Passwords must be at least 8 characters and contain uppercase, lowercase, and numeric characters.",
      },
      {
        title: "2. Verify your email",
        description:
          "Open the verification email and follow its link. If needed, sign in and request another verification email from the verification screen.",
      },
      {
        title: "3. Sign in",
        description:
          "Use your email and password on the login page. A signed-in session is maintained using an authentication cookie.",
      },
      {
        title: "4. Open your workspace",
        description:
          "The home page shows your projects and projects shared with you. Use the project filters and people search in the header to find relevant work or users.",
      },
    ],
  },
  {
    id: "projects",
    title: "Projects",
    description:
      "Projects give a goal a name, scope, status, and target date. Your workspace lists projects you own and projects you are a member of.",
    details: [
      {
        title: "Create a project",
        description:
          "Select New project, enter a title and due date, and optionally add a description or GitHub repository. Choose Personal for work that is only for you, or Team to collaborate with existing Progress users.",
      },
      {
        title: "Invite collaborators",
        description:
          "For a Team project, enter one or more existing Progress usernames, separated by commas. The backend validates that those users exist. Members can access the shared project and its tasks.",
      },
      {
        title: "Update a project",
        description:
          "The project owner can edit project details, status, due date, and membership. Statuses are Active, On hold, and Achieved. Owners must type the exact project name to delete it; members must type the exact project name to leave a shared project.",
      },
      {
        title: "Find work",
        description:
          "Filter the workspace by a partial title, project type, or status. Results remain limited to projects you own or belong to.",
      },
    ],
  },
  {
    id: "tasks",
    title: "Tasks",
    description:
      "Tasks describe the work needed to complete a project. Tasks belong to a project and inherit that project's access rules.",
    details: [
      {
        title: "Add a task",
        description:
          "Open a project and choose Add task. Provide a title and deadline; notes, status, and assigned usernames are also available. A task deadline cannot be later than the project's due date.",
      },
      {
        title: "Assign people",
        description:
          "Assignments are optional. Enter usernames separated by commas. Each assignee must be the project owner or a listed project member.",
      },
      {
        title: "Track progress",
        description:
          "Use the task status control to mark work complete or return it to to-do. The task form supports To do, In progress, and Completed. Users can edit or delete tasks they can access; deleting a task or unassigning yourself requires typing the exact task name.",
      },
    ],
  },
  {
    id: "people-and-profiles",
    title: "People search and public profiles",
    description:
      "Search helps you find collaborators. Selecting a result opens a dedicated profile page rather than a small search preview.",
    details: [
      {
        title: "Search people",
        description:
          "Search by username, given name, or surname. Search results show username, name, and online status, with a maximum of 20 matching users per response.",
      },
      {
        title: "View a profile",
        description:
          "A public profile shows name, username, avatar when available, member-since date, and connected profiles. Email is not included in the public-profile response.",
      },
      {
        title: "Profile privacy",
        description:
          "Public profiles are read-only: other users cannot edit them or manage their linked accounts. Only connect external profiles whose listed details you are comfortable sharing with signed-in Progress users.",
      },
    ],
  },
  {
    id: "connected-accounts",
    title: "Connected accounts",
    description:
      "You can optionally link GitHub, Google, LinkedIn, or Facebook to your Progress account.",
    details: [
      {
        title: "Connect a provider",
        description:
          "Open your account menu, choose Settings, then Connected accounts. Select Connect beside a provider and complete that provider's authorization flow.",
      },
      {
        title: "What is displayed",
        description:
          "Settings shows the connected provider and the profile information returned by it. Your public Progress profile may display the provider name, username, avatar, profile link, and connection date when available.",
      },
      {
        title: "Disconnect a provider",
        description:
          "Choose Disconnect in Settings, enter your Progress password, and confirm. This removes the provider connection from Progress. Review the provider's own security settings if you also want to revoke its authorization there.",
      },
    ],
  },
  {
    id: "account-settings",
    title: "Account settings",
    description:
      "Settings is one page with a section selector. Choose a section to show that form.",
    details: [
      {
        title: "Personal information",
        description:
          "Update your given name, surname, or username. The backend requires your current password before saving and checks username uniqueness.",
      },
      {
        title: "Change password",
        description:
          "Enter the current password and a new password that meets the displayed rules. The new password must differ from the current password.",
      },
      {
        title: "Delete account",
        description:
          "The current UI asks for your password and confirmation before sending the deletion request. Read the Privacy Policy first: the backend currently deletes the user and authentication records but does not cascade-delete associated linked accounts, projects, or tasks. Contact the developer to request help with remaining data.",
      },
    ],
  },
  {
    id: "support-and-security",
    title: "Support and safe use",
    description:
      "Progress includes account and collaboration features, but is not a secure secret store or a guaranteed backup system.",
    details: [
      {
        title: "Protect your account",
        description:
          "Use a unique password, do not share it, and change it in Settings if you suspect it has been exposed. Progress stores password hashes rather than plain-text passwords.",
      },
      {
        title: "Protect shared content",
        description:
          "Project members can see shared project and task details. Do not put credentials, private keys, access tokens, or sensitive personal information in project descriptions, task notes, or repository fields.",
      },
      {
        title: "Get help",
        description:
          "Use Contact the developer in the site footer at https://vmy.onrender.com for support, privacy questions, or requests concerning data left behind by account deletion.",
      },
    ],
  },
];

export const userGuides: UserGuide[] = [
  {
    id: "solo-planning",
    title: "Use Progress to plan a personal goal",
    summary:
      "A simple workflow for tracking an individual goal from idea to completion.",
    steps: [
      "Create an account, verify your email, and sign in.",
      "From the workspace, create a Personal project with a clear title and due date.",
      "Add a short description of the outcome and, if relevant, a repository link.",
      "Open the project and break the goal into small tasks with achievable deadlines.",
      "Update task status as you work; mark the project Achieved when the goal is complete.",
    ],
  },
  {
    id: "team-collaboration",
    title: "Coordinate a team project",
    summary:
      "Share a project and assign next steps to people who already use Progress.",
    steps: [
      "Ask collaborators to register, verify their accounts, and share their exact Progress usernames.",
      "Create a Team project and add collaborator usernames separated by commas.",
      "Set a project due date and explain the goal in its description.",
      "Create tasks with deadlines no later than the project deadline and assign them to the owner or a project member.",
      "Review shared tasks together. The owner can update project membership; members can access the project and its tasks.",
    ],
  },
  {
    id: "find-a-collaborator",
    title: "Find and review a user's public profile",
    summary:
      "Use the header search to inspect a profile before collaborating.",
    steps: [
      "Enter a username or name in Search people.",
      "Select the matching result to open the user's full public profile page.",
      "Review their name, username, member-since date, and any linked provider profiles.",
      "Use external profile links if provided. The profile is read-only; you cannot edit another user's profile or account connections.",
    ],
  },
  {
    id: "manage-account",
    title: "Update account details or linked profiles",
    summary:
      "Keep your Progress identity and optional provider connections current.",
    steps: [
      "Open the account menu and select Settings.",
      "Choose Personal information to update your name or username; confirm the change with your current password.",
      "Choose Connected accounts to link or disconnect GitHub, Google, LinkedIn, or Facebook.",
      "Choose Change password to update your password after entering your current one.",
      "Before using Delete account, read the Privacy Policy and contact the developer about related records that the current backend does not automatically remove.",
    ],
  },
];

export const productLimitations = [
  "The workspace provides project type, status, title, and status filters; it does not currently provide a complete reporting or analytics suite.",
  "There is no in-app direct messaging, notification center, or task-comment thread.",
  "Public profile visibility is not configurable per field. The backend exposes the listed profile and linked-provider details to signed-in users.",
  "Account deletion currently does not cascade to linked-account, project, or task records. Contact the developer for assistance with remaining records.",
  "Unverified registrations are marked to expire after 24 hours and are removed by a weekly Sunday-midnight cleanup job (Asia/Manila). No automatic retention period for verified accounts or backup restoration guarantee is documented.",
];
