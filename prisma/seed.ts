import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const businessHours = {
  monday: "9:00 AM - 7:00 PM",
  tuesday: "9:00 AM - 7:00 PM",
  wednesday: "9:00 AM - 7:00 PM",
  thursday: "9:00 AM - 7:00 PM",
  friday: "9:00 AM - 7:00 PM",
  saturday: "10:00 AM - 5:00 PM",
  sunday: "Closed",
};

const faqs = [
  {
    question: "What services do you offer and how much do they cost?",
    answer:
      "We offer haircuts starting at $40, full color for $120, classic facials for $65, and gel manicures for $35. We also do waxing and bridal makeup, prices vary by service, just ask and we'll walk you through it.",
  },
  {
    question: "Do you accept walk-ins?",
    answer:
      "Yes, we welcome walk-ins when a stylist is available, but we recommend booking an appointment so we can guarantee your preferred time and stylist.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes, we have free parking right outside the salon, plus additional street parking nearby.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We ask for at least 24 hours notice if you need to cancel or reschedule, so we can offer the spot to another client.",
  },
  {
    question: "What products do you use?",
    answer:
      "All of our color, skincare, and styling products are cruelty-free. We're happy to point you to specific brands if you have preferences or sensitivities.",
  },
  {
    question: "Do you offer bridal packages?",
    answer:
      "Yes, we offer full bridal packages including hair, makeup, and a trial session ahead of the big day. We recommend booking these a few months in advance.",
  },
  {
    question: "Do you sell gift cards?",
    answer:
      "Yes, gift cards are available in any amount, in salon or by phone, and never expire.",
  },
  {
    question: "Is there a discount for first-time visitors?",
    answer:
      "Yes, first-time guests get 10% off their first service with us.",
  },
];

async function main() {
  const existing = await prisma.business.findFirst({
    where: { name: "DEMO Beauty Salon" },
  });

  if (existing) {
    await prisma.faq.deleteMany({ where: { businessId: existing.id } });
    await prisma.business.delete({ where: { id: existing.id } });
  }

  const business = await prisma.business.create({
    data: {
      name: "DEMO Beauty Salon",
      description:
        "DEMO Beauty Salon is a boutique beauty salon offering haircuts, coloring, facials, manicures, waxing, and bridal makeup.",
      greeting:
        "Thank you for calling DEMO Beauty Salon! This is Mia, your virtual receptionist. How can I help you today?",
      businessHours: JSON.stringify(businessHours),
      aiInstructions:
        "Be warm and friendly, and keep answers short and conversational, like a real front-desk receptionist. If the caller wants to book or ask about an appointment, offer to note down their name, the service they want, and their preferred time, and let them know a staff member will confirm by text. Politely decline to answer questions unrelated to the salon, and steer the conversation back to how you can help with their visit.",
      faqs: {
        create: faqs.map((faq, index) => ({ ...faq, order: index })),
      },
    },
  });

  console.log(`Seeded business "${business.name}" with ${faqs.length} FAQs.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
