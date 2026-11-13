import { CASE_STUDIES_LIVE } from "@/lib/flags";
// Verbatim copy from the live /faq/ page (docs/legacy-pages-plan.md Phase 2).
// Wording must not be edited — only re-typeset into this site's components.

export type FaqGroup = { heading: string; items: { q: string; a: string[] }[] };

export const faqPage = {
  eyebrow: "Solve your Doubts",
  title: "Most Common Questions",
  groups: [
    {
      heading: "Basic Queries",
      items: [
        {
          q: "How are you different than other marketing and website development agencies in the UK?",
          a: [
            "Great Question! Online Marketing Help is different to other agencies in the UK because we are 100% transparent. We don’t just sell you services because we want to make money.",
            "We will give you the best advice based on your business and your requirements. We actively seek the best people in the industry to work with us so that you receive the best available service.",
            "We don’t just shoe horn our team into jobs that aren’t right. If we aren’t the best company for the job we will tell you.",
            "Lastly our reputation is everything to us, we get almost all our clients through recommendations, this sets us a part from many other businesses that use paid advertising to get clients.",
          ],
        },
        {
          q: "What do you need from me to get started?",
          a: [
            "All we simply need is for you to reach out via any of our communication channels (chat, phone, email, whatsapp, facebook, Instagram, Twitter, Linkedin or via an appointment on our website) and we will schedule an initial consultation to find out how we can help you at Online Marketing Help.",
          ],
        },
        {
          q: "How soon will my project start?",
          a: [
            "We can start your project as soon as we have had the initial consultation and set out a strategy for the work you need completed.",
            "We have consultants and support team members working around the clock so depending on your timeline and online marketing requirements we can start almost immediately.",
          ],
        },
        {
          q: "Do you work using the latest technology?",
          a: [
            "Yes we are constantly evolving our business and being centric and utterly passionate about online marketing and all that it can offer we are a little “nerdy” when it comes to new tech.",
            "All technical consultants have the latest software and hardware to be able to complete tasks as quickly and efficiently as possible.",
          ],
        },
        {
          q: "What are the services you work on?",
          a: [
            "We cover the entire spectrum of online marketing and website development and can give you advice on what services your business may need if you aren’t sure on where you can improve your business. Here is a list of all the services we offer to give you an idea.",
            "Website Development",
            "WordPress Development",
            "Ecommerce Development",
            "Shopify Development",
            "Website Maintenance",
            "Digital Marketing",
            "Google Adwords (PPC)",
            "Search Engine Optimizaton",
            "Local SEO",
            "Social Media Management",
          ],
        },
        {
          q: "Will you guide us with new ideas?",
          a: [
            "Absolutely, we love new and creative ways of thinking, if you have a problem we want to help you come up with the solution.",
            "Some of our clients come to us and have a very clear plan and do not want us to deviate, that’s no problem if that’s what you and your business needs.",
            "However if you want creativity, opinion and boldness then we can help you with that as well, we work with clients from a variety of industries and have seen some challenges in our time so we can think creatively and work round these.",
            "You may also have seen an idea that you like that just needs a little tweaking, we can do this as well.",
          ],
        },
        {
          q: "What platform do you build your websites on?",
          a: [
            "We build the majority of our websites on wordpress; fundamentally wordpress offers the scope and depth we need to design and complete stunning websites both theme based and bespoke so it makes sense.",
            "That being said we can and do work with a variety of other website building platforms from fixes to optimisation such as shopify, square, wix, Gator, Big commerce, Weebly and many more.",
          ],
        },
        {
          q: "Can you help me source photos for my website?",
          a: [
            "Yes we provide many of our clients with stock or bespoke imagery or videos. We can also provide photographers or videographers that come to you and create real life genuine content.",
            "On your initial consultation we will talk through the options should this be an area you need help with.",
          ],
        },
        {
          q: "Will you provide a full copy/backup of our site if requested?",
          a: [
            "Yes if you need us to give you a copy or backup of your site we can do this for you. If we are building your website from the ground up we will do this naturally for you.",
            "If you come to us with an existing website then please let us know you would like us to make a copy for you.",
          ],
        },
      ],
    },
    {
      heading: "Cost",
      items: [
        {
          q: "What makes you think that your quote and proposals are better than others?",
          a: [
            "All of our proposals are based on the information we are provided with and that our customer care consultants will gather.",
            "We don’t task our customer care consultants with silly targets and job led commission so we find that our team is much more customer centric than most businesses.",
            "We are constantly working towards building engaged teams of people that want the best for their customer and the accounts that they manage so we are confident that you will get value for money and work that reflects the price you pay.",
          ],
        },
        {
          q: "How much will my website cost?",
          a: [
            "We have a number of different website packages available where you can pay monthly or as a lump sum.",
            "Your website cost will ultimately depend on a number of factors such as number of pages required, platform, functionality and whether you will be providing the content or not.",
            "We will be able to give you a better idea of how much your website will cost once we know what you need the website to do.",
          ],
        },
        {
          q: "What are your hourly rates?",
          a: [
            "Our hourly rates start off at £50 per hour but we have lots of packages available that offer support for a manner of all different Online Marketing tasks.",
            "It may work out more cost effective to do the work required on a monthly basis rather than as a one off payment or hourly rate.",
          ],
        },
        {
          q: "How much does the web hosting cost?",
          a: [
            "Our web hosting packages start at £20 per month but ultimately it depends how big your website is and how much storage it requires.",
          ],
        },
        {
          q: "Can you register a domain name?",
          a: [
            "Yes we can register a domain name for you if you don’t already own one, although it is generally easier if you do this. We can talk you through how to do this properly.",
          ],
        },
      ],
    },
    {
      heading: "Design",
      items: [
        {
          q: "Do you have in-house design team?",
          a: [
            "Yes we do, all of the work we do is done generally by our in-house team. If it is a completely obscure or complicated task we may well contract some of this out to experts that we have long-standing relationships with but the majority of the design tasks we do are in-house.",
          ],
        },
        {
          q: "Can I check the designs made by your team?",
          a: [
            `Yes you can, after you have had an initial consultation with one of our customer care team we will send you upon request any relevant ${CASE_STUDIES_LIVE ? "case studies or " : ""}previous works to you.`,
          ],
        },
        ...(CASE_STUDIES_LIVE ? [
        {
          q: "I just want to have a look at the designs. Can I do that?",
          a: [
            "Yes we have an entire case study page which will give you an idea of the kind of work we have done in the past but we always start with a fresh and open mind for design projects so that you get the look, design and feel that you want for your business not that someone else already has.",
          ],
        },
        ] : []),
        {
          q: "Will my website be custom designed and unique?",
          a: [
            "Yes, if that’s what you would like or need. We offer custom built websites and theme based websites.",
            "Ultimately it depends on your budgets and requirements as to whether we will build your website from the ground up or add onto a pre-existing theme.",
          ],
        },
        {
          q: "Will the website be easy to view on mobile devices?",
          a: [
            "Yes all of the websites we design and build are mobile-friendly and fully optimised for mobile, tablet and desktop use.",
          ],
        },
      ],
    },
    {
      heading: "Development",
      items: [
        {
          q: "Can you brief us about the Website development process?",
          a: [
            "Yes of course, in a nutshell we ultimately need to understand why you want a website and what will be the website’s purpose.",
            "Ultimately a website is there to communicate with your customers, almost like a very in depth introduction to you to help them hopefully make a buying decision.",
            "The website development process will ultimately depend on what platform we build your website on but we would follow these key steps in the first instance;",
            "Initial consultation. Find out about you and your business. Set project objectives. Confirm target audience/markets. Competitor analysis. Key goals and Call to action of website. Current website evaluation if applicable including likes and dislikes. Requirements of the new site. Scope and size of the new website. Features and functionality of the new website. Updating content and who will do this. CRM integration if necessary. Languages if necessary. Future plans and developments. Design brief: Colours, Brand, look and feel. USP’s. Brand Values. Reference websites. Marketing and how that will be handled. Time scales. Budget. Site maintenance. Technical information. Project contacts. Communication channels.",
            "As you can see lots of work goes into getting ready to deliver an on-brand and user friendly website.",
            "We handle all of this for you and most of the questions above will be asked as the project evolves.",
          ],
        },
        {
          q: "How fast can you develop my project?",
          a: [
            "Once we know what you want we can develop very quickly, we have a large team of technical developers that we can move onto urgent projects.",
            "Ultimately it depends on your requirements and your budget. If you would like to know exact timings then please get in touch today and we will discuss your project and give you timescales.",
          ],
        },
        {
          q: "How can I track the development progress?",
          a: [
            "Depending on how long and complex your project is we will update you on a daily, weekly or monthly basis.",
            "We will discuss what your preferences are when we have the initial development project strategy meeting or call and come up with the best way to keep you updated on your project’s progress.",
          ],
        },
        {
          q: "Can I see the development progress on my phone?",
          a: [
            "Depending on how complex your project is we may not be able to show you at the start on the progress on mobile but we can give you updates regularly should you wish.",
          ],
        },
        {
          q: "I don't need an website, I only need a app. Will you create that for me?",
          a: [
            "Yes we can create either an app or website or both for you, we have a team of technical app developers that work separately to our web developers so this can be done for you although, this process varies slightly from our website development process many of the questions remain the same.",
          ],
        },
        {
          q: "Will my website be Search Engine Friendly?",
          a: [
            "Yes your website will be search engine friendly, we build all sites using only white hat methods and in line with Googles ever evolving policies.",
            "When we build any website we make sure we put SEO best practice in at the beginning. We can also help you with making it even more search engine friendly once it is built.",
          ],
        },
      ],
    },
    {
      heading: "Maintenance",
      items: [
        {
          q: "Do you offer any support after project completion?",
          a: [
            "Yes we offer basic support for the first 30 days after the website completion date. We also offer monthly maintenance packages which are great if you don’t have a team or don’t want the hassle of maintaining your website.",
            "We will look at a number of things, things that you may not even be aware of. Just a tip of the iceberg will be things like your website speed, security, set-up data protection, analytics, uptime monitoring and much more.",
            "There are so many things and jobs to do to maintain a “healthy” website that it can be quite time consuming.",
          ],
        },
        {
          q: "Can you take care of my website once it goes live?",
          a: [
            "Once your website goes live we can continue to look after it should you wish, we will provide you with the necessary support to make sure that you can maintain it but should you not want the hassle of doing it yourself we can offer comprehensive packages that will be suitable for you business.",
          ],
        },
        {
          q: "What would be covered in free support period?",
          a: [
            "Within the free support period we will cover the following;",
            "A maximum 48 hour response period to any client requests for support assistance. Assistance with user-reported error messages and system loading problems. Assistance with user-reported problems experienced whilst attempting to play video or audio files or view or download images or documents. General assistance on any queries or problems arising with the Content Management System, Database System or Ecommerce Programme. Assistance with user-reported viewing problems where a digital media system may not display correctly in certain browser types. Correction of any reported broken links. General advice required by the client to assist in the smooth running of their digital media system. Restoration of any online project that has been the victim of vandalism through, for example, hacking.",
            "We want your website to be a success and for your business to grow so the way we build our client websites it is very rare that we face these kinds of issues.",
            "If you do have any problems then just reach out and we will do our best to resolve them for you.",
          ],
        },
      ],
    },
    {
      heading: "Confidentiality",
      items: [
        {
          q: "How will you ensure that our ideas don't get stolen? Do you sign NDA (Non Disclosure Agreement)?",
          a: [
            "Your privacy, data and trust is one of the most important things to us. All of our employees sign Non-Disclosure agreements as part of their employment so rest assured your secrets, ideas and business are safe with us.",
            "We value all of our client relationships so we will make sure that we respectfully manage your ideas so that your business is protected.",
          ],
        },
      ],
    },
    {
      heading: "Our Pricing",
      items: [
        {
          q: "What is your pricing strategy for development projects?",
          a: [
            "We have 2 pricing strategies to help our clients with funding their development projects. You can choose to either pay monthly or pay an initial deposit and then the remaining money 1 month after the work has started.",
            "The reason we offer these 2 pricing policies is because we understand for some businesses cash flow is hard at the best of times but understand that websites are an important part of growing and developing your business,",
            "We also value and understand that some clients just like to pay as they go and once the project is complete focus on other things. We are flexible and we wanted our pricing strategy to reflect that.",
          ],
        },
        {
          q: "What's your payment policy?",
          a: [
            "Our payment policy forms part of our contract and terms and conditions which can be found here; [our terms and conditions](/terms) this will also be sent to you before we commence any work.",
            "3.1. Payment must be made no more than 30 days after date of invoice unless otherwise agreed in writing in advance.",
            "3.2. We understand and will exercise our statutory right to interest under the Late Payment Of Commercial Debts (Interest) Act 1998 amended by European Directive 2000/35/EC if we are not paid according to these terms.",
            "3.3. All work remains copyrighted to the Agency until settlement of relevant fee account.",
            "3.4. All invoices are subject to UK VAT at the current rate, unless a valid exemption certificate is provided.",
            "3.5. All payments must be in UK Pounds Sterling.",
            "3.6. All work completed after project inception will be billed as it is completed at the end of every calendar month as Work in Progress (WIP) until the conclusion of the project.",
            "3.7. If the Agency incurs any costs as a result of the Client’s neglect or default, the Agency may charge those costs to the Client in addition to the contract price.",
            "3.8. The Client shall pay for any preliminary work which is produced at his/her request, whether experimentally or otherwise. A 50% rejection fee is applicable on all designs executed by the Agency should the Client cancel their contract/order.",
            "3.9. When payment is overdue, the Agency may suspend work, service and/or delivery without notice and without prejudice to any other legal remedy until due payment has been made. Furthermore, any work started but incomplete may be suspended and payment therefore becomes immediately due and payable, notwithstanding anything expressed herein, and any monies in respect of.",
            "3.10. The Agency may require payment in advance, or a deposit of at least 50% of the quote/estimate total prior to instigating work on an order, particularly but not limited to the following situations: new clients; clients with a poor payment history; large, lengthy or complex projects. Where a deposit is required, the balance shall be due upon completion of the work, unless otherwise agreed in writing in advance.",
            "3.11. If your payment is returned by the bank as unpaid for any reason, you will be liable for a charge of £50 for each occurrence.",
          ],
        },
        {
          q: "Are additional costs also involved in your pricing?",
          a: [
            "We will build a pricing strategy around the works we confirm with you, we will not add on any additional costs unless agreed with you in writing.",
            "From time to time there may be additional costs if the work deviates or changes from what was initially agreed but you can confirm whether you would like that work to be carried out or not.",
          ],
        },
      ],
    },
    {
      heading: "Contact Info",
      items: [
        {
          q: "How should I contact you?",
          a: [
            "You can contact us via any of our communication channels (chat, phone, email, whatsapp, facebook, Instagram, Twitter, Linkedin or appointment on our website) and we will schedule an initial consultation to find out how we can help you at Online Marketing Help.",
            "If we have already started your project and you need support you can email your account manager directly via your client login, email or phone. If you are wanting to discuss new work as a new client then please call us, email or schedule an consultation on our online calendar.",
          ],
        },
        {
          q: "Am I allowed to contact the appropriate parties that are working on my project? If yes, then may i communicate through phone?",
          a: [
            "Yes, when you start working with us at Online Marketing Help you will be assigned a dedicated account manager that will manage any and all queries both technical and non-technical.",
            "Your account manager will make sure that you get the support and help that you need. If your account manager is off work on holiday or poorly you can still get in touch as all of your notes and information will be accessible on our secure CRM.",
          ],
        },
      ],
    },
  ] satisfies FaqGroup[],
};
