"use client";

import { useRef, useCallback } from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link,
  Quote,
  Code,
  Minus,
  Image,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

interface ToolbarAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  action: (ta: HTMLTextAreaElement) => { text: string; cursorOffset: number };
  separator?: never;
}

interface ToolbarSeparator {
  separator: true;
  icon?: never;
  label?: never;
  action?: never;
}

type ToolbarItem = ToolbarAction | ToolbarSeparator;

function wrapSelection(
  ta: HTMLTextAreaElement,
  before: string,
  after: string,
  placeholder: string
) {
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  const selected = ta.value.slice(start, end);
  const content = selected || placeholder;
  const text =
    ta.value.slice(0, start) + before + content + after + ta.value.slice(end);
  const cursorOffset = selected
    ? start + before.length + content.length + after.length
    : start + before.length;
  return { text, cursorOffset, selectEnd: selected ? cursorOffset : cursorOffset + content.length };
}

function prefixLine(
  ta: HTMLTextAreaElement,
  prefix: string,
  placeholder: string
) {
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  const val = ta.value;

  // Find the start of the current line
  const lineStart = val.lastIndexOf("\n", start - 1) + 1;
  const lineEnd = val.indexOf("\n", end);
  const actualEnd = lineEnd === -1 ? val.length : lineEnd;
  const selectedLines = val.slice(lineStart, actualEnd);

  if (!selectedLines.trim()) {
    // Empty line - insert prefix + placeholder
    const text = val.slice(0, lineStart) + prefix + placeholder + val.slice(actualEnd);
    return { text, cursorOffset: lineStart + prefix.length + placeholder.length };
  }

  // Prefix each selected line
  const lines = selectedLines.split("\n");
  const prefixed = lines.map((line) => prefix + line).join("\n");
  const text = val.slice(0, lineStart) + prefixed + val.slice(actualEnd);
  return { text, cursorOffset: lineStart + prefixed.length };
}

const TOOLBAR_ITEMS: ToolbarItem[] = [
  {
    icon: Heading1,
    label: "Heading 1",
    action: (ta) => prefixLine(ta, "# ", "Heading 1"),
  },
  {
    icon: Heading2,
    label: "Heading 2",
    action: (ta) => prefixLine(ta, "## ", "Heading 2"),
  },
  {
    icon: Heading3,
    label: "Heading 3",
    action: (ta) => prefixLine(ta, "### ", "Heading 3"),
  },
  { separator: true },
  {
    icon: Bold,
    label: "Bold",
    action: (ta) => {
      const r = wrapSelection(ta, "**", "**", "bold text");
      return { text: r.text, cursorOffset: r.cursorOffset };
    },
  },
  {
    icon: Italic,
    label: "Italic",
    action: (ta) => {
      const r = wrapSelection(ta, "*", "*", "italic text");
      return { text: r.text, cursorOffset: r.cursorOffset };
    },
  },
  {
    icon: Strikethrough,
    label: "Strikethrough",
    action: (ta) => {
      const r = wrapSelection(ta, "~~", "~~", "strikethrough");
      return { text: r.text, cursorOffset: r.cursorOffset };
    },
  },
  { separator: true },
  {
    icon: List,
    label: "Bullet List",
    action: (ta) => prefixLine(ta, "- ", "List item"),
  },
  {
    icon: ListOrdered,
    label: "Numbered List",
    action: (ta) => prefixLine(ta, "1. ", "List item"),
  },
  { separator: true },
  {
    icon: Link,
    label: "Link",
    action: (ta) => {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = ta.value.slice(start, end);
      if (selected) {
        const text =
          ta.value.slice(0, start) +
          `[${selected}](url)` +
          ta.value.slice(end);
        // Place cursor at "url"
        return { text, cursorOffset: start + selected.length + 2 };
      }
      const text =
        ta.value.slice(0, start) + "[link text](url)" + ta.value.slice(end);
      return { text, cursorOffset: start + 1 };
    },
  },
  {
    icon: Image,
    label: "Image",
    action: (ta) => {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = ta.value.slice(start, end);
      if (selected) {
        const text =
          ta.value.slice(0, start) +
          `![${selected}](image-url)` +
          ta.value.slice(end);
        return { text, cursorOffset: start + selected.length + 3 };
      }
      const text =
        ta.value.slice(0, start) + "![alt text](image-url)" + ta.value.slice(end);
      return { text, cursorOffset: start + 2 };
    },
  },
  { separator: true },
  {
    icon: Quote,
    label: "Blockquote",
    action: (ta) => prefixLine(ta, "> ", "Quote"),
  },
  {
    icon: Code,
    label: "Code Block",
    action: (ta) => {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const selected = ta.value.slice(start, end);
      if (selected) {
        // If multi-line, wrap in code fence
        if (selected.includes("\n")) {
          const text =
            ta.value.slice(0, start) +
            "```\n" +
            selected +
            "\n```" +
            ta.value.slice(end);
          return { text, cursorOffset: start + 4 + selected.length + 4 };
        }
        // Single-line inline code
        const text =
          ta.value.slice(0, start) +
          "`" +
          selected +
          "`" +
          ta.value.slice(end);
        return { text, cursorOffset: start + 1 + selected.length + 1 };
      }
      const text =
        ta.value.slice(0, start) +
        "```\ncode here\n```" +
        ta.value.slice(end);
      return { text, cursorOffset: start + 4 };
    },
  },
  {
    icon: Minus,
    label: "Horizontal Rule",
    action: (ta) => {
      const start = ta.selectionStart;
      const before = ta.value.slice(0, start);
      const after = ta.value.slice(start);
      const needsNewline = before.length > 0 && !before.endsWith("\n");
      const insert = (needsNewline ? "\n" : "") + "\n---\n\n";
      const text = before + insert + after;
      return { text, cursorOffset: start + insert.length };
    },
  },
];

