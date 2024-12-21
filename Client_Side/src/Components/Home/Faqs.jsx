import React from 'react';
import Title from '../Title';

const Faqs = () => {
  const faqs = [
    {
      question: "What mobile brands do you offer?",
      answer: "We offer a wide variety of popular mobile brands, including Apple, Samsung, Xiaomi, and Huawei. You can explore all our available brands in the shop section.",
    },
    {
      question: "Do you offer mobile phone repairs?",
      answer: "Yes, we offer repair services for most mobile brands. Our technicians are trained to handle screen replacements, battery changes, and more.",
    },
    {
      question: "Can I return my mobile phone if I don’t like it?",
      answer: "Yes, we offer a 14-day return policy for most mobile phones, as long as the phone is in unused condition and still in its original packaging.",
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping typically takes between 3-7 business days, depending on your location. We offer express shipping options as well for faster delivery.",
    },
    {
      question: "Do you offer discounts on mobile phones?",
      answer: "Yes, we offer seasonal promotions, student discounts, and special offers. Make sure to sign up for our newsletter to stay updated on the latest deals.",
    },
  ];

  return (
    <div>
      <div className="px-5 bg-white min-h-screen">

        <Title title="faq" subtitle=" Frequently Asked Questions"/>
        <div className="grid divide-y divide-neutral-200 max-w-4xl mx-auto mt-8">
          {faqs.map((faq, index) => (
            <div key={index} className="py-5">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <span>{faq.question}</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  {faq.answer}
                </p>
              </details>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
