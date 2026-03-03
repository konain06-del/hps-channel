/* ------------------------------------------------------------------ */
/*  Service data — overview cards + rich detail-page content           */
/* ------------------------------------------------------------------ */

export interface ServiceSection {
  heading: string;
  body?: string;
  bullets?: string[];
  subsections?: {
    heading: string;
    body?: string;
    bullets?: string[];
  }[];
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  /* ── Overview fields (ServiceCard, home page, /services listing) ── */
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  bullets: string[];
  checklist: string[];
  frequency: string;
  bestFor: string;

  /* ── Detail-page fields ── */
  subtitle: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  sections: ServiceSection[];
  faqs: ServiceFAQ[];
  ctaHeading: string;
  ctaBody: string;
  ctaClosing: string;
}

/* ================================================================== */
/*  1. Residential Pool Maintenance                                    */
/* ================================================================== */

const residentialPoolMaintenance: Service = {
  id: "residential-pool-maintenance",
  title: "Residential Pool Maintenance",
  shortDescription:
    "Our Residential Pool Maintenance Service keeps your pool sparkling and worry-free. Each week, we brush, vacuum, and skim to remove debris, check and balance the water chemistry for a safe swim, and inspect all equipment to ensure everything runs smoothly.",
  description:
    "Our Residential Pool Maintenance Service keeps your pool sparkling and worry-free. Each week, we brush, vacuum, and skim to remove debris, check and balance the water chemistry for a safe swim, and inspect all equipment to ensure everything runs smoothly. Trust our dedicated team to handle the hard work — so you can simply relax and enjoy your pool all season long.",
  icon: "Home",
  bullets: [
    "Weekly brushing, vacuuming, and skimming",
    "Water chemistry testing and balancing",
    "Equipment inspection every visit",
  ],
  checklist: [
    "Brush walls, steps, and tile line",
    "Vacuum pool floor thoroughly",
    "Skim surface for debris and leaves",
    "Test and balance water chemistry",
    "Clean pump and skimmer baskets",
    "Inspect all pool equipment",
    "Send visit summary with photos",
  ],
  frequency: "Weekly",
  bestFor:
    "Every homeowner who wants a consistently clean pool without lifting a finger.",
  subtitle: "Reliable Care for a Pristine Pool Experience",
  heroDescription:
    "At Hydra Pool Services, we know your home swimming pool is more than just water. It is your private escape, your backyard centerpiece, and a place for family and friends to come together. But owning a pool should feel like joy, not a chore. Our Residential Pool Maintenance service is designed to give you complete peace of mind, crystal-clear water, and professional pool care every single week.\n\nNo matter what it is that you need taken care of, whether it's pool cleaning, pool repairs, or a customized maintenance plan, our friendly and experienced technicians are here to take the stress out of swimming pool care.",
  metaTitle: "Residential Pool Maintenance | Hydra Pool Services",
  metaDescription:
    "Professional weekly residential pool maintenance in North DFW. Brushing, vacuuming, chemical balancing, and equipment inspections. Get $100 off your first month.",
  sections: [
    {
      heading: "Why Choose Hydra for Residential Pool Maintenance",
      body: "Hydra Pool Services has quickly built its reputation as America's #1 Swimming Pool Service Company for one reason. We make pool ownership simple. Homeowners across North Dallas and Frisco trust us because we show up on time, we explain clearly what we do, and we leave every pool sparkling and safe to use.\n\nWhen you choose Hydra for your weekly service, you don't just get a technician with a brush. You get a trained pool professional who understands water chemistry, filtration systems, and inground pool construction. We balance chemicals, check equipment, and watch out for issues before they turn into costly pool repairs.",
    },
    {
      heading: "The Hydra Residential Pool Maintenance Process",
      subsections: [
        {
          heading: "Weekly Service That Works",
          body: "Our weekly service visits are the heart of what we do. Every week, our technicians brush walls, vacuum floors, skim leaves, and make sure your pool water is balanced. With our maintenance, your water stays healthy, safe, and perfectly clear.",
          bullets: [
            "Pool Cleaning",
            "Water Chemistry",
            "Filter Cleaning",
            "Equipment Inspection",
          ],
        },
        {
          heading: "Residential Service With Peace of Mind",
          body: "Every residential service plan is designed with your home in mind. Pools are different, so our team offers customized maintenance plans that fit your exact setup. Whether you have a small family pool or a larger inground pool with waterfalls and spas, we adjust the care for your property.",
        },
        {
          heading: "Pool Opening and Closing",
          body: "Getting your pool ready for the season is a big job. Hydra makes it simple.",
          bullets: ["Pool Opening", "Pool Closing"],
        },
        {
          heading: "Specialized Services",
          body: "Sometimes your pool needs more than weekly maintenance. Hydra offers extra care when it is required:",
          bullets: [
            "Pool Inspections — Full system checks for safety and efficiency, great when buying a new home",
            "Tile Cleaning — Removing stains, calcium, and buildup to keep your pool looking fresh",
            "Pool Draining — Safe draining and refilling when water chemistry gets too hard to manage",
            "Pool Remodeling — If your pool needs a new look, our pool remodels service upgrades tile, decking, or even full redesign",
          ],
        },
      ],
    },
    {
      heading: "Benefits of Professional Pool Care",
      bullets: [
        "Crystal-Clear Water",
        "Friendly and Experienced Technicians",
        "Peace of Mind",
        "Longer Equipment Life",
        "Protects Property Value",
      ],
    },
    {
      heading: "Customized Maintenance Plans for Every Homeowner",
      body: "We know no two pools are the same. That is why Hydra offers flexible customized maintenance plans. Whether you want full weekly service, bi-weekly visits, or specialized seasonal pool cleaning, we work around your schedule. You will always know when we visit because we provide photos, notes, and time stamps for every service.",
    },
    {
      heading: "Residential Pool Repairs",
      body: "Even with regular care, pools sometimes need repairs. Hydra's pool service company team can fix common issues before they become serious.",
      bullets: [
        "Leaks in plumbing or pool shell",
        "Malfunctioning pumps or filters",
        "Broken heaters or automation systems",
        "Worn-out tile or coping",
      ],
    },
    {
      heading: "The Importance of Weekly Service",
      body: "Skipping regular pool maintenance can cause more harm than you might think. Without proper pool cleaning and chemistry checks, algae can bloom fast, filters can clog, and equipment can fail. Weekly service from Hydra protects your pool from these risks. It also saves you money because small problems are caught early.\n\nOur weekly residential pool maintenance is more than a cleaning, it is an insurance for your swimming pool care.",
    },
    {
      heading: "What Sets Hydra Apart From Other Pool Service Companies",
      bullets: [
        "Chemicals Included — No hidden charges for chlorine, salt, or balancing products",
        "On-Time Every Week — You can trust us to show up, no excuses",
        "Local Reputation — We are proud of our 5-star reviews across Google, Nextdoor, and Yelp",
        "Full Service Options — From pool remodels to weekly cleaning, Hydra handles everything",
        "Professional Pool Care — Certified staff trained in residential pool service",
      ],
    },
  ],
  faqs: [
    {
      question: "What is included in your residential pool maintenance?",
      answer:
        "Every weekly visit includes brushing, vacuuming, skimming, full chemical testing and balancing, filter checks, and equipment inspection. All chemicals are included — you never have to buy or add anything yourself.",
    },
    {
      question: "Do you offer one-time pool cleaning?",
      answer:
        "Yes. We offer one-time pool cleaning services in addition to our weekly maintenance plans. Contact us for a free quote.",
    },
    {
      question: "Do you service saltwater pools?",
      answer:
        "Absolutely. We service both traditional chlorine and saltwater pool systems across North DFW, including Frisco, Plano, Murphy, Allen, McKinney, and The Colony.",
    },
    {
      question: "Can you help if I need pool repairs?",
      answer:
        "Yes. Our technicians handle common repairs including pumps, filters, heaters, plumbing, and automation systems. We fix issues quickly with honest pricing and clear communication.",
    },
    {
      question: "What if my pool needs more than maintenance?",
      answer:
        "We offer a full range of services including pool remodeling, tile cleaning, pool draining, and pool inspections. Contact us for a free assessment and we will recommend the best solution for your pool.",
    },
  ],
  ctaHeading: "Get $100 Off Your First Month",
  ctaBody:
    "Are you new to Hydra? Right now you can get $100 off your first month of residential pool maintenance in the DFW area. Schedule a free visit, get a professional inspection, and enjoy your first month with a discount.",
  ctaClosing:
    "Your home deserves professional pool care. Hydra Pool Services brings reliable weekly service, experienced technicians, and customized maintenance plans that deliver crystal-clear water and total peace of mind. Stop worrying about your pool. Let Hydra handle the hard work so you can enjoy every swim.",
};

