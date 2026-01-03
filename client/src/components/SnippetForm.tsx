import { useState } from "react";
import { useCreateSnippet } from "@/hooks/use-snippets";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, Code2, Save } from "lucide-react";
import Editor from "@monaco-editor/react";

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "sql", label: "SQL" },
];

export function SnippetForm() {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Start typing your code here...");
  
  const createSnippet = useCreateSnippet();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !code) return;

    createSnippet.mutate({ title, language, code }, {
      onSuccess: () => {
        setTitle("");
        setCode("// Start typing your code here...");
        // Keep language selection
