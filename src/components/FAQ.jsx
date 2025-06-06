import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How does the AI Resume Builder work?",
    answer:
      "Our AI-powered resume builder helps you generate professional resumes with smart suggestions and formatting.",
  },
  {
    question: "Is the Free Plan really free?",
    answer:
      "Yes! The Free Plan allows you to create and download resumes with basic templates at no cost.",
  },
  {
    question: "Can I customize my resume?",
    answer:
      "Absolutely! The Pro and Premium plans offer customization options, including template designs and AI-based formatting.",
  },
  {
    question: "What formats can I download my resume in?",
    answer:
      "You can download your resume in PDF format, and with the Pro Plan, you can also get DOCX formats.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="FAQ" className="bg-white text-gray-900 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold"
        >
          Frequently Asked Questions
        </motion.h2>
        <p className="text-gray-600 mt-3">
          Find answers to common queries below.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="mb-4 bg-gray-50 rounded-lg overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left p-5 flex justify-between items-center hover:bg-blue-50 transition-all"
              >
                <span className="text-lg font-medium">{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="text-blue-500" />
                ) : (
                  <ChevronDown className="text-blue-500" />
                )}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 text-gray-700"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default FAQ;
