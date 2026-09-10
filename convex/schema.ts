import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  votes: defineTable({
    franjaId: v.string(),
    day: v.string(),
    friendId: v.string(),
    name: v.string(),
    choice: v.string(),
    ts: v.number(),
  }).index("by_franja_friend", ["franjaId", "friendId"]),
});
