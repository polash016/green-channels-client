"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Vortex } from "@/components/ui/vortex";
import { FileUpload } from "@/components/ui/file-upload";
import { useState, useTransition } from "react";
import { createContact } from "@/lib/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ContactNowSection() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    contactNo: "",
    body: "",
    files: [],
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (newFiles) => {
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Add the contact object data as JSON string
    const contactData = {
      contact: {
        email: formData.email || "info@greenchannels.com",
        contactNo: formData.contactNo,
        subject: formData.subject,
        body: formData.body,
      },
    };

    formDataToSend.append("data", JSON.stringify(contactData));

    if (formData.files.length > 0) {
      formDataToSend.append(`file`, formData.files[0]);
    }

    startTransition(async () => {
      try {
        const result = await createContact(formDataToSend);

        if (result.success) {
          toast.success("Message sent successfully!", {
            description: "We'll get back to you within 24 hours.",
          });
          setFormData({
            email: "",
            subject: "",
            contactNo: "",
            body: "",
            files: [],
          });
          router.refresh();
        } else {
          toast.error("Failed to send message", {
            description: result.error || "Please try again later.",
          });
        }
      } catch (error) {
        toast.error("An error occurred", {
          description: "Please try again later.",
        });
      }
    });
  };

  return (
    <section id="contact" className="relative w-full min-h-screen">
      <Vortex
        backgroundColor="black"
        baseHue={210}
        rangeY={120}
        particleCount={600}
        className="w-full"
        containerClassName="w-full rounded-none flex justify-center p-4"
      >
        <div className="flex justify-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl w-full bg-neutral-900/70 rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-4 backdrop-blur-md border border-white/10"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-2xl md:text-3xl font-bold text-white text-center mb-2"
            >
              Contact Now
            </motion.h2>
            <p className="text-base text-gray-200 text-center mb-3">
              Ready to elevate your garment business? Reach out to us for
              premium materials, partnership, or any queries. Our team will get
              back to you within 24 hours.
            </p>
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4"
            >
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white text-sm">
                  Email (optional)
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="bg-neutral-900/70 text-white placeholder:text-neutral-400 py-2"
                />
              </div>

              {/* Subject Field */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-white text-sm">
                  Subject
                </Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Enter subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-neutral-900/70 text-white placeholder:text-neutral-400 py-2"
                />
              </div>

              {/* Contact Number Field */}
              <div className="space-y-2">
                <Label htmlFor="contactNo" className="text-white text-sm">
                  Contact Number (optional)
                </Label>
                <Input
                  id="contactNo"
                  type="tel"
                  placeholder="+880 1234-567890"
                  value={formData.contactNo}
                  onChange={handleInputChange}
                  className="bg-neutral-900/70 text-white placeholder:text-neutral-400 py-2"
                />
              </div>

              {/* Body/Message Field */}
              <div className="space-y-2">
                <Label htmlFor="body" className="text-white text-sm">
                  Message
                </Label>
                <div className="rounded-lg p-[2px] transition duration-300 bg-gradient-to-br from-blue-500/30 to-transparent">
                  <textarea
                    id="body"
                    placeholder="How can we help you?"
                    rows={3}
                    value={formData.body}
                    onChange={handleInputChange}
                    className="w-full rounded-md border-none bg-neutral-900/70 px-3 py-2 text-sm text-white placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-600 focus-visible:outline-none"
                    required
                  ></textarea>
                </div>
              </div>

              {/* File Upload Section - Full Width */}
              <div className="space-y-2">
                <Label className="text-white text-sm">
                  Attach Files (optional)
                </Label>
                <div className="bg-neutral-900/70 rounded-lg p-2 border border-white/10">
                  <FileUpload onChange={handleFileChange} />
                </div>
                {formData.files.length > 0 && (
                  <div className="text-xs text-gray-300">
                    {formData.files.length} file(s) selected
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isPending}
                className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                  isPending
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-green-500/25"
                }`}
              >
                {isPending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </Vortex>
    </section>
  );
}
