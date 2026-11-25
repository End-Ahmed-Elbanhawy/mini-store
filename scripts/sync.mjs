import { sequelize, User, Category, Product } from "../models/index.mjs";
import { CATALOG, CUSTOMERS } from "./seed-data.mjs";

await sequelize.sync({ force: true });

await User.bulkCreate(
  [
    {
      name: "Ahmed",
      email: "ahmed@admin.com",
      password: "admin123",
      role: "admin",
    },
    {
      name: "Ahmed",
      email: "ahmed@user.com",
      password: "user123",
      role: "user",
    },
    ...CUSTOMERS.map(([name, email]) => ({ name, email, password: "user123" })),
  ],
  { individualHooks: true },
);

for (const [categoryName, products] of Object.entries(CATALOG)) {
  const category = await Category.create({ name: categoryName });

  const rows = [];

  for (const [name, price, stock, description] of products) {
    rows.push({
      name,
      price,
      stock: stock ? stock * 3 + 4 : 0,
      description,
      categoryId: category.id,
    });
  }
  await Product.bulkCreate(rows);
}

const counts = {
  users: await User.count(),
  category: await Category.count(),
  products: await Product.count(),
};

console.log("Database synced and seeded successfully.", counts);

await sequelize.close();
