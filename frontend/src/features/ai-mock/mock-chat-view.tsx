import { useState, useRef, useEffect, useCallback } from "react";
import {
  Bot,
  Send,
  RotateCcw,
  ChevronRight,
  Code2,
  Layers,
  BrainCircuit,
  MessageSquare,
  Zap,
  User,
  Loader2,
  AlertCircle,
  Info,
} from "lucide-react";
import { apiFetch } from "@/lib/api/base";
import { SplitLayout } from "@/components/layout";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Mode {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  systemPrompt: string;
  starterQuestion: string;
}

const TECH_MODES: Mode[] = [
  {
    id: "coding",
    label: "Coding Interview",
    icon: Code2,
    description: "Algorithm and data structure questions",
    systemPrompt:
      "You are a senior software engineer conducting a technical coding interview. Ask one coding problem at a time — start with a clear problem statement. After the candidate explains their approach, probe with follow-up questions: time complexity, space complexity, edge cases, alternative solutions. Give structured, constructive feedback after each answer. Keep the conversation focused and professional.",
    starterQuestion:
      "Let's start with a classic array problem. Given an array of integers, return the indices of the two numbers that add up to a target. Assume exactly one solution exists. How would you approach this?",
  },
  {
    id: "system-design",
    label: "System Design",
    icon: Layers,
    description: "Architecture and scalability challenges",
    systemPrompt:
      "You are a principal engineer conducting a system design interview. Present a real-world system to design (e.g., URL shortener, chat app, feed). Guide the candidate through: requirements clarification, capacity estimation, high-level design, deep dives (database, caching, scaling). Ask probing questions about trade-offs and scalability. Give structured feedback.",
    starterQuestion:
      "Let's design a URL shortening service like bit.ly. Before we dive in — what clarifying questions would you ask to define the requirements?",
  },
  {
    id: "frontend",
    label: "Frontend Deep Dive",
    icon: Zap,
    description: "React, browser, CSS, and performance",
    systemPrompt:
      "You are a senior frontend engineer conducting a technical interview focused on web fundamentals, React, browser performance, and modern CSS. Ask one question at a time, probe follow-ups on implementation details, edge cases, and performance implications. Cover areas like: virtual DOM, React hooks, event loop, CSS specificity, accessibility, and Core Web Vitals. Give structured, educational feedback.",
    starterQuestion:
      "Great — let's start with React. Can you explain how React's reconciliation algorithm works, and why keys are important in lists?",
  },
  {
    id: "backend",
    label: "Backend Deep Dive",
    icon: BrainCircuit,
    description: "APIs, databases, and scalability",
    systemPrompt:
      "You are a senior backend engineer conducting a technical interview covering API design, databases, caching, security, and distributed systems. Ask one question at a time with follow-ups on trade-offs, implementation details, and edge cases. Topics: REST vs GraphQL, SQL vs NoSQL, indexing, connection pooling, authentication, rate limiting, and microservices. Give structured, educational feedback.",
    starterQuestion:
      "Let's talk about APIs. Can you walk me through the key differences between REST and GraphQL, and describe a scenario where you'd choose one over the other?",
  },
  {
    id: "general",
    label: "General Technical",
    icon: MessageSquare,
    description: "Mixed questions across all domains",
    systemPrompt:
      "You are a senior engineer conducting a general technical interview. Cover a mix of topics including: JavaScript fundamentals, data structures, system design basics, web performance, security, and DevOps concepts. Ask one question at a time. After each answer, give concise, constructive feedback and then move to a new topic or ask a follow-up. Keep a professional but supportive tone.",
    starterQuestion:
      "Let's jump right in. Can you explain the difference between process and thread, and how Node.js handles concurrency with a single thread?",
  },
];

