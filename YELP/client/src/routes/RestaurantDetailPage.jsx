import React from "react";
import {useParams} from "react-router-dom";
import {useContext, useEffect} from "react/index";
import {RestaurantsContext} from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const RestaurantDetailPage = () => {
    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);
    try{
        useEffect(() => {
            try{
                const fetchData = async () => {
                    const response = await RestaurantFinder.get(`/${id}`);
                    console.log("Data from detail page: ", response);
                    setSelectedRestaurant(response.data);
                }

                fetchData().then(() => {
                    console.log('Fetch data success for detail page');
                });
            } catch(e) {
                console.log(e);
            }

        }, []);
    } catch (e) {
        console.log(e);
    }

    return (
        <div>
            {selectedRestaurant && (
                <>
                    <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>
                <div className="mt-3">
                    <Reviews reviews={selectedRestaurant.reviews}/>
                </div>
                    <AddReview/>
                </>
            )}
        </div>
    )
}

export default RestaurantDetailPage
