const fs = require('fs');
const path = require('path');

const toolsContent = fs.readFileSync('src/data/seeds/tools.ts', 'utf8');
const extrasContent = fs.readFileSync('src/data/seeds/extras.ts', 'utf8');

const promptsMatch = toolsContent.match(/export const seedPrompts: Prompt\[\] = \[[\s\S]*?\n\];/);
const agentsMatch = toolsContent.match(/export const seedAgents: Agent\[\] = \[[\s\S]*?\n\];/);
const componentsMatch = toolsContent.match(/export const seedComponents: ComponentAsset\[\] = \[[\s\S]*?\n\];/);
const templatesMatch = toolsContent.match(/export const seedTemplates: Template\[\] = \[[\s\S]*?\n\];/);
const snippetsMatch = toolsContent.match(/export const seedSnippets: Snippet\[\] = \[[\s\S]*?\n\];/);

const toolsHeader = `const now = Date.now();
const id = (p: string, i: number) => \`\${p}_\${i}\`;
`;

if (promptsMatch) fs.writeFileSync('src/data/seeds/prompts.ts', `import type { Prompt } from "../../types/tools";\n\n${toolsHeader}\n${promptsMatch[0]}\n`);
if (agentsMatch) fs.writeFileSync('src/data/seeds/agents.ts', `import type { Agent } from "../../types/tools";\n\n${toolsHeader}\n${agentsMatch[0]}\n`);
if (componentsMatch) fs.writeFileSync('src/data/seeds/components.ts', `import type { ComponentAsset } from "../../types/tools";\n\n${toolsHeader}\n${componentsMatch[0]}\n`);
if (templatesMatch) fs.writeFileSync('src/data/seeds/templates.ts', `import type { Template } from "../../types/tools";\n\n${toolsHeader}\n${templatesMatch[0]}\n`);
if (snippetsMatch) fs.writeFileSync('src/data/seeds/snippets.ts', `import type { Snippet } from "../../types/tools";\n\n${toolsHeader}\n${snippetsMatch[0]}\n`);

const connectorsMatch = extrasContent.match(/export const seedConnectors: Connector\[\] = \[[\s\S]*?\n\];/);
const socialMatch = extrasContent.match(/export const seedSocialDrafts: SocialDraft\[\] = \[[\s\S]*?\n\];/);
const mailMatch = extrasContent.match(/export const seedMailTemplates: MailTemplate\[\] = \[[\s\S]*?\n\];/);

const extrasHeader = `const now = Date.now();
const d = (days: number) => now - 86400000 * days;
`;

if (connectorsMatch) fs.writeFileSync('src/data/seeds/connectors.ts', `import type { Connector } from "../../types/tools";\n\n${extrasHeader}\n${connectorsMatch[0]}\n`);
if (socialMatch) fs.writeFileSync('src/data/seeds/social-drafts.ts', `import type { SocialDraft } from "../../types/tools";\n\n${extrasHeader}\n${socialMatch[0]}\n`);
if (mailMatch) fs.writeFileSync('src/data/seeds/mail-templates.ts', `import type { MailTemplate } from "../../types/tools";\n\n${extrasHeader}\n${mailMatch[0]}\n`);

console.log("Split tools.ts and extras.ts successfully");
