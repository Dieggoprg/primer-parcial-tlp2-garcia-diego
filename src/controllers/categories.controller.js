import { AssetModel } from "../models/sequelize/asset.model";
import { CategoryModel } from "../models/sequelize/category.model";

export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    // TODO: crear category (solo admin)
    await CategoryModel.create(name, description);
    return res.status(201).json({ msg: "Categoría creada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllCategories = async (_req, res) => {
  try {
    // TODO: listar categories con sus assets (populate inverso) (solo admin)
    const categories = await CategoryModel.findAll();
    return res.status(200).json({ data: categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    // TODO: eliminar category (solo admin) y actualizar assets que referencian
    const categoryToDelete = await CategoryModel.findByPk(id);
    if (!categoryToDelete) {
      return res.status(404).json({ msg: "Categoría no encontrada" });
    }

    await AssetModel.update(
      { category: null },
      { where: { categoryId: id } }
    );

    await categoryToDelete.deleteOne();

    return res.status(204).json({ msg: "Categoría eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
