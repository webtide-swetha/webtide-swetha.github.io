export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Saturday night oru villa painting enquiry vandhuduchu — I was at a family function in Ukkadam. The WhatsApp went out before I picked up the phone. Adhukku munnaadi I used to lose every weekend lead.",
    attribution: "Lakshmi Selvam",
    role: "Owner, Selvam Home Painting · Coimbatore",
  },
  {
    id: "t2",
    quote:
      "Swetha rebuilt the store for our Tiruppur sets and finally matched the ad to the product. Chennai and Madurai buyers were bouncing on the old homepage. Now the cart WhatsApp comes in Tamil the same night.",
    attribution: "Divya Murugan",
    role: "Founder, Murugan Knits · Tiruppur",
  },
  {
    id: "t3",
    quote:
      "No agency drama. The n8n report lands in my inbox every Monday from T. Nagar. I actually know who called for GST and ITR that week — not just what my cousin forwarded on WhatsApp.",
    attribution: "Senthil Iyer",
    role: "Partner, Iyer & Associates · Chennai",
  },
];