export function MarkdownEditor({
  value,
  onChange,
  placeholder,
  error,
}: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleToolbarClick = useCallback(
    (action: ToolbarAction["action"]) => {
      const ta = textareaRef.current;
      if (!ta) return;

      const { text, cursorOffset } = action(ta);
      onChange(text);

      // Restore focus and cursor position after React re-renders
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(cursorOffset, cursorOffset);
      });
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const ta = e.currentTarget;

      // Ctrl/Cmd + B for bold
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        const r = wrapSelection(ta, "**", "**", "bold text");
        onChange(r.text);
        requestAnimationFrame(() => {
          ta.setSelectionRange(r.cursorOffset, r.selectEnd ?? r.cursorOffset);
        });
        return;
      }

      // Ctrl/Cmd + I for italic
      if ((e.metaKey || e.ctrlKey) && e.key === "i") {
        e.preventDefault();
        const r = wrapSelection(ta, "*", "*", "italic text");
        onChange(r.text);
        requestAnimationFrame(() => {
          ta.setSelectionRange(r.cursorOffset, r.selectEnd ?? r.cursorOffset);
        });
        return;
      }

      // Tab for indentation
      if (e.key === "Tab") {
        e.preventDefault();
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const text =
          ta.value.slice(0, start) + "  " + ta.value.slice(end);
        onChange(text);
        requestAnimationFrame(() => {
          ta.setSelectionRange(start + 2, start + 2);
        });
      }
    },
    [onChange]
  );

  return (
    <div
      className={cn(
        "rounded-xl border bg-white transition-colors focus-within:border-[#27B6E6] focus-within:ring-2 focus-within:ring-[#27B6E6]/20",
        error ? "border-red-300" : "border-[#E2E8F0]"
      )}
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-[#E2E8F0] bg-[#F8FAFC] px-2 py-1.5 rounded-t-xl">
        {TOOLBAR_ITEMS.map((item, i) => {
          if (item.separator) {
            return (
              <div
                key={`sep-${i}`}
                className="mx-1 h-5 w-px bg-[#E2E8F0]"
              />
            );
          }
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              title={item.label}
              onClick={() => handleToolbarClick(item.action)}
              className="rounded-md p-1.5 text-[#6B7B94] transition-colors hover:bg-[#E2E8F0] hover:text-[#0B1B2B]"
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={24}
        className="w-full resize-y rounded-b-xl px-3.5 py-3 font-mono text-sm leading-relaxed text-[#0B1B2B] outline-none placeholder:text-[#94A3B8]"
        style={{ minHeight: 400 }}
      />
    </div>
  );
}