/* ================================================================== */
/*  2. Commercial Pool Maintenance                                     */
/* ================================================================== */

const commercialPoolMaintenance: Service = {
  id: "commercial-pool-maintenance",
  title: "Commercial Pool Solutions",
  shortDescription:
    "Commercial pools demand a higher level of care and consistency. Our tailored services include advanced cleaning, chemical management, and ongoing inspections to ensure health and safety standards are met.",
  description:
    "Commercial pools demand a higher level of care and consistency. Our tailored services include advanced cleaning, chemical management, and ongoing inspections to ensure health and safety standards are met. Detailed service logs keep you informed after every visit, so you can focus on your business while we handle the pool.",
  icon: "Building2",
  bullets: [
    "Advanced cleaning and chemical management",
    "Health and safety compliance",
    "Detailed service logs after every visit",
  ],
  checklist: [
    "Deep pool cleaning and skimming",
    "Advanced water chemistry management",
    "Filter cleaning and inspection",
    "Full equipment inspection",
    "Health code compliance checks",
    "Detailed service logs with photos",
  ],
  frequency: "Weekly / Custom",
  bestFor:
    "Hotels, HOAs, gyms, apartment complexes, and schools with high-use pools.",
  subtitle: "Do You Need Comprehensive Services for High-Use Pools?",
  heroDescription:
    "When it comes to commercial pools, one thing is clear. They need more attention and stricter care than backyard pools. Hotels, gyms, HOAs, schools, and apartment complexes around North DFW, TX trust Hydra Pool Services to keep their pools clean, safe, and always ready to use.\n\nWith our commercial pool maintenance and cleaning programs, we deliver professional pool care that protects your business reputation while ensuring every swimmer enjoys crystal clear water.",
  metaTitle: "Commercial Pool Maintenance | Hydra Pool Services",
  metaDescription:
    "Professional commercial pool maintenance for hotels, HOAs, gyms, and apartments in North DFW. Health code compliance, chemical management, and weekly service.",
  sections: [
    {
      heading: "Why Businesses in North DFW Choose Hydra Pool Services",
      body: "Hydra Pool Services is known as America's #1 Swimming Pool Service Company, and locally we stand out in Frisco, Murphy, Allen, Plano, McKinney, and The Colony, TX. Commercial property managers call us because they need a partner that shows up on time, keeps detailed records, and understands health and safety standards for high-use pools.",
      bullets: [
        "Peace of mind because you'll know your pool is always compliant with health codes",
        "Our team is certified and trained to manage commercial pools of all sizes",
        "Each business is different — we adjust service for hotels, HOAs, gyms, and schools",
        "From pool cleaning to filter cleaning, we handle everything",
      ],
    },
    {
      heading: "Our Commercial Pool Maintenance Process",
      subsections: [
        {
          heading: "Weekly Service and Cleaning for Businesses",
          body: "Commercial pools can see hundreds of swimmers each week. That is why our weekly service program includes deeper cleaning and stronger chemical balance than most residential pools require.",
          bullets: [
            "Pool Cleaning",
            "Water Chemistry",
            "Filter Cleaning",
            "Equipment Inspection",
          ],
        },
        {
          heading: "Pool Opening and Closing",
          body: "Getting your pool ready for the season is a big job. Hydra makes it simple.",
          bullets: ["Pool Opening", "Pool Closing"],
        },
        {
          heading:
            "Specialized Commercial Pool Services in Frisco, Plano, and Beyond",
          body: "Besides weekly service, Hydra Pool Services will offer additional care when it is required by commercial pools:",
          bullets: [
            "Pool Inspections — Full system checks for safety and efficiency",
            "Tile Cleaning — Removing stains, calcium, and buildup to keep your pool looking fresh",
            "Pool Draining — Safe draining and refilling when water chemistry gets too hard to manage",
            "Pool Remodeling — If your pool needs a new look, our pool remodels service upgrades tile, decking, or even full redesign",
          ],
        },
      ],
    },
    {
      heading: "Health and Safety Compliance for Commercial Pools",
      body: "Texan commercial pools should be able to comply with tight safety and sanitation standards. Hydra Pool Services will make sure your pool is never out of compliance with state and local health department regulations.\n\nIn North DFW, TX, cities like Frisco and Plano have active inspection schedules for commercial pools. Partnering with Hydra ensures you always pass inspection with confidence.",
      bullets: [
        "Chemical Balance prevents bacteria and algae growth",
        "Equipment checks make sure drains, pumps, and safety covers are working properly",
        "Avoid fines, closures, and complaints with a proactive pool service company",
      ],
    },
    {
      heading: "Commercial Pool Care Perfect for Your Business",
      body: "Every commercial property is different, and that is why Hydra offers customized maintenance plans:",
      bullets: [
        "Hotels and Resorts",
        "Apartment Complexes and HOAs",
        "Gyms and Fitness Centers",
        "Schools and Community Centers",
      ],
    },
    {
      heading:
        "Why Local Businesses in Frisco, Plano, and McKinney Trust Us",
      bullets: [
        "Friendly and Experienced Technicians who care about your property",
        "America's #1 Swimming Pool Service Company recognition",
        "Transparent pricing with chemicals included in most plans",
        "5-star ratings on Google, Yelp, and Nextdoor from North DFW homeowners and businesses",
      ],
    },
  ],
  faqs: [
    {
      question:
        "Do you service commercial pools in Frisco, TX and Plano, TX?",
      answer:
        "Yes. We provide commercial pool maintenance across all of North DFW including Frisco, Plano, Murphy, Allen, McKinney, and The Colony, TX.",
    },
    {
      question: "What is included in commercial pool maintenance?",
      answer:
        "Weekly cleaning, advanced chemical management, filter cleaning, full equipment inspections, health code compliance checks, and detailed service logs for every visit.",
    },
    {
      question: "Do you provide emergency pool repairs?",
      answer:
        "Yes. We offer fast response times for emergency pool equipment repairs across North DFW, TX.",
    },
    {
      question: "Can you help with pool remodels?",
      answer:
        "Absolutely. We offer full pool remodeling services including tile, decking, and complete redesigns for commercial properties.",
    },
    {
      question: "Do you service saltwater commercial pools?",
      answer:
        "Yes. We service both chlorine and saltwater commercial pool systems across North DFW.",
    },
  ],
  ctaHeading: "Get $100 Off Your First Month",
  ctaBody:
    "Right now, new businesses in North DFW, TX can claim $100 off the first month of service. Whether you manage a hotel in Frisco, an apartment complex in McKinney, or a fitness center in Plano, Hydra Pool Services is ready to take the hassle out of your commercial pool care.",
  ctaClosing:
    "Commercial pools are a big responsibility, but with Hydra you do not have to manage them alone. Our professional pool care, weekly service, and customized maintenance plans give you peace of mind and keep your pool running smoothly. Contact us now and claim your $100 credit toward your first month.",
};

