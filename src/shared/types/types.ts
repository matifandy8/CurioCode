export type CuriosityStatus = "pending" | "approved" | "rejected";

export interface Curiosity {
  id: number;
  title: string;
  content: string;
  status: CuriosityStatus;
  submittedBy?: string;
  submittedAt?: string;
  reviewedAt?: string;
}

export type PublicCuriosity = Omit<Curiosity, "reviewedAt" | "status">;
export type UserCuriosity = Curiosity;
export interface AdminCuriosity extends Curiosity {
  submittedBy: string;
  reviewedAt?: string;
}

export type CuriosityCreate = Omit<Curiosity, "id" | "status" | "reviewedAt" | "submittedAt">;



  
