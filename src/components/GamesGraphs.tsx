import React, { useContext, useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { GamesDataContext } from '../contexts/GameDataContext';
import { DateContext } from '../contexts/DateContext';
// import '../styles/Chart.css';

const GamesGraphs: React.FC<{
  dateFilter: 'day' | 'month';
  setDateFilter: (dateFilter: 'day' | 'month') => void;
}> = ({ dateFilter, setDateFilter }) => {
  const { gamesByPlatform, meanScoreByPlatform } = useContext(GamesDataContext);
  const { selectDate, setSelectDate } = useContext(DateContext);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [selectedObj, setSelectedObj] = useState<'ITEM1' | 'ITEM2'>('ITEM1');

  const data = selectedObj === 'ITEM1' ? gamesByPlatform : meanScoreByPlatform;
  const maxValue = d3.max(Object.values(data)) ?? 0;

  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const width = dimensions.width - margin.left - margin.right;
  const height = dimensions.height - margin.top - margin.bottom;


  const svgRef = useRef<SVGSVGElement | null>(null);
  const xScale = d3.scaleBand().range([0, width]).padding(0.1);
  const yScale = d3.scaleLinear().range([height, 0]);

  const renderBarChart = () => {
    const svg = d3.select(svgRef.current);

    xScale.domain(Object.keys(data));
    yScale.domain([0, maxValue]);

    // Render the initial bars
    svg
      .selectAll('.bar')
      .data(Object.entries(data))
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d[0])!)
      .attr('y', d => yScale(d[1]))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d[1]));

    // Render the axes
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale));

    svg.append('g').call(d3.axisLeft(yScale));
  };

  const updateBarChart = () => {
    const svg = d3.select(svgRef.current);
    const newData = selectedObj === 'ITEM1' ? gamesByPlatform : meanScoreByPlatform;
    const newMaxValue = d3.max(Object.values(newData)) ?? 0;

    xScale.domain(Object.keys(newData));
    yScale.domain([0, newMaxValue]);

    svg.select<SVGGElement>('.x-axis').call(d3.axisBottom(xScale));

    const bars = svg.selectAll<SVGRectElement, [string, number]>('.bar').data(Object.entries(newData));
    bars.exit().remove();

    bars
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .merge(bars)
      .on('mouseover', function (event, d: any) {
        const xValue = d[0];
        const yValue = d[1];
        const tooltip = d3.select('#chart-tooltip');
        tooltip.html(`<p>X: ${xValue}</p><p>Y: ${yValue}</p>`);
        tooltip.style('visibility', 'visible');
      })
      .on('mousemove', function (event: MouseEvent) {
        const tooltip = d3.select('#chart-tooltip');
        const xPosition = event.clientX + 10;
        const yPosition = event.clientY + 10;
        tooltip.style('left', `${xPosition}px`).style('top', `${yPosition}px`);
      })
      .on('mouseout', function () {
        const tooltip = d3.select('#chart-tooltip');
        tooltip.style('visibility', 'hidden');
      })
      .transition()
      .duration(500)
      .attr('x', d => xScale(d[0])!)
      .attr('y', d => yScale(d[1]))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d[1]));
  };

  useEffect(() => {
    if (!svgRef.current) {
      const svg = d3
        .select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);

      svgRef.current = svg.node() as SVGSVGElement;
      renderBarChart();
    } else {
      updateBarChart();
    }
  }, [
    selectedObj,
    selectDate,
    setSelectDate,
    gamesByPlatform,
    meanScoreByPlatform,
    dateFilter,
    setDateFilter,
  ]);
  
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  


  return (
    <>
      <div>
        <button onClick={() => setSelectedObj('ITEM1')}>ITEM 1</button>
        <button onClick={() => setSelectedObj('ITEM2')}>ITEM 2</button>
      </div>
      <div id="chart"></div>
      <div id="chart-tooltip" className="tooltip"></div>
    </>
  );
};

export default GamesGraphs;