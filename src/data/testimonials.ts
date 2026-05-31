// All testimonial copy lives here so it's easy to edit later.

export interface FeaturedTestimonial {
  quote: string;
  name: string;
  title: string;
}

export interface Testimonial {
  quote: string;
  attribution: string;
}

export const featuredTestimonial: FeaturedTestimonial = {
  quote:
    "After 30 years of pain, now freedom. My sleep was sweet and I did not wake up once all night. Slept flat on my back. I now actually enjoy bending over — the hardest part is remembering that I can. I'm making it a point to get down on the floor and get back up as many times as I can throughout the day. And the most unexpected — I can actually curl my toes. Thank you so much. I can hardly wait for January to learn more!",
  name: "Cinda Medina",
  title: "LMT",
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Loved this class! What great material that can be used daily. Thank you so much. Look forward to more.",
    attribution: "MRT workshop attendee",
  },
  {
    quote:
      "Love this class! Dr. Carlston has a passion for his work and has much-needed knowledge of getting to the root cause of pain.",
    attribution: "MRT workshop attendee",
  },
  {
    quote:
      "Probably one of the best CE courses I have taken. Very interested in any classes from Dr. Carlston.",
    attribution: "MRT workshop attendee",
  },
  {
    quote:
      "I would like to participate in more cont. ed courses from Dr. Ladd. Very engaged. Enjoyed and appreciated all I learned. Thank you.",
    attribution: "MRT workshop attendee",
  },
  {
    quote:
      "This class is wonderful! I can't believe how much I learned — and how much pain relief I personally got from my day in class.",
    attribution: "MRT workshop attendee",
  },
  {
    quote:
      "This is one of the best classes I've taken. Dr. Carlston is an amazing teacher.",
    attribution: "MRT workshop attendee",
  },
];
