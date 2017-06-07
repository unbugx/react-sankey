import React from 'react';
import PropTypes from 'prop-types';
import { createTree, getTreeNodes, getTreePaths, getNodeBranchHeight } from '../helpers/react-sankey';

import './react-sankey.component.scss';

const chartConfig = {
  padding: { top: 10, right: 0, bottom: 10, left: 0 },
  node: {
    width: 150,
    maxHeight: 150,
    minHeight: 55,
    rectMinHeight: 5,
    paddingBottom: 40
  },
  link: {
    width: 100
  }
};

// Example 3985763 -> 3,985,763
export function formatNumber(value) {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

class ReactSankey extends React.Component {

  static renderNodeArrows(node) {
    if (node.isFirstChild && node.isLastChild) {
      return (
        <path
          className="qb-arrow"
          d={`
            M${-10} ${20.5} h-${chartConfig.link.width}
            M${-10} ${20.5} l${-4} ${-4}
            M${-10} ${20.5} l${-4} ${4}
          `}
        />
      );
    }

    if (node.isFirstChild) {
      return (
        <path
          className="qb-arrow"
          d={`
            M${-10} ${20.5} h-${chartConfig.link.width}
            M${-10} ${20.5} l${-4} ${-4}
            M${-10} ${20.5} l${-4} ${4}
            M-${parseInt(chartConfig.link.width / 3, 10) - 0.5} ${20.5} v${getNodeBranchHeight(chartConfig, node) + chartConfig.node.paddingBottom}
          `}
        />
      );
    }

    if (node.isLastChild) {
      return (
        <path
          className="qb-arrow"
          d={`
            M${-10} ${20.5} h-${parseInt(chartConfig.link.width / 3, 10) - 10}
            M${-10} ${20.5} l${-4} ${-4}
            M${-10} ${20.5} l${-4} ${4}
          `}
        />
      );
    }

    return (
      <path
        className="qb-arrow"
        d={`
          M${-10} ${20.5} h-${parseInt(chartConfig.link.width / 3, 10) - 10}
          M${-10} ${20.5} l${-4} ${-4}
          M${-10} ${20.5} l${-4} ${4}
          M-${parseInt(chartConfig.link.width / 3, 10) - 0.5} ${20.5} v${getNodeBranchHeight(chartConfig, node) + chartConfig.node.paddingBottom}
        `}
      />
    );
  }

  static renderPath(path) {
    return <path key={path.id} className="qb-link" d={path.d} />;
  }

  static renderNode(node, hasArrows) {
    return (
      <g key={node.id} className="qb-node" transform={`translate(${node.x},${node.y})`}>
        <rect height={node.height} width={chartConfig.node.width} />
        <text x={30} y={24}>{`${node.title}`}</text>
        <text className="qb-value" x={30} y={50}>
          {`${formatNumber(node.value)}`}
        </text>

        {chartConfig.link.width >= 60 && hasArrows && ReactSankey.renderNodeArrows(node)}
      </g>
    );
  }

  render() {
    const tree = createTree(chartConfig, this.props.rootID, this.props.links, this.props.nodes, this.props.rootID);
    const nodes = getTreeNodes(chartConfig, tree);
    const pathes = getTreePaths(chartConfig, this.props.links, nodes);

    const maxTreeLevel = nodes.reduce((level, node) => Math.max(level, node.level), 0);
    const chartWidth = ((maxTreeLevel + 1) * chartConfig.node.width) + (maxTreeLevel * chartConfig.link.width);

    const chartHeight = nodes.reduce((height, node) => {
      // find total height of node children
      let currentChildrenHeight = node.children.reduce((childrenHeight, child) => childrenHeight + getNodeBranchHeight(chartConfig, child) + chartConfig.node.paddingBottom, 0);

      // exclude bottom padding of last child and add parent y position
      currentChildrenHeight = (currentChildrenHeight - chartConfig.node.paddingBottom) + node.y;
      return Math.max(currentChildrenHeight, height);
    }, 0);

    const { left, right, top, bottom } = chartConfig.padding;

    return (
      <svg width={chartWidth + left + right} height={chartHeight + top + bottom}>
        <g transform={`translate(${left},${top})`}>

          {pathes.map(path => ReactSankey.renderPath(path))}
          {nodes.map(node => ReactSankey.renderNode(node, this.props.hasArrows))}

          <linearGradient id="linear-gradient">
            <stop offset="0%" stopColor="#dee0e4" />
            <stop offset="100%" stopColor="#bdc0c7" />
          </linearGradient>
        </g>
      </svg>
    );
  }
}

ReactSankey.propTypes = {};

export default ReactSankey;
