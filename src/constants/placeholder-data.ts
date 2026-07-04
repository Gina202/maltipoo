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
};

export const FEATURED_PUPPIES: PlaceholderPuppy[] = [
  {
    slug: "bella",
    name: "Bella",
    ageWeeks: 9,
    gender: "female",
    price: 2800,
    status: "available",
    placeholderColor: "var(--color-blush)",
  },
  {
    slug: "milo",
    name: "Milo",
    ageWeeks: 8,
    gender: "male",
    price: 2600,
    status: "available",
    placeholderColor: "var(--color-sage)",
  },
  {
    slug: "rosie",
    name: "Rosie",
    ageWeeks: 10,
    gender: "female",
    price: 2900,
    status: "reserved",
    placeholderColor: "var(--color-rose)",
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
];