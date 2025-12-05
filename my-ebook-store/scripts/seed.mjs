import mongoose from "mongoose";

// Yahan apna MongoDB URL dalein (Jo .env file mein hai)
// Agar local hai to: mongodb://localhost:27017/ebook-store
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ebook-store";

// Book Schema (Wahi jo models/Book.js mein hai)
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  coverImage: { type: String, required: true },
  fileUrl: { type: String, required: true }, // Schema update
}, { timestamps: true });

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);

// Sample PDF link (Public domain book for testing)
const SAMPLE_PDF = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

// --- DEMO DATA ---
const demoBooks = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    price: 499,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    fileUrl: SAMPLE_PDF
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day.",
    price: 650,
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    fileUrl: SAMPLE_PDF
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    description: "Paulo Coelho's enchanting novel has inspired a devoted following around the world. This story, dazzling in its powerful simplicity and inspiring wisdom, is about an Andalusian shepherd boy named Santiago.",
    price: 399,
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
    fileUrl: SAMPLE_PDF
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    description: "It explodes the myth that you need to earn a high income to become rich and explains the difference between working for money and having your money work for you.",
    price: 550,
    coverImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=800&auto=format&fit=crop",
    fileUrl: SAMPLE_PDF
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    description: "The organizing principle in this book is a dichotomy between two modes of thought: 'System 1' is fast, instinctive and emotional; 'System 2' is slower, more deliberative, and more logical.",
    price: 799,
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
    fileUrl: SAMPLE_PDF
  },
  {
    title: "Sapiens: A Brief History",
    author: "Yuval Noah Harari",
    description: "From a renowned historian comes a groundbreaking narrative of humanity’s creation and evolution—a #1 international bestseller.",
    price: 899,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
    fileUrl: SAMPLE_PDF
  }
];

async function seedDatabase() {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected!");

    // Purani books delete karein (Optional)
    console.log("Clearing old books...");
    await Book.deleteMany({});

    // Nayi books add karein
    console.log("Adding demo books...");
    await Book.insertMany(demoBooks);

    console.log("✅ Database Seeded Successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();