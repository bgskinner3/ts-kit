import { useState, useMemo, memo } from 'react';

// 1. Memoize the Node to prevent re-render cascades
const Node = memo(
  ({ node, expandedIds }: { node: any; expandedIds: Set<string> }) => {
    // Logic: Auto-expand if this ID is in the "Search Path"
    const [isOpen, setIsOpen] = useState(false);
    const showChildren = isOpen || expandedIds.has(node.id);
    const hasChildren = !!node.children?.length;

    return (
      <div style={{ paddingLeft: '15px' }}>
        <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer' }}>
          {hasChildren ? (showChildren ? '▼ ' : '▶ ') : '• '} {node.name}
        </div>
        {showChildren && hasChildren && (
          <div>
            {node.children.map((child: any) => (
              <Node key={child.id} node={child} expandedIds={expandedIds} />
            ))}
          </div>
        )}
      </div>
    );
  },
);

export const OptimizedTree = ({ data }: { data: any[] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Path-Preservation Logic (Crucial for Verneek)
  // This finds all parent IDs that need to be open to show the matching file
  const expandedIds = useMemo(() => {
    const ids = new Set<string>();
    if (!searchTerm) return ids;

    const findPath = (
      nodes: any[],
      target: string,
      path: string[] = [],
    ): boolean => {
      for (const node of nodes) {
        const currentPath = [...path, node.id];
        if (node.name.toLowerCase().includes(target.toLowerCase())) {
          currentPath.forEach((id) => ids.add(id));
          return true;
        }
        if (node.children && findPath(node.children, target, currentPath))
          return true;
      }
      return false;
    };

    findPath(data, searchTerm);
    return ids;
  }, [searchTerm, data]);

  return (
    <div>
      <input
        placeholder="Search files..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {data.map((root) => (
        <Node key={root.id} node={root} expandedIds={expandedIds} />
      ))}
    </div>
  );
};
