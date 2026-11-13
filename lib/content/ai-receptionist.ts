// /ai-voice-agents/receptionist: title, description and JSON-LD from the client's AI receptionist page (21 Oct 2026).
// The page body is lib/content/voice-receptionist/ on the /ai-voice-agents layout (app/ai-voice-agents/receptionist/page.tsx).
export const receptionistMeta = {
  "title": "AI Receptionist UK | 24/7 Call Answering Service | OMH",
  "description": "Our UK AI receptionist answers every call on the first ring, books appointments and takes proper messages, day or night. Set up and managed by a UK team."
};

export const receptionistGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://onlinemarketinghelp.co.uk/ai-voice-agents/receptionist#webpage",
      "url": "https://onlinemarketinghelp.co.uk/ai-voice-agents/receptionist",
      "name": "AI Receptionist UK | 24/7 Call Answering Service | OMH",
      "description": "Our UK AI receptionist answers every call on the first ring, books appointments and takes proper messages, day or night. Set up and managed by a UK team.",
      "inLanguage": "en-GB",
      "isPartOf": {
        "@type": "WebSite",
        "url": "https://onlinemarketinghelp.co.uk/",
        "name": "Online Marketing Help"
      },
      "breadcrumb": {
        "@id": "https://onlinemarketinghelp.co.uk/ai-voice-agents/receptionist#breadcrumb"
      },
      "about": {
        "@id": "https://onlinemarketinghelp.co.uk/ai-voice-agents/receptionist#service"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://onlinemarketinghelp.co.uk/ai-voice-agents/receptionist#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://onlinemarketinghelp.co.uk/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "AI Voice Agents",
          "item": "https://onlinemarketinghelp.co.uk/ai-voice-agents"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "AI Receptionist",
          "item": "https://onlinemarketinghelp.co.uk/ai-voice-agents/receptionist"
        }
      ]
    },
    {
      "@type": "Service",
      "@id": "https://onlinemarketinghelp.co.uk/ai-voice-agents/receptionist#service",
      "name": "AI Receptionist",
      "alternateName": [
        "AI phone receptionist",
        "AI virtual receptionist"
      ],
      "serviceType": "AI receptionist and 24/7 call answering service",
      "description": "Our UK AI receptionist answers every call on the first ring, books appointments and takes proper messages, day or night. Set up and managed by a UK team.",
      "url": "https://onlinemarketinghelp.co.uk/ai-voice-agents/receptionist",
      "provider": {
        "@id": "https://onlinemarketinghelp.co.uk/#organisation"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "audience": {
        "@type": "BusinessAudience",
        "name": "UK small and medium-sized businesses"
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "Starter",
          "price": "249",
          "priceCurrency": "GBP",
          "description": "300 minutes a month included. One-off setup fee £795. Prices exclude VAT.",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "249",
            "priceCurrency": "GBP",
            "unitText": "MONTH",
            "valueAddedTaxIncluded": false
          }
        },
        {
          "@type": "Offer",
          "name": "Growth",
          "price": "449",
          "priceCurrency": "GBP",
          "description": "500 minutes a month included. One-off setup fee £1,295. Prices exclude VAT.",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "449",
            "priceCurrency": "GBP",
            "unitText": "MONTH",
            "valueAddedTaxIncluded": false
          }
        },
        {
          "@type": "Offer",
          "name": "Scale",
          "price": "849",
          "priceCurrency": "GBP",
          "description": "900 minutes a month included. One-off setup fee £1,995. Prices exclude VAT.",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "849",
            "priceCurrency": "GBP",
            "unitText": "MONTH",
            "valueAddedTaxIncluded": false
          }
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://onlinemarketinghelp.co.uk/ai-voice-agents/receptionist#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does an AI receptionist do?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An AI receptionist answers your business calls in a natural British voice. It greets callers, answers questions from information you have approved, such as services, prices and opening hours, books appointments into your calendar and takes a proper message when it can't help. You get a summary of every call, so nothing is lost."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between an AI receptionist and an AI voice agent?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An AI receptionist is the front-desk job: answering inbound calls, booking appointments and taking messages. An AI voice agent can also call new web leads back, follow up quotes and route calls between departments. Our Starter plan works as an AI receptionist, and the Growth and Scale plans add the wider voice agent features."
          }
        },
        {
          "@type": "Question",
          "name": "How much does an AI receptionist cost in the UK?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Self-serve AI receptionist apps in the UK usually cost between £19 and £99 a month, and you build and maintain them yourself. Our managed AI receptionist starts at £249 a month plus VAT with 300 minutes included, and a one-off setup fee of £795. Extra minutes cost 60p each. A full-time human receptionist typically costs over £2,000 a month once salary, National Insurance and pension are counted."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a free AI receptionist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Some apps offer free trials or limited free plans, but a free tool won't know your business, connect to your diary or be tested on your real calls. If you want to hear what a properly built one sounds like, ring our demo agent or book a 30-minute demo."
          }
        },
        {
          "@type": "Question",
          "name": "How do I set up an AI receptionist?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "With OMH you don't set it up yourself. We connect your phone line and calendar, train the receptionist on your services, prices and booking rules, test it with you, then go live. On the Starter plan that takes as little as 3 working days."
          }
        },
        {
          "@type": "Question",
          "name": "Will callers know they are talking to an AI?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Every receptionist we build says it is an AI assistant at the start of the call. Callers deserve to know, and it avoids awkward moments later in the conversation."
          }
        },
        {
          "@type": "Question",
          "name": "Can I keep my existing business number?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In most cases, yes. You divert calls to the AI receptionist, either all of them or only the ones your team can't answer. If you want a new local number, such as a 0161 number for Manchester, we can arrange one during setup."
          }
        },
        {
          "@type": "Question",
          "name": "Is an AI receptionist GDPR compliant?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It can be, when it is set up properly. Callers are told at the start if calls are recorded. You remain the data controller and OMH acts as your processor under a written agreement, and we agree retention periods with you before go-live."
          }
        },
        {
          "@type": "Question",
          "name": "What happens if it can't answer a question?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It only answers from your approved information. If a caller asks something outside that, it takes a proper message with their name, number and reason for calling. On the Growth and Scale plans it can also transfer the call live to a person, passing on everything the caller has already said."
          }
        },
        {
          "@type": "Question",
          "name": "Does it answer out of hours and more than one call at once?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. It answers 24 hours a day, including evenings, weekends and bank holidays, and it can handle several calls at the same time, so callers never hear an engaged tone."
          }
        }
      ]
    }
  ]
};