const SOFT_MODES: Mode[] = [
  {
    id: "behavioral",
    label: "Behavioral Interview",
    icon: MessageSquare,
    description: "STAR-method situational questions",
    systemPrompt:
      "You are an experienced hiring manager conducting a behavioral interview using the STAR method (Situation, Task, Action, Result). Ask one behavioral question at a time. After the candidate answers, give feedback on their STAR structure, specificity, and communication clarity. Suggest improvements where needed. Common topics: leadership, conflict resolution, failure & learning, teamwork, and prioritization.",
    starterQuestion:
      "Let's start with a classic. Tell me about a time you had to deal with a conflict with a coworker. How did you handle it, and what was the outcome?",
  },
  {
    id: "leadership",
    label: "Leadership & Culture",
    icon: Layers,
    description: "Values, culture fit, and leadership style",
    systemPrompt:
      "You are a VP of Engineering conducting a leadership and culture-fit interview. Explore the candidate's leadership style, decision-making under pressure, how they build and motivate teams, handle ambiguity, and align with company values. Ask probing follow-ups to get specific examples. Give feedback on their self-awareness and communication.",
    starterQuestion:
      "Tell me about your leadership style. How do you approach motivating a team when morale is low or when there is significant technical debt and pressure to ship features?",
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 max-w-[80%]">
      <div className="size-7 rounded-xl bg-primary/10 grid place-items-center shrink-0">
        <Bot className="size-4 text-primary" />
      </div>
      <div className="bg-card border border-border/60 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
          <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
          <span className="size-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={cn("flex items-end gap-2", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "size-7 rounded-xl grid place-items-center shrink-0",
          isUser ? "bg-primary/20" : "bg-primary/10",
        )}
      >
        {isUser ? (
          <User className="size-4 text-primary" />
        ) : (
          <Bot className="size-4 text-primary" />
        )}
      </div>
      <div
        className={cn(
          "max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-card border border-border/60 text-foreground rounded-bl-sm",
        )}
      >
        {msg.content}
      </div>
    </div>
  );
}

