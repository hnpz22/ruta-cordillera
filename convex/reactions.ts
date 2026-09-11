import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("reactions").collect();
  },
});

export const add = mutation({
  args: {
    actId: v.string(),
    friendId: v.string(),
    name: v.string(),
    emoji: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("reactions", { ...args, ts: Date.now() });
  },
});
