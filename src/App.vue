<template>
  <div id="app" class="flex overflow-hidden flex-col h-screen">
    <div class="flex overflow-y-auto flex-1 no-scrollbar">
      <router-view/>
    </div>
    <div id="nav" class="p-0 m-0 w-full text-white bg-red-600">
      <router-link class="py-1 px-2 mr-2 leading-8 outline-none" to="/">Home</router-link>
      <router-link class="py-1 px-2 mr-2 leading-8 outline-none" to="/about">About</router-link>
    </div>
  </div>
</template>

<style>
@import url("./assets/tailwind.css");
</style>
