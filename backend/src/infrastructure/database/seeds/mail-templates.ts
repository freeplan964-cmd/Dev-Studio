const now = Date.now();
const d = (days: number) => now - 86400000 * days;

export interface MailTemplateSeed {
  id: string;
  channel: "cover-letter" | "gmail" | "whatsapp";
  subject?: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export const seedMailTemplates: MailTemplateSeed[] = [
  {
    id: "mail_1",
    channel: "cover-letter",
    subject: "Application — {{role_title}} at {{company_name}}",
    content: `Hi {{hiring_manager_name}},

I'm reaching out about the {{role_title}} position at {{company_name}}. I've been following your work on {{company_product}} and I'm genuinely excited by the problems you're solving in {{company_domain}}.

I'm a full-stack engineer with {{years_experience}} years of experience, primarily in {{tech_stack}}. Most recently, I {{recent_achievement}} — which gave me direct experience with the challenges your team is working through.

What draws me to {{company_name}} specifically is {{specific_reason}}. I believe my background in {{relevant_skill}} would let me contribute meaningfully from day one, not just after a long ramp-up.

I'd love to learn more about the team's current priorities and where you see the biggest opportunities. Are you open to a 20-minute call this week or next?

Best,
{{your_name}}`,
    createdAt: d(30),
    updatedAt: d(5),
  },
  {
    id: "mail_2",
    channel: "cover-letter",
    subject: "Freelance Proposal — {{project_type}} for {{client_name}}",
    content: `Hi {{client_name}},

Thanks for reaching out about the {{project_type}} project. Based on your description, I have a clear picture of what you need and I'm confident I can deliver it on time.

Here's how I'd approach it:

**Phase 1 — {{phase_1}}** (~{{phase_1_duration}})
{{phase_1_detail}}

**Phase 2 — {{phase_2}}** (~{{phase_2_duration}})
{{phase_2_detail}}

**Phase 3 — {{phase_3}}** (~{{phase_3_duration}})
{{phase_3_detail}}

**Timeline:** {{total_timeline}}
**Investment:** {{budget_range}}

I've done similar work for {{past_client_example}} — happy to share details or a portfolio piece on a quick call.

To get started I'd need:
- {{requirement_1}}
- {{requirement_2}}

Does this align with what you had in mind? Let me know a good time to connect and we can get moving quickly.

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

I know things get busy — just wanted to make sure this didn't fall through the cracks. {{follow_up_context}}

Happy to adjust the approach if needed. What works best for you?

{{your_name}}`,
    createdAt: d(15),
    updatedAt: d(3),
  },
  {
    id: "mail_4",
    channel: "gmail",
    subject: "Introduction — {{your_name}} × {{recipient_name}}",
    content: `Hi {{recipient_name}},

{{mutual_contact}} suggested I reach out — they thought we'd have a lot to talk about given your work on {{their_project}} and mine on {{your_project}}.

I'm particularly interested in {{topic_of_interest}}. I've been thinking hard about {{shared_problem}} and I'd love to hear your perspective — you've been a few steps ahead of me on this.

Would you be open to a 15-minute chat sometime this week or next? No agenda beyond a good conversation.

{{your_name}}`,
    createdAt: d(12),
    updatedAt: d(6),
  },
  {
    id: "mail_5",
    channel: "gmail",
    subject: "Thanks for the chat, {{name}}",
    content: `Hi {{name}},

Really enjoyed our conversation {{when}} — especially your point about {{key_insight}}. That's stuck with me.

As promised, here's {{promised_resource}}: {{link_or_attachment}}.

I'll keep you posted on {{next_update}}. Looking forward to staying in touch.

{{your_name}}`,
    createdAt: d(9),
    updatedAt: d(4),
  },
  {
    id: "mail_6",
    channel: "gmail",
    subject: "Quick question about {{topic}}",
    content: `Hi {{name}},

Hope you're doing well. I have a quick question about {{topic}} — you're the right person to ask given your experience with {{their_expertise}}.

{{specific_question}}

Context if helpful: {{context}}.

Even a one-liner would be incredibly useful. Thanks in advance!

{{your_name}}`,
    createdAt: d(7),
    updatedAt: d(5),
  },
  {
    id: "mail_7",
    channel: "whatsapp",
    content: `Hey {{name}} 👋

Quick update on {{project_name}} — {{status_update}}.

Next step: {{next_step}}. I'll have that ready by {{deadline}}.

Any questions in the meantime just ping me here.`,
    createdAt: d(6),
    updatedAt: d(1),
  },
  {
    id: "mail_8",
    channel: "whatsapp",
    content: `Hi {{name}}!

Wanted to check in on {{topic}}. {{context}}.

When's a good time to jump on a quick call to align? 📞`,
    createdAt: d(4),
    updatedAt: d(2),
  },
  {
    id: "mail_9",
    channel: "whatsapp",
    content: `Hey {{name}}, just saw your message re: {{topic}}. 

{{response}}.

Let's hop on a call {{suggested_time}}? Or lmk what works for you.`,
    createdAt: d(3),
    updatedAt: d(1),
  },
  {
    id: "mail_10",
    channel: "cover-letter",
    subject: "Open Application — {{role_type}} Engineer",
    content: `Hi {{team_name}} team,

I'm reaching out even though I don't see an open role that's a perfect fit right now — because {{company_name}} is exactly the kind of company I want to work at next.

Here's why: {{specific_company_reason}}. That resonates with me because {{personal_connection}}.

A bit about what I bring:
- {{strength_1}}: {{strength_1_example}}
- {{strength_2}}: {{strength_2_example}}
- {{strength_3}}: {{strength_3_example}}

I'm not looking to just fill a seat. I want to join a team where {{ideal_environment}} — and from everything I've read about {{company_name}}, that's what you've built.

If there's ever a right moment, I'd love to be on your radar. I'm happy to send over work samples, a portfolio, or anything else that would be helpful.

Thanks for reading,
{{your_name}}`,
    createdAt: d(45),
    updatedAt: d(10),
  },
];
