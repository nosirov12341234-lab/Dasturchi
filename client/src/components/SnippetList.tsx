import { useSnippets } from "@/hooks/use-snippets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Copy, Check, FileCode, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export function SnippetList() {
  const { data: snippets, isLoading, error } = useSnippets();
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyToClipboard = async (text: string, id: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-card/30 animate-pulse rounded-xl border border-border/40" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-400 bg-red-950/20 border border-red-900/50 rounded-xl">
        Error loading snippets: {error.message}
      </div>
    );
  }

  if (!snippets?.length) {
    return (
      <div className="text-center p-12 bg-card/30 rounded-xl border border-dashed border-border/60">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
          <FileCode className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground">No snippets yet</h3>
        <p className="text-muted-foreground mt-2">Create your first code snippet above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {snippets.map((snippet) => (
        <Card key={snippet.id} className="group overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-colors duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted/30 border-b border-border/40">
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded bg-background border border-border/50">
                <FileCode className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold leading-none">{snippet.title}</CardTitle>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(snippet.created_at), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="capitalize bg-background/50 font-mono text-xs">
              {snippet.language}
            </Badge>
          </CardHeader>
          <CardContent className="p-0 relative">
            <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                size="sm"
                className="h-8 px-2 shadow-md bg-background/80 backdrop-blur hover:bg-background"
                onClick={() => copyToClipboard(snippet.code, snippet.id)}
              >
                {copiedId === snippet.id ? (
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <Copy className="h-4 w-4 mr-1" />
                )}
                {copiedId === snippet.id ? "Copied" : "Copy"}
              </Button>
            </div>
            <ScrollArea className="h-[200px] w-full bg-[#1e1e1e] p-4 font-mono text-sm">
              <pre className="text-gray-300">
                <code>{snippet.code}</code>
              </pre>
            </ScrollArea>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