export function MockChatView({ context }: { context: "tech" | "soft" }) {
  const modes = context === "tech" ? TECH_MODES : SOFT_MODES;
  const [selectedMode, setSelectedMode] = useState<Mode>(modes[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const startSession = useCallback(
    async (mode: Mode) => {
      setSelectedMode(mode);
      setMessages([]);
      setError(null);
      setInput("");
      setSessionStarted(true);
      setIsLoading(true);

      try {
        const data = await apiFetch<{ reply: string }>("/api/chat/completions", {
          method: "POST",
          body: JSON.stringify({
            prompt: "Begin the interview. Ask the first question now.",
            systemPrompt: mode.systemPrompt,
          }),
        });

        setMessages([
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: data.reply,
            timestamp: new Date(),
          },
        ]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to start session";
        setError(msg);
        setSessionStarted(false);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setError(null);
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Build conversation context (last 10 messages)
    const history = [...messages, userMsg]
      .slice(-10)
      .map((m) => `${m.role === "user" ? "Candidate" : "Interviewer"}: ${m.content}`)
      .join("\n\n");

    try {
      const data = await apiFetch<{ reply: string }>("/api/chat/completions", {
        method: "POST",
        body: JSON.stringify({
          prompt: history,
          systemPrompt:
            selectedMode.systemPrompt +
            "\n\nYou are in an ongoing interview. Continue from where you left off. Respond only as the interviewer — never break character.",
        }),
      });

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply,
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to get response";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, selectedMode]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 140) + "px";
  };

  const resetSession = () => {
    setMessages([]);
    setSessionStarted(false);
    setError(null);
    setInput("");
  };

  const sidebar = (
    <div className="h-full flex flex-col min-h-0">
      <div className="px-3 py-3 border-b border-border/60 shrink-0">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-xl bg-primary/10 grid place-items-center text-primary shrink-0">
            <Bot className="size-3.5" />
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
            Interview Mode
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
        <p className="px-3 pt-2 pb-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
          {context === "tech" ? "Technical" : "Soft Skills"}
        </p>
        <nav className="space-y-0.5">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = selectedMode.id === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  if (selectedMode.id !== mode.id) {
                    setSelectedMode(mode);
                    resetSession();
                  }
                }}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all",
                  isActive
                    ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon className="size-3 shrink-0" />
                  <span className={isActive ? "text-foreground" : ""}>{mode.label}</span>
                </div>
                {isActive && <ChevronRight className="size-3 text-primary shrink-0" />}
              </button>
            );
          })}
        </nav>

        {sessionStarted && (
          <>
            <p className="px-3 pt-4 pb-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
              Session
            </p>
            <button
              onClick={resetSession}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-all"
            >
              <RotateCcw className="size-3" />
              New Session
            </button>
          </>
        )}

        <div className="px-3 pt-4 pb-2">
          <div className="rounded-xl border border-border/60 bg-muted/20 p-3 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Info className="size-3 text-muted-foreground shrink-0" />
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                Tips
              </span>
            </div>
            <ul className="space-y-1">
              {[
                "Answer in full sentences",
                "Use STAR for behavioral",
                "Think aloud — show process",
                "Press Enter to send",
              ].map((tip) => (
                <li key={tip} className="text-[10px] text-muted-foreground leading-relaxed">
                  · {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SplitLayout sidebar={sidebar} sidebarWidth="lg:w-[220px]">
      <div className="h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border/60 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-xl bg-primary/10 grid place-items-center">
              <Bot className="size-4 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-semibold">{selectedMode.label}</h2>
              <p className="text-[11px] text-muted-foreground">{selectedMode.description}</p>
            </div>
          </div>
          {sessionStarted && (
            <button
              onClick={resetSession}
              title="New session"
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-muted/60"
            >
              <RotateCcw className="size-3.5" />
              Reset
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4">
          {!sessionStarted && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center px-8 pb-8">
              <div className="size-14 rounded-2xl bg-primary/10 grid place-items-center mb-5 ring-1 ring-primary/20">
                <Bot className="size-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{selectedMode.label}</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm leading-relaxed">
                {selectedMode.description}. The AI will act as your interviewer — answer naturally
                and get real-time feedback.
              </p>
              <button
                onClick={() => startSession(selectedMode)}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
              >
                <Zap className="size-4" />
                Start Interview
              </button>
            </div>
          )}

          {messages.map((msg) => (
            <ChatMessage key={msg.id} msg={msg} />
          ))}

          {isLoading && <TypingIndicator />}

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive">
              <AlertCircle className="size-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-medium mb-0.5">Error</p>
                <p className="text-xs opacity-80">{error}</p>
                {error.toLowerCase().includes("openai") && (
                  <p className="text-xs opacity-80 mt-1">
                    Add your <code className="font-mono bg-destructive/10 px-1 rounded">OPENAI_API_KEY</code> in environment secrets to enable AI mock interviews.
                  </p>
                )}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {sessionStarted && (
          <div className="px-4 pb-4 pt-2 shrink-0 border-t border-border/60">
            <div className="flex items-end gap-2 bg-card border border-border rounded-xl p-2 focus-within:ring-1 focus-within:ring-primary/30 focus-within:border-primary/40 transition-all">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your answer… (Enter to send, Shift+Enter for new line)"
                rows={1}
                disabled={isLoading}
                className="flex-1 bg-transparent resize-none outline-none text-sm placeholder:text-muted-foreground/50 max-h-[140px] py-1 px-1 disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="size-8 rounded-lg bg-primary text-primary-foreground grid place-items-center shrink-0 hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </button>
            </div>
            <p className="text-[10px] text-muted-foreground/40 text-center mt-1.5">
              AI responses may not be perfect — treat as practice, not authoritative answers
            </p>
          </div>
        )}
      </div>
    </SplitLayout>
  );
}