/* ================================================================== */
/*  3. Pool Repair Services                                            */
/* ================================================================== */

const poolRepairServices: Service = {
  id: "pool-repair",
  title: "Pool Repair Services",
  shortDescription:
    "When pool equipment breaks down, quick action is essential. Our repair services address everything from minor leaks and pump malfunctions to structural fixes and filter replacements.",
  description:
    "When pool equipment breaks down, quick action is essential. Our repair services address everything from minor leaks and pump malfunctions to structural fixes and filter replacements. With experienced technicians and quality parts, we ensure your pool systems run efficiently and reliably.",
  icon: "Wrench",
  bullets: [
    "Pump, filter, and heater repairs",
    "Plumbing and structural fixes",
    "Experienced technicians with quality parts",
  ],
  checklist: [
    "Detailed equipment inspection",
    "Pump repairs and replacements",
    "Filter cleaning and replacement",
    "Heater diagnostics and repair",
    "Plumbing and structural fixes",
    "Automation system repair",
  ],
  frequency: "As needed",
  bestFor:
    "Pool owners with equipment issues or aging pool systems that need attention.",
  subtitle: "Expert Solutions for Pool Equipment",
  heroDescription:
    "Pools are meant for fun and relaxation, but when something breaks, stress quickly takes over. At Hydra Pool Services, we provide expert pool repair services to get your system running smoothly again. From small leaks and pump issues to full pool remodeling and filter replacements, we have the tools, the parts, and the know-how to bring your pool back to life.\n\nWe proudly serve North DFW, TX, including Frisco, Murphy, Allen, Plano, McKinney, and The Colony, TX, with fast and reliable pool repairs backed by friendly and experienced technicians.",
  metaTitle: "Pool Repair Services | Hydra Pool Services",
  metaDescription:
    "Expert pool repair services in North DFW. Pump repairs, filter replacement, heater fixes, plumbing, and more. Fast, reliable service with quality parts.",
  sections: [
    {
      heading: "Our Pool Repair Process — Full Equipment Inspections Before Repairs",
      body: "The first step to every pool repair is a detailed inspection. Our technicians check pumps, filters, heaters, plumbing, and automation systems. With weekly service customers, these inspections are already part of routine pool maintenance, which means issues are often found before they get worse.",
    },
    {
      heading: "Why Choose Hydra for Pool Repairs in North DFW, TX",
      body: "When your pool equipment stops working, every hour matters. Whether it is a pump not circulating or a heater refusing to start, waiting can lead to bigger problems. Hydra Pool Services is the trusted pool service company in Frisco, TX, and across North DFW because we respond quickly, use quality replacement parts, and give you honest pricing.",
      bullets: [
        "Friendly and Experienced Technicians trained in all brands of pool equipment",
        "Customized Maintenance Plans that include proactive inspections to catch problems early",
        "Professional Pool Care designed for both residential and commercial service needs",
        "A reputation as America's #1 Swimming Pool Service Company, trusted locally in Plano, Allen, Murphy, McKinney, and The Colony",
      ],
    },
    {
      heading: "Common Pool Equipment Repairs in Frisco and Plano",
      bullets: [
        "Pump Repairs and Replacements",
        "Filter Cleaning and Filter Replacement",
        "Heater Repairs",
        "Pool Plumbing Repairs",
        "Tile Cleaning and Structural Repairs",
        "Automation System Repairs",
      ],
    },
    {
      heading:
        "Specialized Pool Repairs for Murphy, Allen, and The Colony, TX",
      body: "Beyond standard fixes, Hydra provides specialized services that keep pools in top shape. These services are tailored for both residential pool maintenance and commercial pool solutions.",
      bullets: [
        "Pool Draining and Refilling when water chemistry is beyond recovery",
        "Pool Remodels and Pool Remodeling to refresh older pools",
        "Pool Installation and Inground Pool Construction support for new builds or major overhauls",
        "Pool Opening and Closing repairs to make seasonal transitions smooth",
      ],
    },
    {
      heading: "Why Quick Pool Repairs Matter",
      body: "Delaying pool repairs does not just make swimming inconvenient, it can also cost you more. A small leak can turn into a cracked pipe. A dirty filter can burn out a pump. An unbalanced pool can damage tile, plaster, and equipment.\n\nThat is why Hydra Pool Services in North DFW, TX stresses quick action, professional pool care, and reliable service. You get more than repairs, you get peace of mind knowing your pool is safe and protected.",
    },
    {
      heading: "Trusted Pool Service Company Across North DFW",
      body: "Businesses and homeowners alike rely on Hydra Pool Services in Frisco, Murphy, Allen, Plano, McKinney, and The Colony, TX for pool repairs, pool cleaning, and weekly service. Our reputation is built on delivering crystal-clear water and honest communication.",
      bullets: [
        "Professional Pool Care that protects your investment",
        "Clear pricing with no surprise chemical charges",
        "Service logs for every visit",
        "5-star reviews across North DFW",
      ],
    },
  ],
  faqs: [
    {
      question:
        "Do you repair pool equipment in Frisco, TX and Plano, TX?",
      answer:
        "Yes. We provide pool repair services across all of North DFW including Frisco, Plano, Murphy, Allen, McKinney, and The Colony, TX.",
    },
    {
      question: "What types of repairs do you handle?",
      answer:
        "We handle pumps, filters, heaters, plumbing, tile, automation systems, and more. For specialized work like leak detection or replastering, we refer to trusted local partners.",
    },
    {
      question: "Do you work on both residential and commercial pools?",
      answer:
        "Yes. Our repair services are available for both residential and commercial pool systems of all sizes.",
    },
    {
      question: "Can you remodel or install new pool systems?",
      answer:
        "Yes. We offer pool remodeling, equipment upgrades, and support for new inground pool construction projects.",
    },
    {
      question: "Do repairs come with maintenance options?",
      answer:
        "Absolutely. Many repair customers choose to add weekly maintenance to prevent future issues and protect their investment. Ask about our customized maintenance plans.",
    },
  ],
  ctaHeading: "Get $100 Off Your First Month",
  ctaBody:
    "New customers in North DFW, TX get $100 off the first month of pool service when they sign up for Hydra. That includes inspection, repair recommendations, and ongoing swimming pool care.",
  ctaClosing:
    "When equipment breaks, your pool does not have to stay down. Hydra Pool Services offers reliable pool repairs, weekly service, and professional pool care across North DFW, TX. Our friendly and experienced technicians bring peace of mind and crystal-clear water back to your pool.",
};

