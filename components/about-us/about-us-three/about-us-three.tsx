import React from 'react';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

export default function AboutSectionThree() {
	const questions = [
		{
			id: 'item-1',
			title: 'What is Equilibrate.AI?',
			content:
				'Equilibrate.AI is  dedicated to making advanced technology accessible to everyone by removing barriers with artificial intelligence. We bridge the gap between complex technology and everyday users.',
		},
		{
			id: 'item-2',
			title: 'How does AI help?',
			content:
				'Our AI-driven approach simplifies complex technologies, making them user-friendly and efficient for a wide range of applications.',
		},
		{
			id: 'item-3',
			title: 'Can I get customized AI solutions for my business?',
			content:
				'Yes. We offer custom AI frameworks that can be Tailored for your Buisness and workflows. Our team works with you to ensure the AI integrates seamlessly.',
		},
		{
			id: 'item-4',
			title: 'What industries do you serve?',
			content:
				'We cater to a diverse array of industries including healthcare, finance, retail, manufacturing, and education. We provide tailored AI solutions to meet unique business needs and drive growth across all sectors.',
		},
		{
			id: 'item-5',
			title: 'Is your technology secure?',
			content:
				'Absolutely. We prioritize enterprise-grade data protection, ensuring your information is always safe with us. We comply with security standards to maintain the highest levels of protection.',
		},
		{
			id: 'item-6',
			title: 'How can I get started?',
			content:
				'Visit our products page or contact our sales team to schedule a demo and learn how Equilibrate.AI can transform your business operations. We offer flexible onboarding to get you up and running quickly.',
		},
		{
			id: 'item-7',
			title: 'What makes Equilibrate.AI different?',
			content:
				'Our focus is on accessibility and democratization of AI technology. We believe powerful AI tools shouldn\'t be reserved for large enterprises. Our solutions are designed to be affordable, scalable, and easy to implement for businesses of all sizes.',
		},
		{
			id: 'item-8',
			title: 'Can Equilibrate.AI scale with my business?',
			content:
				'Absolutely. Our platform is built for scalability, whether you\'re a startup or an enterprise. As your business grows, our solutions grow with you without compromising performance or security.',
		},
	];

	return (
		<div className="min-h-screen w-full bg-[#FFFAF7] flex flex-col items-center justify-center p-4 md:p-8 lg:p-16 relative overflow-hidden">
			{/* Responsive Decorative Lines */}
			<div className="absolute inset-0 pointer-events-none opacity-10 z-0">
				<div className="absolute top-4 sm:top-10 left-0 w-full h-px sm:h-1 bg-gray-400"></div>
				<div className="absolute bottom-4 sm:bottom-10 left-0 w-full h-px sm:h-1 bg-gray-400"></div>
				<div className="absolute top-0 left-4 sm:left-10 h-full w-px sm:w-1 bg-gray-400"></div>
				<div className="absolute top-0 right-4 sm:right-10 h-full w-px sm:w-1 bg-gray-400"></div>
			</div>

			{/* Main Content */}
			<div className="w-full max-w-4xl space-y-8 relative z-10">
				{/* Header Section */}
				<div className="space-y-3 text-center mb-12">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight">
						Frequently Asked Questions
					</h1>
					<p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
						Have questions about Equilibrate.AI? We&apos;ve compiled answers to help you understand how our AI solutions can transform your business.
					</p>
				</div>

				{/* Accordion Section */}
				<Accordion
					type="single"
					collapsible
					className="w-full space-y-3"
					defaultValue="item-1"
				>
					{questions.map((item) => (
						<AccordionItem
							value={item.id}
							key={item.id}
							className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md"
						>
							<AccordionTrigger className="px-6 md:px-8 py-5 hover:no-underline hover:bg-gray-50 text-left font-semibold text-gray-900 text-base md:text-lg">
								{item.title}
							</AccordionTrigger>
							<AccordionContent className="px-6 md:px-8 pb-5 pt-2 text-gray-700 text-sm md:text-base leading-relaxed font-medium">
								{item.content}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>

				{/* Footer CTA */}
				<div className="mt-12 p-8 bg-white rounded-xl border border-gray-200 text-center">
					<p className="text-gray-700 text-base md:text-lg mb-4">
						Can&apos;t find what you&apos;re looking for?
					</p>
					<a 
						href="/contact-us" 
						className="inline-block px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
					>
						Contact Our Sales Team
					</a>
				</div>
			</div>
		</div>
	);
}