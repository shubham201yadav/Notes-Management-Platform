import MainLayout from "../components/MainLayout";
import {
  BookOpen,
  ShoppingCart,
  Star,
  Truck,
  BadgeCheck,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const books = [
  {
    id: 1,
    title: "Master Geography: School Edition",
    subtitle: "Class 8-10",
    price: 399,
    originalPrice: 499,
    description:
      "Complete foundation for map work, physical geography, and exam-focused short notes.",
    badge: "Bestseller",
    rating: 4.9,
    students: "1,200+",
  },
  {
    id: 2,
    title: "Advanced Geography Guide",
    subtitle: "Class 11-12",
    price: 549,
    originalPrice: 699,
    description:
      "Detailed chapter-wise explanations, model answers, and board exam strategy.",
    badge: "New",
    rating: 4.8,
    students: "850+",
  },
  {
    id: 3,
    title: "College Geography Workbook",
    subtitle: "Semester 1-6",
    price: 699,
    originalPrice: 899,
    description:
      "University-level concepts with solved examples, diagrams, and practice sets.",
    badge: "Popular",
    rating: 4.7,
    students: "700+",
  },
];

const BUY_LINK = "https://wa.me/9775911857?text=Hi%20I%20want%20to%20buy%20your%20Geography%20book";

const Books = () => {
  return (
    <MainLayout>
      <div className="pt-28 pb-16 min-h-screen bg-[radial-gradient(circle_at_20%_10%,#1e293b_0%,#0f172a_35%,#020617_80%)] text-white">
        <section className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10 md:p-12">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm bg-amber-500/15 border border-amber-400/40 text-amber-300 px-3 py-1.5 rounded-full">
                <BookOpen size={14} /> Published Books
              </p>
              <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Professional Geography Book Collection
              </h1>
              <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                Curated books by Newtan Mandal for school and college learners. Each book is structured for concept clarity,
                exam accuracy, and practical learning.
              </p>
            </div>

            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <TrustChip icon={<BadgeCheck size={15} />} label="Verified Content" />
              <TrustChip icon={<Truck size={15} />} label="Fast Shipping Support" />
              <TrustChip icon={<ShieldCheck size={15} />} label="Secure Order Process" />
            </div>
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
            {books.map((book) => {
              const discount = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
              return (
                <article
                  key={book.id}
                  className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-lg shadow-black/20"
                >
                  <div className="p-5 sm:p-6 border-b border-white/10 bg-gradient-to-br from-amber-500/20 to-orange-500/10">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 px-2.5 py-1 text-xs font-semibold">
                        {book.badge}
                      </span>
                      <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 rounded-full px-2.5 py-1">
                        Save {discount}%
                      </span>
                    </div>

                    <h2 className="mt-3 text-xl font-bold text-white leading-snug min-h-[56px]">{book.title}</h2>
                    <p className="text-amber-300 text-sm mt-1">{book.subtitle}</p>
                  </div>

                  <div className="p-5 sm:p-6">
                    <p className="text-slate-300 text-sm leading-relaxed min-h-[72px]">{book.description}</p>

                    <div className="mt-4 flex items-end gap-3">
                      <p className="text-2xl font-extrabold text-white">Rs. {book.price}</p>
                      <p className="text-slate-400 line-through text-sm">Rs. {book.originalPrice}</p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-300">
                      <p className="inline-flex items-center gap-1.5">
                        <Star size={14} className="text-amber-400" /> {book.rating} Rating
                      </p>
                      <p className="inline-flex items-center gap-1.5">
                        <BookOpen size={14} className="text-amber-400" /> {book.students} Learners
                      </p>
                    </div>

                    <a
                      href={`${BUY_LINK}%20-%20${encodeURIComponent(book.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-4 py-3 min-h-[44px] transition"
                    >
                      <ShoppingCart size={17} /> Buy This Book <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

    
        </section>
      </div>
    </MainLayout>
  );
};

const TrustChip = ({ icon, label }) => (
  <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-200 min-h-[44px]">
    <span className="text-amber-300">{icon}</span>
    <span className="font-medium">{label}</span>
  </div>
);

export default Books;
