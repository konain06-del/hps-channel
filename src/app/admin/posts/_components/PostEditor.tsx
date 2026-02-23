"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Send,
  Trash2,
  X,
  Eye,
  PenLine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { generateSlug } from "@/lib/blog/slug";
import type { BlogPost } from "@/lib/blog/types";
import { Prose } from "@/components/Prose";
import { DeleteModal } from "./DeleteModal";
import { Toast } from "./Toast";
import { MarkdownEditor } from "./MarkdownEditor";

interface PostEditorProps {
  post?: BlogPost;
}

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
}

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter();
  const isEditing = !!post;
  const [slugManual, setSlugManual] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const lastSavedRef = useRef<string>("");
  const [debouncedContent, setDebouncedContent] = useState(post?.content ?? "");

  const [form, setForm] = useState<FormState>({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    coverImage: post?.coverImage ?? "",
    author: post?.author ?? "Hydra Pool Services",
    published: post?.published ?? false,
    seoTitle: post?.seoTitle ?? "",
    seoDescription: post?.seoDescription ?? "",
    tags: post?.tags ?? [],
  });

  /* ---- Track the post id (set after first save for new posts) ---- */
  const [postId, setPostId] = useState<string | undefined>(post?.id);

  /* ---- Auto-generate slug from title ---- */
  useEffect(() => {
    if (!slugManual && !isEditing) {
      setForm((f) => ({ ...f, slug: generateSlug(f.title) }));
    }
  }, [form.title, slugManual, isEditing]);

  /* ---- Autosave (every 30s when editing an existing post) ---- */
  useEffect(() => {
    if (!postId) return;
    const serialised = JSON.stringify(form);
    if (serialised === lastSavedRef.current) return;

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/admin/posts/${postId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form }),
        });
        if (res.ok) lastSavedRef.current = JSON.stringify(form);
      } catch { /* silent autosave failure */ }
    }, 30000);

    return () => clearTimeout(timer);
  }, [form, postId]);

  /* ---- Debounced preview content (300ms delay to avoid lag) ---- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedContent(form.content);
    }, 300);
    return () => clearTimeout(timer);
  }, [form.content]);

  const showToast = useCallback(
    (message: string, type: "success" | "error") => {
      setToast({ message, type });
    },
    []
  );

  /* ---- Field update helper ---- */
  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) {
      setErrors((e) => {
        const copy = { ...e };
        delete copy[key];
        return copy;
      });
    }
  }

  /* ---- Tag helpers ---- */
  function addTag() {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      updateField("tags", [...form.tags, tag]);
    }
    setTagInput("");
  }

  function removeTag(tag: string) {
    updateField(
      "tags",
      form.tags.filter((t) => t !== tag)
    );
  }

  function handleTagKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  }

  /* ---- Save / Publish ---- */
  async function handleSave(publish?: boolean) {
    setSaving(true);
    setErrors({});

    const data = {
      ...form,
      published: publish !== undefined ? publish : form.published,
    };

    try {
      if (postId) {
        const res = await fetch(`/api/admin/posts/${postId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (result.success) {
          lastSavedRef.current = JSON.stringify(data);
          if (publish !== undefined) updateField("published", publish);
          showToast(publish ? "Post published" : "Post saved", "success");
        } else if (result.error) {
          if (typeof result.error === "string") {
            showToast(result.error, "error");
          } else {
            setErrors(result.error as Record<string, string[]>);
            showToast("Please fix the errors below", "error");
          }
        }
        setSaving(false);
        return;
      }

      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.success) {
        lastSavedRef.current = JSON.stringify(data);
        if (result.post) {
          setPostId(result.post.id);
          window.history.replaceState(null, "", `/admin/posts/${result.post.id}`);
        }
        if (publish !== undefined) {
          updateField("published", publish);
        }
        showToast("Post created", "success");
      } else if (result.error) {
        if (typeof result.error === "string") {
          showToast(result.error, "error");
        } else {
          setErrors(result.error as Record<string, string[]>);
          showToast("Please fix the errors below", "error");
        }
      }
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
        "error"
      );
    }

    setSaving(false);
  }

  /* ---- Delete ---- */
  async function handleDelete() {
    if (!postId) return;
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, { method: "DELETE" });
      const result = await res.json();
      if (result.success) {
        router.push("/admin/posts");
      } else {
        showToast(result.error || "Failed to delete", "error");
      }
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : "Failed to delete",
        "error"
      );
    }
    setShowDelete(false);
  }

  /* ---- Field error helper ---- */
  function fieldError(key: string) {
    return errors[key]?.[0];
  }

  return (
    <div className="flex h-full flex-col">
      {/* ---- Top bar ---- */}
      <div className="flex items-center justify-between border-b border-[#E2E8F0] bg-white px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="rounded-lg p-1.5 text-[#6B7B94] hover:bg-[#F1F5F9]"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-sm font-semibold text-[#0B1B2B]">
            {isEditing ? "Edit Post" : "New Post"}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile tab toggles */}
          <div className="flex gap-1 rounded-lg border border-[#E2E8F0] p-0.5 lg:hidden">
            <button
              onClick={() => setActiveTab("edit")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium",
                activeTab === "edit"
                  ? "bg-[#E8F7FD] text-[#1E9AC4]"
                  : "text-[#6B7B94]"
              )}
            >
              <PenLine className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={cn(
                "rounded-md px-2.5 py-1 text-xs font-medium",
                activeTab === "preview"
                  ? "bg-[#E8F7FD] text-[#1E9AC4]"
                  : "text-[#6B7B94]"
              )}
            >
              <Eye className="h-3.5 w-3.5" />
            </button>
          </div>

          {postId && (
            <button
              onClick={() => setShowDelete(true)}
              className="rounded-lg p-2 text-[#6B7B94] hover:bg-red-50 hover:text-red-600"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-xs font-semibold text-[#445266] transition-colors hover:bg-[#F1F5F9] disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" />
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#27B6E6] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1E9AC4] disabled:opacity-50"
          >
            <Send className="h-3.5 w-3.5" />
            {form.published ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      {/* ---- Content area ---- */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Form */}
        <div
          className={cn(
            "flex-1 overflow-auto p-4 md:p-6",
            activeTab !== "edit" && "hidden lg:block"
          )}
        >
          <div className="mx-auto max-w-2xl space-y-5">
            {/* Title */}
            <Field label="Title" error={fieldError("title")} required>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                placeholder="Post title"
                className={fieldClass(fieldError("title"))}
              />
            </Field>

            {/* Slug */}
            <Field label="Slug" error={fieldError("slug")} required>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => {
                    setSlugManual(true);
                    updateField("slug", e.target.value);
                  }}
                  placeholder="post-slug"
                  className={cn(fieldClass(fieldError("slug")), "flex-1")}
                />
                {slugManual && (
                  <button
                    onClick={() => {
                      setSlugManual(false);
                      updateField("slug", generateSlug(form.title));
                    }}
                    className="shrink-0 rounded-lg border border-[#E2E8F0] px-3 text-xs font-medium text-[#6B7B94] hover:bg-[#F1F5F9]"
                    type="button"
                  >
                    Auto
                  </button>
                )}
              </div>
            </Field>

            {/* Excerpt */}
            <Field label="Excerpt" error={fieldError("excerpt")} required>
              <textarea
                value={form.excerpt}
                onChange={(e) => updateField("excerpt", e.target.value)}
                placeholder="A brief summary (1-2 sentences)"
                rows={2}
                className={fieldClass(fieldError("excerpt"))}
              />
            </Field>

            {/* Tags */}
            <Field label="Tags">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-[#E8F7FD] px-2.5 py-1 text-xs font-medium text-[#1E9AC4]"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="rounded-full p-0.5 hover:bg-[#C8ECFA]"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                onBlur={addTag}
                placeholder="Type a tag and press Enter"
                className={fieldClass()}
              />
            </Field>

            {/* Cover Image */}
            <Field label="Cover Image URL">
              <input
                type="url"
                value={form.coverImage}
                onChange={(e) => updateField("coverImage", e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className={fieldClass()}
              />
            </Field>

            {/* SEO */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[#6B7B94]">
                SEO Settings
              </h3>
              <div className="space-y-3">
                <Field label="SEO Title" small>
                  <input
                    type="text"
                    value={form.seoTitle}
                    onChange={(e) => updateField("seoTitle", e.target.value)}
                    placeholder="Defaults to post title"
                    className={fieldClass()}
                  />
                </Field>
                <Field label="SEO Description" small>
                  <textarea
                    value={form.seoDescription}
                    onChange={(e) =>
                      updateField("seoDescription", e.target.value)
                    }
                    placeholder="Defaults to excerpt"
                    rows={2}
                    className={fieldClass()}
                  />
                </Field>
              </div>
            </div>

            {/* Author */}
            <Field label="Author">
              <input
                type="text"
                value={form.author}
                onChange={(e) => updateField("author", e.target.value)}
                className={fieldClass()}
              />
            </Field>

            {/* Content */}
            <Field label="Content (Markdown)" error={fieldError("content")} required>
              <MarkdownEditor
                value={form.content}
                onChange={(val) => updateField("content", val)}
                placeholder="Write your post in Markdown..."
                error={fieldError("content")}
              />
            </Field>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div
          className={cn(
            "w-full overflow-auto border-l border-[#E2E8F0] bg-white lg:w-[45%] lg:max-w-xl",
            activeTab !== "preview" && "hidden lg:block"
          )}
        >
          <div className="p-6 md:p-8">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-[#6B7B94]">
              Preview
            </p>
            {form.coverImage && (
              <img
                src={form.coverImage}
                alt=""
                className="mb-6 w-full rounded-xl border border-[#E8F2FA] object-cover"
                style={{ maxHeight: 240 }}
              />
            )}
            {form.title && (
              <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-[#0B1B2B]">
                {form.title}
              </h1>
            )}
            {form.excerpt && (
              <p className="mb-4 text-sm leading-relaxed text-[#6B7B94]">
                {form.excerpt}
              </p>
            )}
            {form.tags.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-1.5">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#E8F7FD] px-2.5 py-0.5 text-[11px] font-medium text-[#1E9AC4]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <hr className="mb-6 border-[#E8F2FA]" />
            <Prose content={debouncedContent || "*Start writing to see the preview...*"} />
          </div>
        </div>
      </div>

      {/* Delete modal */}
      {showDelete && postId && (
        <DeleteModal
          title={form.title || "Untitled Post"}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tiny helpers                                                       */
/* ------------------------------------------------------------------ */

function fieldClass(error?: string) {
  return cn(
    "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-[#0B1B2B] outline-none transition-colors",
    "focus:border-[#27B6E6] focus:ring-2 focus:ring-[#27B6E6]/20",
    error ? "border-red-300" : "border-[#E2E8F0]"
  );
}

function Field({
  label,
  error,
  required,
  small,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  small?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className={cn(
          "mb-1.5 block font-medium text-[#0B1B2B]",
          small ? "text-xs" : "text-sm"
        )}
      >
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
