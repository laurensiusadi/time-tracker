<template>
  <div id="app" class="flex overflow-hidden flex-col h-screen bg-yellow-400">
    <div id="nav" class="p-0 m-0 w-full h-10">
      <h1 class="ml-3 text-xl font-bold tracking-tight leading-10">TimeTrack</h1>
    </div>
    <div class="flex overflow-y-auto flex-1 mx-2 mb-2 bg-white rounded-xl no-scrollbar">
      <router-view/>
    </div>
  </div>
</template>

<style>
@import url("./assets/tailwind.css");
</style>
