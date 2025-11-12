import type { Curiosity } from "../types/types";
import { CuriosityCard } from "./CuriosityCard";

  const curiosities = [
    {
      id: 1,
      title: 'The first computer bug was a literal bug',
      content: "In 1947 engineers working on the Harvard Mark II found a moth trapped in a relay — they taped it into the logbook and called it the 'first actual case of bug being found'.",
    },
    {
      id: 2,
      title: 'Whitespace can be meaningful',
      content: 'Languages like Python use indentation to define code blocks, so whitespace there changes program meaning — not just style.',
    },
    {
      id: 3,
      title: "The word 'debug' predates computers",
      content: "'Debug' was used in engineering long before computers to mean removing defects; it was naturally adopted in computing.",
    },
    {
      id: 4,
      title: 'Many language names have interesting origins',
      content: "For example, 'Python' was named after Monty Python (the comedy group), not the snake.",
    },
    {
      id: 5,
      title: 'Stack Overflow started from blog ideas',
      content: 'Stack Overflow was founded after community Q&A ideas discussed on blogs — it changed how developers share knowledge.',
    },
    {
      id: 6,
      title: 'The shortest useful program',
      content: 'A one-line script can sometimes replace hundreds of manual steps — automation is often about small, composable programs.',
    },
  ];


export const CuriosityList = () => {
  const handleShare = (curiosity: Curiosity) => {
    const shareText = `${curiosity.title}\n${curiosity.content}\n\nvia CurioCode 🧠`;
    if (navigator.share) {
      navigator.share({ title: "CurioCode", text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Copied to clipboard ✅");
    }
  };

  const handleVote = (curiosity: Curiosity) => {
    console.log("Voted curiosity:", curiosity.id);
    // TODO: call API or update local state
  };

  return (
    <section className="grid gap-4">
      {curiosities.map((c) => (
        <CuriosityCard
          key={c.id}
          curiosity={c}
          onShare={handleShare}
          onVote={handleVote}
        />
      ))}
    </section>
  );
};
