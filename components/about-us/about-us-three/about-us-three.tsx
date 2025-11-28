import React from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  return (
    // Card Container
    <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm mb-6 w-full max-w-4xl mx-auto transition-transform hover:scale-[1.01] duration-300">
      <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
        {question}
      </h3>
      <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
        {answer}
      </p>
    </div>
  );
};

export default function AboutSectionThree() {
  const faqs = [
    {
      question: "What is Equilibrate.AI?",
      answer: "Equilibra.AI is a pioneering company dedicated to making advanced technology accessible to everyone by removing barriers with artificial intelligence."
    },
    {
      question: "How does AI help?",
      answer: "Our AI-driven approach simplifies complex technologies, making them user-friendly and efficient for a wide range of applications."
    },
    {
      question: "What industries do you serve?",
      answer: "We cater to a diverse array of industries, providing tailored AI solutions to meet unique business needs and drive growth."
    },
    {
      question: "Is your technology secure?",
      answer: "Absolutely. We prioritize enterprise-grade data protection, ensuring your information is always safe with us."
    },
    {
      question: "How can I get started?",
      answer: "Visit our products page or contact our sales team to learn how Equilibrate.AI can transform your business operations."
    }
  ];

  return (
    // Main Background Section
    // Color extracted from image: #FFFAF7 (Very light beige/peach tint)
    <div className="min-h-screen w-full bg-[#FFFAF7] flex flex-col items-center justify-center p-4 md:p-8 lg:p-16 relative overflow-hidden">
      
       <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-10 left-0 w-full h-1 bg-gray-400"></div>
          <div className="absolute bottom-10 left-0 w-full h-1 bg-gray-400"></div>
          <div className="absolute top-0 left-10 h-full w-1 bg-gray-400"></div>
          <div className="absolute top-0 right-10 h-full w-1 bg-gray-400"></div>
        </div>
      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl font-bold text-black mb-16 text-center tracking-tight">
        Frequently Asked Questions(FAQ&apos;S)
      </h1>

      {/* FAQ List Container */}
      <div className="w-full flex flex-col items-center space-y-2">
        {faqs.map((faq, index) => (
          <FAQItem 
            key={index} 
            question={faq.question} 
            answer={faq.answer} 
          />
        ))}
      </div>

    </div>
  );
}
