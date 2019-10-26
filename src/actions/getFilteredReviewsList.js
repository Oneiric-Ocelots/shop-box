import axios from "axios";

const getFilteredReviewsList = ([rating, actionType, productID]) => {
  return dispatch => {
    return axios
      .get(`http://18.223.1.30/reviews/${productID}/list?count=10000`)
      .then(({ data }) => {
        let filteredList = [];
        data.results.forEach(review => {
          if (Number(review.rating) === Number(rating)) {
            filteredList.push(review);
          }
        });
        data.results = filteredList;
        return data;
      })
      .then(data => {
        dispatch({
          type: actionType === "REVIEWS" ? "REVIEWS" : "UPDATE-REVIEWS",
          payload: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export default getFilteredReviewsList;