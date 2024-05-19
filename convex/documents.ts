import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: { title: v.string(), parentId: v.optional(v.id("documents")) },
  handler: async (ctx, args) => {

    const identity = await ctx.auth.getUserIdentity();

    if(!identity) {
      throw new Error("Not logged in");
    }
    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentId: args.parentId,
      userId: userId,
      isPublished: false,
      isArchived: false,
     });

    return document;
  },
});

export const get = query(
    {  args: {},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
          throw new Error("Not logged in");
        }
        const userId = identity.subject;
      return await ctx.db.query("documents").collect();
    },}
)