import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function writeAuditLog(input: {
  action: string;
  entity: string;
  entityId: string;
  userId: string;
  before?: unknown;
  after?: unknown;
  note?: string;
}) {
  if (!db) throw new Error("Firebase Firestore is not configured");
  return addDoc(collection(db, "auditLog"), {
    ...input,
    createdAt: serverTimestamp(),
  });
}
