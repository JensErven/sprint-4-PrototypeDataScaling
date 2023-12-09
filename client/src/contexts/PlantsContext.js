import React, { createContext, useState, useEffect, useContext } from "react";
import PlantsService from "../services/plantsService";

const PlantsContext = createContext();
const PlantsContextProvider = ({ children }) => {
  const [plantsData, setPlantsData] = useState({ pagination: {}, plants: [] });
  const [fetchingPlants, setFetchingPlants] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [maxPage, setMaxPage] = useState(1);
  const pagesToShow = 5;
  const [plantspage, setPlantsPage] = useState(1);
  const halfPagesToShow = Math.floor(pagesToShow / 2);
  const minPage = Math.max(1, plantspage - halfPagesToShow);
  const maxVisiblePage = Math.min(minPage + pagesToShow - 1, maxPage);

  const fetchPlantsData = async (page, term = "") => {
    try {
      setFetchingPlants(true);
      let fetchedData;

      if (term === "") {
        fetchedData = await PlantsService.getPlants(page);
      } else {
        fetchedData = await PlantsService.SearchPlantsByCommonName(page, term);
      }

      setMaxPage(fetchedData.pagination.totalPages);
      setPlantsData(fetchedData);
      setFetchingPlants(false);
    } catch (error) {
      console.error("Error fetching plants:", error);
      setFetchingPlants(false);
      // Handle error
    }
  };

  useEffect(() => {
    fetchPlantsData(plantspage, searchTerm);
  }, [plantspage, searchTerm]);

  const searchPlants = async (term) => {
    setSearchTerm(term);
    setPlantsPage(1); // Reset page number when searching
  };

  return (
    <PlantsContext.Provider
      value={{
        plantsData,
        fetchingPlants,
        searchTerm,
        setSearchTerm,
        searchPlants,
        maxPage,
        setPlantsPage,
        pagesToShow,
        plantspage,
        minPage,
        maxVisiblePage,
      }}
    >
      {children}
    </PlantsContext.Provider>
  );
};

const usePlants = () => {
  const context = useContext(PlantsContext);
  if (!context) {
    throw new Error("usePlants must be used within a PlantsProvider");
  }
  return context;
};

export { PlantsContextProvider, usePlants };
export default PlantsContext;
