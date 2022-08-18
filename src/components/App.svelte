<script lang="ts">
    import Weather from './Weather.svelte'
    import Home from './Home.svelte'
    import Loader from './Loader.svelte'
    import {CityData, WeatherClient} from '../classes/OpenWeather';

    let city: string = ""
    let weatherDataPromise: Promise<CityData>

    const loadWeatherInfo = (event: any) => {
        city = event.detail.city
        weatherDataPromise = WeatherClient.getCity(city)
    }

</script>

<div class="flex justify-center items-center h-[60vh] md:h-screen">
{#if !city}
    <Home on:cityset={loadWeatherInfo}/>
{:else}
    {#await weatherDataPromise}
        <Loader/>
    {:then data} 
        <Weather data={data}/>
    {:catch _}
        <div>
            <Home on:cityset={loadWeatherInfo}/>
            <div class="p-4 max-w-4xl mx-auto flex items-center justify-center">
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong class="font-bold">Sorry!</strong>
                    <span class="block sm:inline">The requested city <strong class="font-bold">{city}</strong> was not found.</span>
                </div>
            </div>
        </div>
    {/await}
{/if}
</div>
