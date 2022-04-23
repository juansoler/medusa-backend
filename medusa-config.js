// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

// Database URL (here we use a local database called medusa-development)

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_DATABASE = process.env.DB_DATABASE;

const DATABASE_URL = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;

// const DATABASE_URL =
//   process.env.DATABASE_URL || "postgres://postgres:dj353e@localhost/medusa-store?sslmode=disable";

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";



// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  // Uncomment to add Stripe support.
  // You can create a Stripe account via: https://stripe.com
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: "sk_test_51KqKaMLaYgbpclspBKcbwYNv6JpUZvOTgRt79DEL3S8h5vVE8i2u6lkcZpR8v1ZdJUfSQI2x2CLWwcbIJQCDuAfs006B1TJiv8",
      // webhook_secret: "sk_test_51KqKaMLaYgbpclspBKcbwYNv6JpUZvOTgRt79DEL3S8h5vVE8i2u6lkcZpR8v1ZdJUfSQI2x2CLWwcbIJQCDuAfs006B1TJiv8",
    },
  },
  {
    resolve: `medusa-file-spaces`,
    options: {
        spaces_url: "https://farmaciapaseo51.fra1.digitaloceanspaces.com",
        bucket: "farmaciapaseo51",
        endpoint: "fra1.digitaloceanspaces.com",
        access_key_id: "MJG7RIKBKIPMS4DJ7YOO",
        secret_access_key: "PYXexWkuGdCTx3nNUwgDvVZ1KfZ/bS/5yR5iyH2VkJw",
    },
},
{
  resolve: `medusa-plugin-meilisearch`,
  options: {
    // config object passed when creating an instance of the MeiliSearch client
    config: {
      host: "http://127.0.0.1:7700",
      apiKey: "your_master_key",
    },
    settings: {
      // index name
      products: {
        // MeiliSearch's setting options to be set on a particular index
        searchableAttributes: ["title", "description", "variant_sku", "thumbnail", "variants"],
        displayedAttributes: ["title", "description", "variant_sku", "thumbnail", "variants"],
      },
    },
  },
},
];

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    database_url: DATABASE_URL,
    database_type: "postgres",
    //database_database: "./medusa-db.sql",
    //database_type: "sqlite",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    database_extra: { ssl: { rejectUnauthorized: false } },
  },
  plugins,
};