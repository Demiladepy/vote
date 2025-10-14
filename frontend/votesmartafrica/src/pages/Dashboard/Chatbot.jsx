"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { fetchChatbotResponse } from "@/services/chatbot";
import {
  Moon,
  Sun,
  Plus,
  Search,
  Paperclip,
  Send,
  Menu,
  Trash2,
  MessageSquare,
  X,
  Sparkles,
} from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      role: "user",
      content: inputMessage.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    const reply = await fetchChatbotResponse(newMessage.content);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        role: "assistant",
        content: reply,
      },
    ]);
    setIsTyping(false);
  };

  const handleNewChat = () => {
    if (messages.length > 0) {
      const newChat = {
        id: Date.now(),
        title: messages[0]?.content.slice(0, 25) || "Untitled Chat",
        date: new Date().toLocaleDateString(),
      };
      setChatHistory((prev) => [newChat, ...prev]);
    }
    setMessages([]);
  };

  const toggleTheme = () =>
    setTheme(theme === "dark" ? "light" : "dark");

  const filteredHistory = chatHistory.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-background text-foreground transition-colors duration-300">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } border-r border-border bg-muted/30 backdrop-blur-xl transition-all duration-300 overflow-hidden`}
      >
        <div className="flex flex-col h-full p-4 gap-4">
          {/* New Chat */}
          <Button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 h-11 rounded-lg border border-border bg-background hover:bg-accent/30 text-foreground font-medium shadow-sm transition"
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white"><Plus className="w-4 h-4" /></span>
            <span className="text-base">New Chat</span>
          </Button>




          <Separator />

          {/* Chat History */}
          <ScrollArea className="flex-1 -mx-2">
            <div className="space-y-1 px-2">
              {filteredHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground p-4 text-center">
                  No saved chats yet.
                </p>
              ) : (
                filteredHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className="group flex items-center justify-between p-2.5 rounded-lg hover:bg-accent/40 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <MessageSquare className="w-4 h-4 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-sm font-medium truncate">
                          {chat.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{chat.date}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition hover:text-destructive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          <Separator />

          {/* Theme Toggle */}
          <Button
            onClick={toggleTheme}
            variant="outline"
            className="w-full justify-start h-10 border-border/50 hover:bg-accent/30 text-sm rounded-xl"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-4 h-4 mr-2" /> Light Mode
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 mr-2" /> Dark Mode
              </>
            )}
          </Button>
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card/70 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-accent/30"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold">VoteSmart Assistant</h2>
            </div>
          </div>
          <Button
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className="hover:bg-accent/30"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 bg-background">
          <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-10">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-6 shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold mb-2 text-foreground">Where should we begin?</h1>
                <p className="text-base text-muted-foreground mb-8">Ask anything about elections, candidates, or voting. Your VoteSmart Assistant is here to help.</p>
                <div className="w-full flex justify-center">
                  <div className="flex items-center w-full max-w-xl bg-card border border-border rounded-full px-6 py-3 shadow-md">
                    <Input
                      placeholder="Ask anything"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 border-none bg-transparent text-lg focus:ring-0 focus:outline-none"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="ml-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white h-10 w-10 flex items-center justify-center disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-4 ${
                      message.role === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar className="w-10 h-10 shadow-md">
                      <AvatarFallback>
                        {message.role === "assistant" ? (
                          <Sparkles className="w-5 h-5 text-indigo-500" />
                        ) : (
                          "U"
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-2xl px-5 py-3 text-base leading-relaxed max-w-[80%] shadow-sm ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                          : "bg-card border border-border text-foreground"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10 shadow-md">
                      <AvatarFallback>
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-card border border-border rounded-2xl px-5 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-75" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse delay-150" />
                      </div>
                    </div>
                  </div>
                )}
                {/* Input at bottom for chat mode */}
                <div className="sticky bottom-0 w-full flex justify-center mt-8">
                  <div className="flex items-center w-full max-w-xl bg-card border border-border rounded-full px-6 py-3 shadow-md">
                    <Input
                      placeholder="Type your message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      className="flex-1 border-none bg-transparent text-lg focus:ring-0 focus:outline-none"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="ml-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white h-10 w-10 flex items-center justify-center disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <footer className="border-t border-border bg-card/70 backdrop-blur-xl px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            {/* File Upload Button */}
            <label htmlFor="chat-file-upload" className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-600 hover:bg-blue-700 cursor-pointer transition">
              <Paperclip className="w-6 h-6 text-white" />
              <input
                id="chat-file-upload"
                type="file"
                accept="image/*,.pdf,.doc,.docx,.txt"
                multiple
                className="hidden"
                onChange={e => {
                  // Handle file upload here
                  const files = Array.from(e.target.files || []);
                  // You can display previews, upload to server, etc.
                  alert(`Selected files: ${files.map(f => f.name).join(", ")}`);
                }}
              />
            </label>
            <div className="flex-1">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="h-12 rounded-2xl text-base border border-border px-5 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 bg-background"
                style={{ boxShadow: 'none' }}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-300 hover:opacity-90 text-white disabled:opacity-50 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)' }}
            >
              <Send className="w-6 h-6" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-3">
            VoteSmart AI may make mistakes — verify important information.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Chatbot;
