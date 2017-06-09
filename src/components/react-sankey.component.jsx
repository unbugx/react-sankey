import React from 'react';
import PropTypes from 'prop-types';
import { createTree, getTreeNodes, getTreePaths, getNodeBranchHeight } from '../helpers/react-sankey';

import './react-sankey.component.css';

const defaultChartConfig = {
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

  renderNodeArrows(node) {
    const chartConfig = this.getConfig();
    const className = this.props.arrowClass ? this.props.arrowClass : 'qb-node-arrow';

    if (node.isFirstChild && node.isLastChild) {
      return (
        <path
          className={className}
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
          className={className}
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
          className={className}
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
        className={className}
        d={`
          M${-10} ${20.5} h-${parseInt(chartConfig.link.width / 3, 10) - 10}
          M${-10} ${20.5} l${-4} ${-4}
          M${-10} ${20.5} l${-4} ${4}
          M-${parseInt(chartConfig.link.width / 3, 10) - 0.5} ${20.5} v${getNodeBranchHeight(chartConfig, node) + chartConfig.node.paddingBottom}
        `}
      />
    );
  }

  renderPath(path) {
    const className = this.props.linkClass ? this.props.linkClass : 'qb-link';
    return <path key={path.id} className={className} d={path.d} />;
  }

  renderNode(chartConfig, node) {

    if (this.props.customNode) {
      return this.props.customNode(chartConfig, node)
    }

    return (
      <g key={node.id} className="qb-node" transform={`translate(${node.x},${node.y})`}>
        <rect height={node.height} width={chartConfig.node.width} />
        <text x={30} y={24}>{`${node.title}`}</text>
        <text className="qb-value" x={30} y={50}>
          {`${formatNumber(node.value)}`}
        </text>
      </g>
    );
  }

  renderArrow(node) {
    if (node.id == this.props.rootID) {
      return null;
    }

    return (
      <g key={node.id} className="qb-arrow" transform={`translate(${node.x},${node.y})`}>
        {this.renderNodeArrows(node)}
      </g>
    );
  }

  getConfig() {
    return this.props.chartConfig ? this.props.chartConfig : defaultChartConfig;
  }

  render() {
    const chartConfig = this.getConfig();
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

          {pathes.map(path => this.renderPath(path))}
          {nodes.map(node => this.renderNode(chartConfig, node))}
          {chartConfig.link.width >= 60 && this.props.hasArrows && nodes.map(node => this.renderArrow(node))}

          <linearGradient id="linear-gradient">
            <stop offset="0%" stopColor="#D1DFE0" />
            <stop offset="100%" stopColor="#D5EDEF" />
          </linearGradient>
        </g>
      </svg>
    );
  }
}

ReactSankey.propTypes = {};

export default ReactSankey;
