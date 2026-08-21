const WHATSAPP_NUMBER = "919820968449";

const openWhatsApp = (message: string) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;

  window.open(url, "_blank", "noopener,noreferrer");
};

export const assistantActions = [
  {
    id: "finder",
    title: "Find the Right Machine",
    description: "Answer a few questions to narrow down the equipment.",
    action: () => {},
  },
  {
    id: "products",
    title: "Browse Machines",
    description: "Explore the complete Shree Graphics machine range.",
    action: () => {
      window.location.href = "/products";
    },
  },
  {
    id: "parts",
    title: "Spare Parts",
    description: "Explore parts and support for your machinery.",
    action: () => {
      window.location.href = "/spare-parts";
    },
  },
 
  {
    id: "engineer",
    title: "Book Engineer Visit",
    description: "Discuss an installation, service or engineering requirement.",
    action: () => {
      window.location.href = "/contact";
    },
  },
  {
    id: "whatsapp",
    title: "WhatsApp",
    description: "Talk directly with the Shree Graphics sales team.",
    action: () => {
      openWhatsApp(
        "Hello Shree Graphics, I would like to know more about your machinery and solutions."
      );
    },
  },
  {
    id: "call",
    title: "Call US",
    description: "Speak directly with the Shree Graphics team.",
    action: () => {
      window.location.href = "tel:+919820968449";
    },
  },
  {
    id: "about",
    title: "About Shree Graphics",
    description: "Learn about the company and its engineering approach.",
    action: () => {
      window.location.href = "/about";
    },
  },
];
