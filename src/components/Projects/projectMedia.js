import blog from "../../Assets/Projects/blog.png";
import chatify from "../../Assets/Projects/chatify.png";
import codeEditor from "../../Assets/Projects/codeEditor.png";
import emotion from "../../Assets/Projects/emotion.png";
import leaf from "../../Assets/Projects/leaf.png";
import suicide from "../../Assets/Projects/suicide.png";

const projectAssets = {
  "blog.png": blog,
  "chatify.png": chatify,
  "codeEditor.png": codeEditor,
  "emotion.png": emotion,
  "leaf.png": leaf,
  "suicide.png": suicide,
};

function inferMediaTypeFromSrc(src) {
  if (typeof src !== "string") return "img";

  const lower = src.toLowerCase();

  // YouTube links are videos
  if (lower.includes("youtube.com/") || lower.includes("youtu.be/")) return "video";

  // Common video extensions
  if (lower.endsWith(".mp4") || lower.endsWith(".webm") || lower.endsWith(".ogg")) return "video";

  return "img";
}

export function resolveProjectMediaSrc(value) {
  if (!value) return null;

  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  // Common case: assets stored under CRA /public/media
  // JSON often contains 'media/foo.png' (missing leading slash).
  if (trimmed.startsWith("media/")) {
    return `/${trimmed}`;
  }

  // Absolute URLs or CRA-public paths
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("/")) {
    return trimmed;
  }

  // Known local asset by filename
  if (projectAssets[trimmed]) {
    return projectAssets[trimmed];
  }

  // Fallback: treat as public root asset (avoid route-relative URLs like 'foo.png')
  return `/${trimmed}`;
}

export function normalizeProjectImages(images) {
  if (!Array.isArray(images)) return [];

  return images
    .map((img) => {
      if (!img) return null;

      if (typeof img === "string") {
        return { src: resolveProjectMediaSrc(img), alt: "" };
      }

      if (typeof img === "object") {
        return {
          src: resolveProjectMediaSrc(img.src),
          alt: img.alt || "",
          caption: img.caption || "",
        };
      }

      return null;
    })
    .filter((img) => img && img.src);
}

// New schema: media is an array of { src, alt, type: 'img' | 'video' }
// Backward-compat:
// - media can be { cover, images }
// - images can be array of strings/objects
// - video can be a string/object in the project
export function normalizeProjectMedia(media, video) {
  // New: already an array
  if (Array.isArray(media)) {
    return media
      .map((item) => {
        if (!item) return null;

        if (typeof item === "string") {
          const resolved = resolveProjectMediaSrc(item);
          return resolved
            ? { src: resolved, alt: "", type: inferMediaTypeFromSrc(item) }
            : null;
        }

        if (typeof item === "object") {
          const resolved = resolveProjectMediaSrc(item.src);
          if (!resolved) return null;

          const type = (item.type || inferMediaTypeFromSrc(item.src)).toLowerCase();
          return {
            src: resolved,
            alt: item.alt || "",
            type: type === "video" ? "video" : "img",
          };
        }

        return null;
      })
      .filter((item) => item && item.src);
  }

  // Old: media is an object with cover/images
  const collected = [];
  if (media && typeof media === "object") {
    if (media.cover) {
      const resolvedCover = resolveProjectMediaSrc(media.cover);
      if (resolvedCover) {
        collected.push({ src: resolvedCover, alt: "", type: "img" });
      }
    }

    if (Array.isArray(media.images)) {
      normalizeProjectImages(media.images).forEach((img) => {
        collected.push({ src: img.src, alt: img.alt || "", type: "img" });
      });
    }
  }

  // Old: separate video field
  if (video) {
    const url = typeof video === "string" ? video : video?.url;
    if (typeof url === "string" && url.trim()) {
      collected.push({ src: url.trim(), alt: video?.title || "", type: "video" });
    }
  }

  // De-dupe by src
  const seen = new Set();
  return collected.filter((item) => {
    if (!item?.src) return false;
    if (seen.has(item.src)) return false;
    seen.add(item.src);
    return true;
  });
}
