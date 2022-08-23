import Pages from "../models/Pages";

export class PageController {
  static async createPage(req, res) {
    try {
      const page = await Pages.create({
        ...req.body,
      });
      return res.status(200).json({
        message: "Page Created Successfully",
        page,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  static async updatePage(req, res) {
    try {
      const { id } = req.params;
      //findbyidandupdate
      const page = await Pages.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json({
        message: "Page Updated Successfully",
        page,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
  static async deletePage(req, res) {
    try {
      const { id } = req.params;
      const page = await Pages.findByIdAndDelete(id);
      if (!page) {
        return res.status(400).json({
          error: "Page not found",
        });
      }
      return res.status(200).json({
        message: "Page Deleted Successfully",
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  static async getPageData(req, res) {
    try {
      const { id } = req.params;
      const page = await Pages.findById(id);
      if (!page) {
        return res.status(400).json({
          error: "Page not found",
        });
      }
      return res.status(200).json({
        message: "Page Data",
        page,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  static async getAllPages(req, res) {
    try {
      const page = await Pages.find();
      if (!page) {
        return res.status(400).json({
          error: "Page not found",
        });
      }
      return res.status(200).json({
        message: "Page Data",
        page,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}
