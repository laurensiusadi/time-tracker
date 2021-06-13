<template>
  <div class="flex items-center pr-2 pl-4 h-12 border-b border-gray-200 hover:bg-gray-50">
    <h2 class="flex-1 leading-10">Session name</h2>
    <p class="mr-2 leading-10">00:00:00</p>
    <button class="flex justify-center items-center w-8 h-8 text-gray-300 rounded-3xl hover:text-gray-500 hover:bg-gray-100">
      <svg class="ml-px" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.0069 11.5L8 18V5L17.0069 11.5Z" class="fill-current"/>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Session'
}
</script>
