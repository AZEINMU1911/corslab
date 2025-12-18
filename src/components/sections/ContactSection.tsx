"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import { CheckCircle2, X } from "lucide-react"; // Make sure you have lucide-react or use an SVG

/**
 * ContactSection
 * - Contact form with client-side validation + Google ReCAPTCHA.
 * - Submits via `handleSubmit` (currently simulated) and shows a success modal.
 *
 * Structure:
 * - Config: background image + ReCAPTCHA ref
 * - State: form fields, validation errors, submission state, modal visibility
 * - Logic: `validate`, input handlers, submit handler
 * - UI: background layer, success modal, form card
 *
 * Common edits:
 * - Background image: update `BACKGROUND_IMAGE_URL`
 * - ReCAPTCHA: replace `sitekey` with your real key (and wire a real API route)
 * - Submission: replace the simulated API call in `handleSubmit`
 */

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

// Placeholder background (served from `public/`); replace with a real asset path.
const BACKGROUND_IMAGE_URL = "/assets/1.jpg";

// -----------------------------------------------------------------------------
// Main component
// -----------------------------------------------------------------------------

const ContactSection = () => {
  // --- Form state (field values) ---
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // --- UI + validation state ---
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Success state (modal visibility) ---
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Allows us to reset the ReCAPTCHA widget after a successful submit.
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // --- Validation ---
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const msgLen = formData.message.length;
    if (msgLen < 50) newErrors.message = `Message is too short (${msgLen}/50).`;
    if (msgLen > 500)
      newErrors.message = `Message is too long (${msgLen}/500).`;

    if (!captchaToken) newErrors.captcha = "Please verify you are human.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Input handlers ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // --- ReCAPTCHA handler ---
  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    if (errors.captcha) setErrors((prev) => ({ ...prev, captcha: "" }));
  };

  // --- Submission handler (replace simulated call with real API integration) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validate()) {
      // Simulate API call
      console.log("Form Submitted:", formData, "Token:", captchaToken);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // SUCCESS ACTIONS:
      // 1. Clear the form
      setFormData({ name: "", email: "", message: "" });
      setCaptchaToken(null);
      recaptchaRef.current?.reset();

      // 2. Show the Modal
      setShowSuccessModal(true);
    }

    setIsSubmitting(false);
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background layer */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Success modal (renders above the page with a backdrop) */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop (click closes modal) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center z-10"
            >
              {/* Close Icon (Top Right) */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>

              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={32} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-500 mb-6">
                Thanks for reaching out. We&lsquo;ve received your message and
                will get back to you shortly.
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-gray-900 hover:bg-black text-white font-medium py-3 rounded-lg transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Form card (remains visible underneath the modal overlay) */}
      <motion.div
        layoutId="contact-form-card"
        initial={{ y: 150, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 w-full max-w-lg mx-4"
      >
        <div className="bg-[#FFF5EB] p-8 md:p-12 rounded-2xl shadow-2xl">
          <span className="text-sm font-medium text-gray-500 mb-2 block">
            • Contact us
          </span>
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">
            Ready to Build Your Brand?
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full name"
                  className={`w-full bg-white px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all ${
                    errors.name
                      ? "border-red-500 focus:ring-red-200"
                      : "border-transparent focus:ring-gray-200"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs ml-1">{errors.name}</p>
                )}
              </div>
              <div className="space-y-1">
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email"
                  className={`w-full bg-white px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all ${
                    errors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "border-transparent focus:ring-gray-200"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs ml-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Message + live character counter */}
            <div className="space-y-1">
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Message"
                  className={`w-full bg-white px-4 py-3 rounded-lg border focus:ring-2 outline-none transition-all resize-none ${
                    errors.message
                      ? "border-red-500 focus:ring-red-200"
                      : "border-transparent focus:ring-gray-200"
                  }`}
                />
                <div
                  className={`absolute bottom-3 right-3 text-xs ${
                    formData.message.length < 50 ||
                    formData.message.length > 500
                      ? "text-red-400"
                      : "text-gray-400"
                  }`}
                >
                  {formData.message.length} / 500
                </div>
              </div>
              {errors.message && (
                <p className="text-red-500 text-xs ml-1">{errors.message}</p>
              )}
            </div>

            {/* ReCAPTCHA (must be verified before submission) */}
            <div className="flex flex-col items-center justify-center pt-2">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Remember to change this to your Real Key
                onChange={handleCaptchaChange}
              />
              {errors.captcha && (
                <p className="text-red-500 text-xs mt-1">{errors.captcha}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-medium py-3 rounded-lg transition-all duration-200 mt-4 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-black text-white"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>

            {/* Small-print / consent copy */}
            <p className="text-xs text-gray-400 text-center mt-4">
              By contacting us, you agree to Roxy Coslab&lsquo;s Terms and
              Conditions.
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
