import type { IPal } from "../src/common/interfaces";

export interface IBreedingRequest {
  parent1Id: string;
  parent2Id: string;
}

export interface IBreedingResult {
  child: IPal;
  probability: number;
  specialCombination: boolean;
}

export interface IBreedingChainRequest {
  targetPalId: string;
  availablePals?: string[];
  maxGenerations?: number;
}

export interface IBreedingChainStep {
  generation: number;
  parent1: IPal;
  parent2: IPal;
  child: IPal;
}

export interface IBreedingChainResult {
  target: IPal;
  chains: IBreedingChainStep[][];
  shortestPath: number;
}

export interface IPassiveSkillInheritance {
  skill: string;
  fromParent1: boolean;
  fromParent2: boolean;
  probability: number;
}