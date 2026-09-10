import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("votes").collect();
  },
});

export const setVote = mutation({
  args: {
    franjaId: v.string(),
    day: v.string(),
    friendId: v.string(),
    name: v.string(),
    choice: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("votes")
      .withIndex("by_franja_friend", (q) =>
        q.eq("franjaId", args.franjaId).eq("friendId", args.friendId)
      )
      .unique();
    const ts = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, { ...args, ts });
    } else {
      await ctx.db.insert("votes", { ...args, ts });
    }
  },
});

export const deleteVote = mutation({
  args: {
    franjaId: v.string(),
    friendId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("votes")
      .withIndex("by_franja_friend", (q) =>
        q.eq("franjaId", args.franjaId).eq("friendId", args.friendId)
      )
      .unique();
    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});
