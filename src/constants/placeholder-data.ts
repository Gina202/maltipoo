// Placeholder content for Phase 5 (Public Website).
// Once the admin dashboard (Phase 8-9) is live, these will be replaced by
// real Supabase queries against the puppies / parents / testimonials / faqs tables.
// `placeholderColor` stands in for a real photo (main_image_url) until
// actual puppy/parent images are uploaded.

export type PlaceholderPuppy = {
  slug: string;
  name: string;
  ageWeeks: number;
  gender: "male" | "female";
  price: number;
  status: "available" | "reserved" | "sold";
  placeholderColor: string;
  galleryColors: string[];
  personality: string;
  healthInfo: string;
  vaccinationStatus: string;
  readyDate: string;
  expectedAdultWeightLbs: number;
  motherSlug: string;
  fatherSlug: string;
};

export const ALL_PUPPIES: PlaceholderPuppy[] = [
  {
    slug: "bella",
    name: "Bella",
    ageWeeks: 9,
    gender: "female",
    price: 2800,
    status: "available",
    placeholderColor: "var(--color-blush)",
    galleryColors: ["var(--color-blush)", "var(--color-sage)", "var(--color-rose)"],
    personality:
      "Bella is affectionate and curious, always the first to greet you at the gate. She loves belly rubs and following people from room to room.",
    healthInfo:
      "Vet-checked with a clean bill of health. Dewormed on schedule and free of any known genetic concerns from her parents' screening.",
    vaccinationStatus: "First round of puppy vaccinations complete",
    readyDate: "August 15, 2026",
    expectedAdultWeightLbs: 8,
    motherSlug: "daisy",
    fatherSlug: "teddy",
  },
  {
    slug: "milo",
    name: "Milo",
    ageWeeks: 8,
    gender: "male",
    price: 2600,
    status: "available",
    placeholderColor: "var(--color-sage)",
    galleryColors: ["var(--color-sage)", "var(--color-blush)", "var(--color-rose)"],
    personality:
      "Milo is playful and a little mischievous, always the first to start a game with his littermates. Settles down quickly for naps and cuddles.",
    healthInfo:
      "Vet-checked with a clean bill of health. Dewormed on schedule and free of any known genetic concerns from his parents' screening.",
    vaccinationStatus: "First round of puppy vaccinations complete",
    readyDate: "August 8, 2026",
    expectedAdultWeightLbs: 9,
    motherSlug: "daisy",
    fatherSlug: "teddy",
  },
  {
    slug: "rosie",
    name: "Rosie",
    ageWeeks: 10,
    gender: "female",
    price: 2900,
    status: "reserved",
    placeholderColor: "var(--color-rose)",
    galleryColors: ["var(--color-rose)", "var(--color-blush)", "var(--color-sage)"],
    personality:
      "Rosie is gentle and observant, happiest curled up near people rather than in the middle of chaos. Very responsive to her name already.",
    healthInfo:
      "Vet-checked with a clean bill of health. Dewormed on schedule and free of any known genetic concerns from her parents' screening.",
    vaccinationStatus: "First and second rounds of puppy vaccinations complete",
    readyDate: "August 1, 2026",
    expectedAdultWeightLbs: 7,
    motherSlug: "daisy",
    fatherSlug: "teddy",
  },
  {
    slug: "charlie",
    name: "Charlie",
    ageWeeks: 8,
    gender: "male",
    price: 2600,
    status: "available",
    placeholderColor: "var(--color-blush)",
    galleryColors: ["var(--color-blush)", "var(--color-rose)", "var(--color-sage)"],
    personality:
      "Charlie is confident and food-motivated, which makes him quick to pick up on early training cues. Loves squeaky toys.",
    healthInfo:
      "Vet-checked with a clean bill of health. Dewormed on schedule and free of any known genetic concerns from his parents' screening.",
    vaccinationStatus: "First round of puppy vaccinations complete",
    readyDate: "August 10, 2026",
    expectedAdultWeightLbs: 10,
    motherSlug: "daisy",
    fatherSlug: "teddy",
  },
  {
    slug: "luna",
    name: "Luna",
    ageWeeks: 11,
    gender: "female",
    price: 2900,
    status: "available",
    placeholderColor: "var(--color-sage)",
    galleryColors: ["var(--color-sage)", "var(--color-rose)", "var(--color-blush)"],
    personality:
      "Luna is calm and independent, content to explore on her own but always checks back in. A quiet, easy presence in the room.",
    healthInfo:
      "Vet-checked with a clean bill of health. Dewormed on schedule and free of any known genetic concerns from her parents' screening.",
    vaccinationStatus: "First and second rounds of puppy vaccinations complete",
    readyDate: "July 28, 2026",
    expectedAdultWeightLbs: 8,
    motherSlug: "daisy",
    fatherSlug: "teddy",
  },
  {
    slug: "max",
    name: "Max",
    ageWeeks: 9,
    gender: "male",
    price: 2700,
    status: "sold",
    placeholderColor: "var(--color-rose)",
    galleryColors: ["var(--color-rose)", "var(--color-sage)", "var(--color-blush)"],
    personality:
      "Max is energetic and social, always up for play but settles well for bedtime. Great with other dogs already.",
    healthInfo:
      "Vet-checked with a clean bill of health. Dewormed on schedule and free of any known genetic concerns from his parents' screening.",
    vaccinationStatus: "First round of puppy vaccinations complete",
    readyDate: "August 5, 2026",
    expectedAdultWeightLbs: 9,
    motherSlug: "daisy",
    fatherSlug: "teddy",
  },
];

