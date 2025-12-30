import { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

const EmailModal = ({ isOpen, onClose }) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [state, handleSubmit] = useForm("mkonlvzl");

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!state.succeeded) return;
    setFormState({ name: "", email: "", subject: "", message: "" });
  }, [state.succeeded]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
    >
      <motion.div
        className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0f111a] px-6 py-6 text-white shadow-md sm:px-10 sm:py-9"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 id="email-modal-title" className="text-lg font-semibold tracking-wide text-white sm:text-2xl">
              Send me a note
            </h2>
            <p className="text-sm text-white/70">
              This goes directly to my email
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close email form"
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:text-white"
          >
            <IoClose className="h-4 w-4" />
          </button>
        </div>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs uppercase tracking-wide text-white/60">
              Name
              <input
                name="name"
                type="text"
                value={formState.name}
                onChange={handleChange}
                placeholder="Your name"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4d52ff]/60"
                required
              />
              <ValidationError
                prefix="Name"
                field="name"
                errors={state.errors}
                className="mt-2 text-xs text-rose-300"
              />
            </label>
            <label className="text-xs uppercase tracking-wide text-white/60">
              Email
              <input
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4d52ff]/60"
                required
              />
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
                className="mt-2 text-xs text-rose-300"
              />
            </label>
          </div>
          <label className="text-xs uppercase tracking-wide text-white/60">
            Subject
            <input
              name="subject"
              type="text"
              value={formState.subject}
              onChange={handleChange}
              placeholder="Project idea, collaboration, hello..."
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4d52ff]/60"
            />
            <ValidationError
              prefix="Subject"
              field="subject"
              errors={state.errors}
              className="mt-2 text-xs text-rose-300"
            />
          </label>
          <label className="text-xs uppercase tracking-wide text-white/60">
            Message
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows={5}
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#4d52ff]/60"
              required
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="mt-2 text-xs text-rose-300"
            />
          </label>

          {state.succeeded ? (
            <p className="text-sm text-emerald-300">Message sent!</p>
          ) : null}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={state.submitting}
              className="!rounded-full !border-0 bg-gradient-to-r from-[#4d52ff] to-[#cf3dfd] !px-6 !py-2 text-sm font-semibold text-white transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4d52ff]/60 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state.submitting ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EmailModal;
