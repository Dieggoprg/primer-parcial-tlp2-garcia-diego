import { DataTypes } from "sequelize";
import { AssetModel } from "./asset.model.js";
import { CategoryModel } from "./category.model.js";

export const AssetCategoryModel = sequelize.define("AssetCategory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

// TODO: completar relaciones muchos a muchos entre Asset y Category mediante AssetCategory.
// * N:M Asset ↔ Category through AssetCategory
// * 'categories' (Asset) y 'assets' (Category)
// ! FALTA COMPLETAR ACA

CategoryModel.belongsToMany(AssetModel, {
  through: AssetCategoryModel,
  foreignKey: "category_id",
  as: "assets",
  //onDelete: "CASCADE",
});

AssetModell.belongsToMany(CategoryModel, {
  through: AssetCategoryModel,
  foreignKey: "assets_id",
  as: "category",
  //onDelete: "CASCADE",
});

AssetCategoryModel.belongsTo(AssetModel, {
  foreignKey: "assets_id",
  as: "assets",
  //onDelete: "CASCADE",
});

AssetCategoryModel.belongsTo(CategoryModel, {
  foreignKey: "category_id",
  as: "category",
  //onDelete: "CASCADE",
});
