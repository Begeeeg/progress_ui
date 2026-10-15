import type { LegalDocument } from "../types/legal-document.types";

export const termsAndConditions: LegalDocument = {
  title: "Terms & conditions",
  effectiveDate: "October 15, 2026",
  summary:
    "These terms govern access to Progress, a web application for organizing projects, tasks, deadlines, and collaboration. By creating an account or using the service, you agree to these terms to the extent permitted by applicable law.",
  sections: [
    {
      title: "About the service",
      paragraphs: [
        "Progress provides account profiles, user search, personal and team projects, task tracking, project collaboration, and optional connections to GitHub, Google, LinkedIn, and Facebook. Features may change as the application is maintained and developed.",
        "Progress is provided by its developer. Contact details are available through the “Contact the developer” link in the application footer at https://vmy.onrender.com.",
      ],
    },
    {
      title: "Accounts and eligibility",
      paragraphs: [
        "You must provide accurate registration information, verify your email address, and keep your login credentials confidential. You are responsible for activity carried out through your account. Tell the developer promptly if you believe your account has been compromised.",
        "Registration currently accepts Gmail, Yahoo, and Outlook email addresses. Usernames, given names, and surnames must meet the limits shown in the sign-up form. You must be legally able to agree to these terms where you live; if you cannot legally do so, do not create an account without any permission required by law.",
      ],
    },
    {
      title: "Acceptable use",
      paragraphs: [
        "Use Progress lawfully and only in ways you are authorized to use it. You must not attempt to access another account or project without permission, interfere with the service or its security, introduce malicious code, abuse user search, or use the service to violate another person's rights or applicable law.",
        "Do not use Progress as the sole storage location for critical information. The application does not promise a particular availability level, backup schedule, or recovery time.",
      ],
    },
    {
      title: "Your content and permissions",
      paragraphs: [
        "You retain responsibility for project, task, profile, and other information you submit. You confirm that you have the rights and permissions needed to submit it and to share it with the people who can access it.",
        "You authorize Progress to host, process, and display your content as needed to provide the features you choose. This permission ends when the content is removed from the service, subject to data that remains in backups or records that must be retained. The Privacy Policy describes a current limitation in account deletion: associated project, task, and connected-account records are not automatically removed.",
        "Do not submit passwords, OAuth tokens, private keys, or other secrets in project descriptions, task notes, repository fields, or public profile information.",
      ],
    },
    {
      title: "Projects, teams, and public profiles",
      paragraphs: [
        "Personal projects are accessible to their owner. Team projects are accessible to their owner and listed members. Project owners control project details and membership. Project information and tasks can be visible to those members.",
        "User search and public profiles are available to signed-in users. Public profile information includes a user's name, username, avatar when available, account creation date, and information about connected providers that the application exposes. Do not connect a provider or use profile details in a way that violates another person's rights.",
      ],
    },
    {
      title: "Third-party services",
      paragraphs: [
        "Connecting an external account is optional and subject to the provider's authorization flow, permissions, terms, and privacy notice. You may disconnect a provider in Settings. Disconnecting it from Progress does not necessarily revoke permissions with the provider; review that provider's settings if you want to revoke its authorization.",
        "Progress may link to third-party websites. The developer does not control and is not responsible for third-party content, availability, security, or privacy practices.",
      ],
    },
    {
      title: "Service availability and changes",
      paragraphs: [
        "Progress is provided on an evolving basis. The developer may change, suspend, or discontinue a feature or the service, and will take reasonable steps to avoid unnecessary disruption where practical. No service-level commitment is made by these terms.",
        "The developer may suspend access when reasonably necessary to protect the service or users, address misuse or security risks, or comply with law. Where practical and appropriate, the developer will provide notice and an opportunity to address the issue.",
      ],
    },
    {
      title: "Account closure and deletion",
      paragraphs: [
        "You may request account deletion through Settings by confirming your password. The current implementation deletes the user and authentication records, but does not automatically delete connected-account, project, or task records. This limitation is also described in the Privacy Policy. Contact the developer to request help with records left behind.",
        "The developer may restrict or terminate access for serious or repeated violations of these terms, legal requirements, or security reasons. Nothing in these terms limits rights or remedies that cannot lawfully be limited.",
      ],
    },
    {
      title: "Disclaimers and liability",
      paragraphs: [
        "To the extent permitted by law, Progress is provided as available, without a promise that it will be uninterrupted, error-free, or suitable for every purpose. The developer does not exclude warranties or liability where doing so would be unlawful.",
        "To the extent permitted by applicable law, the developer is not liable for indirect or consequential losses, loss of profits, or loss of data arising from use of the service. This does not exclude liability that cannot legally be excluded, including any mandatory consumer rights or liability for fraud or intentional misconduct where applicable.",
      ],
    },
    {
      title: "Changes to these terms",
      paragraphs: [
        "The terms may be updated to reflect changes to Progress or legal requirements. The effective date above will be updated when revised terms are published. If a change materially affects users, the developer should provide reasonable notice where practicable. Continued use after the effective date is subject to the revised terms to the extent permitted by law.",
      ],
    },
    {
      title: "Applicable law and contact",
      paragraphs: [
        "Mandatory laws and consumer protections that apply where you live continue to apply. The developer's location and the appropriate governing-law and dispute-resolution provisions have not been identified in the application; these terms do not choose a jurisdiction or waive any mandatory legal rights.",
        "For questions about these terms, contact the developer through https://vmy.onrender.com.",
      ],
    },
  ],
};
