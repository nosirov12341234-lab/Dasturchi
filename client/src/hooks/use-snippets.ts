import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, type SupaSnippet } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export function useSnippets() {
  return useQuery({
    queryKey: ["snippets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('snippets')
        .select('*');

      if (error) {
        throw new Error(error.message);
      }
      
      // Sort in-memory if created_at is missing, or just return as is
      const sortedData = (data as SupaSnippet[]).sort((a, b) => {
        const timeA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const timeB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return timeB - timeA;
      });

      return sortedData;
    },
  });
}

export function useCreateSnippet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newSnippet: { title: string; language: string; code: string }) => {
      const { data, error } = await supabase
        .from('snippets')
        .insert([newSnippet])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["snippets"] });
      toast({
        title: "Snippet saved",
        description: "Your code snippet has been saved successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error saving snippet",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
