import { getAllPosts, getPostBySlug } from "@/lib/blog";

describe("Blog", () => {
  it("loads all posts sorted by date", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThanOrEqual(3);
    expect(posts[0].title).toBeTruthy();
    expect(posts[0].slug).toBeTruthy();
  });

  it("loads a post by slug", () => {
    const post = getPostBySlug("reduce-patient-no-shows");
    expect(post).not.toBeNull();
    expect(post?.title).toContain("No-Shows");
    expect(post?.author).toBeTruthy();
  });

  it("returns null for unknown slug", () => {
    expect(getPostBySlug("non-existent-post")).toBeNull();
  });
});
