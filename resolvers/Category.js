exports.Category={
    products:({id:categoryId},{filter},{db})=>{
        var categoryProducts=db.products.filter(product=>product.categoryId===categoryId);
        if (filter) {
            const {onSale,avgRating}=filter;
            if (onSale === true) {
              categoryProducts = categoryProducts.filter((product) => {
                return product.onSale;
              });
            }
            if([1,2,3,4,5].includes(avgRating)){
                categoryProducts=categoryProducts.filter((product)=>{
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
        return categoryProducts
    }
  }