import React, { useState } from "react";

const faqs = [
  {
    question: "How does the AI Resume Builder work?",
    answer: "Our AI-powered resume builder helps you generate professional resumes with smart suggestions and formatting.",
  },
  {
    question: "Is the Free Plan really free?",
    answer: "Yes! The Free Plan allows you to create and download resumes with basic templates at no cost.",
  },
  {
    question: "Can I customize my resume?",
    answer: "Absolutely! The Pro and Premium plans offer customization options, including template designs and AI-based formatting.",
  },
  {
    question: "What formats can I download my resume in?",
    answer: "You can download your resume in PDF format, and with the Pro Plan, you can also get DOCX formats.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="bg-black text-white py-16 px-6 text-center">
      <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
      <p className="text-gray-400 mb-12">Find answers to common queries below.</p>

      <div className="max-w-3xl mx-auto text-left">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 p-4 bg-gray-900 rounded-lg hover:shadow-md transition-all cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <h3 className="text-xl font-semibold flex justify-between">
              {faq.question}
              <span>{openIndex === index ? "▲" : "▼"}</span>
            </h3>
            {openIndex === index && <p className="mt-2 text-gray-400">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
