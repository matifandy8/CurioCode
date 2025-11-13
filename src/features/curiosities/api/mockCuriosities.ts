import type { AdminCuriosity, PublicCuriosity, UserCuriosity } from "@/shared/types/types";

export const curiositiesPublic: PublicCuriosity[] = [
  {
    id: 1,
    title: "The first computer bug was a literal bug",
    content:
      "In 1947, engineers working on the Harvard Mark II found a moth trapped in a relay — they taped it into the logbook and called it the 'first actual case of bug being found'.",
    submittedAt: "2025-10-28",
    submittedBy: "grace@example.com",
  },
  {
    id: 2,
    title: "Whitespace can be meaningful",
    content:
      "Languages like Python use indentation to define code blocks, so whitespace there changes program meaning — not just style.",
    submittedAt: "2025-10-28",
    submittedBy: "john@example.com",
  },
  {
    id: 3,
    title: "The word 'debug' predates computers",
    content:
      "'Debug' was used in engineering long before computers to mean removing defects; it was naturally adopted in computing.",
    submittedAt: "2025-10-28",
    submittedBy: "sarah@example.com",
  },
];

export const curiositiesUser: UserCuriosity[] = [
  {
    id: 1,
    title: "Why semicolons are optional in JavaScript",
    content:
      "JavaScript uses automatic semicolon insertion (ASI), which adds semicolons in some cases — but it's not perfect.",
    status: "pending",
    submittedAt: "2025-10-31",
  },
  {
    id: 2,
    title: "Whitespace can be meaningful",
    content:
      "Languages like Python use indentation to define code blocks, so whitespace there changes program meaning — not just style.",
    status: "approved",
    submittedAt: "2025-10-28",
    reviewedAt: "2025-10-29",
  },
  {
    id: 3,
    title: "Tabs vs Spaces debate",
    content: "The debate even reached Silicon Valley TV show — and Stack Overflow surveys track it yearly.",
    status: "rejected",
    submittedAt: "2025-10-25",
    reviewedAt: "2025-10-26",
  },
];

export const curiositiesAdmin: AdminCuriosity[] = [
  {
    id: 1,
    title: "The first computer bug was a literal bug",
    content:
      "In 1947, engineers working on the Harvard Mark II found a moth trapped in a relay — they taped it into the logbook.",
    status: "approved",
    submittedBy: "grace@example.com",
    submittedAt: "2025-10-28",
    reviewedAt: "2025-10-29",
  },
  {
    id: 2,
    title: "Why semicolons are optional in JavaScript",
    content:
      "JavaScript uses automatic semicolon insertion (ASI), which adds semicolons in some cases — but it's not perfect.",
    status: "pending",
    submittedBy: "john@example.com",
    submittedAt: "2025-10-31",
  },
  {
    id: 3,
    title: "Tabs vs Spaces debate",
    content:
      "The debate even reached Silicon Valley TV show — and Stack Overflow surveys track it yearly.",
    status: "rejected",
    submittedBy: "sarah@example.com",
    submittedAt: "2025-10-25",
    reviewedAt: "2025-10-26",
  },
];