/* ================================================================== */
/*  4. Bead Blasting                                                   */
/* ================================================================== */

const beadBlasting: Service = {
  id: "bead-blasting",
  title: "Bead Blasting",
  shortDescription:
    "Over time, pool tiles and surfaces can become stained by calcium buildup, algae, and debris. Our bead blasting service uses fine, eco-friendly glass beads to gently and effectively clean pool surfaces without causing damage.",
  description:
    "Over time, pool tiles and surfaces can become stained by calcium buildup, algae, and debris. Our bead blasting service uses fine, eco-friendly glass beads to gently and effectively clean pool surfaces without causing damage. The result? A refreshed, sparkling pool that looks brand new.",
  icon: "Sparkles",
  bullets: [
    "Eco-friendly glass bead cleaning",
    "Removes calcium, algae, and stains",
    "Safe for tile and stone surfaces",
  ],
  checklist: [
    "Pre-cleaning inspection of surfaces",
    "Eco-friendly glass bead application",
    "Gentle tile and surface restoration",
    "Filter cleaning and water care",
    "Post-treatment inspection",
  ],
  frequency: "Every 2–3 years",
  bestFor:
    "Pools with calcium buildup, stains, or aging tile that need a deep refresh.",
  subtitle: "Bring Your Pool Surfaces Back to Life",
  heroDescription:
    "Even the cleanest pool needs a deep refresh from time to time. Over the years, pool tiles and surfaces begin to show stains, calcium deposits, algae spots, and debris that regular pool cleaning cannot remove. That is where Hydra Pool Services comes in with our professional bead blasting service.\n\nUsing fine, eco-friendly glass beads, we restore tile, stone, and pool surfaces without scratching or damage. The result is a sparkling, fresh look that makes your pool appear brand new.\n\nIf you are in North DFW, TX, including Frisco, Murphy, Allen, Plano, McKinney, or The Colony, TX, our bead blasting experts are here to bring your pool back to life.",
  metaTitle: "Bead Blasting for Pools | Hydra Pool Services",
  metaDescription:
    "Professional bead blasting service to remove calcium, stains, and algae from pool tiles. Eco-friendly glass beads, safe for all surfaces. Serving North DFW, TX.",
  sections: [
    {
      heading: "Why Choose Hydra for Pool Tile Cleaning and Bead Blasting",
      body: "Hydra Pool Services is trusted across North DFW, TX for one reason. We make your pool look its best while protecting the surfaces you invested in. Unlike harsh scrubbing, bead blasting gently removes calcium buildup and stubborn stains.",
      bullets: [
        "Friendly and Experienced Technicians who know how to safely restore tile and stone",
        "Professional Pool Care that goes beyond just brushing",
        "Customized Maintenance Plans that can include regular tile cleaning to keep surfaces spotless",
      ],
    },
    {
      heading: "The Bead Blasting Process",
      bullets: [
        "Step 1: Pre-Cleaning Inspection",
        "Step 2: Eco-Friendly Glass Beads",
        "Step 3: Gentle Tile Cleaning and Surface Restoration",
        "Step 4: Filter Cleaning and Water Care",
      ],
    },
    {
      heading: "Benefits",
      bullets: [
        "Crystal-Clear Water and Sparkling Surfaces — Your pool will look brand new",
        "Professional Pool Care That Protects — Surfaces are cleaned without scratching or damage",
        "Peace of Mind — Eco-friendly process safe for your pool and the environment",
        "Increases Property Value — A clean pool makes your home or commercial property more attractive",
      ],
    },
    {
      heading: "Bead Blasting as Part of Your Pool Maintenance",
      body: "Hydra recommends bead blasting as part of ongoing pool maintenance. Most pools in North DFW, TX need this service every 2-3 years depending on water hardness. Including bead blasting in your weekly service plan ensures stains do not return quickly.\n\nWe combine bead blasting with:",
      bullets: [
        "Weekly Service Visits for brushing, skimming, and vacuuming",
        "Pool Opening and Closing to keep your pool ready each season",
        "Pool Repairs if equipment issues are found during inspections",
        "Pool Remodels and Pool Remodeling for a complete refresh if your pool is aging",
      ],
    },
    {
      heading: "Commercial Pool Bead Blasting in Plano, TX and North DFW",
      body: "Hydra also offers bead blasting for commercial service clients. Hotels, gyms, HOAs, and apartment complexes often struggle with high-use pools that stain faster. Our team handles large-scale bead blasting projects quickly, minimizing downtime for your guests and residents.\n\nDetailed service logs are provided for every visit, giving property managers complete peace of mind.",
    },
    {
      heading: "Areas We Serve",
      bullets: [
        "Frisco, TX",
        "Murphy, TX",
        "Allen, TX",
        "Plano, TX",
        "McKinney, TX",
        "The Colony, TX",
        "The greater North DFW, TX area",
      ],
    },
  ],
  faqs: [
    {
      question: "What is bead blasting for pools?",
      answer:
        "Bead blasting uses fine, eco-friendly glass beads to remove calcium buildup, stains, and algae from pool tiles and surfaces without causing damage.",
    },
    {
      question: "Is bead blasting safe for my pool tile?",
      answer:
        "Yes. Glass bead blasting is gentle on tile, stone, and pool surfaces. Unlike harsh scrubbing methods, it cleans without scratching or damaging your surfaces.",
    },
    {
      question: "How often should bead blasting be done?",
      answer:
        "Most pools in North DFW need bead blasting every 2-3 years depending on water hardness and calcium buildup levels.",
    },
    {
      question: "Do you include bead blasting in weekly service?",
      answer:
        "Bead blasting is a separate service, but it can be combined with your weekly maintenance plan for ongoing surface care and prevention.",
    },
    {
      question: "Can you do bead blasting for commercial pools?",
      answer:
        "Yes. We handle large-scale bead blasting for hotels, gyms, HOAs, and apartment complexes with minimal downtime for your guests and residents.",
    },
  ],
  ctaHeading: "Get $100 Off Your First Month",
  ctaBody:
    "New to Hydra? Get $100 off your first month of pool service when you schedule with us. Our team will inspect your pool, recommend bead blasting if needed, and provide a clear, honest quote.",
  ctaClosing:
    "Bring your pool back to life with Hydra's bead blasting service. Our friendly and experienced technicians deliver professional pool care that restores surfaces, removes calcium, and leaves your pool sparkling. Serving North DFW, Frisco, Murphy, Allen, Plano, McKinney, and The Colony, TX.",
};

