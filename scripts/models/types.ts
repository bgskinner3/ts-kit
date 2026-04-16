type UtilMetadata = {
  name: string;
  type: string;
  category: string;
  description: string;
  githubLink: string;
};
type UtilityRegistry = Record<string, UtilMetadata[]>;

export type { UtilMetadata, UtilityRegistry };
