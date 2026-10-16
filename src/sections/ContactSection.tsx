import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Send, ThumbsUp, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { easeSmooth } from '../utils/animationVariants';

interface Comment {
  id: string;
  name: string;
  comment: string;
  timestamp: string;
  likes: number;
  liked: boolean;
}

export const ContactSection: React.FC = () => {
  const [contactFormState, setContactFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [commentFormState, setCommentFormState] = useState({
    name: '',
    comment: '',
  });
  const [honeypot, setHoneypot] = useState('');
  const [contactError, setContactError] = useState<string | null>(null);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [submittedContact, setSubmittedContact] = useState(false);
  const [submittedComment, setSubmittedComment] = useState(false);
  
  const [comments, setComments] = useState<Comment[]>([]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent duplicate submissions while in-flight
    if (isSubmittingContact) return;

    setContactError(null);

    const name = contactFormState.name.trim();
    const email = contactFormState.email.trim();
    const message = contactFormState.message.trim();

    // Client-side validations
    if (!name || !email || !message) {
      setContactError('Please fill in all fields (Name, Email, and Message).');
      return;
    }

    if (name.length < 2 || name.length > 100) {
      setContactError('Name must be between 2 and 100 characters.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length > 100 || !emailRegex.test(email)) {
      setContactError('Please enter a valid email address.');
      return;
    }

    if (message.length < 5 || message.length > 2000) {
      setContactError('Message must be between 5 and 2000 characters.');
      return;
    }

    const scriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

    if (!scriptUrl || scriptUrl.trim() === '') {
      setContactError(
        'Google Apps Script endpoint is not configured. Please set VITE_GOOGLE_APPS_SCRIPT_URL in your .env file.'
      );
      return;
    }

    setIsSubmittingContact(true);

    try {
      // Send as text/plain with JSON body:
      // 1. Avoids CORS preflight (OPTIONS) which Google Apps Script Web App does not handle.
      // 2. Browser follows HTTP 302 redirect from script.google.com to script.googleusercontent.com.
      // 3. Response contains Access-Control-Allow-Origin: * so frontend can read result JSON.
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _hp: honeypot,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}. Please try again later.`);
      }

      const result = await response.json();

      if (result && result.status === 'success') {
        setSubmittedContact(true);
        setContactError(null);
        setContactFormState({ name: '', email: '', message: '' });
        setHoneypot('');

        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#3b82f6', '#ffffff', '#60a5fa'],
        });

        setTimeout(() => {
          setSubmittedContact(false);
        }, 5000);
      } else {
        throw new Error(result?.message || 'Failed to submit form. Please try again.');
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'A network error occurred. Please check your connection and try again.';
      setContactError(errorMessage);
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingComment(true);

    setTimeout(() => {
      const newComment: Comment = {
        id: Date.now().toString(),
        name: commentFormState.name,
        comment: commentFormState.comment,
        timestamp: 'just now',
        likes: 0,
        liked: false,
      };
      setComments([newComment, ...comments]);
      setIsSubmittingComment(false);
      setSubmittedComment(true);
      setTimeout(() => {
        setSubmittedComment(false);
        setCommentFormState({ name: '', comment: '' });
      }, 2500);
    }, 1000);
  };

  const toggleLike = (id: string) => {
    setComments(comments.map(comment => 
      comment.id === id 
        ? { ...comment, liked: !comment.liked, likes: comment.liked ? comment.likes - 1 : comment.likes + 1 }
        : comment
    ));
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Background Grid & Highlights - Now Global in App.tsx */}

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeSmooth }}
            className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold"
          >
            GET IN TOUCH
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: easeSmooth }}
            className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white"
          >
            LET'S WORK TOGETHER
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.18, ease: easeSmooth }}
            className="font-sans text-sm sm:text-base text-neutral-400 max-w-lg"
          >
            Have a project in mind? Let's create something extraordinary
          </motion.p>
        </div>

        {/* Two-Column Grid: Comments Section / Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start pt-4">
          
          {/* Left Column: Comments Section */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: easeSmooth }}
            className="flex flex-col h-full"
          >
            <div className="p-6 sm:p-8 rounded-[28px] bg-[#0c0c10] border border-white/[0.08] space-y-6 shadow-xl flex-1 flex flex-col">
              <div className="space-y-1">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Comments
                </h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-400">
                  Leave your thoughts and feedback.
                </p>
              </div>

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="space-y-3 pb-6 border-b border-white/[0.08]">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-neutral-400">Nickname</label>
                  <input
                    type="text"
                    required
                    placeholder="Your nickname"
                    value={commentFormState.name}
                    onChange={(e) => setCommentFormState({ ...commentFormState, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all font-sans text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-neutral-400">Your Comment</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Write your feedback here..."
                    value={commentFormState.comment}
                    onChange={(e) => setCommentFormState({ ...commentFormState, comment: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all font-sans text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingComment || submittedComment}
                  className={`w-full py-2.5 rounded-full font-sans font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                    submittedComment
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white text-black hover:bg-neutral-200'
                  }`}
                >
                  {isSubmittingComment ? (
                    <span>Posting...</span>
                  ) : submittedComment ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Comment Posted!</span>
                    </>
                  ) : (
                    <>
                      <span>Post Comment</span>
                    </>
                  )}
                </button>
              </form>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto space-y-3 max-h-64">
                <AnimatePresence>
                  {comments.length > 0 ? (
                    comments.map((comment, idx) => (
                      <motion.div
                        key={comment.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: idx * 0.05 }}
                        className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-semibold text-xs">
                              {comment.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-sans text-xs font-semibold text-white">
                                {comment.name}
                              </p>
                              <p className="font-mono text-xs text-neutral-500">
                                {comment.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="font-sans text-xs text-neutral-300 leading-relaxed">
                          {comment.comment}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => toggleLike(comment.id)}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all text-xs font-medium ${
                              comment.liked
                                ? 'bg-red-500/20 border border-red-500/30 text-red-400'
                                : 'bg-white/[0.05] border border-white/10 text-neutral-400 hover:text-white'
                            }`}
                          >
                            <ThumbsUp className="w-3 h-3" />
                            <span>{comment.likes}</span>
                          </button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-center font-sans text-xs text-neutral-500 py-4 pt-[6rem]">
                      No comments yet. Be the first!
                    </p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: easeSmooth }}
            className=""
          >
            <div className="p-6 sm:p-8 md:p-10 rounded-[28px] bg-[#0c0c10] border border-white/[0.08] shadow-2xl space-y-6">
              <div className="space-y-1">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Send a Message
                </h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-400">
                  I typically respond within 24 business hours.
                </p>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                {/* Honeypot field (hidden from legitimate users, catches naive bots) */}
                <div
                  aria-hidden="true"
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: 0,
                    width: 0,
                    zIndex: -1,
                    overflow: 'hidden',
                  }}
                >
                  <label htmlFor="hp_contact_field">Leave this field blank</label>
                  <input
                    type="text"
                    id="hp_contact_field"
                    name="_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-neutral-400">Name</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    placeholder="your name"
                    value={contactFormState.name}
                    onChange={(e) => setContactFormState({ ...contactFormState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all font-sans text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-neutral-400">Email</label>
                  <input
                    type="email"
                    required
                    maxLength={100}
                    placeholder="your email"
                    value={contactFormState.email}
                    onChange={(e) => setContactFormState({ ...contactFormState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all font-sans text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-neutral-400">Message</label>
                  <textarea
                    required
                    rows={4}
                    maxLength={2000}
                    placeholder="Tell me about your project or inquiry..."
                    value={contactFormState.message}
                    onChange={(e) => setContactFormState({ ...contactFormState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all font-sans text-sm resize-none"
                  />
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                  {contactError && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs flex items-start gap-2.5 leading-relaxed"
                    >
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                      <span>{contactError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isSubmittingContact || submittedContact}
                  className={`w-full py-3.5 rounded-full font-sans font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                    submittedContact
                      ? 'bg-emerald-500 text-white'
                      : isSubmittingContact
                      ? 'bg-white/60 text-black cursor-not-allowed'
                      : 'bg-white text-black hover:bg-neutral-200 shadow-white/10 active:scale-[0.99]'
                  }`}
                >
                  {isSubmittingContact ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : submittedContact ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Message Sent Successfully!</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
