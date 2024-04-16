<template>
    <div>
        <svg :width="width" :height="height"></svg>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import * as d3 from "d3";

export default {
    name: "GroupedBarChart",
    setup() {
        const width = ref(400);
        const height = ref(200);
        const groupPadding = ref(20);
        const colors = d3.scaleOrdinal(d3.schemeCategory10);

        const data = ref([
            { group: 1, value: 10 },
            { group: 1, value: 20 },
            { group: 1, value: 30 },
            { group: 2, value: 15 },
            { group: 2, value: 25 },
            { group: 3, value: 5 },
            { group: 3, value: 15 },
            { group: 3, value: 25 }
        ]);

        const drawChart = () => {
            const svg = d3.select("svg");

            // 根据每个组的柱形数量计算组的宽度
            const groups = svg
                .selectAll("g")
                .data(data.value)
                .enter()
                .append("g")
                .attr("transform", (d) => {
                    const x = calculateX(data.value, d.group, groupPadding.value);
                    const y = height.value - d.value;
                    return `translate(${x},${y})`;
                });

            groups
                .append("rect")
                .attr("width", (group, index) => (width.value - groupPadding.value * (data.value.length / groupCount(data.value))) / data.value.length - 5)
                .attr("height", (d) => d.value)
                .attr("fill", (d) => colors(d.group));

            svg
                .selectAll("text")
                .data(data.value)
                .enter()
                .append("text")
                .text((d) => `Group ${d.group}`)
                .attr("x", (d) => calculateX(data.value, d.group, groupPadding.value) + ((width.value - groupPadding.value * (data.value.length / groupCount(data.value))) / data.value.length) / 2)
                .attr("y", height.value + 15)
                .attr("text-anchor", "middle");
        };

        // 计算每个组的 x 坐标
        const calculateX = (data, group, padding) => {
            const index = data.findIndex((d) => d.group === group);
            const groupWidth = (width.value - padding * (data.length / groupCount(data))) / groupCount(data);
            return index * (groupWidth + padding);
        };

        // 计算组的数量
        const groupCount = (data) => {
            const groups = [...new Set(data.map((d) => d.group))];
            return groups.length;
        };

        onMounted(() => {
            drawChart();
        });

        return {
            width,
            height,
            groupPadding,
            data
        };
    }
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
