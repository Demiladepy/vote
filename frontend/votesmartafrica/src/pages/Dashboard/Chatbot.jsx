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

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="flex h-screen bg-[#0b0b0b] text-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } border-r border-white/10 bg-[#111111]/80 backdrop-blur-lg transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="flex flex-col h-full p-5 gap-4">
          <Button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 font-medium text-white text-base shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Plus className="w-5 h-5" />
            New Chat
          </Button>

          <Separator className="bg-white/10 my-2" />

          <ScrollArea className="flex-1">
            {chatHistory.length === 0 ? (
              <p className="text-sm text-gray-400 text-center mt-6">
                No chats yet.
              </p>
            ) : (
              <div className="space-y-2">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className="group flex justify-between items-center px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <MessageSquare className="w-4 h-4 text-gray-400" />
                      <div className="truncate">
                        <p className="text-sm font-medium">{chat.title}</p>
                        <p className="text-xs text-gray-500">{chat.date}</p>
                      </div>
                    </div>
                    <Trash2 className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-red-500 transition" />
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <Separator className="bg-white/10 my-2" />

          <Button
            onClick={toggleTheme}
            variant="ghost"
            className="w-full justify-start text-sm h-11 text-gray-300 hover:bg-white/5 rounded-lg"
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

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-[#111111]/70 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hover:bg-white/10"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-base font-semibold text-gray-100">VoteSmart Assistant</h2>
            </div>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 px-6 py-6 space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-6 shadow-lg shadow-emerald-700/30">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome to VoteSmart AI</h1>
              <p className="text-gray-400 mb-8 max-w-md">
                Ask anything about elections, candidates, or democracy in Africa.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-4 ${
                  msg.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback>
                    {msg.role === "assistant" ? (
                      <Sparkles className="text-green-500 w-5 h-5" />
                    ) : (
                      "U"
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`px-5 py-3 rounded-2xl max-w-[75%] text-base leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-700/20"
                      : "bg-[#1a1a1a] border border-white/10 text-gray-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}

          {isTyping && (
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>
                  <Sparkles className="text-green-500 w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl px-5 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200" />
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Input Bar */}
        <footer className="border-t border-white/10 bg-[#111111]/80 backdrop-blur-xl px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <label
              htmlFor="chat-file-upload"
              className="flex items-center justify-center h-12 w-12 rounded-xl bg-green-600 hover:bg-green-700 cursor-pointer transition"
            >
              <Paperclip className="w-6 h-6 text-white" />
              <input id="chat-file-upload" type="file" className="hidden" />
            </label>

            <Input
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 h-12 rounded-xl border border-white/10 bg-[#1a1a1a] text-base px-4 focus:border-green-500 focus:ring-2 focus:ring-green-600/30 text-gray-100"
            />

            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 hover:opacity-90 text-white disabled:opacity-50 flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 text-center mt-3">
            VoteSmart AI may make mistakes — verify important information.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Chatbot;
