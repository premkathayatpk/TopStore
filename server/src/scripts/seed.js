// // backend/scripts/seed.js
// import mongoose from "mongoose";
// import { configDotenv } from "dotenv";
// import { faker } from "@faker-js/faker";
// import { User } from "../models/userModel.js";
// import Product from "../models/productModel.js";

// // Load environment variables properly using the named import
// configDotenv();

// const seedDatabase = async () => {
//   try {
//     // 1. Connect to MongoDB
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("📦 Connected to MongoDB for seeding...");

//     // 2. Clear existing collections (Careful! This wipes current data)
//     await User.deleteMany({});
//     await Product.deleteMany({});
//     console.log("🗑️ Cleared existing data from collections.");

//     // 3. Generate Fake Users
//     // 3. Generate Fake Users
//     const users = [];
//     for (let i = 0; i < 20; i++) {
//       users.push({
//         name: faker.person.fullName(),
//         email: faker.internet.email().toLowerCase(),
//         password: "password123", // Hardcoded simple password for testing login easily
//         createdAt: faker.date.past(),

//         // ADDING THE MISSING REQUIRED FIELDS HERE:
//         phone: faker.phone.number({ style: "international" }), // Generates a realistic phone string
//         profileImg: faker.image.avatar(), // Uses the avatar url for profileImg
//         address: faker.location.streetAddress({ useFullAddress: true }), // Generates a full street address
//       });
//     }
//     const createdUsers = await User.insertMany(users);
//     console.log(`✅ Successfully seeded ${createdUsers.length} users.`);

//     // 4. Generate Fake Products
//     const products = [];
//     for (let i = 0; i < 50; i++) {
//       products.push({
//         name: faker.commerce.productName(),
//         description: faker.commerce.productDescription(),
//         price: parseFloat(faker.commerce.price({ min: 10, max: 1000, dec: 2 })),
//         category: faker.helpers.arrayElement([
//           "Electronics",
//           "Clothing",
//           "Books",
//           "Home Decor",
//         ]),
//         inStock: faker.datatype.boolean({ probability: 0.85 }), // 85% chance of being true
//         imageUrl: faker.image.urlLoremFlickr({ category: "technics" }),
//         // Dynamically assign a random owner from our newly created users
//         owner: faker.helpers.arrayElement(createdUsers)._id,
//       });
//     }
//     await Product.insertMany(products);
//     console.log(`✅ Successfully seeded ${products.length} products.`);

//     // 5. Break Connection Safely
//     console.log("🌱 Database seeding completed successfully!");
//     process.exit(0);
//   } catch (error) {
//     console.error("❌ Error while seeding database:", error);
//     process.exit(1);
//   }
// };

// seedDatabase();
