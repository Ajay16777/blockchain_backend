import Collection from "../models/Collection";
import User from "../models/User";

export class CollectionController {
  static async createCollection(req: any, res: any) {
    try {
      let owner = req.user._id;
      const collection = await Collection.create({
        ...req.body,
        owner,
      });
      return res.status(200).json({
        message: "Collection Created Successfully",
        collection,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  static async updateCollection(req: any, res: any) {
    try {
      const { id } = req.params;
      //findbyidandupdate
      const collection = await Collection.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      return res.status(200).json({
        message: "Collection Updated Successfully",
        collection,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  static async deleteCollection(req: any, res: any) {
    try {
      const { id } = req.params;
      const collection = await Collection.findByIdAndDelete(id);
      if (!collection) {
        return res.status(400).json({
          error: "Collection not found",
        });
      }
      return res.status(200).json({
        message: "Collection Deleted Successfully",
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  static async getCollectionData(req: any, res: any) {
    try {
      const { id } = req.params;
      const collection = await Collection.findById(id);
      if (!collection) {
        return res.status(400).json({
          error: "Collection not found",
        });
      }
      return res.status(200).json({
        collection,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }

  //add nft to collection
  static async addNftToCollection(req: any, res: any) {
    try {
      const { id } = req.params;
      const { nftId } = req.body;
      const collection = await Collection.findById(id);
      if (!collection) {
        return res.status(400).json({
          error: "Collection not found",
        });
      }
      collection.Nfts.push(nftId);
      await collection.save();
      return res.status(200).json({
        message: "Nft Added to Collection Successfully",
        collection,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
  //remove nft from collection
  static async removeNftFromCollection(req: any, res: any) {
    try {
      const { id } = req.params;
      const { nftId } = req.body;
      const collection = await Collection.findById(id);
      if (!collection) {
        return res.status(400).json({
          error: "Collection not found",
        });
      }
      const index = collection.Nfts.indexOf(nftId);
      if (index > -1) {
        collection.Nfts.splice(index, 1);
      }
      await collection.save();
      return res.status(200).json({
        message: "Nft Removed from Collection Successfully",
        collection,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
  //get all nfts in collection
  static async getNfts(req: any, res: any) {
    try {
      const { id } = req.params;
      const collection = await Collection.findById(id);
      if (!collection) {
        return res.status(400).json({
          error: "Collection not found",
        });
      }
      return res.status(200).json({
        collection,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
  //get all collections of user
  static async getAll(req: any, res: any) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      const collections = await Collection.find({
        owner: user._id,
      });
      return res.status(200).json({
        collections,
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  }
}

