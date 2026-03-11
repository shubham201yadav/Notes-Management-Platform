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
    title: "Paribesh Bhugol (Bengali Version)",
    subtitle: "Published Book",
    price: 326,
    originalPrice: 420,
    description:
      "Comprehensive Bengali Geography guide for students with concept-based explanations and exam-focused preparation.",
    badge: "Bestseller",
    rating: 4.9,
    students: "1,200+",
    buyLink: "https://www.flipkart.com/paribesh-bhugol-bengali-version/p/itm9d1c7a65d28ad",
  },
  {
    id: 2,
    title: "Anchal Ebong Anchalic Unnayan",
    subtitle: "Region and Regional Development",
    price: 259,
    originalPrice: 300,
    description:
      "Focused book on region and regional development concepts for advanced Geography learners.",
    badge: "Popular",
    rating: 4.8,
    students: "900+",
    buyLink: "https://www.flipkart.com/anchal-ebong-anchalik-unnayan-region-regional-development/p/itmb35d13c9b6078?pid=RBKG8Z8HCNYKHAPG&lid=LSTRBKG8Z8HCNYKHAPGJFAYJG&marketplace=FLIPKART&q=Region+and+Regional+Development&store=bks&srno=s_1_3&otracker=search&otracker1=search&fm=organic&iid=39ccb7d1-5d80-40a2-8908-f627409a402c.RBKG8Z8HCNYKHAPG.SEARCH&ppt=pp&ppn=pp&ssid=bsufmakgwg0000001747276058264&qH=6fb1d15e79f50046",
  },
  {
    id: 3,
    title: "Sanksipta Prasnottare Sammanik Bhugol",
    subtitle: "Sahaj Patha Semester 1",
    price: 189,
    originalPrice: 200,
    description:
      "Concise question-answer format Geography guide for semester learners and quick revision.",
    badge: "New",
    rating: 4.7,
    students: "700+",
    buyLink: "https://www.flipkart.com/sanksipta-prasnottare-sammanik-bhugol-sahaj-patha-semester-1-newton-mandal/p/itm22572aa5715c5",
  },
];

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
                      href={book.buyLink}
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
