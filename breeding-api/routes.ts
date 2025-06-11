import { Elysia, t } from "elysia";
import { calculateBreeding, getBreedingCombinations, getAllPals } from "./calculator";

export const breedingRoutes = new Elysia({ prefix: "/api/breeding" })
  .get("/calculate", ({ query }) => {
    const { parent1, parent2 } = query;
    
    if (!parent1 || !parent2) {
      return {
        error: "Both parent1 and parent2 parameters are required"
      };
    }

    const result = calculateBreeding(parent1, parent2);
    
    if (!result) {
      return {
        error: "Invalid parent IDs or breeding combination"
      };
    }

    return result;
  }, {
    query: t.Object({
      parent1: t.String(),
      parent2: t.String()
    })
  })
  .get("/combinations/:palId", ({ params }) => {
    const combinations = getBreedingCombinations(params.palId);
    
    return {
      targetPalId: params.palId,
      combinations: combinations.map(([parent1, parent2]) => ({
        parent1: {
          id: parent1.id,
          key: parent1.key,
          name: parent1.name,
          image: parent1.image
        },
        parent2: {
          id: parent2.id,
          key: parent2.key,
          name: parent2.name,
          image: parent2.image
        }
      })),
      count: combinations.length
    };
  })
  .get("/pals", () => {
    const pals = getAllPals();
    
    return {
      pals: pals.map(pal => ({
        id: pal.id,
        key: pal.key,
        name: pal.name,
        image: pal.image,
        types: pal.types,
        breed: {
          rank: pal.breed.rank,
          order: pal.breed.order,
          child_eligible: pal.breed.child_eligble,
          male_probability: pal.breed.male_probability
        }
      })),
      count: pals.length
    };
  });