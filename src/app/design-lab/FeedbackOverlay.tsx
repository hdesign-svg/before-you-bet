"use client";
import { useState, useCallback } from "react";

interface Comment {
  variant: string;
  element: string;
  text: string;
}

export function FeedbackOverlay({ targetName }: { targetName: string }) {
  const [isActive, setIsActive] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [overall, setOverall] = useState("");
  const [currentComment, setCurrentComment] = useState("");
  const [selectedElement, setSelectedElement] = useState<{ variant: string; element: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleElementClick = useCallback((e: React.MouseEvent) => {
    if (!isActive) return;
    e.preventDefault();
    e.stopPropagation();

    const target = e.target as HTMLElement;
    const variantEl = target.closest("[data-variant]");
    const variant = variantEl?.getAttribute("data-variant") || "Unknown";
    const tag = target.tagName.toLowerCase();
    const text = target.textContent?.slice(0, 40) || "";
    const element = `${tag}${target.className ? `.${String(target.className).split(" ")[0]}` : ""} ("${text}...")`;

    setSelectedElement({ variant, element });
  }, [isActive]);

  const saveComment = () => {
    if (selectedElement && currentComment.trim()) {
      setComments([...comments, { ...selectedElement, text: currentComment }]);
      setCurrentComment("");
      setSelectedElement(null);
    }
  };

  const submit = async () => {
    const grouped: Record<string, Comment[]> = {};
    for (const c of comments) {
      (grouped[c.variant] ??= []).push(c);
    }

    let output = `## Design Lab Feedback\n\n**Target:** ${targetName}\n**Comments:** ${comments.length}\n\n`;
    for (const [variant, items] of Object.entries(grouped)) {
      output += `### Variant ${variant}\n`;
      items.forEach((c, i) => {
        output += `${i + 1}. **${c.element}**\n   "${c.text}"\n\n`;
      });
    }
    output += `### Overall Direction\n${overall}\n`;

    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      {/* Click interceptor */}
      {isActive && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 9998, cursor: "crosshair" }}
          onClick={handleElementClick}
        />
      )}

      {/* Panel */}
      <div style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        fontFamily: '"Geist", -apple-system, sans-serif',
      }}>
        {/* Comment input popup */}
        {selectedElement && (
          <div style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            padding: 16,
            marginBottom: 8,
            width: 300,
          }}>
            <p style={{ fontSize: 11, color: "#999", marginBottom: 4 }}>
              Variant {selectedElement.variant}
            </p>
            <p style={{ fontSize: 12, color: "#555", marginBottom: 8, wordBreak: "break-all" }}>
              {selectedElement.element}
            </p>
            <textarea
              value={currentComment}
              onChange={(e) => setCurrentComment(e.target.value)}
              placeholder="Your feedback..."
              autoFocus
              style={{
                width: "100%",
                minHeight: 60,
                border: "1px solid #E0DDD6",
                borderRadius: 8,
                padding: 8,
                fontSize: 13,
                resize: "vertical",
                outline: "none",
              }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button
                onClick={() => setSelectedElement(null)}
                style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "1px solid #E0DDD6", background: "#fff", fontSize: 12, cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={saveComment}
                style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", background: "#111", color: "#fff", fontSize: 12, cursor: "pointer" }}
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Overall + Submit */}
        {comments.length > 0 && !isActive && (
          <div style={{
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            padding: 16,
            marginBottom: 8,
            width: 300,
          }}>
            <p style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>
              {comments.length} comment{comments.length > 1 ? "s" : ""} saved
            </p>
            <textarea
              value={overall}
              onChange={(e) => setOverall(e.target.value)}
              placeholder="Overall direction (which variant wins, what to combine...)"
              style={{
                width: "100%",
                minHeight: 60,
                border: "1px solid #E0DDD6",
                borderRadius: 8,
                padding: 8,
                fontSize: 13,
                resize: "vertical",
                outline: "none",
              }}
            />
            <button
              onClick={submit}
              style={{
                width: "100%",
                marginTop: 8,
                padding: "10px 0",
                borderRadius: 8,
                border: "none",
                background: "#111",
                color: "#fff",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {copied ? "Copied! Paste in terminal" : "Submit All Feedback"}
            </button>
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setIsActive(!isActive)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            borderRadius: 100,
            border: "none",
            background: isActive ? "#E31837" : "#111",
            color: "#fff",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
            marginLeft: "auto",
          }}
        >
          {isActive ? "Stop Feedback" : `Add Feedback${comments.length > 0 ? ` (${comments.length})` : ""}`}
        </button>
      </div>
    </>
  );
}
