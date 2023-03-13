import React, { useContext, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { GamesDataContext } from '../contexts/GameDataContext';
import { DateContext } from '../contexts/DateContext';
import '../styles/Chart.css'

const GamesGraphs: React.FC = () => {
  const { gamesByPlatform, meanScoreByPlatform } = useContext(GamesDataContext);
  const { selectDate, setSelectDate } = useContext(DateContext);
  const [selectedObj, setSelectedObj] = useState<'ITEM1' | 'ITEM2'>('ITEM1');

  const data = selectedObj === 'ITEM1' ? gamesByPlatform : meanScoreByPlatform;
  const maxValue = d3.max(Object.values(data)) ?? 0;

  const renderBarChart = () => {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height, 0]);

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    x.domain(Object.keys(data));
    y.domain([0, maxValue]);

    svg.selectAll('.bar')
      .data(Object.entries(data))
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d[0])!)
      .attr('y', d => y(d[1]))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d[1]))
      .on('mouseover', function(event, d) {
        const xValue = d[0];
        const yValue = d[1];
        const tooltip = d3.select('#chart-tooltip');
        tooltip.html(`<p>X: ${xValue}</p><p>Y: ${yValue}</p>`);
        tooltip.style('visibility', 'visible');
      })
      .on('mousemove', function(event) {
        const tooltip = d3.select('#chart-tooltip');
        const xPosition = event.pageX + 10;
        const yPosition = event.pageY + 10;
        tooltip.style('left', `${xPosition}px`)
          .style('top', `${yPosition}px`);
      })
      .on('mouseout', function() {
        const tooltip = d3.select('#chart-tooltip');
        tooltip.style('visibility', 'hidden');
      });
    
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));
  };

  useEffect(() => {
    d3.select('#chart svg').remove(); // remove o gráfico anterior antes de renderizar o novo
    renderBarChart();
  }, [selectedObj, selectDate, setSelectDate, gamesByPlatform, meanScoreByPlatform]);

  return (
    <>
      <div>
        <button onClick={() => setSelectedObj('ITEM1')}>ITEM 1</button>
        <button onClick={() => setSelectedObj('ITEM2')}>ITEM 2</button>
      </div>
      <div id="chart"></div>
      <div id="chart-tooltip"></div>
    </>
  );
};

export default GamesGraphs;