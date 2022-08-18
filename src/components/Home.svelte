
<script lang='ts'>
    import Searchbar from "./Searchbar.svelte";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher()

    export let city: string = ""
    function handleSubmit() {
        if (city) {
            dispatch('cityset', {"city": city})
        } else {
            alert("City Not found")
        }
    }
</script>


<div class="p-4 max-w-4xl mx-auto flex items-center justify-center">
    <div class="grid">
        <h1 class="text-6xl text-center uppercase my-8">Weather App</h1>
        <p class="text-center text-sm text-gray-500">Get weather info using 
            <a class="text-center text-sm text-blue-400 hover:underline" href="https://openweathermap.org/">OpenWeaterMap API</a>
        </p>
        <Searchbar bind:value={city} on:submit={handleSubmit}/>
    </div>
</div>