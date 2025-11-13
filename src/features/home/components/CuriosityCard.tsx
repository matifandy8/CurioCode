import { Button } from "@/components/Button";
import type { PublicCuriosity } from "@/shared/types/types";

interface CuriosityCardProps {
  curiosity: PublicCuriosity;
  onShare?: (curiosity: PublicCuriosity) => void;
  onVote?: (curiosity: PublicCuriosity) => void;
}

export const CuriosityCard: React.FC<CuriosityCardProps> = ({
  curiosity,
  onShare,
  onVote,
}) => {
  return (
    <article className="group relative flex flex-col gap-3 rounded-xl border border-white/10 bg-[#111111] p-5 text-gray-200 transition hover:border-cyan-400/50 hover:shadow-[0_0_12px_#00FFFF40]">
      <h3 className="font-mono text-lg font-semibold text-cyan-400 group-hover:text-cyan-300">
        {curiosity.title}
      </h3>

      <p className="text-gray-300 leading-relaxed">{curiosity.content}</p>
      <p className="text-xs text-gray-400 mt-2">Submitted by {curiosity.submittedBy} on {curiosity.submittedAt}</p>

      <footer className="mt-2 flex items-center justify-center gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onShare?.(curiosity)}
        >
          🔗 Share
        </Button>
        <Button variant="outline" size="sm" onClick={() => onVote?.(curiosity)}>
          🚀 Vote
        </Button>
      </footer>
    </article>
  );
};
