import type { Business, Faq } from "@prisma/client";
import { formatBusinessHoursForPrompt, parseBusinessHours } from "./business-hours";

export function buildSystemPrompt(
  business: Business,
  faqs: Pick<Faq, "question" | "answer">[]
): string {
  const hours = formatBusinessHoursForPrompt(parseBusinessHours(business.businessHours));
  const faqText = faqs
    .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
    .join("\n\n");

  return `You are the phone receptionist for ${business.name}. ${business.description}

Hours: ${hours}.

Instructions: ${business.aiInstructions}

Answer using these FAQs:
${faqText}

Opening line: "${business.greeting}"`;
}
