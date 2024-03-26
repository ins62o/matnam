// 외부 - import
import { useQuery } from "@tanstack/react-query";

// 내부 - import
import { likeRecipes } from "../../Firebase/firebaseFn";

export const useLikeQuery = () => {
  return useQuery({
    queryKey: ["likeRecipe"],
    queryFn: () => likeRecipes(),
  });
};
