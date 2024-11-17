const scd = require("dataform-scd");

/**
 * Create an SCD table on top of the table defined in source_data.sqlx.
 */
const { updates, view } = scd("source_data_meals_scd", {
  // A unique identifier for rows in the table.
  uniqueKey: "meal_id",
  // A field that stores a timestamp or date of when the row was last changed.
  timestamp: "date",
 
  //  hash: "FARM_FINGERPRINT" //OPTIONAL

  // The source table to build slowly changing dimensions from.
  source: {
    schema: "raw",
    name: "meals",
  },
  // Any tags that will be added to actions.
  tags: ["slowly-changing-dimensions"],
 
  // Documentation of table columns - OPTIONAL?
  columns: {meal_id: "Meal ID", meal_name: "Meal Name", meal_type: "Meal Type", calories: "Calories", date: "Data Field", price: "Price", drink_id: "Drink ID"},

  // Configuration parameters to apply to the incremental table that will be created. 
  incrementalConfig: {
    bigquery: {
      partitionBy: "date",
    },
  },
});

// Additional customization of the created models can be done by using the returned actions objects.
// updates.config({
//   description: "Updates table for SCD",
// });