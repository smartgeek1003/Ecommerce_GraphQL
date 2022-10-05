exports.Query = {
  hello: () => {
    return "World";
  },

  products: (parent, { filter }, { db }) => {
    let filtererdProducts = db.products;

    if (filter) {
        const {onSale,avgRating}=filter
      if (onSale === true) {
        filtererdProducts = filtererdProducts.filter((product) => {
          return product.onSale;
        });
      }
      if([1,2,3,4,5].includes(avgRating)){
        filtererdProducts=filtererdProducts.filter((product)=>{
            let sumRating=0;
            let numberOfReviews=0;
            db.reviews.forEach((review)=>{
                if(review.productId===product.id){ 
                    sumRating =+ review.rating;
                    numberOfReviews++;
                }
            })
            let avgProductRating=sumRating/numberOfReviews;
            return avgProductRating >=avgRating;    
        })
      }
    }

    return filtererdProducts;
  },
  product: (parent, { id }, { db }) => {
    return db.products.find((product) => product.id === id);
  },

  categories: (parent, args, { db }) => db.categories,
  category: (parent, args, { db }) => {
    const categoryId = args.id;
    return db.categories.find((category) => category.id === categoryId);
  },
};
