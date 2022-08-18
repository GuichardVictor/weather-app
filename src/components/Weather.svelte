<script lang="ts">
  import type { CityData } from 'src/classes/OpenWeather';
  import { onDestroy } from 'svelte';

  export let data: CityData;

  let date = new Date();

  const formatDate = (date: Date) => {
    const padValue = (v: number) => String(v).padStart(2, '0');
    return `${date.getFullYear()}-${padValue(date.getMonth())}-${padValue(
      date.getDay()
    )} ${padValue(date.getHours())}:${padValue(date.getMinutes())}:${padValue(date.getSeconds())}`;
  };

  const interval = setInterval(() => {
    // Refresh Data
    date = new Date();
    data.refresh().then((newData) => {
      console.log(newData);
      data = newData;
    });
  }, 1800 * 1000);

  onDestroy(() => clearInterval(interval));
</script>

<div class="p-4 max-w-4xl w-screen mx-auto bg-white rounded-xl md:shadow-lg space-x-4">
  <div class="grid content-center">
    <div class="text-5xl uppercase text-center font-medium text-black">{data.city}</div>
    <div class="text-xl text-center font-medium text-gray-500 shrink-0">{data.countryCode}</div>
    <p class="text-center text-lg font-medium text-black">{data.description}</p>
    <div class="flex justify-center">
      <img class="h-40 w-40" alt="" src={data.iconUrl} />
    </div>
    <p class="text-center text-6xl font-medium text-black">{data.temperature}°C</p>

    <div class="flex justify-center">
      <p class="text-center text-lg font-medium text-black">{data.maxTemperature}°</p>
      <p class="text-center text-lg font-medium text-gray-500">/</p>
      <p class="text-center text-lg font-medium text-gray-500">{data.minTemperature}°</p>
    </div>

    <p class="pt-8 text-center text-md font-medium text-gray-500">
      Last Update: {formatDate(date)}
    </p>
  </div>
</div>
