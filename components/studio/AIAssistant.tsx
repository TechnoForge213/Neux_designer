import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI assistant. I can help you with 3D modeling, game development, animations, and more. What would you like to create today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    setTimeout(() => {
      const responses = [
        "I can help you create that! Let me generate the 3D model...",
        "Great idea! I'll optimize the physics for that object.",
        "I've analyzed your scene. Here are my suggestions for improvement...",
        "Let me create an animation script for that character movement.",
      ];
      const response = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsLoading(false);
      toast.success("AI response generated");
    }, 1500);
  };

  return (
    <Card className="h-[600px] flex flex-col bg-background/50 backdrop-blur-xl border-primary/20 shadow-lg shadow-primary/10">
      <div className="p-4 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary animate-pulse" />
          AI Design Assistant
          <Sparkles className="h-4 w-4 text-secondary ml-auto" />
        </h3>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "bg-secondary/20 border border-secondary/20 backdrop-blur-sm"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-secondary/20 border border-secondary/20 backdrop-blur-sm rounded-lg p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-primary/20 bg-background/30">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask AI to help with your design..."
            className="bg-background/50 border-primary/20 focus:border-primary/40"
          />
          <Button onClick={handleSend} disabled={isLoading} className="gap-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
