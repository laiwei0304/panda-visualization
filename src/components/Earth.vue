
<template>
    <section ref="earth"></section>
</template>

<script>
import { ref, onMounted, watchEffect, reactive } from 'vue';
import * as d3 from 'd3';
// import Legend from 'd3/color-legend';
import axios from 'axios';
import * as topojson from "topojson-client";
export default {
    setup() {
        // Specify the chart’s dimensions.

        const width = 600;
        const marginTop = 46;
        const height = 600;

        let world = reactive({});
        const earth = ref();
        async function getState() {
            world = await axios.get("http://localhost:5173/map/countries-50m.json");
        };

        // // 处理缩放事件
        // function handleZoom() {
        //     mapPath.attr("transform", d3.event.transform);
        // }

        const createMap = () => {
            getState().then(() => {

                const projection = d3.geoOrthographic()
                    .scale(200)  // 设置缩放比例
                    .translate([300, 300])  // 设置平移
                    .rotate([120, -45]);  // 将旋转角度调整为90度，使投影面垂直于地球的经度线
                const path = d3.geoPath(projection);

                const zoom = d3.zoom()
                    .scaleExtent([1 << 8, 1 << 22])
                    .extent([[0, 0], [600, 600]])
                    .on("zoom", (event) => zoomed(event.transform));

                const countries = topojson.feature(world.data, world.data.objects.countries);
                const countrymesh = topojson.mesh(world.data, world.data.objects.countries, (a, b) => a !== b);
                // 创建SVG,使用设定参数.
                const svg = d3.create("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("viewBox", [0, 0, width, height])
                    .attr("style", "max-width: 100%; height: auto;");

                // // Append the legend.
                // svg.append("g")
                //     .attr("transform", "translate(20,0)")
                //     .append(() => Legend(color, { title: "Healthy life expectancy (years)", width: 260 }));

                // Add a white sphere with a black border.
                svg.append("path")
                    .datum({ type: "Sphere" })
                    .attr("fill", "white")
                    .attr("stroke", "currentColor")
                    .attr("d", path);

                // Add a path for each country and color it according te this data.
                svg.append("g")
                    .selectAll("path")
                    .data(countries.features)
                    .join("path")
                    // .attr("fill", d => color(valuemap.get(d.properties.name)))
                    .attr("d", path)
                    .append("title")
                    .text(d => `${d.properties.name}\n`);

                // 添加白色边框.
                svg.append("path")
                    .datum(countrymesh)
                    .attr("fill", "none")
                    .attr("stroke", "white")
                    .attr("d", path);

                // 应用缩放行为到地图容器
                let transform = d3.zoomIdentity.translate(width >> 1, height >> 1).scale(1 << 12);

                // function zoomed(transform) {

                //     levels.each(function (delta) {
                //         const tiles = tile.zoomDelta(delta)(transform);

                //         d3.select(this)
                //             .selectAll("image")
                //             .data(tiles, d => d)
                //             .join("image")
                //             .attr("xlink:href", d => url(...d3.tileWrap(d)))
                //             .attr("x", ([x]) => (x + tiles.translate[0]) * tiles.scale)
                //             .attr("y", ([, y]) => (y + tiles.translate[1]) * tiles.scale)
                //             .attr("width", tiles.scale)
                //             .attr("height", tiles.scale);
                //     });
                // };

                // svg
                //     .call(zoom)
                //     .call(zoom.transform, transform);
                earth.value.appendChild(svg.node());
            })
        };

        // const createChart2 = () => {
        //     getState().then(() => {
        //         // Fit the projection.
        //         const projection = d3.geoOrthographic()
        //             .scale(200)  // 设置缩放比例
        //             .translate([300, 300])  // 设置平移
        //             .rotate([-15, -45]);  // 将旋转角度调整为90度，使投影面垂直于地球的经度线
        //         const path = d3.geoPath(projection);
        //         // // Index the values and create the color scale.
        //         // const valuemap = new Map(hale.map(d => [d.name, d.hale]));
        //         // const color = d3.scaleSequential(d3.extent(valuemap.values()), d3.interpolateYlGnBu);
        //         const countries = topojson.feature(world.data, world.data.objects.countries);
        //         const countrymesh = topojson.mesh(world.data, world.data.objects.countries, (a, b) => a !== b);
        //         // 创建SVG,使用设定参数.
        //         const svg = d3.create("svg")
        //             .attr("width", width)
        //             .attr("height", height)
        //             .attr("viewBox", [0, 0, width, height])
        //             .attr("style", "max-width: 100%; height: auto;");

        //         // // Append the legend.
        //         // svg.append("g")
        //         //     .attr("transform", "translate(20,0)")
        //         //     .append(() => Legend(color, { title: "Healthy life expectancy (years)", width: 260 }));

        //         // Add a white sphere with a black border.
        //         svg.append("path")
        //             .datum({ type: "Sphere" })
        //             .attr("fill", "white")
        //             .attr("stroke", "currentColor")
        //             .attr("d", path);

        //         // Add a path for each country and color it according te this data.
        //         svg.append("g")
        //             .selectAll("path")
        //             .data(countries.features)
        //             .join("path")
        //             // .attr("fill", d => color(valuemap.get(d.properties.name)))
        //             .attr("d", path)
        //             .append("title")
        //             .text(d => `${d.properties.name}\n`);

        //         // 添加白色边框.
        //         svg.append("path")
        //             .datum(countrymesh)
        //             .attr("fill", "none")
        //             .attr("stroke", "white")
        //             .attr("d", path);
        //         Europe.value.appendChild(svg.node());
        //     })
        // };

        // const createChart3 = () => {
        //     getState().then(() => {
        //         // Fit the projection.
        //         const projection = d3.geoOrthographic()
        //             .scale(200)  // 设置缩放比例
        //             .translate([300, 300])  // 设置平移
        //             .rotate([-120, -15]);  // 将旋转角度调整为90度，使投影面垂直于地球的经度线
        //         const path = d3.geoPath(projection);
        //         // // Index the values and create the color scale.
        //         // const valuemap = new Map(hale.map(d => [d.name, d.hale]));
        //         // const color = d3.scaleSequential(d3.extent(valuemap.values()), d3.interpolateYlGnBu);
        //         const countries = topojson.feature(world.data, world.data.objects.countries);
        //         const countrymesh = topojson.mesh(world.data, world.data.objects.countries, (a, b) => a !== b);
        //         // 创建SVG,使用设定参数.
        //         const svg = d3.create("svg")
        //             .attr("width", width)
        //             .attr("height", height)
        //             .attr("viewBox", [0, 0, width, height])
        //             .attr("style", "max-width: 100%; height: auto;");

        //         // // Append the legend.
        //         // svg.append("g")
        //         //     .attr("transform", "translate(20,0)")
        //         //     .append(() => Legend(color, { title: "Healthy life expectancy (years)", width: 260 }));

        //         // Add a white sphere with a black border.
        //         svg.append("path")
        //             .datum({ type: "Sphere" })
        //             .attr("fill", "white")
        //             .attr("stroke", "currentColor")
        //             .attr("d", path);

        //         // Add a path for each country and color it according te this data.
        //         svg.append("g")
        //             .selectAll("path")
        //             .data(countries.features)
        //             .join("path")
        //             // .attr("fill", d => color(valuemap.get(d.properties.name)))
        //             .attr("d", path)
        //             .append("title")
        //             .text(d => `${d.properties.name}\n`);

        //         // 添加白色边框.
        //         svg.append("path")
        //             .datum(countrymesh)
        //             .attr("fill", "none")
        //             .attr("stroke", "white")
        //             .attr("d", path);
        //         America.value.appendChild(svg.node());
        //     })
        // };

        onMounted(() => {
            createMap();
        });
        return { earth };
    },
};
</script>

<style>
div {
    display: flex;
}

.Ebar {
    width: 500px;
    height: 800px;
}
</style>