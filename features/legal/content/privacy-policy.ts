import type { LegalDocument } from "../types/legal-document.types";

export const privacyPolicy: LegalDocument = {
  title: "Privacy policy",
  effectiveDate: "October 15, 2026",
  summary:
    "This policy explains what information Progress processes, why it is used, how it is shared, and what choices are available when you use the Progress website and workspace.",
  sections: [
    {
      title: "Who operates Progress",
      paragraphs: [
        "Progress is a project and task management application operated by its developer. The developer can be contacted through the website linked as “Contact the developer” in the Progress footer: https://vmy.onrender.com.",
        "The application uses a MongoDB database configured by the operator. The hosting provider, database service provider, their processing locations, and any applicable international transfer safeguards depend on the production deployment. Contact the developer for current deployment and privacy information.",
      ],
    },
    {
      title: "Information processed",
      paragraphs: [
        "Account information includes your username, given name, surname, email address, password hash, email-verification state, online state, and account timestamps. Passwords are hashed with bcrypt before storage; the application does not store the submitted password as plain text.",
        "Workspace information includes project names, type, description, status, due date, GitHub repository link, project owner and members, task titles, notes, status, deadlines, and assigned users.",
        "If you connect GitHub, Google, LinkedIn, or Facebook, the application can store the provider account identifier, provider username or display name, email address when returned, avatar and profile URLs, granted scopes, and OAuth access-token metadata. Provider access and refresh tokens are stored server-side and excluded from ordinary account API responses. The current implementation does not establish that database fields are encrypted at rest.",
        "The application uses an HTTP-only authentication cookie to keep a signed-in session. OAuth connections also use provider-specific state cookies during authorization. Cookies are not used by the interface for advertising.",
        "The application does not currently disclose an analytics or advertising feature. This statement describes the current application code and may change if such features are added.",
      ],
    },
    {
      title: "Public profiles and workspace visibility",
      paragraphs: [
        "Signed-in users can search for other users by username, given name, or surname. Search results include username, name, and online status. Opening a public profile displays the person's name, username, avatar if available, account creation date, and linked provider name, username, avatar, profile URL, and link date.",
        "Email addresses and provider emails are not included in the public-profile response. Only connect provider accounts if you are comfortable making the profile information listed above visible to other signed-in users.",
        "Projects are available to their owner and listed members, not to every user. Project members can view the project and its tasks. Project owners manage project details and membership. Project and task information you share with members is visible to them.",
      ],
    },
    {
      title: "Purposes and legal basis",
      paragraphs: [
        "Progress uses information to create and authenticate accounts, verify email addresses, provide profiles and user search, operate projects and tasks, support collaboration, connect external accounts at your direction, protect the service, and respond to support requests.",
        "Where privacy laws require a legal basis, the operator may rely on providing the service you request, legitimate interests in maintaining and securing the application, consent where it is specifically obtained, and legal obligations. The appropriate basis depends on your location and the particular processing.",
      ],
    },
    {
      title: "External providers and disclosures",
      paragraphs: [
        "When you authorize an external account, the relevant provider processes your information under its own terms and privacy notice. Progress receives the profile information returned by that provider and stores the connection details needed for the integration.",
        "Progress may rely on hosting, database, and email-delivery providers to operate the application. Those services process information on the operator's behalf as needed to provide their services. The production providers and locations should be confirmed with the developer.",
        "Information may also be disclosed when required by law, to protect users or the service, or as part of a business or service transfer. Progress does not sell personal information.",
      ],
    },
    {
      title: "Retention and deletion",
      paragraphs: [
        "Unverified registrations are marked to expire 24 hours after registration. A backend job scheduled for Sunday at midnight Asia/Manila removes expired unverified user and authentication records. Verified-account data has no documented automatic retention period, and the application does not document a backup-expiry schedule.",
        "You can change supported name and username fields in Settings after confirming your password, change your password, and disconnect a linked provider after re-entering your Progress password. Disconnecting removes the Progress connection record; it does not revoke or delete information held by the external provider.",
        "Important: the current account-deletion endpoint deletes the user profile and authentication records, but does not delete associated connected-account, project, or task records. Those records may remain in the database after the account is deleted. Do not treat the in-app deletion action as complete erasure of all related data. Contact the developer through https://vmy.onrender.com to request review or removal of remaining records.",
        "Deletion from active database records does not necessarily remove copies in backups or records that must be retained by law. The operator should confirm backup retention and deletion handling for the current deployment.",
      ],
    },
    {
      title: "Security",
      paragraphs: [
        "The backend requires authentication for account, project, task, and connected-account management. Project access is checked against ownership or membership. Passwords are hashed with bcrypt, OAuth state is used during provider authorization, and the production authentication cookie is configured as HTTP-only, secure in production, and same-site strict.",
        "No internet-connected service can guarantee absolute security. Do not place secrets, passwords, sensitive personal data, or private credentials in project descriptions, task notes, or repository fields. Report suspected unauthorized access to the developer.",
      ],
    },
    {
      title: "Your privacy rights",
      paragraphs: [
        "Depending on your location, you may have rights to request access to, correction of, or deletion of personal information, to object to or restrict certain processing, to receive a portable copy, or to withdraw consent where processing relies on consent. You may also have the right to complain to your local data-protection authority.",
        "Use Settings for changes supported by the application or contact the developer through https://vmy.onrender.com for privacy requests. The operator may need to verify your identity before acting. The application does not currently provide a self-service data export.",
      ],
    },
    {
      title: "Children and changes to this policy",
      paragraphs: [
        "Progress is a general productivity application and is not designed to collect information from children who are unable to use the service under the laws that apply to them. The application does not include age verification. A parent or guardian who believes a child has provided personal information should contact the developer.",
        "This policy may be updated when the application or its data practices change. The effective date above will be updated when a revised policy is published. Material changes should be reviewed before continued use.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        "For privacy questions, requests, or concerns, contact the Progress developer at https://vmy.onrender.com. Include enough information to identify your account, but do not send your password or OAuth tokens.",
      ],
    },
  ],
};
