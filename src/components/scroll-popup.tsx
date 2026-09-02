"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScrollPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or submitted in this session/local storage
    const dismissed = localStorage.getItem("email-popup-dismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
      return;
    }

    let timer: NodeJS.Timeout;
    let hasScrolled = false;
    let timePassed = false;
    
    // Start a 30 second timer on mount
    timer = setTimeout(() => {
      timePassed = true;
      // If 30 seconds have passed AND they have scrolled, show it
      if (hasScrolled) {
        setIsVisible(true);
      }
    }, 30000);

    const handleScroll = () => {
      if (window.scrollY > 200) {
        hasScrolled = true;
        // If they scroll AFTER 30 seconds have passed, show it immediately
        if (timePassed && !isVisible && !isDismissed) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDismissed, isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("email-popup-dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate submission
    setIsSubmitted(true);
    localStorage.setItem("email-popup-dismissed", "true");
    
    setTimeout(() => {
      setIsVisible(false);
      setIsDismissed(true);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 right-6 z-50 w-[calc(100%-48px)] max-w-sm sm:w-96"
        >
          <div className="relative overflow-hidden rounded-2xl bg-secondary/90 border border-border/50 shadow-soft backdrop-blur-xl p-6">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-primary/20 blur-2xl" />
            
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-muted hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg leading-tight text-foreground">
                    Enjoying the content?
                  </h3>
                  <p className="text-sm text-muted">
                    Get the latest updates directly to your inbox.
                  </p>
                </div>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-3">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background/50 border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    />
                  </div>
                  <Button type="submit" className="w-full group">
                    Subscribe
                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-2 bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex flex-col items-center justify-center text-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-green-400">Thanks for subscribing!</p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
