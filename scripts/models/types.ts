type UtilMetadata = {
  name: string;
  type: string;
  category: string;
  description: string;
  githubLink: string;
};
type UtilityRegistry = Record<string, UtilMetadata[]>;

export type { UtilMetadata, UtilityRegistry };

// LIST SHAPE
// "Color" "ArrayUtils" "ObjectUtils" "Computation" "Debug" "Deep Operations" "Dom Events" "Link" "Processor"
// "Composite Type Guards" "Link Type Guards" "Primitive Type Guards" "Reference Type Guards"
// "Refined Type Guards" "String Type Guards" "React Dom Type Guards" "React Node Type Guards" "React Primitive Guards"
// "Primitive Type Utilities" "Advanced Type Utilities"
