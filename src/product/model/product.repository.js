import ProductModel from "./product.schema.js";

export const addNewProductRepo = async (product) => {
  return await new ProductModel(product).save();
};

export const getAllProductsRepo = async ({ search, keyword, category, price, rating, page, limit }) => {
  const filter = {};

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  if (keyword) {
    filter.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { category: { $regex: keyword, $options: "i" } },
    ];
  }

  if (category) {
    filter.category = category;
  }

  if (price) {
    filter.price = {};
    if (price.gte) filter.price.$gte = parseFloat(price.gte);
    if (price.lte) filter.price.$lte = parseFloat(price.lte);
  }

  let aggregationPipeline = [{ $match: filter }];

  if (rating) {
    aggregationPipeline.push({
      $addFields: {
        averageRating: { $avg: "$reviews.rating" },
      },
    });

    const ratingFilter = {};
    if (rating.gte) ratingFilter.$gte = parseFloat(rating.gte);
    if (rating.lte) ratingFilter.$lte = parseFloat(rating.lte);

    aggregationPipeline.push({ $match: { averageRating: ratingFilter } });
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);
  aggregationPipeline.push({ $skip: skip }, { $limit: parseInt(limit) });

  const products = await ProductModel.aggregate(aggregationPipeline);

  const totalProducts = await getTotalCountsOfProduct(filter);

  return { products, totalProducts };
};

export const updateProductRepo = async (_id, updatedData) => {
  return await ProductModel.findByIdAndUpdate(_id, updatedData, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
};

export const deleProductRepo = async (_id) => {
  return await ProductModel.findByIdAndDelete(_id);
};

export const getProductDetailsRepo = async (_id) => {
  return await ProductModel.findById(_id);
};

export const getTotalCountsOfProduct = async (filter) => {
  return await ProductModel.countDocuments(filter);
};

export const findProductRepo = async (productId) => {
  return await ProductModel.findById(productId);
};

