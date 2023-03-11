import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { GamesDataContext } from '../contexts/GameDataContext';

const GamesGraphs: React.FC = () => {
  const { gamesByPlatform, meanScoreByPlatform } = useContext(GamesDataContext);

  const chartRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(chartRef.current);

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = Object.entries(meanScoreByPlatform).map(([key, value]) => ({ key, value }));

    x.domain(data.map(d => d.key));
    y.domain([0, d3.max(data, d => d.value ?? 0) as number]);
    
    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Mean Score');

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.key) ?? 0)
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value));
  }, [meanScoreByPlatform]);

  return (
    <svg ref={chartRef} width="960" height="500"></svg>
  );

};

export default GamesGraphs;