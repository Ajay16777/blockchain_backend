import Nft from "../models/Nft";
import User from "../models/User";
export class NftController {
  static async createNft(req, res) {
    const { name, description, image, price, category } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    const nft = await Nft.create({
      name,
      description,
      image,
      price,
      category,
      owner: user._id,
    });
    return res.status(201).json({
      message: "Nft Created Successfully",
      nft,
    });
  }
  static async updateNft(req, res) {
    const { name, description, image, price, category } = req.body;
    const nft = await Nft.findById(req.params.id);
    if (!nft) {
      return res.status(400).json({
        error: "Nft not found",
      });
    }
    nft.name = name;
    nft.description = description;
    nft.image = image;
    nft.price = price;
    nft.category = category;
    await nft.save();
    return res.status(200).json({
      message: "Nft Updated Successfully",
      nft,
    });
  }
  static async deleteNft(req, res) {
    const nft = await Nft.findById(req.params.id);
    if (!nft) {
      return res.status(400).json({
        error: "Nft not found",
      });
    }
    await nft.remove();
    return res.status(200).json({
      message: "Nft Deleted Successfully",
    });
  }
  static async getNftData(req, res) {
    const nft = await Nft.findById(req.params.id);
    if (!nft) {
      return res.status(400).json({
        error: "Nft not found",
      });
    }
    return res.status(200).json({
      message: "Nft Found Successfully",
      nft,
    });
  }
}