export type PlaceholderParent = {
  slug: string;
  name: string;
  role: "Mother" | "Father";
  temperament: string;
  weightLbs: number;
  placeholderColor: string;
};

export const PARENTS: PlaceholderParent[] = [
  {
    slug: "daisy",
    name: "Daisy",
    role: "Mother",
    temperament: "Gentle, affectionate, and great with children",
    weightLbs: 9,
    placeholderColor: "var(--color-blush)",
  },
  {
    slug: "teddy",
    name: "Teddy",
    role: "Father",
    temperament: "Playful, confident, and easygoing",
    weightLbs: 11,
    placeholderColor: "var(--color-sage)",
  },
];

export type PlaceholderTestimonial = {
  id: string;
  customerName: string;
  review: string;
  rating: number;
};

export const TESTIMONIALS: PlaceholderTestimonial[] = [
  {
    id: "1",
    customerName: "Sarah M.",
    review:
      "The whole process felt personal from the first message. Our puppy was healthy, confident, and clearly well cared for from day one.",
    rating: 5,
  },
  {
    id: "2",
    customerName: "James & Erin T.",
    review:
      "You could tell these puppies grow up in a real home. Ours settled in within days and already knew basic commands.",
    rating: 5,
  },
  {
    id: "3",
    customerName: "Priya K.",
    review:
      "Thoughtful updates, honest answers to every question, and a puppy who's been the sweetest addition to our family.",
    rating: 5,
  },
  {
    id: "4",
    customerName: "David L.",
    review:
      "From our first phone call to pickup day, everything felt transparent. You can tell these dogs are loved before they even leave.",
    rating: 5,
  },
  {
    id: "5",
    customerName: "The Nguyen Family",
    review:
      "Our kids fell in love instantly. Great temperament, already partially potty trained, and so easy to bond with.",
    rating: 5,
  },
  {
    id: "6",
    customerName: "Monica R.",
    review:
      "I appreciated how much they cared about finding the right home, not just making a sale. It showed in every interaction.",
    rating: 4,
  },
];

export const WHY_CHOOSE_US = [
  {
    icon: "Home",
    title: "Raised in our home",
    description:
      "Every puppy grows up underfoot with our family, not in a kennel, so they're social and comfortable from day one.",
  },
  {
    icon: "HeartPulse",
    title: "Health guaranteed",
    description:
      "Vet-checked, up to date on vaccinations, and backed by a written health guarantee.",
  },
  {
    icon: "Users",
    title: "Early socialization",
    description:
      "Gentle exposure to children, sounds, and handling from the very first weeks.",
  },
  {
    icon: "MessageCircle",
    title: "Support after you bring them home",
    description:
      "We're always a message away for questions about feeding, training, or settling in.",
  },
];

export const ADOPTION_STEPS = [
  {
    number: "01",
    title: "Reach out",
    description: "Send an inquiry through chat or our contact form to introduce yourself.",
  },
  {
    number: "02",
    title: "Meet the puppy",
    description: "We'll schedule a video call or in-person visit so you can meet before deciding.",
  },
  {
    number: "03",
    title: "Reserve",
    description: "A deposit secures your puppy while they finish growing and their final vet check.",
  },
  {
    number: "04",
    title: "Bring them home",
    description: "We'll coordinate a ready date and walk you through everything they'll need.",
  },
];

export const FAQS = [
  {
    question: "How old are the puppies when they go home?",
    answer:
      "Puppies are ready to go home at 8-10 weeks, once they've had their first vaccinations and vet check.",
  },
  {
    question: "Do you offer a health guarantee?",
    answer:
      "Yes, every puppy comes with a written health guarantee and complete vet records.",
  },
  {
    question: "Can I visit before reserving?",
    answer:
      "We welcome video calls for out-of-town families, and in-person visits by appointment for local families.",
  },
  {
    question: "What's included when I bring my puppy home?",
    answer:
      "A starter food supply, vet and vaccination records, and ongoing support from us as they settle in.",
  },
  {
    question: "Do you ship puppies?",
    answer:
      "We prefer in-person or a coordinated flight nanny for out-of-town families so your puppy is never alone in cargo. We're happy to talk through options.",
  },
  {
    question: "Are Maltipoos hypoallergenic?",
    answer:
      "No dog is fully hypoallergenic, but Maltipoos are considered low-shedding and are often a good fit for people with mild allergies.",
  },
  {
    question: "How big do Maltipoos get?",
    answer:
      "Most of our puppies mature to between 5 and 12 pounds, depending on their parents. We list an expected adult weight on each puppy's page.",
  },
];