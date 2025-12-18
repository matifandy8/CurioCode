import type { PublicCuriosity } from "@/shared/types/types";
import { CuriosityCard } from "./CuriosityCard";
import { CuriositiesService } from "@/features/curiosities/services/curiosities.services";
import { useEffect, useState } from "react";

export const CuriosityList = () => {
  const [curiosities, setCuriosities] = useState<PublicCuriosity[]>([]);
  useEffect(() => {
    const fetchCuriosities = async () => {
      const res = await CuriositiesService.getPublicCuriosities();
      setCuriosities(res as PublicCuriosity[]);
    };
    fetchCuriosities();
  }, []);

  const handleShare = (curiosity: PublicCuriosity) => {
    const shareText = `${curiosity.title}\n${curiosity.content}\n\nvia CurioCode 🧠`;
    if (navigator.share) {
      navigator.share({ title: "CurioCode", text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Copied to clipboard ✅");
    }
  };

  const handleVote = (curiosity: PublicCuriosity) => {
    console.log("Voted curiosity:", curiosity.id);
    // TODO: call API or update local state
  };

  return (
    <section className="grid gap-4">
      {curiosities.map((curiosity: PublicCuriosity) => (
        <CuriosityCard
          key={curiosity.id}
          curiosity={curiosity}
          onShare={handleShare}
          onVote={handleVote}
        />
      ))}
    </section>
  );
};
