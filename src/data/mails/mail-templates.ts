import type { MailTemplate } from "../../types/tools";

const now = Date.now();
const d = (days: number) => now - 86400000 * days;

export const seedMailTemplates: MailTemplate[] = [
  {
    id: "mail_1",
    channel: "cover-letter",
    subject: "Application — Senior Full-Stack Engineer",
    content: `Hi {{hiring_manager_name}},

I'm reaching out about the {{role_title}} position at {{company_name}}. I've been following your work on {{company_product}} and I'm excited by the problems you're solving in {{company_domain}}.

I'm a full-stack engineer with {{years_experience}} years of experience, primarily working with {{tech_stack}}. Most recently, I {{recent_achievement}}.

What draws me to {{company_name}} specifically is {{specific_reason}}. I think my background in {{relevant_skill}} would let me contribute meaningfully from day one.

I'd love to learn more about the team and the role. Are you open to a 20-minute call this week?

Best,
{{your_name}}`,
    createdAt: d(30),
    updatedAt: d(5),
  },
  {
    id: "mail_2",
    channel: "cover-letter",
    subject: "Freelance Proposal — {{project_type}} Project",
    content: `Hi {{client_name}},

Thanks for reaching out about the {{project_type}} project. Based on your description, I have a clear picture of what you need and I'm confident I can deliver it.

Here's how I'd approach it:

Phase 1 — {{phase_1}} (~{{phase_1_duration}})
Phase 2 — {{phase_2}} (~{{phase_2_duration}})
Phase 3 — {{phase_3}} (~{{phase_3_duration}})

Timeline: {{total_timeline}}
Budget: {{budget_range}}

I've done similar work for {{past_client_example}} — happy to share details on a quick call.

To get started, I'd need:
- {{requirement_1}}
- {{requirement_2}}

Does this align with what you had in mind? Let me know a good time to connect.

{{your_name}}`,
    createdAt: d(20),
    updatedAt: d(8),
  },
  {
    id: "mail_3",
    channel: "gmail",
    subject: "Following up — {{original_topic}}",
    content: `Hi {{name}},

Following up on my previous message about {{original_topic}}.

I know things get busy — just wanted to make sure this didn't fall through the cracks.

{{follow_up_context}}

Happy to adjust the approach if needed. What works best for you?

{{your_name}}`,
    createdAt: d(15),
    updatedAt: d(3),
  },
  {
    id: "mail_4",
    channel: "gmail",
    subject: "Introduction — {{your_name}} / {{their_name}}",
    content: `Hi {{recipient_name}},

{{mutual_contact}} suggested I reach out — they thought we'd have a lot to talk about given your work on {{their_project}} and mine on {{your_project}}.

I'm particularly interested in {{topic_of_interest}}. I've been thinking about {{shared_problem}} and I'd love to hear your perspective.

Would you be open to a 15-minute chat sometime this week or next?

{{your_name}}`,
    createdAt: d(12),
    updatedAt: d(6),
  },
  {
    id: "mail_5",
    channel: "whatsapp",
    subject: undefined,
    content: `Hey {{name}} 👋

Quick update on {{project_name}} — {{status_update}}.

Next step: {{next_step}}. I'll have that ready by {{deadline}}.

Any questions in the meantime just ping me here.`,
    createdAt: d(7),
    updatedAt: d(1),
  },
  {
    id: "mail_6",
    channel: "whatsapp",
    subject: undefined,
    content: `Hi {{name}}! 

Wanted to check in on {{topic}}. {{context}}.

When's a good time to jump on a quick call to align? 📞`,
    createdAt: d(4),
    updatedAt: d(2),
  },
];