/* ================================================================== */
/*  5. Pool School                                                     */
/* ================================================================== */

const poolSchool: Service = {
  id: "pool-school",
  title: "Pool School",
  shortDescription:
    "Knowing how your pool works can save you a lot of money and effort. Sign up for a 1 hr detailed class on how your pool functions and the various ways to take care of it in different seasons and conditions.",
  description:
    "Knowing how your pool works can save you a lot of money and effort. Sign up for a 1 hr detailed class on how your pool functions and the various ways to take care of it in different seasons and conditions. If you think you can take care of your pool yourself, we are all for it! If not, it's no big deal — you can always ask for a free quote on monthly service and we would be happy to help.",
  icon: "GraduationCap",
  bullets: [
    "1-hour hands-on class",
    "Learn water chemistry and maintenance",
    "Perfect for first-time pool owners",
  ],
  checklist: [
    "Pool equipment walkthrough",
    "Water chemistry basics",
    "Seasonal care guidance",
    "Cleaning routines and best practices",
    "When to call a professional",
  ],
  frequency: "One-time session",
  bestFor:
    "First-time pool owners learning the basics of pool care and maintenance.",
  subtitle: "Are You A First Time Pool Owner? No Problem",
  heroDescription:
    "Buying a pool is exciting. But for many new homeowners in North DFW, TX, the reality sets in quickly. You have pumps, filters, heaters, chemicals, and cleaning routines that all need attention. Without the right knowledge, things can get overwhelming fast.\n\nThat is why Hydra Pool Services created Pool School, a one-hour detailed class designed for first-time pool owners in Frisco, Murphy, Allen, Plano, McKinney, and The Colony, TX. We walk you step by step through how your pool works, how to take care of it in each season, and what to do if something goes wrong.\n\nWhether you want to handle pool cleaning and pool maintenance yourself or eventually sign up for our weekly service, Pool School gives you the knowledge and confidence to make the right choice.",
  metaTitle: "Pool School for New Pool Owners | Hydra Pool Services",
  metaDescription:
    "1-hour hands-on class for first-time pool owners in North DFW. Learn water chemistry, equipment basics, and seasonal care from certified technicians.",
  sections: [
    {
      heading: "Why Pool School Matters for New Pool Owners",
      body: "Pools are not just water. They are a mix of circulation systems, filters, pumps, plumbing, and chemical balances. Missing even a few steps can lead to cloudy water, algae growth, or expensive pool repairs.\n\nHydra Pool Services offers Pool School because we believe education saves homeowners time, money, and stress. In just 60 minutes, our friendly and experienced technicians will teach you:",
      bullets: [
        "How your pool's circulation and filter system works",
        "The basics of water chemistry and safe chemical handling",
        "How to perform regular tile cleaning, skimming, and filter cleaning",
        "When to schedule pool inspections or ask for professional pool care",
        "Seasonal steps for pool opening and closing in North Texas weather",
      ],
    },
    {
      heading: "What You Will Learn in Hydra's Pool School",
      subsections: [
        {
          heading: "Pool Equipment Basics",
          body: "We start with a hands-on explanation of your pool's equipment. You will learn how the pump, filter, and heater all work together. Our technicians show you how to spot issues early before they become big pool repairs.",
        },
        {
          heading: "Water Chemistry Made Simple",
          body: "Balancing water sounds complicated, but we make it easy. You will learn how to test chlorine, pH, and alkalinity, and how these impact crystal-clear water. We also explain how to safely add chemicals without over-spending or risking your pool surfaces.",
        },
        {
          heading: "Seasonal Care for Pools in North DFW, TX",
          body: "Texas weather changes quickly. Our Pool School covers how to manage swimming pool care in summer heat, as well as winter preparation in Frisco, Murphy, Allen, Plano, McKinney, and The Colony, TX. You will know when to drain water, when to protect pipes, and when to call for help.",
        },
        {
          heading: "Maintenance and Cleaning Routines",
          body: "We demonstrate the weekly steps of pool cleaning and pool maintenance. From brushing tile lines to vacuuming and skimming, you will understand how to keep your pool safe for family and friends.",
        },
      ],
    },
    {
      heading: "Pool School vs. Professional Service",
      body: "Some homeowners finish Pool School and feel ready to handle it all. That is great. But others realize they would rather leave the hard work to Hydra's professional pool care. We support you either way.",
      bullets: [
        "Do It Yourself — Use the skills you learned to maintain your own pool with confidence",
        "Hire Hydra — Get a trusted pool service company serving all of North DFW, TX, backed by our reputation as America's #1 Swimming Pool Service Company",
      ],
    },
    {
      heading: "Why Hydra Pool Services Stands Out",
      body: "Hydra Pool Services has earned 5-star ratings across Google, Yelp, and Nextdoor because we put customers first. Homeowners in Frisco, Murphy, Allen, Plano, McKinney, and The Colony choose us because we offer more than just cleaning. We offer education, repairs, and full pool remodeling when needed.",
      bullets: [
        "Friendly and Experienced Technicians who explain everything clearly",
        "Peace of Mind knowing your pool is safe and cared for",
        "Customized Maintenance Plans built for both beginners and experts",
      ],
    },
    {
      heading: "Additional Pool Services You Can Add After Pool School",
      body: "While Pool School is focused on teaching, many customers ask about our other services:",
      bullets: [
        "Weekly Service — Regular visits that include pool cleaning, filter cleaning, and water balancing",
        "Pool Inspections — Great for buying a home in Plano or McKinney, TX",
        "Pool Remodeling and Pool Remodels — Update old surfaces, decking, or tile",
        "Pool Opening and Closing — Seasonal service to protect your investment",
        "Pool Installation — Full inground pool construction projects for homes and communities",
      ],
    },
    {
      heading: "Areas We Serve",
      bullets: [
        "Frisco, TX",
        "Murphy, TX",
        "Allen, TX",
        "Plano, TX",
        "McKinney, TX",
        "The Colony, TX",
        "The greater North DFW, TX area",
      ],
    },
  ],
  faqs: [
    {
      question: "What is Pool School?",
      answer:
        "A one-hour hands-on class where our technicians teach you how your pool works, water chemistry basics, seasonal care, and maintenance routines.",
    },
    {
      question: "Do I need to sign up for service after Pool School?",
      answer:
        "No. Pool School is a standalone offering. You can choose to maintain your pool yourself or sign up for Hydra's weekly service afterward — it is entirely up to you.",
    },
    {
      question: "Can Pool School help me avoid costly repairs?",
      answer:
        "Yes. Understanding how your pool works helps you spot problems early before they become expensive repairs. Prevention is always cheaper than fixing a major breakdown.",
    },
    {
      question: "Do you only offer Pool School in Frisco, TX?",
      answer:
        "No. Pool School is available across North DFW including Frisco, Murphy, Allen, Plano, McKinney, and The Colony, TX.",
    },
    {
      question: "Is Pool School only for residential pools?",
      answer:
        "Pool School is designed primarily for residential pool owners, but the knowledge and principles apply to any pool system.",
    },
  ],
  ctaHeading: "Get $100 Off Your First Month",
  ctaBody:
    "Are you new to Hydra? We offer $100 off your first month of service for homeowners who decide to sign up after Pool School. Even if you choose to handle things on your own, you will leave our class with practical knowledge and confidence.",
  ctaClosing:
    "Being a first-time pool owner in North DFW, TX does not have to feel overwhelming. With Hydra's Pool School, you will learn the skills you need for crystal-clear water, safe swimming, and long-lasting equipment. Whether you stay DIY or switch to Hydra's professional pool care, you will always have peace of mind knowing your pool is in good hands.",
};

