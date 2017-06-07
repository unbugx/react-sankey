import orderBy from 'lodash/orderBy';

// It is supposed that root node has id=ROOT_ID and the largest value
export function getMaxValue(rootID, nodes) {
  return nodes[rootID].value;
}

function reconcileNodeX(node, chartConfig, level) {
  return {
    ...node,
    x: (chartConfig.node.width + chartConfig.link.width) * level
  };
}

function reconcileNodeHeight(node, chartConfig, maxValue) {
  return {
    ...node,
    height: Math.max(parseInt((node.value / maxValue) * chartConfig.node.maxHeight, 10), chartConfig.node.rectMinHeight)
  };
}

function reconcileNodeChildren(node, chartConfig, rootID, links, nodes, sourceId, level) {
  const children = links
    .filter(link => parseInt(link.sourceId, 10) === parseInt(sourceId, 10))
    .map(link => ({ ...createTree(chartConfig, rootID, links, nodes, link.targetId, level + 1), parent: node })); // eslint-disable-line no-use-before-define

  return {
    ...node,
    children: orderBy(children, ['value'], ['desc']),
  };
}

/**
 * Creates tree structure and prepares some data that will be used to calculate position of each node
 */
export function createTree(chartConfig, rootID, links, nodes, sourceId, level = 0) {
  let node = {
    ...nodes[sourceId],
    level,
    y: 0,
    x: 0,
    height: 0,
    children: [],
    isFirstChild: false,
    isLastChild: false,
    parent: null
  };

  node = reconcileNodeX(node, chartConfig, level);

  node = reconcileNodeHeight(node, chartConfig, getMaxValue(rootID, nodes));

  node = reconcileNodeChildren(node, chartConfig, rootID, links, nodes, sourceId, level);

  return node;
}

function getChildrenHeight(chartConfig, children, initialValue) {
  return children
    .reduce((height, child) => height + getNodeBranchHeight(chartConfig, child) + chartConfig.node.paddingBottom, initialValue); // eslint-disable-line no-use-before-define
}

// Returns max height of branch for given node (node is assumed as root for this branch)
function branchMaxHeight(chartConfig, node) {
  let childrenHeight = getChildrenHeight(chartConfig, node.children, 0);
  return childrenHeight - chartConfig.node.paddingBottom;
}

// Return height of branch for given node
export function getNodeBranchHeight(chartConfig, node) {
  return Math.max(branchMaxHeight(chartConfig, node), node.height, chartConfig.node.minHeight);
}

// find y position of child according to y position of parent and children before this child
function getYChild(chartConfig, parent, currentChildIndex) {
  return getChildrenHeight(chartConfig, parent.children.slice(0, currentChildIndex), parent.y);
}

/**
 * Return tree nodes as flat array and calculate y position of each node.
 */
export function getTreeNodes(chartConfig, tree) {
  let result = [tree];

  const getChildren = (node) => {
    // get children with proper y position
    const children = node.children.map((child, i) => ({
      ...child,
      y: getYChild(chartConfig, node, i),
      isFirstChild: i === 0,
      isLastChild: i === node.children.length - 1
    }));

    result = result.concat(children);

    children.forEach(child => getChildren(child));
  };

  getChildren(tree);

  return result;
}

// Returns d attribute to build proper path between nodes
export function getTreePaths(chartConfig, links, nodes) {
  return links.map((link) => {
    const sourceNode = nodes.find(node => parseInt(node.id, 10) === parseInt(link.sourceId, 10));
    const targetNode = nodes.find(node => parseInt(node.id, 10) === parseInt(link.targetId, 10));

    if (!sourceNode || !targetNode) {
      throw new Error('should never happen');
    }

    const { x: x1, y: y1 } = sourceNode;
    const { x: x2, y: y2 } = targetNode;

    const targetsHeight = sourceNode.children.reduce((height, child) => height + child.height, 0);
    const targetIndex = sourceNode.children.findIndex(child => parseInt(child.id, 10) === parseInt(targetNode.id, 10));
    const curvesStartPositionsPercents = sourceNode.children.map(child => (child.height * 100) / targetsHeight);

    // Get y of first point of path
    let cy1 = y1;
    for (let k = 0; k < targetIndex; k += 1) {
      cy1 += (curvesStartPositionsPercents[k] * sourceNode.height) / 100;
    }

    // Get y of last point of path
    let cy2 = y1;
    for (let k = 0; k <= targetIndex; k += 1) {
      cy2 += (curvesStartPositionsPercents[k] * sourceNode.height) / 100;
    }

    const d = `
      M${x1 + chartConfig.node.width} ${cy1}
      C${x2 - (chartConfig.link.width / 2)} ${cy1} ${x2 - (chartConfig.link.width / 2)} ${y2} ${x2} ${y2} 
      V${y2 + targetNode.height}
      C${x2 - (chartConfig.link.width / 2)} ${y2 + targetNode.height} ${x2 - (chartConfig.link.width / 2)} ${cy2} ${x1 + chartConfig.node.width} ${cy2}
    `;

    return { id: `${sourceNode.id}_${targetNode.id}`, d };
  });
}
