import Category from "../models/Category";

export class CategoryController {
  // createCategory
  static createCategory(req: any, res: any, next: any) {
    try {
      const category = new Category({
        ...req.body,
      });
      category.save();
      return res.status(200).json({
        message: "Category Created Successfully",
        category,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
  // updateCategory
  static async updateCategory(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      //findbyidandupdate
      const category = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      return res.status(200).json({
        message: "Category Updated Successfully",
        category,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
  // deleteCategory
  static async deleteCategory(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const category = await Category.findByIdAndDelete(id);
      if (!category) {
        return res.status(400).json({
          error: "Category not found",
        });
      }
      return res.status(200).json({
        message: "Category Deleted Successfully",
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
  // getCategoryData
  static async getCategoryData(req: any, res: any, next: any) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return res.status(400).json({
          error: "Category not found",
        });
      }
      return res.status(200).json({
        message: "Category Data",
        category,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  // getAllCategories
  static async getAllCategories(req: any, res: any, next: any) {
    try {
      const categories = await Category.find();
      if (!categories) {
        return res.status(400).json({
          error: "Categories not found",
        });
      }
      return res.status(200).json({
        message: "Categories Data",
        categories,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