/* ================================================================== */
/*  6. Chemical Only Service                                           */
/* ================================================================== */

const chemicalOnlyService: Service = {
  id: "chemical-only-service",
  title: "Chemical Only Service",
  shortDescription:
    "We appreciate customers who know and maintain their own pools, but sometimes it can get confusing. Or maybe the chemical costs are too high. We offer a chemical only service with the highest quality chemicals at a very discounted price.",
  description:
    "We appreciate customers who know and maintain their own pools, but sometimes it can get confusing. Or maybe the chemical costs are too high. Nevertheless, we at Hydra Pool Services can help you. We offer a chemical only service where we can guarantee the highest quality of chemicals at a very discounted price. What's more, our technicians can come in weekly or bi-weekly to do a free chemical test and add the needed chemicals for you!",
  icon: "FlaskConical",
  bullets: [
    "Professional-grade chemicals at discounted prices",
    "Weekly or bi-weekly chemical testing",
    "Free chemical balance adjustments",
  ],
  checklist: [
    "Free water quality testing",
    "Chemical balancing and adjustments",
    "Filter cleaning checks",
    "Detailed service notes",
    "Equipment quick-check",
  ],
  frequency: "Weekly or bi-weekly",
  bestFor:
    "DIY pool owners who want affordable chemical care without the full maintenance cost.",
  subtitle: "Clean Your Own Pool? Is The Chemical Cost Too High?",
  heroDescription:
    "Many homeowners in North DFW, TX enjoy cleaning and caring for their pools on their own. Brushing, skimming, vacuuming, that part is fine. But when it comes to chemicals, things can get confusing and expensive. From chlorine prices to stabilizers and balancing products, the costs add up fast.\n\nThat is why Hydra Pool Services offers our Chemical Only Service. With this plan, you take care of the physical pool cleaning, and we handle the science behind the water. Our friendly and experienced technicians come weekly or bi-weekly to test your pool, adjust levels, and add only the highest quality chemicals at discounted prices.\n\nThe result is crystal-clear water, peace of mind, and professional pool care without the high chemical bills.",
  metaTitle: "Chemical Only Pool Service | Hydra Pool Services",
  metaDescription:
    "Affordable chemical only pool service in North DFW. Professional-grade chemicals at discounted prices with free weekly testing and balancing. Save 20-30% on pool chemicals.",
  sections: [
    {
      heading:
        "Why Choose Hydra for Chemical Only Pool Service in North DFW, TX",
      body: "Hydra Pool Services has built its reputation as America's #1 Swimming Pool Service Company, and our Chemical Only Service is one of the most popular options for DIY pool owners in Frisco, Murphy, Allen, Plano, McKinney, and The Colony, TX.",
      bullets: [
        "Affordable and Transparent",
        "Weekly Service Options",
        "Customized Maintenance Plans",
        "Professional Pool Care",
        "Peace of Mind",
      ],
    },
    {
      heading: "What is Included in Chemical Only Service",
      body: "Our chemical only service focuses on what matters most: water chemistry. Each visit includes:",
      bullets: [
        "Free Pool Inspections for Water Quality",
        "Chemical Balancing",
        "Filter Cleaning Checks",
        "Service Notes",
      ],
    },
    {
      heading:
        "Benefits of Choosing Chemical Only Service in Frisco, TX and Beyond",
      subsections: [
        {
          heading: "Save Money on Chemicals",
          body: "Buying chemicals retail is expensive. Hydra provides professional-grade pool chemicals at discounted prices for customers in Plano, McKinney, and The Colony, TX.",
        },
        {
          heading: "Safe and Balanced Water",
          body: "Improper water balance can damage tile, plaster, and equipment. Our technicians make sure your pool chemistry is perfect every time, protecting your investment.",
        },
        {
          heading: "Flexible Weekly Service",
          body: "Whether you want weekly or bi-weekly care, our friendly and experienced technicians will visit on schedule.",
        },
        {
          heading: "DIY Freedom + Professional Support",
          body: "You still enjoy cleaning your pool yourself, but you have Hydra's professional pool care to back you up.",
        },
      ],
    },
    {
      heading: "How Chemical Only Service Works",
      bullets: [
        "Step 1: Schedule Your Plan — Choose weekly or bi-weekly visits",
        "Step 2: Regular Testing and Chemical Service — We test and balance your water every visit",
        "Step 3: Service Logs and Communication — You receive notes and updates after every visit",
      ],
    },
    {
      heading: "Chemical Only Service vs. Full Pool Maintenance",
      body: "Hydra gives you the choice. If you want us to do everything, our weekly service includes pool cleaning, pool draining, tile cleaning, filter cleaning, pool inspections, and repairs. But if you enjoy the hands-on part, Chemical Only Service is the perfect balance.",
    },
    {
      heading: "Why Hydra Stands Out in Allen, Murphy, and McKinney, TX",
      body: "Hydra Pool Services is more than just another pool service company. We are trusted by homeowners across North DFW, TX because:",
      bullets: [
        "We only use high-quality chemicals",
        "We deliver crystal-clear water every visit",
        "We combine education with service (through Pool School)",
        "We provide options from chemical only service to full swimming pool care",
        "We also handle pool repairs, pool remodeling, and pool installation when needed",
      ],
    },
  ],
  faqs: [
    {
      question:
        "Do I have to be a weekly service customer to get chemical only service?",
      answer:
        "No. Chemical Only Service is available as a stand-alone plan. You do not need to subscribe to full weekly maintenance.",
    },
    {
      question: "How much can I save on pool chemicals?",
      answer:
        "Most customers in Frisco, Plano, and McKinney, TX save 20-30% compared to retail chemical prices.",
    },
    {
      question: "Do you check my equipment during visits?",
      answer:
        "Yes. Our technicians do a quick pool inspection to make sure pumps and filters are working properly during every chemical service visit.",
    },
    {
      question:
        "Can you also help if I decide I no longer want to clean the pool myself?",
      answer:
        "Absolutely. You can upgrade to full weekly service or even request customized maintenance plans at any time.",
    },
    {
      question: "Do you cover saltwater pools in North DFW?",
      answer:
        "Yes. We service both chlorine and saltwater systems across all of North DFW, TX.",
    },
  ],
  ctaHeading: "Get $100 Off Your First Month",
  ctaBody:
    "New to Hydra? Get $100 off your first month of pool service when you sign up in North DFW, TX. We will perform a full water test, balance your pool, and provide honest pricing.",
  ctaClosing:
    "Tired of spending too much money on pool chemicals? Let Hydra handle it. With our Chemical Only Service, you get the right balance every time, discounted products, and friendly and experienced technicians who care about your pool. Serving North DFW, Frisco, Murphy, Allen, Plano, McKinney, and The Colony, TX.",
};

/* ================================================================== */
/*  Export                                                             */
/* ================================================================== */

export const services: Service[] = [
  residentialPoolMaintenance,
  commercialPoolMaintenance,
  poolRepairServices,
  beadBlasting,
  poolSchool,
  chemicalOnlyService,
];
