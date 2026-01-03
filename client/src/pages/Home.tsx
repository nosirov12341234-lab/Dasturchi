import { SnippetForm } from "@/components/SnippetForm";
import { SnippetList } from "@/components/SnippetList";
import { Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 p-2 rounded-lg">
              <Terminal className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
              CodeVault
            </h1>
          </div>
          <div className="text-sm text-muted-foreground">
            v1.0.0
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto space-y-2 text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Store & Share Your <span className="text-primary">Code Snippets</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A beautiful, secure, and blazing fast place to keep your useful code blocks.
            Syntax highlighting for over 20 languages.
          </p>
        </section>

        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="sticky top-24">
              <SnippetForm />
            </div>
          </div>

          {/* Right Column: List */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Recent Snippets</h3>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                Real-time updates
              </span>
            </div>
            <SnippetList />
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-12 bg-card/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built with React, Supabase, and Monaco Editor.</p>
        </div>
      </footer>
    </div>
  );
}
